const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.join(process.env.HOME, 'Desktop/w/wannabe/wannabe/scrape-output');
fs.mkdirSync(OUT, { recursive: true });

const URL = 'https://wannabe.ru/design/superpowered';

async function scrapeAt(browser, width, height, label) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await ctx.newPage();

  // Collect all CSS text
  const cssChunks = [];
  const jsChunks = [];
  page.on('response', async (resp) => {
    const u = resp.url();
    const ct = resp.headers()['content-type'] || '';
    try {
      if (ct.includes('css')) cssChunks.push({ url: u, text: await resp.text() });
      if (ct.includes('javascript') && !u.includes('gtm') && !u.includes('analytics') && !u.includes('facebook')) {
        const t = await resp.text();
        jsChunks.push({ url: u, text: t });
      }
    } catch {}
  });

  try {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  }
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    function outerHTMLOf(selector) {
      const el = document.querySelector(selector);
      return el ? el.outerHTML : null;
    }
    function allOuterHTML(selector) {
      return Array.from(document.querySelectorAll(selector)).map(e => e.outerHTML);
    }
    function computedStylesFor(selector) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const result = {};
      for (let i = 0; i < cs.length; i++) {
        result[cs[i]] = cs.getPropertyValue(cs[i]);
      }
      return result;
    }

    // ── NAV ──
    const navSelectors = [
      'nav', '.nav', 'header', '.header', '.header-wrap',
      '[class*="header"]', '[class*="nav"]', '.w-nav',
    ];
    let navHTML = null;
    let navSelector = null;
    for (const sel of navSelectors) {
      const el = document.querySelector(sel);
      if (el && el.querySelectorAll('a').length > 1) {
        navHTML = el.outerHTML;
        navSelector = sel;
        break;
      }
    }

    // Banner strip
    const bannerSelectors = ['[class*="banner"]', '[class*="announcement"]', '[class*="topbar"]', '[class*="top-bar"]'];
    let bannerHTML = null;
    for (const sel of bannerSelectors) {
      const el = document.querySelector(sel);
      if (el) { bannerHTML = el.outerHTML; break; }
    }

    // ── FOOTER ──
    const footerSelectors = ['footer', '.footer', '[class*="footer"]'];
    let footerHTML = null;
    for (const sel of footerSelectors) {
      const el = document.querySelector(sel);
      if (el) { footerHTML = el.outerHTML; break; }
    }

    // ── PAYMENT / TARIFF / MODAL ──
    const paySelectors = [
      '[class*="pay-modal"]', '[class*="payment"]', '.modal',
      '[class*="tariff"]', '[class*="pricing"]', '[class*="checkout"]',
      '[class*="modal__content"]', '[data-modal]',
    ];
    let paymentHTML = [];
    const paymentClassesFound = [];
    for (const sel of paySelectors) {
      const els = document.querySelectorAll(sel);
      els.forEach(el => {
        const cls = Array.from(el.classList).join(' ');
        if (!paymentClassesFound.includes(cls)) {
          paymentClassesFound.push(cls);
          paymentHTML.push({ selector: sel, classes: cls, html: el.outerHTML });
        }
      });
    }

    // Tariff buttons
    const tariffBtns = allOuterHTML('[class*="tariff__btn"], [class*="tariff-btn"], [class*="buy-btn"], [class*="enroll"]');

    // All modals
    const allModals = allOuterHTML('[class*="modal"], [class*="dialog"], [role="dialog"]');

    // inline scripts
    const inlineScripts = Array.from(document.querySelectorAll('script:not([src])'))
      .map(s => s.textContent)
      .filter(t => t && t.length > 50);

    // external script src
    const externalScripts = Array.from(document.querySelectorAll('script[src]'))
      .map(s => s.src)
      .filter(Boolean);

    // all links in nav
    const navLinks = Array.from(document.querySelectorAll('nav a, header a, .nav a, .header a'))
      .map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href'), classes: a.className }));

    // footer links
    const footerLinks = Array.from(document.querySelectorAll('footer a, .footer a'))
      .map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href'), classes: a.className }));

    // CSS from <style> tags in document
    const styleTags = Array.from(document.querySelectorAll('style'))
      .map(s => s.textContent)
      .filter(Boolean);

    // CSS variables
    const rootVars = {};
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of Array.from(sheet.cssRules || [])) {
          if (rule.selectorText === ':root') {
            for (let i = 0; i < rule.style.length; i++) {
              const p = rule.style[i];
              if (p.startsWith('--')) rootVars[p] = rule.style.getPropertyValue(p).trim();
            }
          }
        }
      } catch {}
    }

    // all classes on body
    const bodyClasses = document.body.className;

    // Extract tariff/pricing section
    const tariffSection = outerHTMLOf('[class*="tariff"], [class*="pricing-section"], [class*="price-section"], .section--tariff');

    // All Webflow form blocks
    const wForms = allOuterHTML('.w-form, form, [class*="form"]').slice(0, 5);

    // Page title
    const pageTitle = document.title;

    return {
      navHTML, navSelector, bannerHTML,
      footerHTML,
      paymentHTML, tariffBtns, allModals,
      inlineScripts, externalScripts,
      navLinks, footerLinks,
      styleTags, rootVars, bodyClasses,
      tariffSection, wForms,
      pageTitle,
      paymentClassesFound,
    };
  });

  // Attach collected CSS
  data.collectedCSS = cssChunks;
  data.collectedJS = jsChunks;

  await ctx.close();
  return data;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  console.log('Scraping desktop (1440px)...');
  const desktop = await scrapeAt(browser, 1440, 900, 'desktop');
  console.log('Scraping mobile (390px)...');
  const mobile = await scrapeAt(browser, 390, 844, 'mobile');

  await browser.close();

  // Save raw data
  const save = (name, data) => {
    fs.writeFileSync(path.join(OUT, name), typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    console.log(`  saved: ${name}`);
  };

  save('desktop-nav.html', desktop.navHTML || '<!-- nav not found -->');
  save('mobile-nav.html', mobile.navHTML || '<!-- nav not found -->');
  save('desktop-banner.html', desktop.bannerHTML || '<!-- banner not found -->');
  save('mobile-banner.html', mobile.bannerHTML || '<!-- banner not found -->');
  save('desktop-footer.html', desktop.footerHTML || '<!-- footer not found -->');
  save('mobile-footer.html', mobile.footerHTML || '<!-- footer not found -->');
  save('desktop-payment.json', desktop.paymentHTML);
  save('mobile-payment.json', mobile.paymentHTML);
  save('desktop-modals.json', desktop.allModals);
  save('desktop-tariff-section.html', desktop.tariffSection || '<!-- tariff section not found -->');
  save('nav-links.json', desktop.navLinks);
  save('footer-links.json', desktop.footerLinks);
  save('root-vars.json', desktop.rootVars);
  save('inline-scripts.json', desktop.inlineScripts);
  save('external-scripts.json', desktop.externalScripts);
  save('payment-classes.json', desktop.paymentClassesFound);
  save('style-tags.json', desktop.styleTags);
  save('w-forms.json', desktop.wForms);

  // Save CSS (webflow main stylesheet)
  for (const css of desktop.collectedCSS) {
    if (css.url.includes('webflow')) {
      save('webflow.css', css.text);
      console.log(`  CSS length: ${css.text.length} chars`);
      break;
    }
  }

  // Save payment-related JS
  const payJS = [];
  for (const js of desktop.collectedJS) {
    const t = js.text;
    if (t.includes('modal') || t.includes('tariff') || t.includes('pay') || t.includes('checkout')) {
      payJS.push({ url: js.url, snippet: t.substring(0, 5000) });
    }
  }
  save('payment-js.json', payJS);

  // Save ALL inline scripts
  save('all-inline-scripts.txt', desktop.inlineScripts.join('\n\n/* ===== */\n\n'));

  console.log('\n=== Summary ===');
  console.log('Nav found:', !!desktop.navHTML, 'selector:', desktop.navSelector);
  console.log('Banner found:', !!desktop.bannerHTML);
  console.log('Footer found:', !!desktop.footerHTML);
  console.log('Payment elements found:', desktop.paymentHTML.length);
  console.log('Modals found:', desktop.allModals.length);
  console.log('Tariff section found:', !!desktop.tariffSection);
  console.log('Inline scripts:', desktop.inlineScripts.length);
  console.log('External scripts:', desktop.externalScripts.length);
  console.log('CSS collected:', desktop.collectedCSS.length, 'files');
  console.log('JS collected:', desktop.collectedJS.length, 'files');
  console.log('Nav links:', desktop.navLinks.length);
  console.log('Footer links:', desktop.footerLinks.length);
}

main().catch(e => { console.error(e); process.exit(1); });

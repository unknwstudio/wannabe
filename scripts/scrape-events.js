#!/usr/bin/env node
// scripts/scrape-events.js — scrape 28 event pages from wannabe.ru
const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL: NodeURL } = require('url');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content/events');
const IMG_BASE = path.join(ROOT, 'public/images/events');
const REPORT_PATH = path.join(ROOT, 'scripts/scrape-report.md');

fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.mkdirSync(IMG_BASE, { recursive: true });

const EVENTS = [
  { url: 'https://wannabe.ru/events/design-trial-reg',              slug: 'design-trial-reg' },
  { url: 'https://wannabe.ru/events/emotional-identity-with-reg',   slug: 'emotional-identity-with-reg' },
  { url: 'https://wannabe.ru/events/emotional-identity',            slug: 'emotional-identity' },
  { url: 'https://wannabe.ru/events/design-trial',                  slug: 'design-trial' },
  { url: 'https://wannabe.ru/events/notboringdesign',               slug: 'notboringdesign' },
  { url: 'https://wannabe.ru/events/designvacation',                slug: 'designvacation' },
  { url: 'https://wannabe.ru/events/designresilience',              slug: 'designresilience' },
  { url: 'https://wannabe.ru/events/valuedesigner',                 slug: 'valuedesigner' },
  { url: 'https://wannabe.ru/events/archive-sale',                  slug: 'archive-sale' },
  { url: 'https://wannabe.ru/events/cleansheet',                    slug: 'cleansheet' },
  { url: 'https://wannabe.ru/events/black-friday',                  slug: 'black-friday' },
  { url: 'https://wannabe.ru/events/elitefreelancer',               slug: 'elitefreelancer' },
  { url: 'https://wannabe.ru/events/referenceandvisualconcept',     slug: 'referenceandvisualconcept' },
  { url: 'https://wannabe.ru/events/designprotection',              slug: 'designprotection' },
  { url: 'https://wannabe.ru/events/product-trial-reg',             slug: 'product-trial-reg' },
  { url: 'https://wannabe.ru/events/productcompetencesai',          slug: 'productcompetencesai' },
  { url: 'https://wannabe.ru/events/product-trial-fb',              slug: 'product-trial-fb' },
  { url: 'https://wannabe.ru/events/product-trial-ya',              slug: 'product-trial-ya' },
  { url: 'https://wannabe.ru/events/uxuiliveshow',                  slug: 'uxuiliveshow' },
  { url: 'https://wannabe.ru/minicoursefree/productpagewithjtbd',   slug: 'productpagewithjtbd' },
  { url: 'https://wannabe.ru/events/topfreelanceskills',            slug: 'topfreelanceskills' },
  { url: 'https://wannabe.ru/conference/ai-genius',                 slug: 'ai-genius' },
  { url: 'https://wannabe.ru/events/product-trial',                 slug: 'product-trial' },
  { url: 'https://wannabe.ru/events/artdirection',                  slug: 'artdirection' },
  { url: 'https://wannabe.ru/events/designproductexperience',       slug: 'designproductexperience' },
  { url: 'https://wannabe.ru/events/fromfeaturestostrategy',        slug: 'fromfeaturestostrategy' },
  { url: 'https://wannabe.ru/events/pm-competence',                 slug: 'pm-competence' },
  { url: 'https://wannabe.ru/events/designintensive',               slug: 'designintensive' },
];

const report = { success: [], errors: [], extraSections: [], missingData: [], images: [] };

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    if (!url || url.startsWith('data:')) return resolve(false);
    try {
      const parsed = new NodeURL(url);
      const proto = parsed.protocol === 'https:' ? https : http;
      const file = fs.createWriteStream(dest);
      const req = proto.get(url, { timeout: 15000 }, res => {
        if (res.statusCode !== 200) { file.close(); fs.unlink(dest, () => {}); return resolve(false); }
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      });
      req.on('error', () => { fs.unlink(dest, () => {}); resolve(false); });
      req.on('timeout', () => { req.destroy(); resolve(false); });
    } catch { resolve(false); }
  });
}

function sanitizeFilename(str) {
  return str.replace(/[^a-z0-9._-]/gi, '-').toLowerCase().replace(/-+/g, '-').slice(0, 60);
}

function cleanText(t) { return (t || '').replace(/\s+/g, ' ').trim(); }

// Apply style guide to a block of HTML
function applyStyleGuide(html) {
  if (!html) return '';
  const $ = cheerio.load(html, { decodeEntities: false });

  // Remove inline font-size, font-weight, letter-spacing, line-height
  $('*').each((_, el) => {
    const style = $(el).attr('style') || '';
    const cleaned = style
      .split(';')
      .filter(rule => {
        const prop = rule.split(':')[0].trim().toLowerCase();
        return !['font-size','font-weight','letter-spacing','line-height','color','background','box-shadow'].includes(prop);
      })
      .join(';');
    if (cleaned.trim()) $(el).attr('style', cleaned);
    else $(el).removeAttr('style');
  });

  // Remove all box shadows
  $('[style*="box-shadow"]').each((_, el) => {
    const s = $(el).attr('style') || '';
    $(el).attr('style', s.replace(/box-shadow:[^;]+;?/g, ''));
  });

  return $.html('body').replace('<body>', '').replace('</body>', '').trim();
}

// Extract structured data from a scraped page
async function extractData(page, slug, url) {
  const html = await page.content();
  const $ = cheerio.load(html);

  const data = {
    slug,
    publishedPath: new NodeURL(url).pathname,
    badges: [],
    title: '',
    ctaLabel: 'Зарегистрироваться',
    description: '',
    eventDate: '',
    eventInfo: '',
    speakerAvatar: '',
    speakerName: '',
    speakerRoles: [],
    quote: '',
    quoteHighlight: '',
    forWhomTitle: 'для кого',
    forWhom: [],
    programTitle: 'программа',
    programDate: '',
    programItems: [],
    speakerSectionTitle: 'спикер',
    speakerAbout: [],
    hosts: null,
    formDate: '',
    formInfo: '',
    formEndpoint: '/api/events/' + slug + '/register',
    extraSections: [],
    _rawImages: [],
  };

  // Title — h1 first, then og:title
  const h1 = $('h1').first().text().trim();
  const ogTitle = $('meta[property="og:title"]').attr('content') || '';
  data.title = cleanText(h1 || ogTitle) || slug;

  // og:description
  data.description = cleanText($('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '');

  // Collect all images for download
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || '';
    const w = parseInt($(el).attr('width') || '0');
    const h = parseInt($(el).attr('height') || '0');
    if (!src || src.startsWith('data:')) return;
    if ((w > 0 && w < 20) || (h > 0 && h < 20)) return; // skip tiny icons
    if (src.includes('gtm') || src.includes('pixel') || src.includes('analytics')) return;
    const abs = src.startsWith('http') ? src : 'https://wannabe.ru' + src;
    data._rawImages.push(abs);
  });

  // Try to find date-like text
  const allText = $('body').text();
  const dateMatch = allText.match(/\d{1,2}\s+(?:января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)[^\n,]*/i);
  if (dateMatch) data.eventDate = dateMatch[0].trim().slice(0, 50);

  // Time
  const timeMatch = allText.match(/(\d{1,2}[:h]\d{2})\s*(?:МСК|мск|UTC)?/);
  if (timeMatch) data.eventDate = (data.eventDate + ', ' + timeMatch[0]).replace(/^,\s*/, '').trim();

  // Badges — look for small pill-like elements with common badge text
  $('*').each((_, el) => {
    const text = cleanText($(el).children().length === 0 ? $(el).text() : '');
    if (!text) return;
    const lc = text.toLowerCase();
    if ((lc.includes('бесплат') || lc.includes('бесплат') || lc.includes('записи не') || lc.includes('онлайн') || lc.includes('zoom') || lc.includes('бесплатн')) && text.length < 60) {
      if (!data.badges.includes(text)) data.badges.push(text);
    }
  });
  data.badges = data.badges.slice(0, 4);

  // Speaker — look for photo + name pattern
  let speakerImgSrc = '';
  $('img').each((_, el) => {
    const alt = $(el).attr('alt') || '';
    const src = $(el).attr('src') || '';
    const cls = $(el).attr('class') || '';
    if (alt.match(/[А-Я][а-я]+ [А-Я][а-я]+/) || cls.includes('speaker') || cls.includes('author') || cls.includes('photo')) {
      if (!speakerImgSrc) speakerImgSrc = src.startsWith('http') ? src : ('https://wannabe.ru' + src);
      const nameMatch = alt.match(/[А-Я][а-яё]+ [А-Я][а-яё]+/);
      if (nameMatch && !data.speakerName) data.speakerName = nameMatch[0];
    }
  });
  if (speakerImgSrc) data._rawImages.unshift(speakerImgSrc);

  // Speaker name from headings near speaker sections
  if (!data.speakerName) {
    $('h2, h3, h4').each((_, el) => {
      const text = cleanText($(el).text());
      if (text.match(/^[А-Я][а-яё]+ [А-Я][а-яё]+$/) && text.length < 40) {
        data.speakerName = text;
        return false;
      }
    });
  }

  // Quote — blockquote or large text with quotation marks
  $('blockquote, [class*="quote"]').each((_, el) => {
    const text = cleanText($(el).text());
    if (text.length > 30 && !data.quote) data.quote = text.slice(0, 300);
  });
  if (!data.quote) {
    // find text with «»
    $('p').each((_, el) => {
      const text = cleanText($(el).text());
      if ((text.includes('«') || text.startsWith('"')) && text.length > 40 && !data.quote) {
        data.quote = text.slice(0, 300);
      }
    });
  }

  // Program items — ordered lists or numbered items
  let progNum = 1;
  $('ol li, [class*="program"] li, [class*="agenda"] li').each((_, el) => {
    const text = cleanText($(el).text());
    if (text.length > 5) {
      data.programItems.push({ number: String(progNum).padStart(2, '0'), text });
      progNum++;
    }
  });

  // For whom — unordered lists that look like audience descriptions
  if (data.programItems.length === 0) {
    let n = 1;
    $('ul li').each((_, el) => {
      const text = cleanText($(el).text());
      if (text.length > 20 && n <= 6) {
        data.forWhom.push({ number: String(n).padStart(2, '0'), boldText: '', text });
        n++;
      }
    });
  }

  // Form info
  $('form').each((_, el) => {
    const formText = cleanText($(el).closest('section, div').text()).slice(0, 200);
    if (formText && !data.formInfo) data.formInfo = formText;
  });

  // Extra sections — find sections that have substantial content
  const templateSections = ['hero', 'quote', 'for-whom', 'program', 'speaker', 'registration', 'footer'];
  const positions = ['after-hero', 'after-quote', 'after-for-whom', 'after-program', 'after-speaker', 'before-form'];
  let posIdx = 0;
  $('section, [class*="section"]').each((_, el) => {
    const text = cleanText($(el).text());
    if (text.length > 100 && posIdx < positions.length) {
      const cleanedHTML = applyStyleGuide($(el).html());
      if (cleanedHTML && cleanedHTML.length > 50) {
        data.extraSections.push({ position: positions[posIdx], html: cleanedHTML });
        posIdx++;
      }
    }
  });
  // Cap extra sections at 3
  data.extraSections = data.extraSections.slice(0, 3);

  return data;
}

async function scrapePage(browser, event, attempt = 1) {
  const { url, slug } = event;
  console.log(`\n[${slug}] Scraping ${url} (attempt ${attempt})...`);

  const imgDir = path.join(IMG_BASE, slug);
  fs.mkdirSync(imgDir, { recursive: true });

  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await ctx.newPage();

  let status = 200;
  page.on('response', res => { if (res.url() === url) status = res.status(); });

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    } catch (e) {
      await ctx.close();
      throw new Error('Navigation failed: ' + e.message);
    }
  }
  await page.waitForTimeout(4000);

  if (status === 404) {
    await ctx.close();
    throw new Error('404 Not Found');
  }

  const data = await extractData(page, slug, url);
  await ctx.close();

  // Download images
  const downloadedImages = [];
  const seen = new Set();
  for (let i = 0; i < Math.min(data._rawImages.length, 10); i++) {
    const imgUrl = data._rawImages[i];
    if (seen.has(imgUrl)) continue;
    seen.add(imgUrl);

    try {
      const parsed = new NodeURL(imgUrl);
      const ext = path.extname(parsed.pathname).toLowerCase() || '.jpg';
      const label = i === 0 ? 'speaker' : `image-${i}`;
      const filename = label + ext;
      const dest = path.join(imgDir, filename);
      const ok = await downloadImage(imgUrl, dest);
      if (ok) {
        downloadedImages.push({ url: imgUrl, local: `/images/events/${slug}/${filename}` });
        report.images.push({ slug, filename, ok: true });
      }
    } catch (e) {
      report.images.push({ slug, url: imgUrl, ok: false, error: e.message });
    }
  }

  // Set speaker avatar to first downloaded image
  if (downloadedImages.length > 0) data.speakerAvatar = downloadedImages[0].local;

  // Remove internal field
  delete data._rawImages;

  // Flag missing data
  const missing = [];
  if (!data.title) missing.push('title');
  if (!data.speakerName) missing.push('speakerName');
  if (!data.speakerAvatar) missing.push('speakerAvatar');
  if (!data.eventDate) missing.push('eventDate');
  if (data.programItems.length === 0) missing.push('programItems');
  if (missing.length) report.missingData.push({ slug, missing });

  if (data.extraSections.length > 0) {
    report.extraSections.push({ slug, count: data.extraSections.length, positions: data.extraSections.map(s => s.position) });
  }

  // Save JSON (don't overwrite the existing designresilience.json if it has richer data)
  const outPath = path.join(CONTENT_DIR, slug + '.json');
  if (slug === 'designresilience' && fs.existsSync(outPath)) {
    const existing = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    // Merge: keep existing rich fields, add extraSections from scrape
    data.badges = existing.badges?.length ? existing.badges : data.badges;
    data.title = existing.title || data.title;
    data.speakerName = existing.speakerName || data.speakerName;
    data.speakerRoles = existing.speakerRoles?.length ? existing.speakerRoles : data.speakerRoles;
    data.speakerAbout = existing.speakerAbout?.length ? existing.speakerAbout : data.speakerAbout;
    data.forWhom = existing.forWhom?.length ? existing.forWhom : data.forWhom;
    data.programItems = existing.programItems?.length ? existing.programItems : data.programItems;
    data.hosts = existing.hosts || data.hosts;
    data.formDate = existing.formDate || data.formDate;
    data.formInfo = existing.formInfo || data.formInfo;
    data.quote = existing.quote || data.quote;
    data.quoteHighlight = existing.quoteHighlight || data.quoteHighlight;
    data.speakerAvatar = existing.speakerAvatar || data.speakerAvatar;
  }

  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`  ✓ ${slug} — title: "${data.title.slice(0, 50)}", images: ${downloadedImages.length}, extra: ${data.extraSections.length}`);
  return data;
}

function writeReport() {
  const lines = [
    '# Scrape Report',
    `Generated: ${new Date().toISOString()}`,
    '',
    `## Summary`,
    `- Pages scraped successfully: ${report.success.length}`,
    `- Pages with errors: ${report.errors.length}`,
    `- Pages with extra sections: ${report.extraSections.length}`,
    `- Pages with missing data: ${report.missingData.length}`,
    `- Images downloaded: ${report.images.filter(i => i.ok).length}`,
    '',
    '## Successful Pages',
    ...report.success.map(s => `- ✓ ${s}`),
    '',
    '## Errors',
    ...report.errors.map(e => `- ✗ ${e.slug}: ${e.error}`),
    '',
    '## Extra Sections Found',
    ...report.extraSections.map(e => `- ${e.slug}: ${e.count} section(s) at [${e.positions.join(', ')}]`),
    '',
    '## Missing Data',
    ...report.missingData.map(m => `- ${m.slug}: missing ${m.missing.join(', ')}`),
    '',
    '## Images',
    ...report.images.map(i => `- ${i.ok ? '✓' : '✗'} ${i.slug}/${i.filename || ''}${i.error ? ' — ' + i.error : ''}`),
  ];
  fs.writeFileSync(REPORT_PATH, lines.join('\n'));
}

function commitProgress(label) {
  const { execSync } = require('child_process');
  try {
    execSync('git add .', { cwd: ROOT, stdio: 'pipe' });
    execSync(`git commit -m "scrape: ${label}"`, { cwd: ROOT, stdio: 'pipe' });
    console.log(`  → committed: ${label}`);
  } catch (e) {
    console.log(`  → commit skipped (nothing new or error)`);
  }
}

async function main() {
  console.log('=== wannabe.ru event scraper ===');
  console.log(`Scraping ${EVENTS.length} pages...\n`);

  const browser = await chromium.launch({ headless: true });
  let scraped = 0;

  for (let i = 0; i < EVENTS.length; i++) {
    const event = EVENTS[i];
    await sleep(3000);

    try {
      await scrapePage(browser, event);
      report.success.push(event.slug);
      scraped++;
    } catch (e) {
      console.log(`  ✗ ${event.slug}: ${e.message}`);
      report.errors.push({ slug: event.slug, error: e.message });

      // Retry once
      if (e.message !== '404 Not Found') {
        try {
          await sleep(5000);
          await scrapePage(browser, event, 2);
          report.success.push(event.slug);
          report.errors.pop();
          scraped++;
        } catch (e2) {
          // Create minimal JSON
          const minimalPath = path.join(CONTENT_DIR, event.slug + '.json');
          if (!fs.existsSync(minimalPath)) {
            fs.writeFileSync(minimalPath, JSON.stringify({
              slug: event.slug,
              publishedPath: new NodeURL(event.url).pathname,
              badges: [], title: event.slug, ctaLabel: 'Зарегистрироваться',
              description: '', eventDate: '', eventInfo: '',
              speakerAvatar: '', speakerName: '', speakerRoles: [],
              quote: '', quoteHighlight: '', forWhomTitle: 'для кого',
              forWhom: [], programTitle: 'программа', programDate: '',
              programItems: [], speakerSectionTitle: 'спикер', speakerAbout: [],
              hosts: null, formDate: '', formInfo: '',
              formEndpoint: `/api/events/${event.slug}/register`,
              extraSections: [],
            }, null, 2));
          }
        }
      } else {
        // 404 — create minimal
        const minimalPath = path.join(CONTENT_DIR, event.slug + '.json');
        if (!fs.existsSync(minimalPath)) {
          fs.writeFileSync(minimalPath, JSON.stringify({
            slug: event.slug, publishedPath: new NodeURL(event.url).pathname,
            badges: [], title: event.slug, ctaLabel: 'Зарегистрироваться',
            description: '', eventDate: '', eventInfo: '',
            speakerAvatar: '', speakerName: '', speakerRoles: [],
            quote: '', quoteHighlight: '', forWhomTitle: 'для кого',
            forWhom: [], programTitle: 'программа', programDate: '',
            programItems: [], speakerSectionTitle: 'спикер', speakerAbout: [],
            hosts: null, formDate: '', formInfo: '',
            formEndpoint: `/api/events/${event.slug}/register`,
            extraSections: [],
          }, null, 2));
        }
      }
    }

    writeReport();

    // Commit every 5 pages
    if ((i + 1) % 5 === 0) {
      commitProgress(`progress ${i + 1}/${EVENTS.length} pages`);
    }
  }

  await browser.close();

  writeReport();
  commitProgress(`complete — ${scraped}/${EVENTS.length} pages scraped`);

  console.log('\n=== Done ===');
  console.log(`Success: ${report.success.length} / ${EVENTS.length}`);
  console.log(`Errors: ${report.errors.length}`);
  console.log(`Report: ${REPORT_PATH}`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  writeReport();
  process.exit(1);
});

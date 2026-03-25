const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.env.HOME, 'Desktop/w/wannabe/site/design-system');
const PAGES = [
  'https://wannabe.ru/design/superpowered',
  'https://wannabe.ru/design/t-shaped-designer',
  'https://wannabe.ru/shorts/ai-creator',
  'https://wannabe.ru/events/designresilience',
  'https://wannabe.ru/contacts',
];
const VIEWPORTS = [
  { width: 1440, height: 900, label: 'desktop' },
  { width: 390, height: 844, label: 'mobile' },
];

async function extractFromPage(page, url, viewportLabel) {
  console.log(`  [${viewportLabel}] ${url}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    // networkidle timed out — page likely has persistent connections; use load instead
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  }
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const results = {
      cssVars: {},
      typography: [],
      mediaQueries: [],
      spacing: [],
      fontFaces: [],
      stylesheetUrls: [],
      components: [],
    };

    // ── CSS custom properties from :root ──
    for (const sheet of document.styleSheets) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        for (const rule of rules) {
          if (rule.selectorText === ':root') {
            const style = rule.style;
            for (let i = 0; i < style.length; i++) {
              const prop = style[i];
              if (prop.startsWith('--')) {
                results.cssVars[prop] = style.getPropertyValue(prop).trim();
              }
            }
          }
          // @font-face
          if (rule.type === CSSRule.FONT_FACE_RULE) {
            const style = rule.style;
            const src = style.getPropertyValue('src');
            const family = style.getPropertyValue('font-family').replace(/['"]/g, '');
            const weight = style.getPropertyValue('font-weight');
            const urls = [];
            const urlRegex = /url\(['"]?([^'")\s]+)['"]?\)/g;
            let m;
            while ((m = urlRegex.exec(src)) !== null) urls.push(m[1]);
            results.fontFaces.push({ family, weight, urls });
          }
          // @media
          if (rule.type === CSSRule.MEDIA_RULE) {
            const mq = rule.conditionText || rule.media?.mediaText || '';
            if (mq && !results.mediaQueries.includes(mq)) {
              results.mediaQueries.push(mq);
            }
          }
        }
        if (sheet.href) results.stylesheetUrls.push(sheet.href);
      } catch (e) {}
    }

    // ── Typography ──
    const typoSelectors = ['h1','h2','h3','h4','h5','h6','p','span','label','button','a'];
    const seenTypo = new Set();
    for (const sel of typoSelectors) {
      const els = document.querySelectorAll(sel);
      for (const el of els) {
        const cs = getComputedStyle(el);
        const record = {
          selector: sel,
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          textTransform: cs.textTransform,
        };
        const key = `${sel}|${record.fontFamily}|${record.fontSize}|${record.fontWeight}|${record.lineHeight}|${record.letterSpacing}`;
        if (!seenTypo.has(key)) {
          seenTypo.add(key);
          results.typography.push(record);
        }
        if (seenTypo.size > 300) break;
      }
    }

    // ── Spacing (margin/padding/gap) ──
    const spacingMap = {};
    const allEls = document.querySelectorAll('*');
    for (const el of allEls) {
      const cs = getComputedStyle(el);
      const vals = [
        cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft,
        cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft,
        cs.gap, cs.columnGap, cs.rowGap,
      ];
      for (const v of vals) {
        if (v && v !== '0px' && v !== 'normal' && v !== 'auto') {
          spacingMap[v] = (spacingMap[v] || 0) + 1;
        }
      }
    }
    results.spacing = Object.entries(spacingMap)
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }));

    // ── Components ──
    const compPatterns = [
      { name: 'nav', selectors: ['nav', '[class*="nav"]', '[class*="header"]'] },
      { name: 'footer', selectors: ['footer', '[class*="footer"]'] },
      { name: 'button', selectors: ['button', '[class*="btn"]', '[class*="button"]', 'a[class*="cta"]'] },
      { name: 'tariff-card', selectors: ['[class*="tariff"]', '[class*="price"]', '[class*="plan"]', '[class*="card"]'] },
      { name: 'form', selectors: ['form', '[class*="form"]'] },
      { name: 'modal', selectors: ['[class*="modal"]', '[class*="dialog"]', '[role="dialog"]'] },
      { name: 'faq-accordion', selectors: ['[class*="faq"]', '[class*="accord"]', 'details', '[class*="collapse"]'] },
      { name: 'review-block', selectors: ['[class*="review"]', '[class*="testimonial"]', '[class*="feedback"]'] },
      { name: 'countdown', selectors: ['[class*="countdown"]', '[class*="timer"]'] },
      { name: 'video-embed', selectors: ['video', 'iframe[src*="youtube"]', 'iframe[src*="vimeo"]', '[class*="video"]'] },
      { name: 'cta-section', selectors: ['[class*="cta"]', '[class*="hero"]', '[class*="banner"]'] },
      { name: 'breadcrumb', selectors: ['[class*="breadcrumb"]', 'nav[aria-label*="breadcrumb"]'] },
      { name: 'tag-badge', selectors: ['[class*="tag"]', '[class*="badge"]', '[class*="label"]'] },
      { name: 'section-header', selectors: ['[class*="section"]'] },
      { name: 'course-card', selectors: ['[class*="course"]'] },
      { name: 'speaker-block', selectors: ['[class*="speaker"]', '[class*="teacher"]', '[class*="mentor"]'] },
      { name: 'program-block', selectors: ['[class*="program"]', '[class*="curriculum"]', '[class*="syllabus"]'] },
    ];

    for (const comp of compPatterns) {
      const found = [];
      for (const sel of comp.selectors) {
        const els = document.querySelectorAll(sel);
        for (const el of els) {
          const cls = Array.from(el.classList).join(' ');
          if (cls && !found.includes(cls)) found.push(cls);
          if (found.length >= 5) break;
        }
        if (found.length >= 5) break;
      }
      if (found.length > 0) {
        results.components.push({ name: comp.name, classes: found });
      }
    }

    return results;
  });

  return data;
}

function mergeDeep(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      if (!target[k]) target[k] = {};
      mergeDeep(target[k], v);
    } else {
      target[k] = v;
    }
  }
  return target;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  const allData = {
    cssVars: {},
    typography: [],
    mediaQueries: new Set(),
    spacing: {},
    fontFaces: [],
    stylesheetUrls: new Set(),
    components: {},
  };

  const typoSeen = new Set();
  const fontFaceSeen = new Set();

  for (const pageUrl of PAGES) {
    const pageName = pageUrl.replace('https://wannabe.ru', '') || '/';
    console.log(`\nPage: ${pageName}`);

    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });
      const page = await ctx.newPage();

      // Capture network requests for fonts
      const networkFonts = [];
      page.on('response', async (response) => {
        const url = response.url();
        const ct = response.headers()['content-type'] || '';
        if (ct.includes('font') || /\.(woff2?|ttf|otf|eot)(\?|$)/.test(url)) {
          networkFonts.push(url);
        }
      });

      try {
        const data = await extractFromPage(page, pageUrl, vp.label);

        // Merge CSS vars
        Object.assign(allData.cssVars, data.cssVars);

        // Merge typography
        for (const t of data.typography) {
          const key = `${t.selector}|${t.fontFamily}|${t.fontSize}|${t.fontWeight}|${t.lineHeight}|${t.letterSpacing}`;
          if (!typoSeen.has(key)) {
            typoSeen.add(key);
            allData.typography.push({ ...t, viewport: vp.label, page: pageName });
          }
        }

        // Merge media queries
        for (const mq of data.mediaQueries) allData.mediaQueries.add(mq);

        // Merge spacing
        for (const { value, count } of data.spacing) {
          allData.spacing[value] = (allData.spacing[value] || 0) + count;
        }

        // Merge font faces
        for (const ff of data.fontFaces) {
          const key = `${ff.family}|${ff.weight}|${ff.urls.join(',')}`;
          if (!fontFaceSeen.has(key)) {
            fontFaceSeen.add(key);
            allData.fontFaces.push(ff);
          }
        }

        // Network fonts
        for (const url of networkFonts) {
          if (!fontFaceSeen.has(url)) {
            fontFaceSeen.add(url);
            allData.fontFaces.push({ family: 'network-detected', weight: 'unknown', urls: [url] });
          }
        }

        // Stylesheet URLs
        for (const u of data.stylesheetUrls) allData.stylesheetUrls.add(u);

        // Merge components
        for (const comp of data.components) {
          if (!allData.components[comp.name]) {
            allData.components[comp.name] = { classes: new Set(), pages: new Set() };
          }
          for (const cls of comp.classes) allData.components[comp.name].classes.add(cls);
          allData.components[comp.name].pages.add(pageName);
        }

      } catch (e) {
        console.error(`  Error on ${pageUrl} @ ${vp.label}:`, e.message);
      }

      await ctx.close();
    }
  }

  await browser.close();

  // ── Write tokens.json ──
  const tokens = {
    cssCustomProperties: allData.cssVars,
    repeatedColors: {},
    repeatedSpacing: {},
  };
  // Extract color-like and spacing-like vars
  for (const [k, v] of Object.entries(allData.cssVars)) {
    if (/color|clr|bg|background|text|border|fill|stroke/i.test(k)) {
      tokens.repeatedColors[k] = v;
    } else if (/space|size|gap|margin|padding|radius|width|height/i.test(k)) {
      tokens.repeatedSpacing[k] = v;
    }
  }
  fs.writeFileSync(path.join(OUTPUT_DIR, 'tokens.json'), JSON.stringify(tokens, null, 2));
  console.log('\n✓ tokens.json');

  // ── Write typography.json ──
  const typoGrouped = {};
  for (const t of allData.typography) {
    if (!typoGrouped[t.selector]) typoGrouped[t.selector] = [];
    typoGrouped[t.selector].push({
      fontFamily: t.fontFamily,
      fontSize: t.fontSize,
      fontWeight: t.fontWeight,
      lineHeight: t.lineHeight,
      letterSpacing: t.letterSpacing,
      textTransform: t.textTransform,
      viewport: t.viewport,
    });
  }
  fs.writeFileSync(path.join(OUTPUT_DIR, 'typography.json'), JSON.stringify(typoGrouped, null, 2));
  console.log('✓ typography.json');

  // ── Write breakpoints.json ──
  const bps = {
    raw: Array.from(allData.mediaQueries),
    parsed: [],
  };
  const bpSeen = new Set();
  for (const mq of allData.mediaQueries) {
    const minMatch = mq.match(/min-width:\s*([\d.]+)(px|em|rem)/);
    const maxMatch = mq.match(/max-width:\s*([\d.]+)(px|em|rem)/);
    const entry = {
      query: mq,
      minWidth: minMatch ? { value: parseFloat(minMatch[1]), unit: minMatch[2] } : null,
      maxWidth: maxMatch ? { value: parseFloat(maxMatch[1]), unit: maxMatch[2] } : null,
    };
    const bpKey = `${entry.minWidth?.value}-${entry.maxWidth?.value}`;
    if (!bpSeen.has(bpKey)) {
      bpSeen.add(bpKey);
      bps.parsed.push(entry);
    }
  }
  bps.parsed.sort((a, b) => (a.minWidth?.value || 0) - (b.minWidth?.value || 0));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'breakpoints.json'), JSON.stringify(bps, null, 2));
  console.log('✓ breakpoints.json');

  // ── Write spacing.json ──
  const spacingArr = Object.entries(allData.spacing)
    .sort((a, b) => b[1] - a[1])
    .map(([value, count]) => ({ value, count }));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'spacing.json'), JSON.stringify(spacingArr, null, 2));
  console.log('✓ spacing.json');

  // ── Write components-list.md ──
  const compDescriptions = {
    'nav': 'Top navigation bar with links and logo',
    'footer': 'Page footer with links, socials, and legal info',
    'button': 'Interactive call-to-action or form submit button',
    'tariff-card': 'Pricing or course tariff selection card',
    'form': 'Input form for email capture, registration, or contact',
    'modal': 'Overlay dialog for lightboxes, confirmations, or forms',
    'faq-accordion': 'Collapsible FAQ or content accordion',
    'review-block': 'Student testimonial or review card',
    'countdown': 'Countdown timer for event/sale deadlines',
    'video-embed': 'Embedded video player (YouTube/Vimeo/native)',
    'cta-section': 'Hero or CTA section with headline and action button',
    'breadcrumb': 'Navigation breadcrumb trail',
    'tag-badge': 'Tag, badge, or label pill element',
    'section-header': 'Section heading block with title and optional subtitle',
    'course-card': 'Course listing or preview card',
    'speaker-block': 'Speaker/teacher profile block with photo and bio',
    'program-block': 'Course program or curriculum section',
  };

  let mdContent = '# Components List\n\n';
  mdContent += 'Extracted from wannabe.ru across all crawled pages.\n\n';

  for (const [name, info] of Object.entries(allData.components)) {
    const pages = Array.from(info.pages).join(', ');
    const classes = Array.from(info.classes).slice(0, 8).join('`, `');
    const desc = compDescriptions[name] || 'UI pattern';
    mdContent += `## ${name}\n`;
    mdContent += `**Description:** ${desc}\n\n`;
    mdContent += `**Pages:** ${pages}\n\n`;
    mdContent += `**CSS Classes:** \`${classes}\`\n\n`;
    mdContent += '---\n\n';
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'components-list.md'), mdContent);
  console.log('✓ components-list.md');

  // ── Write fonts.md ──
  let fontsMd = '# Font Files\n\n';
  fontsMd += 'All fonts detected via @font-face rules and network requests.\n\n';

  // Group by family
  const fontsByFamily = {};
  for (const ff of allData.fontFaces) {
    const fam = ff.family;
    if (!fontsByFamily[fam]) fontsByFamily[fam] = [];
    fontsByFamily[fam].push(ff);
  }

  for (const [family, entries] of Object.entries(fontsByFamily)) {
    fontsMd += `## ${family}\n\n`;
    for (const e of entries) {
      if (e.weight !== 'unknown') fontsMd += `**Weight:** ${e.weight}\n\n`;
      for (const url of e.urls) {
        fontsMd += `- \`${url}\`\n`;
      }
      fontsMd += '\n';
    }
    fontsMd += '---\n\n';
  }

  // Also list all stylesheet URLs for manual inspection
  fontsMd += '## Stylesheets (for manual font inspection)\n\n';
  for (const u of allData.stylesheetUrls) {
    fontsMd += `- ${u}\n`;
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'fonts.md'), fontsMd);
  console.log('✓ fonts.md');

  // ── Summary ──
  console.log('\n═══════════════════════════════════════');
  console.log('DESIGN SYSTEM EXTRACTION SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`CSS custom properties:   ${Object.keys(allData.cssVars).length}`);
  console.log(`Typography combinations: ${allData.typography.length}`);
  console.log(`Media query breakpoints: ${allData.mediaQueries.size}`);
  console.log(`Spacing values:          ${Object.keys(allData.spacing).length}`);
  console.log(`Components detected:     ${Object.keys(allData.components).length}`);
  console.log(`Font faces:              ${allData.fontFaces.length}`);
  console.log(`Stylesheets crawled:     ${allData.stylesheetUrls.size}`);
  console.log(`\nOutput directory: ${OUTPUT_DIR}`);
  console.log('Files: tokens.json, typography.json, breakpoints.json, spacing.json, components-list.md, fonts.md');
}

main().catch(e => { console.error(e); process.exit(1); });

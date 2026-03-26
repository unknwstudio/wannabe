#!/usr/bin/env node
// Scrape speaker bios from wannabe.ru and update persons.json
const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PERSONS_PATH = path.join(ROOT, 'content/persons.json');

// Pages to scrape, with which person IDs to look for on each page
const PAGES = [
  {
    url: 'https://wannabe.ru/design/superpowered',
    targets: ['misha-rozov'],
  },
  {
    url: 'https://wannabe.ru/design/t-shaped-designer',
    targets: ['liza-severova'],
  },
  {
    url: 'https://wannabe.ru/events/archive-sale',
    targets: ['artem-kazakov'],
  },
  {
    url: 'https://wannabe.ru/events/emotional-identity',
    targets: ['pasha-okhotin'],
  },
  {
    url: 'https://wannabe.ru/events/productcompetencesai',
    targets: ['yura-meshalkin', 'andrey-denisov'],
  },
  {
    url: 'https://wannabe.ru/events/product-trial-fb',
    targets: ['valeria-rozova'],
  },
  {
    url: 'https://wannabe.ru/events/fromfeaturestostrategy',
    targets: ['anastasia-neguritsa'],
  },
  {
    url: 'https://wannabe.ru/events/pm-competence',
    targets: ['masha-dybkina'],
  },
  {
    url: 'https://wannabe.ru/events/artdirection',
    targets: ['mitya-osadchuk'],
  },
  {
    url: 'https://wannabe.ru/events/valuedesigner',
    targets: ['emir-kasymov'],
  },
  {
    url: 'https://wannabe.ru/events/designintensive',
    targets: ['dasha-shcherbakova'],
  },
  {
    url: 'https://wannabe.ru/events/ai-genius',
    targets: ['natalya-kumpan', 'alina-verbenchuk', 'seva-vikulin', 'andrey-sergunin', 'anna-gorokhova'],
  },
];

const PERSONS = JSON.parse(fs.readFileSync(PERSONS_PATH, 'utf8'));

// Build lookup: id → person, name → person
const byId = Object.fromEntries(PERSONS.map(p => [p.id, p]));

// Name normalisation for fuzzy matching
function norm(s) {
  return s.toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^а-яa-z\s]/gi, '')
    .trim();
}

function nameMatches(text, personName) {
  const nt = norm(text);
  const np = norm(personName);
  // Allow partial: "Миша" matches "Миша Розов"
  const parts = np.split(' ');
  return parts.every(part => part.length > 2 && nt.includes(part));
}

function cleanBio(text) {
  return text
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[—–-]\s*/, '');
}

// Extract all speaker blocks from a page
async function extractSpeakerBlocks(page) {
  const html = await page.content();
  const $ = cheerio.load(html);
  const blocks = [];

  // Strategy 1: Find .card or [class*="speaker"] blocks containing a name + bio
  $('[class*="speaker"], [class*="spiker"], [class*="about"], [class*="bio"]').each((_, section) => {
    const el = $(section);
    const nameEl = el.find('h2, h3, h4, [class*="h2"], [class*="h3"], [class*="h4"]').first();
    const name = cleanBio(nameEl.text());
    if (!name || name.length > 60) return;
    const bioLines = [];
    el.find('p, li').each((_, p) => {
      const t = cleanBio($(p).text());
      if (t && t.length > 5 && t.length < 200 && t !== name) bioLines.push(t);
    });
    if (bioLines.length) blocks.push({ name, lines: bioLines.slice(0, 6) });
  });

  // Strategy 2: Find sections where a heading matches a person name, grab following paragraphs
  $('h2, h3, h4, [class*="h2"], [class*="h3"], [class*="h4"]').each((_, el) => {
    const name = cleanBio($(el).text());
    if (!name || name.length > 60 || name.length < 4) return;
    // Check if this looks like a person name (Cyrillic, 2+ words or 1 known word)
    if (!/[А-ЯЁа-яё]/.test(name)) return;

    const lines = [];
    let sibling = $(el).next();
    for (let i = 0; i < 8 && sibling.length; i++) {
      const tag = sibling[0].tagName.toLowerCase();
      if (['h1', 'h2', 'h3', 'h4'].includes(tag)) break;
      const t = cleanBio(sibling.text());
      if (t && t.length > 5 && t.length < 200) lines.push(t);
      sibling = sibling.next();
    }
    // Also check children if it's a container
    if (!lines.length) {
      $(el).parent().find('p, li').each((_, p) => {
        const t = cleanBio($(p).text());
        if (t && t.length > 5 && t !== name) lines.push(t);
      });
    }
    if (lines.length) blocks.push({ name, lines: lines.slice(0, 6) });
  });

  // Strategy 3: Photo-alt based extraction — img with "Фото [Name]" alt
  $('img[alt]').each((_, img) => {
    const alt = $(img).attr('alt') || '';
    const m = alt.match(/^Фото\s+(.+)/);
    if (!m) return;
    const name = m[1].trim();
    const container = $(img).closest('[class*="card"], [class*="speaker"], section, div').first();
    if (!container.length) return;
    const lines = [];
    container.find('p, li, [class*="text"], [class*="desc"]').each((_, p) => {
      const t = cleanBio($(p).text());
      if (t && t !== name && t.length > 5 && t.length < 200) lines.push(t);
    });
    if (lines.length) blocks.push({ name, lines: lines.slice(0, 6), fromAlt: true });
  });

  return blocks;
}

// Convert raw lines to formatted role bullets (max 4, deduplicated)
function toRoles(lines) {
  const seen = new Set();
  const result = [];
  for (const line of lines) {
    const clean = line.replace(/^[—–-]\s*/, '').trim();
    if (!clean || clean.length < 4) continue;
    const key = clean.toLowerCase().slice(0, 30);
    if (seen.has(key)) continue;
    seen.add(key);
    // Keep short — truncate at ~80 chars
    result.push(clean.length > 80 ? clean.slice(0, 77) + '...' : clean);
    if (result.length >= 4) break;
  }
  return result;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function scrapePage(browser, url, targetIds) {
  console.log(`\n[${url.split('/').pop()}] ${url}`);
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await ctx.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    try { await page.goto(url, { waitUntil: 'load', timeout: 45000 }); } catch {}
  }
  await page.waitForTimeout(3000);

  const blocks = await extractSpeakerBlocks(page);
  await ctx.close();

  console.log(`  Found ${blocks.length} speaker block(s)`);

  const results = {};

  for (const id of targetIds) {
    const person = byId[id];
    if (!person) continue;

    // Find best matching block
    const matched = blocks.filter(b => nameMatches(b.name, person.name));
    if (matched.length) {
      // Prefer fromAlt blocks, then longest lines
      const best = matched.find(b => b.fromAlt) || matched.sort((a, b2) => b2.lines.join('').length - a.lines.join('').length)[0];
      const roles = toRoles(best.lines);
      if (roles.length) {
        results[id] = roles;
        console.log(`  ✓ ${person.name}: ${roles.length} role(s)`);
        roles.forEach(r => console.log(`    — ${r}`));
        continue;
      }
    }

    // Fallback: if only one target on page, use first block with enough content
    if (targetIds.length === 1 && blocks.length) {
      const best = blocks.sort((a, b2) => b2.lines.join('').length - a.lines.join('').length)[0];
      const roles = toRoles(best.lines);
      if (roles.length) {
        results[id] = roles;
        console.log(`  ~ ${person.name} (fallback): ${roles.length} role(s)`);
        roles.forEach(r => console.log(`    — ${r}`));
        continue;
      }
    }

    console.log(`  ✗ ${person.name}: no match found`);
  }

  return results;
}

function generatePersonsHTML(persons) {
  const PUBLIC = path.join(ROOT, 'public');

  function toDataURI(photoPath) {
    const file = path.join(PUBLIC, photoPath);
    if (!fs.existsSync(file)) return '';
    const buf = fs.readFileSync(file);
    const ext = path.extname(file).slice(1);
    return `data:image/${ext};base64,${buf.toString('base64')}`;
  }

  const cards = persons.map(p => {
    const src = toDataURI(p.photo);
    const imgTag = src
      ? `<img src="${src}" alt="${p.name}" style="width:150px;height:150px;border-radius:50%;object-fit:cover">`
      : `<div style="width:150px;height:150px;border-radius:50%;background:#eaeaea"></div>`;
    const roles = p.roles.map(r => `<p style="color:#7c7c7c;margin:0">— ${r}</p>`).join('');
    return `<div style="background:#fff;border-radius:12px;padding:24px;display:flex;flex-direction:column;gap:16px;width:220px">`
      + imgTag
      + `<p style="margin:0;font-size:32px;font-weight:500;letter-spacing:-0.01em">${p.name}</p>`
      + `<div>${roles}</div>`
      + `</div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>wannabe — persons</title>
<style>
@font-face { font-family: "Unica 77 LL"; src: url("/fonts/Unica77LLCyr-Regular.otf") format("opentype"); font-weight: 400; }
@font-face { font-family: "Unica 77 LL"; src: url("/fonts/Unica77LLCyr-Medium.otf") format("opentype"); font-weight: 500; }
body { font-family: "Unica 77 LL", -apple-system, sans-serif; background: #eaeaea; margin: 0; padding: 48px; }
h1 { font-size: 24px; font-weight: 500; margin: 0 0 32px; }
.grid { display: flex; flex-wrap: wrap; gap: 16px; }
</style>
</head>
<body>
<h1>wannabe — persons (${persons.length})</h1>
<div class="grid">
${cards}
</div>
</body>
</html>`;
}

async function main() {
  console.log('=== Scraping speaker bios ===\n');
  const browser = await chromium.launch({ headless: true });
  const allResults = {};

  for (const { url, targets } of PAGES) {
    await sleep(2000);
    try {
      const results = await scrapePage(browser, url, targets);
      Object.assign(allResults, results);
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }
  }

  await browser.close();

  // Update persons.json
  let updated = 0;
  for (const person of PERSONS) {
    if (allResults[person.id] && allResults[person.id].length) {
      person.roles = allResults[person.id];
      updated++;
    }
  }

  fs.writeFileSync(PERSONS_PATH, JSON.stringify(PERSONS, null, 2));
  console.log(`\nUpdated ${updated}/${PERSONS.length} persons in persons.json`);

  // Regenerate persons.html
  fs.writeFileSync(path.join(__dirname, 'persons.html'), generatePersonsHTML(PERSONS));
  console.log('Regenerated scripts/persons.html');

  // Print final state
  console.log('\n=== Final persons.json roles ===');
  PERSONS.forEach(p => console.log(`${p.name}: ${p.roles.join(' / ')}`));
}

main().catch(e => { console.error(e); process.exit(1); });

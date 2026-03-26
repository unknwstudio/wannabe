#!/usr/bin/env node
// Rescrape event pages with Webflow-aware selectors to fill in empty arrays
const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content/events');

function cleanText(t) {
  return (t || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function cleanSpeakerName(name) {
  if (!name) return '';
  const junky = ['Фото ', 'фото ', 'Логотип ', 'Иконка ', 'Аватар ', 'Photo ', 'Logo '];
  if (junky.some(p => name.startsWith(p))) return '';
  if (/^[А-ЯЁ][а-яё]+([ \-][А-ЯЁ][а-яё]+){1,2}$/.test(name.trim())) return name.trim();
  return '';
}

const EVENTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/events-list.json'), 'utf8'));

async function extractContent(page, slug) {
  const html = await page.content();
  const $ = cheerio.load(html);

  const result = {};

  // ── TITLE ──
  result.title = cleanText($('h1').first().text()) || '';

  // ── DESCRIPTION — meta or first large paragraph ──
  result.description = cleanText($('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '');

  // ── EVENT DATE — look for date inside .card--announcement, event info cards ──
  const announcementCard = $('[class*="announcement"], [class*="event__card"], [class*="card--sm"]').first();
  if (announcementCard.length) {
    const h3text = cleanText(announcementCard.find('.h3, h3, [class*="h3"]').first().text());
    if (h3text) result.eventDate = h3text.slice(0, 60);
    const smallText = cleanText(announcementCard.find('.text-xs, [class*="text-xs"], p').first().text());
    if (smallText && smallText.length < 100) result.eventInfo = smallText;
  }
  // Fallback: find date patterns in page
  if (!result.eventDate) {
    const allText = $('body').text();
    const m = allText.match(/\d{1,2}\s+(?:января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)[^А-ЯЁ\n]{0,30}/i);
    if (m) result.eventDate = m[0].replace(/\u00a0/g, ' ').trim().slice(0, 60);
  }

  // ── BADGES ──
  const badges = [];
  $('[class*="violet-tag"], [class*="tag"], [class*="badge"], [class*="chip"], [class*="pill"]').each((_, el) => {
    const t = cleanText($(el).text());
    if (t && t.length < 60 && !badges.includes(t)) badges.push(t);
  });
  result.badges = badges.slice(0, 4);

  // ── SPEAKER AVATAR & NAME ──
  // Look for img with "Фото [Name]" alt text pattern
  let speakerImg = '';
  let speakerName = '';
  $('img').each((_, el) => {
    const alt = $(el).attr('alt') || '';
    const src = $(el).attr('src') || '';
    const nameMatch = alt.match(/^Фото\s+([А-ЯЁ][а-яё]+(?:\s[А-ЯЁ][а-яё]+)?)/);
    if (nameMatch && !speakerName) {
      speakerName = nameMatch[1];
      speakerImg = src.startsWith('http') ? src : 'https://wannabe.ru' + src;
    }
  });
  // Also check for speaker section images
  if (!speakerImg) {
    $('[class*="speaker"] img, [class*="author"] img, .photo-128, [class*="photo-128"]').each((_, el) => {
      const src = $(el).attr('src') || '';
      if (src && !speakerImg) speakerImg = src.startsWith('http') ? src : 'https://wannabe.ru' + src;
    });
  }
  if (speakerName) result.speakerName = speakerName;

  // Speaker roles — look for small text near speaker name/photo in speaker section
  const speakerSection = $('[class*="speaker"], [class*="author"]').first();
  const roles = [];
  speakerSection.find('[class*="is--grey"], [class*="dark-grey"], [class*="subtitle"], p').each((_, el) => {
    const t = cleanText($(el).text());
    if (t && t.length > 5 && t.length < 120 && !roles.includes(t)) roles.push(t);
  });
  result.speakerRoles = roles.slice(0, 4);

  // ── QUOTE ──
  // Webflow pattern: .photo-128 img + .h3 paragraph
  let quote = '';
  let quoteHighlight = '';
  $('[class*="photo-128"], [class*="quote"]').closest('div, section').each((_, container) => {
    const para = $(container).find('.h3, [class*="h3"]').first();
    if (para.length) {
      quote = cleanText(para.text());
      const highlight = para.find('.is--violet, [class*="violet"], [class*="purple"]').first().text();
      if (highlight) quoteHighlight = cleanText(highlight);
      return false; // break
    }
  });
  // Fallback: blockquote or paragraph with «
  if (!quote) {
    $('blockquote').each((_, el) => { if (!quote) quote = cleanText($(el).text()).slice(0, 400); });
  }
  if (quote) { result.quote = quote.slice(0, 400); result.quoteHighlight = quoteHighlight; }

  // ── FOR WHOM ──
  // Webflow: heading "Будет полезно" / "для кого" then .card elements
  let forWhomSection = null;
  $('h2, h3, [class*="h2"], [class*="h3"]').each((_, el) => {
    const t = cleanText($(el).text()).toLowerCase();
    if (t.includes('для кого') || t.includes('будет полезно') || t.includes('кому подойдёт') || t.includes('кому подойдет')) {
      forWhomSection = $(el).closest('section, div[class*="section"]');
      if (!forWhomSection.length) forWhomSection = $(el).parent().parent();
      return false;
    }
  });
  const forWhom = [];
  if (forWhomSection) {
    forWhomSection.find('.card, [class*="card"]').each((_, el) => {
      const t = cleanText($(el).text());
      if (t && t.length > 10 && t.length < 300) {
        forWhom.push({ number: String(forWhom.length + 1).padStart(2, '0'), boldText: '', text: t });
      }
    });
  }
  // Fallback: look for any ul with bullet items that look like audience
  if (!forWhom.length) {
    $('ul').each((_, ul) => {
      const items = [];
      $(ul).find('li').each((_, li) => {
        const t = cleanText($(li).text());
        if (t.length > 20) items.push(t);
      });
      if (items.length >= 2 && items.length <= 8 && !forWhom.length) {
        items.forEach((t, i) => forWhom.push({ number: String(i + 1).padStart(2, '0'), boldText: '', text: t }));
      }
    });
  }
  result.forWhom = forWhom.slice(0, 6);

  // ── PROGRAM ──
  let programSection = null;
  $('h2, h3, [class*="h2"]').each((_, el) => {
    const t = cleanText($(el).text()).toLowerCase();
    if (t.includes('программ') || t.includes('agenda') || t.includes('расписание')) {
      programSection = $(el).closest('section, [class*="section"]');
      if (!programSection.length) programSection = $(el).parent().parent();
      // Date for program
      const dateEl = $(el).next('[class*="h3"], .h3, [class*="violet"], [class*="purple"]');
      if (dateEl.length) result.programDate = cleanText(dateEl.text()).slice(0, 60);
      return false;
    }
  });
  const programItems = [];
  if (programSection) {
    programSection.find('.card, [class*="program__item"], [class*="agenda__item"], li').each((_, el) => {
      const t = cleanText($(el).text());
      if (t && t.length > 10 && t.length < 300 && !t.toLowerCase().includes('программ')) {
        programItems.push({ number: String(programItems.length + 1).padStart(2, '0'), text: t });
      }
    });
  }
  // Fallback: ol items
  if (!programItems.length) {
    $('ol li').each((_, li) => {
      const t = cleanText($(li).text());
      if (t.length > 10) programItems.push({ number: String(programItems.length + 1).padStart(2, '0'), text: t });
    });
  }
  result.programItems = programItems.slice(0, 10);

  // ── SPEAKER ABOUT ──
  // Webflow pattern: .icon-circle + paragraph
  const speakerAbout = [];
  $('[class*="about"], [class*="speaker__content"], [class*="bio"]').find('.card, [class*="card"]').each((_, el) => {
    const t = cleanText($(el).text());
    if (t && t.length > 20 && t.length < 500) {
      const icon = $(el).find('[class*="icon"]').first().text().trim() || '→';
      const links = [];
      $(el).find('a[href]').each((_, a) => {
        const label = cleanText($(a).text());
        const href = $(a).attr('href') || '#';
        if (label && label.length < 40) links.push({ label, href });
      });
      speakerAbout.push({ icon: icon.slice(0, 2) || '→', text: t.slice(0, 300), links: links.length ? links : undefined });
    }
  });
  // Fallback: look for any paragraph blocks with speaker descriptions
  if (!speakerAbout.length) {
    $('[class*="speaker"]').find('p').each((_, el) => {
      const t = cleanText($(el).text());
      if (t && t.length > 40 && t.length < 400) {
        speakerAbout.push({ icon: '→', text: t });
      }
    });
  }
  result.speakerAbout = speakerAbout.slice(0, 4);

  // ── FORM DATE ──
  // Look for date in registration/form section
  $('[id*="request"], [id*="form"], [class*="registration"]').find('[class*="violet"], [class*="h3"], h3').each((_, el) => {
    const t = cleanText($(el).text());
    if (t && t.length < 100 && !result.formDate) result.formDate = t;
  });
  if (!result.formDate && result.eventDate) result.formDate = result.eventDate;

  return result;
}

async function processPage(browser, slug, url) {
  const jsonPath = path.join(CONTENT_DIR, slug + '.json');
  let existing = {};
  try { existing = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); } catch {}

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

  const extracted = await extractContent(page, slug);
  await ctx.close();

  // Merge: only fill in fields that are currently empty/missing
  const merged = { ...existing };

  if (!merged.title && extracted.title) merged.title = extracted.title;
  if (!merged.description && extracted.description) merged.description = extracted.description;
  if (!merged.eventDate && extracted.eventDate) merged.eventDate = extracted.eventDate;
  if (!merged.eventInfo && extracted.eventInfo) merged.eventInfo = extracted.eventInfo;
  if ((!merged.badges || !merged.badges.length) && extracted.badges?.length) merged.badges = extracted.badges;
  if (!merged.speakerName && extracted.speakerName) merged.speakerName = extracted.speakerName;
  if ((!merged.speakerRoles || !merged.speakerRoles.length) && extracted.speakerRoles?.length) merged.speakerRoles = extracted.speakerRoles;
  if (!merged.quote && extracted.quote) merged.quote = extracted.quote;
  if (!merged.quoteHighlight && extracted.quoteHighlight) merged.quoteHighlight = extracted.quoteHighlight;
  if ((!merged.forWhom || !merged.forWhom.length) && extracted.forWhom?.length) merged.forWhom = extracted.forWhom;
  if ((!merged.programItems || !merged.programItems.length) && extracted.programItems?.length) merged.programItems = extracted.programItems;
  if (!merged.programDate && extracted.programDate) merged.programDate = extracted.programDate;
  if ((!merged.speakerAbout || !merged.speakerAbout.length) && extracted.speakerAbout?.length) merged.speakerAbout = extracted.speakerAbout;
  if (!merged.formDate && extracted.formDate) merged.formDate = extracted.formDate;

  fs.writeFileSync(jsonPath, JSON.stringify(merged, null, 2));

  const filled = [];
  if (extracted.forWhom?.length) filled.push(`forWhom:${extracted.forWhom.length}`);
  if (extracted.programItems?.length) filled.push(`program:${extracted.programItems.length}`);
  if (extracted.speakerAbout?.length) filled.push(`about:${extracted.speakerAbout.length}`);
  if (extracted.speakerName) filled.push(`speaker:${extracted.speakerName}`);
  if (extracted.badges?.length) filled.push(`badges:${extracted.badges.length}`);

  console.log(`  ✓ ${slug} — ${filled.join(', ') || 'no new data'}`);
  return merged;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function commitProgress(label) {
  const { execSync } = require('child_process');
  try {
    execSync('git add content/events/', { cwd: ROOT, stdio: 'pipe' });
    execSync(`git commit -m "scrape: ${label}"`, { cwd: ROOT, stdio: 'pipe' });
    console.log(`  → committed: ${label}`);
  } catch { console.log(`  → nothing new to commit`); }
}

async function main() {
  console.log(`Re-scraping ${EVENTS.length} pages for content arrays...\n`);
  const browser = await chromium.launch({ headless: true });

  for (let i = 0; i < EVENTS.length; i++) {
    const { slug, url } = EVENTS[i];
    await sleep(2500);
    try {
      await processPage(browser, slug, url);
    } catch (e) {
      console.log(`  ✗ ${slug}: ${e.message}`);
    }
    if ((i + 1) % 7 === 0) commitProgress(`content re-scrape ${i + 1}/${EVENTS.length}`);
  }

  await browser.close();
  commitProgress(`content re-scrape complete`);
  console.log('\nDone.');
}

main().catch(e => { console.error(e); process.exit(1); });

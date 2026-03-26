#!/usr/bin/env node
// Normalize scraped JSON files to match EventLayoutProps exactly
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../content/events');

const DEFAULTS = {
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
  formEndpoint: '',
};

// Strings that indicate the scraper grabbed button/UI text instead of content
const JUNK_PATTERNS = [
  /Зарегистрироваться/,
  /↓/,
  /Нажимая кнопку/,
  /Назад/,
  /Расскажите о себе/,
  /в каком направлении/i,
  /Маркетинг/,
  /Продакт-м/,
];

function isJunk(str) {
  if (!str || typeof str !== 'string') return true;
  return JUNK_PATTERNS.some(p => p.test(str));
}

function cleanEventDate(raw) {
  if (!raw) return '';
  // Try to extract a date+time pattern directly
  const match = raw.match(/\d{1,2}\s+(?:января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)[^\n\r<←↓→↑]{0,40}/i);
  if (match) {
    let d = match[0].replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
    // Cut at concatenation point: lowercase Cyrillic directly followed by uppercase (no space) — drop the rest
    d = d.replace(/([а-яё])[А-ЯЁ].*$/, '$1').trim();
    // Trim trailing partial words and punctuation
    d = d.replace(/[,\s]+$/, '').trim();
    return d.slice(0, 60);
  }
  // Fallback: cut before any junk
  const clean = raw.replace(/Зарегистрироваться.*$/s, '').trim();
  return clean.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);
}

function cleanFormInfo(raw) {
  if (!raw) return '';
  if (isJunk(raw)) return '';
  return raw.slice(0, 200);
}

function cleanSpeakerName(name) {
  if (!name) return '';
  // Alt-text patterns that are not real names
  const junkyPrefixes = ['Фото ', 'фото ', 'Логотип ', 'логотип ', 'Иконка ', 'Аватар '];
  if (junkyPrefixes.some(p => name.startsWith(p))) return '';
  // Real names: Имя Фамилия (2-3 words, Cyrillic only)
  if (/^[А-ЯЁ][а-яё]+([ \-][А-ЯЁ][а-яё]+){1,2}$/.test(name)) return name;
  return '';
}

function cleanBadges(badges) {
  if (!Array.isArray(badges)) return [];
  return badges
    .filter(b => b && typeof b === 'string' && b.length < 60 && !isJunk(b))
    .slice(0, 4);
}

// The props EventLayout actually accepts — strip everything else
const ALLOWED_KEYS = Object.keys(DEFAULTS);

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
let fixed = 0;

for (const filename of files) {
  const filepath = path.join(DIR, filename);
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch {
    console.log(`  SKIP (parse error): ${filename}`);
    continue;
  }

  // Build normalized object — only allowed keys, with cleaned values
  const out = {};
  for (const key of ALLOWED_KEYS) {
    out[key] = raw[key] !== undefined ? raw[key] : DEFAULTS[key];
  }

  // Also keep slug and publishedPath for routing (not in EventLayoutProps but harmless)
  if (raw.slug) out.slug = raw.slug;
  if (raw.publishedPath) out.publishedPath = raw.publishedPath;

  // Clean specific fields
  out.eventDate = cleanEventDate(raw.eventDate);
  out.formInfo = cleanFormInfo(raw.formInfo);
  out.speakerName = cleanSpeakerName(raw.speakerName);
  out.badges = cleanBadges(raw.badges);

  // Fix formEndpoint
  if (!out.formEndpoint) out.formEndpoint = `/api/events/${raw.slug || filename.replace('.json', '')}/register`;

  // Fix forWhom — remove items that look like junk
  if (Array.isArray(out.forWhom)) {
    out.forWhom = out.forWhom.filter(f => f && f.text && !isJunk(f.text) && f.text.length > 5);
  }

  // Fix programItems — remove junk
  if (Array.isArray(out.programItems)) {
    out.programItems = out.programItems.filter(p => p && p.text && !isJunk(p.text) && p.text.length > 5);
  }

  // Drop extraSections — no longer in template
  delete out.extraSections;

  const json = JSON.stringify(out, null, 2);
  fs.writeFileSync(filepath, json);
  fixed++;
  console.log(`  ✓ ${filename} — date:"${out.eventDate.slice(0,30)}" speaker:"${out.speakerName}" badges:${out.badges.length}`);
}

console.log(`\nNormalized ${fixed}/${files.length} files.`);

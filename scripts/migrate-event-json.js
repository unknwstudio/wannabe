#!/usr/bin/env node
// scripts/migrate-event-json.js
// Converts old EventLayoutProps structure to new flexible structure
const fs = require('fs'), path = require('path');

const DIR = path.join(__dirname, '../content/events');

function extractPersonId(speakerAvatar) {
  if (!speakerAvatar) return null;
  // "/images/persons/misha-rozov.webp" → "misha-rozov"
  const m = speakerAvatar.match(/\/images\/persons\/([^.]+)\./);
  return m ? m[1] : null;
}

function migrateOne(old) {
  const n = {};

  // Keep metadata
  if (old.slug)          n.slug = old.slug;
  if (old.publishedPath) n.publishedPath = old.publishedPath;

  // Hero
  if (old.badges?.length)     n.badges = old.badges;
  n.title                    = old.title || '';
  if (old.ctaLabel)           n.ctaLabel = old.ctaLabel;
  if (old.description)        n.description = old.description;
  if (old.eventDate)          n.eventDate = old.eventDate;

  // speakerIds in hero — derive from speakerAvatar or hosts
  const speakerId = extractPersonId(old.speakerAvatar);
  const hostIds   = old.hosts?.speakerIds || [];

  // Build speakerIds for hero avatars
  const heroIds = speakerId ? [speakerId, ...hostIds.filter(id => id !== speakerId)] : [...hostIds];
  if (heroIds.length) n.speakerIds = heroIds;
  if (old.eventInfo)  n.heroSubline = old.eventInfo;

  // Quote
  if (old.quote)           n.quote = old.quote;
  if (old.quoteHighlight)  n.quoteHighlight = old.quoteHighlight;
  if (old.quote && speakerId) n.quoteSpeakerId = speakerId;

  // contentSections — forWhom + programItems
  const sections = [];

  if (old.forWhom?.length) {
    sections.push({
      headline: old.forWhomTitle || 'для кого',
      items: old.forWhom.map(f => [f.boldText, f.text].filter(Boolean).join(' ')),
    });
  }

  if (old.programItems?.length) {
    sections.push({
      headline: old.programTitle || 'программа',
      items: old.programItems.map(item =>
        item.number ? `${item.number} — ${item.text}` : item.text
      ),
    });
  }

  if (sections.length) n.contentSections = sections;

  // speakerCardIds — from hosts (multiple speakers) or single speaker
  const cardIds = hostIds.length ? hostIds : (speakerId ? [speakerId] : []);
  if (cardIds.length) n.speakerCardIds = cardIds;

  // speakerFull — from speakerAbout (only if there's a single featured speaker)
  if (old.speakerAbout?.length && speakerId) {
    const bullets = old.speakerAbout.map(ab => ab.text).filter(Boolean);
    const links = old.speakerAbout.flatMap(ab => ab.links || []);
    n.speakerFull = {
      speakerId,
      bullets,
      ...(links.length ? { links } : {}),
    };
  }

  // Form
  if (old.formDate)     n.formDate = old.formDate;
  if (old.formInfo)     n.formInfo = old.formInfo;
  if (old.formEndpoint) n.formEndpoint = old.formEndpoint;

  return n;
}

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
let count = 0;

files.forEach(file => {
  const fpath = path.join(DIR, file);
  const old = JSON.parse(fs.readFileSync(fpath, 'utf8'));

  // Skip if already migrated (no old fields present)
  const hasOldFields = old.forWhom || old.programItems || old.speakerAbout ||
                       old.speakerAvatar || old.forWhomTitle || old.programTitle;
  if (!hasOldFields) {
    console.log(`  ↷ ${file} — already migrated`);
    return;
  }

  const migrated = migrateOne(old);
  fs.writeFileSync(fpath, JSON.stringify(migrated, null, 2));
  console.log(`  ✓ ${file} — sections:${migrated.contentSections?.length || 0} speakerCardIds:${migrated.speakerCardIds?.length || 0} speakerFull:${!!migrated.speakerFull}`);
  count++;
});

console.log(`\nMigrated ${count}/${files.length} files.`);

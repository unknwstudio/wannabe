#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content/events');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT = path.join(__dirname, 'speakers-audit.md');

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json')).sort();

const rows = files.map(file => {
  const slug = file.replace('.json', '');
  let data;
  try { data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')); }
  catch { return { slug, speakerName: '', avatarPath: '', status: '❌ parse error' }; }

  const speakerName = (data.speakerName || '').trim();
  const avatarPath = (data.speakerAvatar || '').trim();

  if (!speakerName && !avatarPath) return { slug, speakerName: '', avatarPath: '', status: '⚠️ no speaker' };

  if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://'))
    return { slug, speakerName, avatarPath, status: '🌐 external URL' };

  if (!avatarPath) return { slug, speakerName, avatarPath: '', status: '⚠️ no avatar path' };

  const exists = fs.existsSync(path.join(PUBLIC_DIR, avatarPath));
  return { slug, speakerName, avatarPath, status: exists ? '✅ exists' : '❌ missing' };
});

const header = '| slug | speakerName | avatarPath | status |\n|------|-------------|------------|--------|';
const tableRows = rows.map(r =>
  `| ${r.slug} | ${r.speakerName} | ${r.avatarPath} | ${r.status} |`
).join('\n');

const counts = {
  ok:       rows.filter(r => r.status.startsWith('✅')).length,
  missing:  rows.filter(r => r.status.startsWith('❌')).length,
  external: rows.filter(r => r.status.startsWith('🌐')).length,
  noSpeaker:rows.filter(r => r.status.startsWith('⚠️')).length,
};

const md = [
  '# Speakers Audit',
  `Generated: ${new Date().toISOString()}`,
  `Total: ${rows.length} pages · ✅ ${counts.ok} · ❌ ${counts.missing} · 🌐 ${counts.external} · ⚠️ ${counts.noSpeaker}`,
  '',
  header,
  tableRows,
].join('\n');

fs.writeFileSync(OUT, md);
console.log(md);
console.log(`\nSaved: ${OUT}`);

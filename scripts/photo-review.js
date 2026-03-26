#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content/events');
const IMG_BASE = path.join(ROOT, 'public/images/events');
const OUT = path.join(__dirname, 'photo-review.html');

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json')).sort();

const events = files.map(file => {
  const slug = file.replace('.json', '');
  let data = {};
  try { data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')); } catch {}

  const speakerName = (data.speakerName || '').trim();
  const avatarPath = (data.speakerAvatar || '').trim();
  const avatarFilename = avatarPath ? path.basename(avatarPath) : '';

  const imgDir = path.join(IMG_BASE, slug);
  let images = [];
  try { images = fs.readdirSync(imgDir).filter(f => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f)).sort(); } catch {}

  return { slug, speakerName, avatarPath, avatarFilename, images };
});

const sections = events.map(({ slug, speakerName, avatarPath, avatarFilename, images }) => {
  const thumbs = images.length
    ? images.map(img => {
        const isAvatar = img === avatarFilename;
        const localPath = path.join(IMG_BASE, slug, img);
        const base64 = (() => {
          try {
            const buf = fs.readFileSync(localPath);
            const ext = path.extname(img).slice(1).replace('jpg', 'jpeg');
            return `data:image/${ext};base64,${buf.toString('base64')}`;
          } catch { return ''; }
        })();
        return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
          <img src="${base64}" alt="${img}"
            style="width:150px;height:150px;object-fit:cover;border-radius:8px;
                   border:${isAvatar ? '3px solid #4ef968' : '2px solid #eaeaea'}" />
          <span style="font-size:11px;color:${isAvatar ? '#4ef968' : '#7c7c7c'};
                       max-width:150px;word-break:break-all;text-align:center">
            ${img}${isAvatar ? ' ✓' : ''}
          </span>
        </div>`;
      }).join('\n')
    : '<span style="color:#7c7c7c;font-size:13px">no images found</span>';

  const avatarStatus = !avatarFilename
    ? '<span style="color:#ff6225">⚠ no avatar set</span>'
    : images.includes(avatarFilename)
      ? `<span style="color:#4ef968">✅ ${avatarFilename}</span>`
      : `<span style="color:#ff6225">❌ ${avatarFilename} (file missing)</span>`;

  return `
  <section style="border-bottom:1px solid #cacaca;padding:32px 0">
    <div style="display:flex;align-items:baseline;gap:16px;margin-bottom:8px">
      <h2 style="margin:0;font-size:18px;font-weight:600">${slug}</h2>
      <span style="font-size:13px;color:#7c7c7c">${speakerName || '(no speaker name)'}</span>
    </div>
    <div style="font-size:12px;color:#7c7c7c;margin-bottom:16px">
      avatar: ${avatarStatus}
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start">
      ${thumbs}
    </div>
  </section>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Photo Review — wannabe events</title>
  <style>
    body { font-family: -apple-system, sans-serif; background: #111; color: #fff;
           padding: 40px; max-width: 1400px; margin: 0 auto; }
    h1 { font-size: 24px; margin: 0 0 8px; }
    .meta { color: #7c7c7c; font-size: 13px; margin-bottom: 40px; }
  </style>
</head>
<body>
  <h1>Photo Review</h1>
  <p class="meta">Generated ${new Date().toLocaleString()} · ${events.length} events · Green border = current speakerAvatar</p>
  ${sections}
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`Done. Open: ${OUT}`);
console.log(`Events: ${events.length}`);
const noImages = events.filter(e => e.images.length === 0);
if (noImages.length) console.log(`No images: ${noImages.map(e => e.slug).join(', ')}`);
const missingAvatar = events.filter(e => e.avatarFilename && !e.images.includes(e.avatarFilename));
if (missingAvatar.length) console.log(`Missing avatar file: ${missingAvatar.map(e => e.slug).join(', ')}`);

const fs = require('fs');
const path = require('path');

const PREVIEWS = path.join(process.env.HOME, 'Desktop/w/wannabe/wannabe/previews');
fs.mkdirSync(PREVIEWS, { recursive: true });

const OUT = path.join(process.env.HOME, 'Desktop/w/wannabe/wannabe/scrape-output');

const desktopNavHTML = fs.readFileSync(path.join(OUT, 'desktop-nav.html'), 'utf8');
const bannerHTML = fs.readFileSync(path.join(OUT, 'desktop-banner.html'), 'utf8');
const footerHTML = fs.readFileSync(path.join(OUT, 'desktop-footer.html'), 'utf8');
const previewCSS = fs.readFileSync(path.join(OUT, 'preview.css'), 'utf8');
const webflowCSS = fs.readFileSync(path.join(OUT, 'webflow.css'), 'utf8');

// Load payment modal
const modals = JSON.parse(fs.readFileSync(path.join(OUT, 'desktop-modals.json'), 'utf8'));
const paymentModal = modals.find(m => m.includes('data-modal="payment"')) || '';

// Font faces
const FONT_CSS = `
@font-face {
  font-family: 'Unica 77 LL';
  font-weight: 400;
  font-style: normal;
  src: url('https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/663e253f2f97b8e5770e80e8_Unica77LLCyr-Regular.otf') format('opentype');
}
@font-face {
  font-family: 'Unica 77 LL';
  font-weight: 500;
  font-style: normal;
  src: url('https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/663e25129159d84d979af08f_Unica77LLCyr-Medium.otf') format('opentype');
}
@font-face {
  font-family: 'Unica 77 LL';
  font-weight: 700;
  font-style: normal;
  src: url('https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/663e25111641aa6bfa608644_Unica77LLCyr-Bold.otf') format('opentype');
}
@font-face {
  font-family: 'Unica 77 LL';
  font-weight: 300;
  font-style: normal;
  src: url('https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/663e2511913dd8b08772cea2_Unica77LLCyr-Light.otf') format('opentype');
}
@font-face {
  font-family: 'Saint';
  font-weight: 400;
  font-style: normal;
  src: url('https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/69b1b038c0d16404cd225b19_Saint%20Regular.ttf') format('truetype');
}
`;

const BASE_CSS = `
${FONT_CSS}
*, *::before, *::after { box-sizing: border-box; }
html { font-size: 18px; }
body {
  margin: 0;
  font-family: 'Unica 77 LL', sans-serif;
  font-weight: 400;
  color: #000;
  background: #ececec;
}
a { color: inherit; }
p, h1, h2, h3, h4, h5, h6 { margin: 0; }
img { max-width: 100%; display: block; }
button { cursor: pointer; font-family: inherit; }
input, textarea { font-family: inherit; }
/* Webflow utilities we rely on */
.is--hidden { display: none !important; }
.is--active { display: block; }
.modal--preload { display: none; }
.w-inline-block { display: inline-block; }
.w-input { display: block; width: 100%; }
.w-button { cursor: pointer; }
.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
}
`;

// ─── HTML shell ──────────────────────────────────────────────────────────────

function shell({ title, width, bodyClass = '', head = '', body }) {
  const isDesktop = width >= 1000;
  const metaViewport = isDesktop
    ? `<meta name="viewport" content="width=${width}">`
    : `<meta name="viewport" content="width=device-width, initial-scale=1">`;
  const wrapper = isDesktop
    ? `<div style="width:${width}px; min-height:100vh;">${body}</div>`
    : `<div style="width:${width}px; min-height:100vh; margin:0 auto;">${body}</div>`;

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  ${metaViewport}
  <title>${title}</title>
  <style>
${BASE_CSS}
${previewCSS}
  </style>
  ${head}
</head>
<body class="w-mod-js ${bodyClass}">
${wrapper}
</body>
</html>`;
}

// ─── NAV DESKTOP ────────────────────────────────────────────────────────────

fs.writeFileSync(path.join(PREVIEWS, 'nav-desktop.html'), shell({
  title: 'Nav — Desktop 1440px',
  width: 1440,
  body: `
<div style="background:#1c1a31; color:white; font-family:'Unica 77 LL',sans-serif; font-size:14px; width:100%;">
  <div style="padding:8px 16px; display:flex; align-items:center; justify-content:space-between; gap:32px;">
    <a href="/special/season" style="color:white; text-decoration:none; display:flex; gap:40px; align-items:center; flex:1; justify-content:center;">
      <span>сезон JAN–JULY 2026: эмоциональный дизайн</span>
      <span style="text-decoration:underline;">узнать больше</span>
    </a>
  </div>
</div>
<div style="background:#ececec; position:relative; padding-left:275px;">
  <a href="/" style="position:absolute; top:15px; left:16px; display:flex; align-items:flex-end; gap:8px; text-decoration:none; color:inherit;">
    <svg width="38" height="38" viewBox="0 0 128 128" fill="none"><path d="M51.3874 76.3165C59.6535 78.5028 68.3465 78.5028 76.6126 76.3165C78.9117 75.7043 81.3642 76.2837 83.1488 77.8578L113.355 104.487C110.356 108.181 106.94 111.537 103.184 114.478L78.3205 92.5605C77.2366 91.5985 75.7367 91.2487 74.3353 91.6204C72.4303 92.1233 71.1165 93.8395 71.1165 95.8071V127.596C68.7845 127.858 66.4087 128 64 128C61.5914 128 59.2156 127.858 56.8835 127.596V95.8071C56.8835 93.8395 55.5588 92.1233 53.6647 91.6204C52.2633 91.2487 50.7743 91.5985 49.6795 92.5605L24.8157 114.478C21.0604 111.537 17.6445 108.181 14.6446 104.487L44.8512 77.8578C46.6358 76.2837 49.0883 75.7043 51.3874 76.3165Z" fill="currentColor"/><path d="M81.6139 67.6674C79.3772 59.4268 75.0307 51.9101 69.0013 45.8558C67.3208 44.1738 66.5971 41.7636 67.0701 39.4334L75.064 0C79.7687 0.746513 84.3875 2.0222 88.8157 3.79906L82.237 36.257C81.9446 37.6752 82.3911 39.147 83.4142 40.1729C84.8028 41.5688 86.9484 41.8467 88.6551 40.8628L116.228 24.9686C117.621 26.8539 118.932 28.8371 120.137 30.9198C121.341 33.0025 122.406 35.1279 123.344 37.2755L95.7715 53.1697C94.0648 54.1536 93.2386 56.1572 93.7495 58.0463C94.1278 59.4439 95.1757 60.5565 96.5575 61.0222L128 71.5627C127.327 76.2801 126.124 80.9118 124.419 85.3531L86.2189 72.5485C83.9612 71.7924 82.2325 69.9615 81.6139 67.6674Z" fill="currentColor"/><path d="M58.9987 45.8558C52.9693 51.9102 48.6228 59.4268 46.3861 67.6674C45.7675 69.9615 44.0388 71.7924 41.7811 72.5485L3.58065 85.3531C1.8758 80.9118 0.672898 76.2802 0 71.5628L31.4425 61.0223C32.8188 60.566 33.8722 59.444 34.2505 58.0464C34.7669 56.1477 33.9352 54.1536 32.2285 53.1698L4.65602 37.2756C5.59447 35.1279 6.6591 33.0026 7.86343 30.9199C9.06775 28.8372 10.3789 26.8539 11.7725 24.9687L39.345 40.8629C41.0516 41.8467 43.2026 41.5593 44.5858 40.173C45.6089 39.147 46.05 37.6847 45.763 36.257L39.1843 3.7991C43.6125 2.02224 48.2313 0.746548 52.936 3.41457e-05L60.9299 39.4335C61.4029 41.7636 60.6792 44.1739 58.9987 45.8558Z" fill="currentColor"/></svg>
  </a>
  ${desktopNavHTML}
</div>
`,
}));
console.log('✓ nav-desktop.html');

// ─── NAV MOBILE ─────────────────────────────────────────────────────────────

fs.writeFileSync(path.join(PREVIEWS, 'nav-mobile.html'), shell({
  title: 'Nav — Mobile 390px',
  width: 390,
  body: `
<div style="background:#1c1a31; color:white; font-size:13px; padding:8px 16px; display:flex; justify-content:space-between;">
  <span>новый сезон</span><span>→</span>
</div>
<div style="background:#ececec; position:relative; min-height:64px;">
  <a href="/" style="position:absolute;top:12px;left:16px;display:flex;align-items:flex-end;gap:6px;text-decoration:none;color:inherit;">
    <svg width="28" height="28" viewBox="0 0 128 128" fill="none"><path d="M51.3874 76.3165C59.6535 78.5028 68.3465 78.5028 76.6126 76.3165C78.9117 75.7043 81.3642 76.2837 83.1488 77.8578L113.355 104.487C110.356 108.181 106.94 111.537 103.184 114.478L78.3205 92.5605C77.2366 91.5985 75.7367 91.2487 74.3353 91.6204C72.4303 92.1233 71.1165 93.8395 71.1165 95.8071V127.596C68.7845 127.858 66.4087 128 64 128C61.5914 128 59.2156 127.858 56.8835 127.596V95.8071C56.8835 93.8395 55.5588 92.1233 53.6647 91.6204C52.2633 91.2487 50.7743 91.5985 49.6795 92.5605L24.8157 114.478C21.0604 111.537 17.6445 108.181 14.6446 104.487L44.8512 77.8578C46.6358 76.2837 49.0883 75.7043 51.3874 76.3165Z" fill="currentColor"/><path d="M81.6139 67.6674C79.3772 59.4268 75.0307 51.9101 69.0013 45.8558C67.3208 44.1738 66.5971 41.7636 67.0701 39.4334L75.064 0C79.7687 0.746513 84.3875 2.0222 88.8157 3.79906L82.237 36.257C81.9446 37.6752 82.3911 39.147 83.4142 40.1729C84.8028 41.5688 86.9484 41.8467 88.6551 40.8628L116.228 24.9686C117.621 26.8539 118.932 28.8371 120.137 30.9198C121.341 33.0025 122.406 35.1279 123.344 37.2755L95.7715 53.1697C94.0648 54.1536 93.2386 56.1572 93.7495 58.0463C94.1278 59.4439 95.1757 60.5565 96.5575 61.0222L128 71.5627C127.327 76.2801 126.124 80.9118 124.419 85.3531L86.2189 72.5485C83.9612 71.7924 82.2325 69.9615 81.6139 67.6674Z" fill="currentColor"/><path d="M58.9987 45.8558C52.9693 51.9102 48.6228 59.4268 46.3861 67.6674C45.7675 69.9615 44.0388 71.7924 41.7811 72.5485L3.58065 85.3531C1.8758 80.9118 0.672898 76.2802 0 71.5628L31.4425 61.0223C32.8188 60.566 33.8722 59.444 34.2505 58.0464C34.7669 56.1477 33.9352 54.1536 32.2285 53.1698L4.65602 37.2756C5.59447 35.1279 6.6591 33.0026 7.86343 30.9199C9.06775 28.8372 10.3789 26.8539 11.7725 24.9687L39.345 40.8629C41.0516 41.8467 43.2026 41.5593 44.5858 40.173C45.6089 39.147 46.05 37.6847 45.763 36.257L39.1843 3.7991C43.6125 2.02224 48.2313 0.746548 52.936 3.41457e-05L60.9299 39.4335C61.4029 41.7636 60.6792 44.1739 58.9987 45.8558Z" fill="currentColor"/></svg>
    <span style="font-size:15px;font-weight:500;">wannabe</span>
  </a>
  <!-- Mobile menu expanded state shown below logo -->
  <div style="padding:60px 16px 20px 16px;">
    <div style="display:flex;flex-direction:column;gap:4px;">
      <span style="font-size:12px;opacity:0.5;padding-bottom:4px;">Ресурсы</span>
      <a href="https://library.wannabe.ru/" style="font-size:14px;opacity:0.7;text-decoration:none;">Библиотека</a>
      <a href="/events" style="font-size:14px;opacity:0.7;text-decoration:none;">Мероприятия</a>
    </div>
    <hr style="border:none;border-top:1px solid rgba(0,0,0,0.15);margin:12px 0;"/>
    <div style="display:flex;flex-direction:column;gap:6px;">
      <span style="font-size:12px;opacity:0.5;padding-bottom:4px;">Курсы</span>
      <a href="/design/next-level" style="font-size:14px;padding:6px 10px;border:1px solid rgba(0,0,0,0.25);border-radius:4px;text-decoration:none;opacity:0.7;">Next Level Concepts</a>
      <a href="/design/next-level-ui" style="font-size:14px;padding:6px 10px;border:1px solid rgba(0,0,0,0.25);border-radius:4px;text-decoration:none;opacity:0.7;">Next Level UI</a>
      <a href="/design/superpowered" style="font-size:14px;padding:6px 10px;border:2px solid black;border-radius:4px;text-decoration:none;background:black;color:white;">Superpowered ux/ui</a>
      <a href="/design/t-shaped-designer" style="font-size:14px;padding:6px 10px;border:1px solid rgba(0,0,0,0.25);border-radius:4px;text-decoration:none;opacity:0.7;">T-Shaped</a>
      <a href="/shorts/ai-identity" style="font-size:14px;padding:6px 10px;border:1px solid rgba(0,0,0,0.25);border-radius:4px;text-decoration:none;opacity:0.7;">ai brands shorts</a>
      <a href="/shorts/ai-creator" style="font-size:14px;padding:6px 10px;border:1px solid rgba(0,0,0,0.25);border-radius:4px;text-decoration:none;opacity:0.7;">ai creator shorts</a>
    </div>
  </div>
</div>
`,
}));
console.log('✓ nav-mobile.html');

// ─── FOOTER DESKTOP ──────────────────────────────────────────────────────────

fs.writeFileSync(path.join(PREVIEWS, 'footer-desktop.html'), shell({
  title: 'Footer — Desktop 1440px',
  width: 1440,
  body: `
<div style="background:#000; color:#fff; min-height:100vh; display:flex; align-items:flex-end; padding-top:120px;">
  ${footerHTML}
</div>
`,
  head: `<style>
.footer { background: #000 !important; color: #fff !important; }
.footer a { color: inherit; }
body { background: #ccc; }
</style>`,
}));
console.log('✓ footer-desktop.html');

// ─── FOOTER MOBILE ───────────────────────────────────────────────────────────

fs.writeFileSync(path.join(PREVIEWS, 'footer-mobile.html'), shell({
  title: 'Footer — Mobile 390px',
  width: 390,
  body: `
<div style="background:#000; color:#fff; min-height:100vh;">
  ${footerHTML}
</div>
`,
  head: `<style>
.footer { background: #000 !important; color: #fff !important; width: 390px !important; padding: 24px 16px !important; }
.footer a { color: inherit; }
.footer__grid { display: flex !important; flex-direction: column !important; gap: 32px !important; }
body { background: #000; }
</style>`,
}));
console.log('✓ footer-mobile.html');

// ─── PAYMENT DESKTOP ─────────────────────────────────────────────────────────

fs.writeFileSync(path.join(PREVIEWS, 'payment-desktop.html'), shell({
  title: 'PaymentWidget — Desktop 1440px',
  width: 1440,
  body: `
<!-- Backdrop -->
<div style="background:rgba(0,0,0,0.5); min-height:100vh; display:flex; align-items:flex-start; justify-content:center; padding: 80px 20px 40px;">
  <!-- Modal -->
  <div style="background:#fff; border-radius:12px; width:580px; max-width:100%; padding:40px;">
    <a href="#" style="display:inline-flex; gap:4px; font-size:14px; text-decoration:none; color:inherit; margin-bottom:24px; opacity:0.7;">
      <span>←</span> <span style="text-decoration:underline;">Назад к тарифам</span>
    </a>

    <h3 style="font-size:24px; font-weight:500; margin-bottom:20px;">Заполните заявку</h3>

    <div style="margin-bottom:20px;">
      <p style="font-size:14px; margin-bottom:8px;">Кому покупаете</p>
      <div style="display:flex; gap:4px;">
        <button style="padding:6px 12px; border:2px solid black; background:black; color:white; border-radius:4px; font-size:13px; font-family:inherit;">Для себя</button>
        <button style="padding:6px 12px; border:1px solid #ccc; border-radius:4px; font-size:13px; font-family:inherit; background:#fff;">В подарок</button>
      </div>
    </div>

    <form style="display:flex; flex-direction:column; gap:16px; max-width:490px;">
      ${['Фамилия и имя|text|Иванов Иван', 'Email|email|ivan@gmail.com', 'Telegram|text|@telegram', 'Город|text|Москва'].map(f => {
        const [label, type, placeholder] = f.split('|');
        return `<div>
          <label style="display:block; font-size:14px; margin-bottom:4px;">${label}</label>
          <input type="${type}" placeholder="${placeholder}" style="width:100%; border:1px solid #ccc; border-radius:4px; padding:8px 12px; font-size:14px; font-family:inherit;" />
        </div>`;
      }).join('')}
      <button style="width:100%; text-align:left; padding:12px 40px 12px 16px; background:black; color:white; border:2px solid black; border-radius:4px; font-size:15px; font-family:inherit; background-image:url('https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/664692ed145d88ad0929ac0f_arrow-btn-white.svg'); background-repeat:no-repeat; background-position:96% center; background-size:12px;">Продолжить</button>
    </form>
  </div>
</div>
`,
}));
console.log('✓ payment-desktop.html');

// ─── PAYMENT MOBILE ──────────────────────────────────────────────────────────

fs.writeFileSync(path.join(PREVIEWS, 'payment-mobile.html'), shell({
  title: 'PaymentWidget — Mobile 390px',
  width: 390,
  body: `
<div style="background:rgba(0,0,0,0.5); min-height:100vh; padding-top:60px;">
  <div style="background:#fff; border-radius:12px 12px 0 0; margin:0 8px; padding:24px 20px 32px; min-height:calc(100vh - 60px);">
    <a href="#" style="display:inline-flex; gap:4px; font-size:13px; text-decoration:none; color:inherit; margin-bottom:20px; opacity:0.7;">
      <span>←</span> <span style="text-decoration:underline;">Назад к тарифам</span>
    </a>

    <h3 style="font-size:20px; font-weight:500; margin-bottom:16px;">Заполните заявку</h3>

    <div style="margin-bottom:16px;">
      <p style="font-size:13px; margin-bottom:6px;">Кому покупаете</p>
      <div style="display:flex; gap:4px;">
        <button style="padding:5px 10px; border:2px solid black; background:black; color:white; border-radius:4px; font-size:12px; font-family:inherit;">Для себя</button>
        <button style="padding:5px 10px; border:1px solid #ccc; border-radius:4px; font-size:12px; font-family:inherit; background:#fff;">В подарок</button>
      </div>
    </div>

    <form style="display:flex; flex-direction:column; gap:12px;">
      ${['Фамилия и имя|text|Иванов Иван', 'Email|email|ivan@gmail.com', 'Telegram|text|@telegram', 'Город|text|Москва'].map(f => {
        const [label, type, placeholder] = f.split('|');
        return `<div>
          <label style="display:block; font-size:13px; margin-bottom:3px;">${label}</label>
          <input type="${type}" placeholder="${placeholder}" style="width:100%; border:1px solid #ccc; border-radius:4px; padding:7px 10px; font-size:13px; font-family:inherit;" />
        </div>`;
      }).join('')}

      <div style="margin-top:8px;">
        <button style="width:100%; text-align:left; padding:10px 36px 10px 14px; background:black; color:white; border:2px solid black; border-radius:4px; font-size:14px; font-family:inherit; background-image:url('https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/664692ed145d88ad0929ac0f_arrow-btn-white.svg'); background-repeat:no-repeat; background-position:96% center; background-size:11px;">Продолжить</button>
      </div>
    </form>

    <!-- Payment method step preview -->
    <div style="margin-top:32px; padding-top:24px; border-top:1px solid #eee;">
      <h3 style="font-size:18px; font-weight:500; margin-bottom:16px;">Выберите способ оплаты</h3>

      <div style="display:flex; flex-direction:column; gap:8px;">
        <div style="border:2px solid black; border-radius:8px; padding:12px; background:rgba(0,0,0,0.04);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="display:flex; gap:6px; margin-bottom:4px;">
                <img src="https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/665e05677c997294f057fea7_visa.svg" style="height:16px;">
                <img src="https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/665e0578c69de26fb5555a0c_mastercard.svg" style="height:16px;">
                <img src="https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/665e0567f855d44a7920d509_mir-logo.svg" style="height:16px;">
              </div>
              <p style="font-size:13px;">Российской картой</p>
            </div>
            <div style="width:16px;height:16px;border-radius:50%;border:2px solid black;background:black;flex-shrink:0;"></div>
          </div>
        </div>
        <div style="border:1px solid #ccc; border-radius:8px; padding:12px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <p style="font-size:13px; margin-bottom:2px;">Международной картой</p>
              <p style="font-size:11px; color:#7c7c7c;">В евро, точный курс рассчитаем</p>
            </div>
            <div style="width:16px;height:16px;border-radius:50%;border:2px solid #aaa;flex-shrink:0;margin-top:2px;"></div>
          </div>
        </div>
        <div style="border:1px solid #ccc; border-radius:8px; padding:12px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <img src="https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/670ce1a0598972f3f29d0fba_t-bank-logo.svg" style="height:20px; margin-bottom:4px;">
              <p style="font-size:13px;">В рассрочку от Т-Банка</p>
              <p style="font-size:11px; color:#7c7c7c;">Без первого взноса</p>
            </div>
            <div style="width:16px;height:16px;border-radius:50%;border:2px solid #aaa;flex-shrink:0;margin-top:2px;"></div>
          </div>
        </div>
      </div>

      <button style="margin-top:16px; width:100%; text-align:left; padding:10px 36px 10px 14px; background:black; color:white; border:2px solid black; border-radius:4px; font-size:14px; font-family:inherit; background-image:url('https://cdn.prod.website-files.com/663e20e43c55b32b80cbc405/664692ed145d88ad0929ac0f_arrow-btn-white.svg'); background-repeat:no-repeat; background-position:96% center; background-size:11px;">Оплатить</button>
    </div>
  </div>
</div>
`,
}));
console.log('✓ payment-mobile.html');

console.log('\nAll 6 preview files generated in:', PREVIEWS);

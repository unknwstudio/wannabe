# wannabe.ru — Style Guide
Audited from: components/global/Nav.tsx, Footer.tsx, components/ui/TariffSection.tsx, app/globals.css, app/layout.tsx

---

## Colors

### Used in components

#000000 — Nav bg, Tariff01 section bg, chip text, toggle border/active bg — black
#ffffff — Nav bg, chip bg, footer links, email input bg, PriceCard bg — white
#1c1a31 — PriceCard text, wishlist button bg, footer subscribe button text, Tariff03 sub-label — dark-purple
#4ef968 — progress bar fill, Tariff01 feature cards bg, "выбрать" button bg, green bullet — green
#8f67ff — Tariff02 feature cards bg, Tariff03 purple badge bg — purple
#cfbeff — footer section labels (Документы/Ресурсы), footer subscribe button bg — purple-light
#e5e5e5 — Tariff02 section bg — grey-light
#eaeaea — Tariff03 feature cards bg — grey-bg
#cacaca — nav bottom border — grey-border
#cccccc — divider lines in PriceCard, Tariff02 progress track bg, Tariff02 feature card text — grey-divider
#7c7c7c — footer disclaimer, art director subtitle — grey-text
#ff6225 — "осталось мест" text — orange
rgba(0,0,0,0.25) — chip box-shadow

### Used in globals.css but NOT in any component (dead tokens)
#737373 — --grey — unused
#eeeeee — --bright-grey — used only in .form-input which itself is unused
#ececec — --new-light — unused
#8375ff — --light-blue — unused
#ff6d34 — --orange — unused (different orange than #ff6225)
#f04491 — --pink — unused
#cbffa0 — --lime — unused
#6243f5 — --electric-blue — unused
#2e1a31 — --deep-purple — unused
#ffc300 — --dirty-yellow — unused
#ffbb04 — --selective-yellow — unused
#cc0003 — --dark-red — unused
#a6a6a6 — --quick-silver — unused

### Not in brand palette (used as placeholders, replace with real values)
#444 — Tariff01 author photo placeholder bg — remove when real image added
#aaa — Tariff02 author photo placeholder bg — remove when real image added
#4b4b4b — Tariff01 progress track bg — not a brand color, consider using a CSS variable

---

## Typography

All in 'Unica 77 LL', sans-serif. No Tailwind font classes used in components (all inline styles).

clamp(40px, 6vw, 80px) / 500 / -0.05em / lh 0.8 — TariffSection H2 — tariff name (дизайн-лидер)
clamp(40px, 5.5vw, 80px) / 700 / -0.02em / lh 1 — Footer wannabe wordmark — footer brand name
clamp(28px, 2.8vw, 40px) / 500 / -0.04em — Nav desktop logo text — nav brand name
clamp(24px, 8.5vw, 33px) / 500 / -0.04em — Nav mobile logo + menu button — mobile brand name
clamp(22px, 3vw, 48px) / 500 / 0 — TariffSection standards heading — one-off, not on named scale
clamp(20px, 2.2vw, 32px) / 500 / 0 — TariffSection price-full — full price text
clamp(18px, 2.2vw, 32px) / 500 / 0 — TariffSection H3 and LABEL (identical consts) — section sub-heading, tariff label
clamp(28px, 3.6vw, 52px) / 500 / -0.02em — TariffSection price-main — monthly price
clamp(14px, 1.5vw, 17px) / 500 / 0 — Footer section labels (Документы/Ресурсы) — footer label
clamp(14px, 1.5vw, 17px) / 400 / 0 — Footer links — footer body
clamp(13px, 1.2vw, 17px) / 500 / -0.01em — chip (Nav + Footer, identical) — course pill text
clamp(13px, 1.2vw, 17px) / 400 / +0.01em — Nav desktop nav links — nav link
clamp(11px, 1vw, 14px) / 400 / 0 — PriceCard badge outer — badge text
28px fixed / 500 / 0 — Nav mobile overlay links — should use clamp
16px fixed / 400 / 0 — Tariff02 "только 20 человек" — should use clamp
14px fixed / 400 / 0 — body text throughout TariffSection (workshop items, includes, subtitles) — should use clamp
10px fixed / 400 / 0 — Footer disclaimer — micro text (acceptable)

### globals.css type classes — defined but NOT used in any component (dead CSS)
.type-h1 — clamp(3rem, 8.33vw, 6.25rem) / 500 / -0.05em
.type-h2 — clamp(1.5rem, 3.33vw, 2.5rem) / 500 / -0.03em
.type-h3 — 1.33rem fixed / 500 / -0.01em
.type-body — 1rem / 400
.type-caption — 0.75rem / 400
.type-label — 0.875rem / 500 / -0.01em
.nav-link — 0.875rem / inherited
.footer-link — 0.875rem / inherited

---

## Buttons

"выбрать" (select) — TariffSection.tsx:59 — background #4ef968, color #000, border-radius 40px, padding 14px 24px, font clamp(14px,1.2vw,17px) — pill-green
Toggle option active — TariffSection.tsx:22 — background #000, color #fff, border-radius 40px, padding 8px 16px — pill-toggle-active
Toggle option inactive — TariffSection.tsx:22 — background transparent, color #000, border-radius 40px, padding 8px 16px — pill-toggle-inactive
Wishlist — TariffSection.tsx:62 — background #1c1a31, color #fff, 50×50px, border-radius 50%, font-size 18px — circle-icon
Подписаться → — Footer.tsx:54 — background #cfbeff, color #1c1a31, border-radius 4px, padding 12px, full width — subscribe
+меню / ×меню — Nav.tsx:60 — no background, no border, font only, clamp(24px,8.5vw,33px), weight 500 — text-toggle
.btn-primary (globals.css:144) — background #000, color #fff, border 2px solid #000, border-radius 0.28rem, padding 0.75rem 1rem, font 0.875rem — NOT USED in any component

---

## Inputs

Email input — Footer.tsx:49-53 — background #fff, border 1px solid #fff, border-radius 4px, padding 12px, full width, font clamp(14px,1.5vw,17px) — footer-email
.form-input (globals.css:163) — background #eee, border 1px solid #eee, border-radius 0.28rem, padding 0.6rem 0.75rem, font 0.875rem — NOT USED in any component

---

## Spacing

### Padding — outer horizontal
clamp(20px, 15vw, 220px) — Nav desktop, TariffSection, Footer — consistent ✓
20px fixed — Nav mobile row (paddingLeft/Right 20) — acceptable floor value

### Padding — section vertical
clamp(40px, 6vw, 90px) — TariffSection sections — matches standard ✓
clamp(32px, 5vw, 48px) — Footer — diverges from standard (standard says clamp(40px,6vw,90px))

### Gap
48px fixed — Footer top columns gap, Footer left-col internal gap — large column gap
32px fixed — TariffSection two-col gap — medium column gap
16px fixed — Nav mobile overlay link gap
12px fixed — Footer right-col link gap, PriceCard bottom row gap
8px fixed — Footer form element gap, PriceCard includes gap
6px fixed — Nav mobile overlay pill gap
4px fixed — pill gap (Nav + Footer)

### Card internal padding
24px fixed — PriceCard, standards card
20px 24px — FCard (feature card)
12px — Footer email input + subscribe button

---

## Badges & Pills

Course chip (white) — Nav.tsx + Footer.tsx — white bg, shadow 0 1px 2px rgba(0,0,0,0.25), 5px 10px padding, 4px radius, clamp(13px,1.2vw,17px), w500 — defined twice (identical object in both files)
Badge pill (outline) — TariffSection PriceCard — 1px solid border, 40px radius, 4px 12px padding, clamp(11px,1vw,14px) — used for price increase notice + "включено в тариф:" label
Purple badge — Tariff03 bottom — #8f67ff bg, white text, 40px radius, 8px 20px padding, 14px fixed
.nav-chip (globals.css:106) — 0.33rem 0.5rem padding, 0.28rem radius, 0.875rem, w500 — NOT USED in any component

---

## Inconsistencies

**Critical**
layout.tsx loads Geist and Geist_Mono from Google Fonts — Unica 77 LL is set in globals.css body, but the layout className includes Geist CSS variables. Layout should only use Unica 77 LL.
layout.tsx lang="en" — should be lang="ru".
layout.tsx metadata title is "Create Next App" — placeholder not updated.

**Dead CSS**
globals.css defines .type-h1, .type-h2, .type-h3, .type-body, .type-caption, .type-label, .nav-chip, .nav-link, .footer-link, .btn-primary, .form-input, .form-label — none are referenced in any component file. All styling is done via inline style objects.

**Duplicate definitions**
chip style object defined separately in Nav.tsx (line 14) and Footer.tsx (line 8) — identical, should be a shared constant or CSS class.
TariffSection H3 and LABEL are identical consts — clamp(18px,2.2vw,32px) / 500 — should be one.

**Fixed px where clamp is required**
Nav mobile overlay links: 28px fixed — should use clamp.
TariffSection body text: 14px fixed throughout — standard says clamp(14px,1.5vw,17px).
Tariff02 "только 20 человек": 16px fixed — should use clamp.
TariffSection "включено в тариф:" badge: fontSize 14 hardcoded while the outer badge uses clamp(11px,1vw,14px).

**Clamp values not matching CODING_STANDARD**
Footer py uses clamp(32px,5vw,48px) — standard says clamp(40px,6vw,90px) for section padding.
TariffSection H3 uses 2.2vw — standard says 2.5vw for small headings (clamp(18px,2.5vw,32px)).
Standards card heading clamp(22px,3vw,48px) — doesn't map to any named scale in CODING_STANDARD.

**Color naming drift**
globals.css uses --deep-blue for #1c1a31; CODING_STANDARD calls it dark-purple.
globals.css uses --light-grey for #e5e5e5; CODING_STANDARD calls it grey-light.
globals.css has --lines-grey for #ccc; CODING_STANDARD calls it grey-divider.
globals.css has --neon-orange for #ff6225; CODING_STANDARD calls it orange.

**Non-brand colors in use**
#4b4b4b (Tariff01 progress track) — not defined in brand palette or CODING_STANDARD.
#444 and #aaa (photo placeholders) — placeholder values, should be removed when real images land.

**Footer right column constraint**
Footer.tsx col-right uses `width: clamp(240px, 33vw, 476px)` with `flexShrink: 0` — this is a fluid width so technically compliant, but it constrains one column to a fixed max, which can cause layout issues below 768px where it won't shrink below 240px.

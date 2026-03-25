# wannabe.ru — Coding Standard

## Responsive Layout (Golden Rule)
NEVER use fixed px widths on layout containers.
ALWAYS use clamp() for fluid scaling between mobile and desktop.

Core pattern:
  Outer padding:    clamp(20px, 15vw, 220px) horizontal
  Section padding:  clamp(40px, 6vw, 90px) vertical
  Large headings:   clamp(40px, 6vw, 80px)   → .text-h1 / .text-h2
  Medium headings:  clamp(24px, 3vw, 52px)   → .text-h3
  Body text:        clamp(14px, 1.5vw, 17px) → .text-body
  Small text:       14px fixed               → .text-small

Two-column layouts: flex-row + flex-wrap, never fixed widths on columns.
Images: width 100%, height auto, or aspect-ratio.
All containers: max-width with mx-auto, never fixed width.

## Colors
  black:        #000000
  white:        #FFFFFF
  green:        #4EF968
  purple:       #8F67FF
  purple-light: #CFBEFF
  orange:       #FF6225
  grey-text:    #7C7C7C
  grey-border:  #CACACA   ← absorbs #CCCCCC
  grey-bg:      #EAEAEA   ← absorbs #E5E5E5
  progress:     #4B4B4B   ← absorbs #444444 (placeholder, replace when real images land)

## Font
Unica 77 LL Cyr — Regular (400), Medium (500), Bold (700)
Loaded via @font-face in globals.css

## Spacing Scale
Use ONLY: 4px · 16px · 24px · 48px (plus fluid clamp for outer containers)
  4px  — dividers, tiny gaps (pill gaps, progress bar)
  16px — standard gap (links, form fields, column gaps in cards)
  24px — card padding, larger column gaps
  48px — section-level gaps (columns, footer sections)

## Text Classes (globals.css)
  .text-h1   — clamp(40px,6vw,80px)  700  -0.02em  lh 1    — wordmark
  .text-h2   — clamp(40px,6vw,80px)  500  -0.05em  lh 0.8  — section heading
  .text-h3   — clamp(24px,3vw,52px)  500  -0.02em          — prices only
  .text-h4   — clamp(18px,2vw,24px)  500  -0.01em  lh 1em  lowercase — sub-headings, labels, card text
  .text-body — clamp(14px,1.5vw,17px) 400                  — body, links
  .text-small — 14px  400                                   — badges, captions

## Button Classes (globals.css)
  .btn-green     — #4ef968 bg, hover: brightness(110%) + scale(1.01)
  .btn-circle    — #000 bg, 50×50px circle, hover: opacity 0.8
  .btn-subscribe — #cfbeff bg, hover: brightness(105%)
  .btn-menu      — text-only mobile toggle, hover: opacity 0.6

## Shared Component Classes (globals.css)
  .chip          — course/nav pill, white bg + shadow
  .toggle-pill   — container for binary toggle
  .toggle-opt    — toggle button option (.active = black bg)
  .input-email   — email input, white bg

## File Size Rules
Component .tsx files: under 150 lines (TariffSection: under 300)
Preview .html files: under 400 lines
No inline SVG path data
No base64 images
No fixed widths on containers

## Previews
No separate mobile preview files.
All components are responsive — resize the browser to test mobile.
One desktop preview per component only.

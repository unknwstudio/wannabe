# Data Audit
Generated: 2026-03-26

---

## 1. main_template/page.tsx — props passed to EventLayout

```
badges:          ['Участие бесплатное', 'Записи не будет']
title:           "Дизайн-устойчивость: как расти в эпоху неопределённости"
ctaLabel:        "Зарегистрироваться"
description:     "Открытый вебинар для дизайнеров всех уровней — от джунов до сеньоров"
speakerIds:      ['misha-rozov', 'artem-kazakov']
heroSubline:     "Воркшоп с Мишей Розовым и Артёмом Казаковым"
eventDate:       "15 апреля, 19:00 по МСК"
quote:           "Дизайн — это не только про красоту, это про системное мышление..."
quoteHighlight:  "системное мышление"
quoteSpeakerId:  "misha-rozov"
contentSections: [
  { headline: 'для кого',      items: [4 items] },
  { headline: 'программа',     items: [5 items] },
  { headline: 'о чём поговорим', items: [3 items] }
]
speakerCardIds:  ['misha-rozov', 'artem-kazakov']
speakerFull:     {
  speakerId:    'misha-rozov',
  description:  "Арт-директор и ментор с 10-летним опытом...",
  bullets:      [3 items],
  links:        [{ label: 'телеграм-канал →' }, { label: 'портфолио →' }]
}
formDate:        "15 апреля 2025, 19:00 МСК"
formInfo:        "Вебинар пройдёт в Zoom. Ссылку пришлём на почту за час до начала..."
formEndpoint:    "/api/events/designresilience/register"
```

All 16 EventLayoutProps fields are present. ✅

---

## 2. content/events/productcompetencesai.json — full content

```json
{
  "slug": "productcompetencesai",
  "publishedPath": "/events/productcompetencesai",
  "badges": ["Участие бесплатное", "Записи не будет"],
  "title": "Какие компетенции нужны продакту даже в эпоху AI",
  "ctaLabel": "Зарегистрироваться",
  "description": "Мастер-класс от Андрея Денисова и Юры Мешалкина 16 сентября, 19:00 по мск",
  "eventDate": "16 сентября, 19:00",
  "speakerIds": ["yura-meshalkin"],
  "heroSubline": "Записи не будет",
  "quote": "«Продуктовая культура» — канал о создании продуктов и управлении ими",
  "quoteHighlight": "системный подход и список компетенций",
  "quoteSpeakerId": "yura-meshalkin",
  "contentSections": [
    {
      "headline": "для кого",
      "items": [
        "Опытные продакт-менеджеры — Оценить свой опыт...",
        "Начинающие — Увидеть, на чём сфокусировать...",
        "Кто хочет перейти в продакт-менеджмент — Посмотреть..."
      ]
    }
  ],
  "speakerCardIds": ["yura-meshalkin"],
  "formDate": "16 сентября в 19:00 по Москве",
  "formEndpoint": "/api/events/productcompetencesai/register"
}
```

---

## 3. EventLayoutProps type definition

```typescript
export type EventLayoutProps = {
  // Hero
  badges?:          string[]
  title:            string           // REQUIRED
  ctaLabel?:        string
  description?:     string
  speakerIds?:      string[]
  heroSubline?:     string
  eventDate?:       string
  // Quote
  quote?:           string
  quoteHighlight?:  string
  quoteSpeakerId?:  string
  // Content
  contentSections?: ContentSection[] // { headline: string; items: string[] }[]
  speakerCardIds?:  string[]
  speakerFull?:     SpeakerFull      // { speakerId, description?, bullets[], links? }
  // Form
  formDate?:        string
  formInfo?:        string
  formEndpoint?:    string
}
```

Total: 16 props (1 required: `title`, 15 optional).

---

## 4. Field comparison: productcompetencesai.json vs EventLayoutProps

### ✅ JSON fields that match props exactly (used by template)

| JSON field        | Prop              | Value                                          |
|-------------------|-------------------|------------------------------------------------|
| `badges`          | `badges?`         | `["Участие бесплатное", "Записи не будет"]`    |
| `title`           | `title`           | "Какие компетенции нужны продакту..."          |
| `ctaLabel`        | `ctaLabel?`       | "Зарегистрироваться"                           |
| `description`     | `description?`    | "Мастер-класс от Андрея Денисова..."           |
| `eventDate`       | `eventDate?`      | "16 сентября, 19:00"                           |
| `speakerIds`      | `speakerIds?`     | `["yura-meshalkin"]`                           |
| `heroSubline`     | `heroSubline?`    | "Записи не будет" ⚠️ (see data issues below)  |
| `quote`           | `quote?`          | "«Продуктовая культура»..."                    |
| `quoteHighlight`  | `quoteHighlight?` | "системный подход и список компетенций" ⚠️     |
| `quoteSpeakerId`  | `quoteSpeakerId?` | "yura-meshalkin"                               |
| `contentSections` | `contentSections?`| 1 section, 3 items                             |
| `speakerCardIds`  | `speakerCardIds?` | `["yura-meshalkin"]`                           |
| `formDate`        | `formDate?`       | "16 сентября в 19:00 по Москве"               |
| `formEndpoint`    | `formEndpoint?`   | "/api/events/productcompetencesai/register"    |

**14 of 16 props** have matching JSON data.

---

### ❌ JSON fields with NO matching prop (ignored by template)

| JSON field      | Notes                                                    |
|-----------------|----------------------------------------------------------|
| `slug`          | Metadata only — not passed to EventLayout, used by route |
| `publishedPath` | Metadata only — not passed to EventLayout                |

These are safely ignored. The route page passes `{...data}` so they reach EventLayout as unknown props, but React silently discards unrecognised props on components.

---

### ⚠️ Props with NO matching JSON field (sections won't render)

| Prop          | Status                                                  |
|---------------|---------------------------------------------------------|
| `speakerFull` | **Missing** — no `speakerFull` in JSON. Speaker full-profile section will not render. |
| `formInfo`    | **Missing** — no `formInfo` in JSON. Form left-column info text will be blank.        |

---

## 5. Data quality issues found in productcompetencesai.json

| Field           | Issue                                                                                     |
|-----------------|-------------------------------------------------------------------------------------------|
| `heroSubline`   | Contains "Записи не будет" — this is a badge text, not a speaker subline. Should be something like "Мастер-класс с Юрой Мешалкиным и Андреем Денисовым" |
| `quoteHighlight`| "системный подход и список компетенций" does NOT appear in the `quote` string. The quote is "«Продуктовая культура»..." — the highlight won't match, so the purple span will not render. |
| `contentSections[0].items` | Items have boldText fused with body text without separator (e.g. "Опытные продакт-менеджерыОценить свой опыт...") — missing space/dash between role name and description. |
| `speakerCardIds` | Only `["yura-meshalkin"]` — Андрей Денисов (mentioned in description) is absent. His ID would be `"andrey-denisov"`. |

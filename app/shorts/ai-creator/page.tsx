/* PUSH REQUESTS: file exceeds 150-line limit — all sections inlined per design brief */
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Nav from '@/components/global/Nav'
import Footer from '@/components/global/Footer'

const PX: CSSProperties = {
  paddingLeft:  'clamp(20px,15vw,220px)',
  paddingRight: 'clamp(20px,15vw,220px)',
}
const PY: CSSProperties = { paddingTop: 90, paddingBottom: 90 }
const SEC: CSSProperties = { ...PX, ...PY }

const YLW  = '#fff53f'
const PURP = '#c0a7ff'

// ── Week data ──────────────────────────────────────────────────────────────
const WEEKS = [
  {
    weekLabel: 'первая неделя',
    topic:     '3D-сеты · Hero-блоки · Графика для лендингов',
    tools:     ['nana banana 2', 'seedance'],
    image:     '/images/ai-week1.jpg',
    claim:     'научишься делать то, для чего раньше нанимали 3d-художника и фотографа',
    bullets: [
      'визуальный концепт лендинга за один день',
      'кастомные сцены под бренд вместо стоковых фото',
      '3D-графику без Blender и Cinema 4D',
    ],
  },
  {
    weekLabel: 'вторая неделя',
    topic:     'маскоты с липсингом · Мокапы без фотостудии',
    tools:     ['nana banana 2', 'midjourney', 'kive', 'seedance'],
    image:     '/images/ai-week2a.jpg',
    claim:     'создашь маскота который говорит, реагирует и живёт в любом формате / сделаешь продуктовый визуал который выглядит как профессиональная съёмка — без съёмки',
    bullets: [
      'создать брендового персонажа и оживить его с липсингом',
      'генерировать мокапы продукта в любом окружении и контексте',
      'организовывать и хранить AI-ассеты профессионально через Kive',
    ],
  },
  {
    weekLabel: 'третья и четвёртая неделя',
    topic:     'рекламные и коммерческие ai-ролики · ugc-видео без найма креаторов',
    tools:     ['nana banana 2', 'kling', 'veo', 'eleven labs'],
    image:     null,
    claim:     'будешь делать рекламные видео и живой ugc-контент полностью через ai — это самый дорогой навык на рынке прямо сейчас',
    bullets: [
      '30-секундный рекламный ролик без съёмочной команды',
      'ugc-обзоры и отзывы для любого продукта',
      'видеопакеты, за которые агентства берут десятки тысяч',
    ],
  },
]

const FAQS = [
  { q: 'я не понял. мы будем учиться работать в cinema4d?',       a: 'нет!' },
  { q: 'а будем учить after effects?',                             a: 'нет. будем делать 3d, не открывая 3d-софт' },
  { q: 'а ещё такое будет?',                                       a: 'да, но каждый поток курса уникален' },
  { q: 'это для продуктовых дизайнеров или коммуникационных?',    a: 'для всех, кто хочет догнать будущее' },
  { q: 'мне понадобится иностранная карта?',                       a: 'оплатить можно иностранной картой или через сервисы для оплаты зарубежных инструментов' },
  { q: 'я боюсь, что у меня не получится',                        a: '80% людей приходят к нам без опыта работы с ai, и у них всё получается' },
  { q: 'а если я сейчас уже учусь на другом курсе?',              a: 'совмещать с интенсивным форматом будет тяжело, но если очень хочется, не пропускать же, правда?' },
]

const REVIEWS = [
  '/images/review-1.jpg', '/images/review-2.jpg', '/images/review-3.jpg',
  '/images/review-4.jpg', '/images/review-5.jpg', '/images/review-6.jpg',
]

// Shared typography for the design's 50px Medium text
const T50: CSSProperties = {
  fontSize: 'clamp(28px,4vw,50px)', fontWeight: 500,
  fontFamily: "'Unica 77 LL Cyr', sans-serif",
  letterSpacing: '-2.5px', lineHeight: 0.8,
}

export default function AiCreatorPage() {
  return (
    <main style={{ backgroundColor: '#3e3d42' }}>
      <Nav />

      {/* ── S1 Hero ──────────────────────────────────────────────── */}
      <section style={{ ...PX, ...PY, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 35 }}>
        {/* Title block with star badge */}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <p style={{ ...T50, fontSize: 'clamp(56px,10vw,150px)', letterSpacing: '-9px', lineHeight: 0.8, color: YLW }}>
            ultimate<br />ai creator
          </p>
          <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%,-30%)', width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <Image src="/images/ai-creator-star.png" alt="" fill sizes="96px" style={{ objectFit: 'cover' }} />
          </div>
        </div>

        {/* Date */}
        <p style={{ ...T50, color: YLW, textAlign: 'center' }}>23 марта—23 апреля 2026</p>

        {/* Instructor */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11, width: '100%' }}>
          <p style={{ ...T50, color: PURP, textAlign: 'center', maxWidth: 774 }}>
            привет, я дени — lead ai artist в лондонской студии unknw
          </p>
          <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <p style={{ ...T50, color: PURP, textAlign: 'center', maxWidth: 724 }}>
            научу делать коммерческий визуал и видео мирового уровня
          </p>
          <div style={{ border: '1px solid #000', borderRadius: 30, padding: '6px 10px' }}>
            <p style={{ ...T50, fontSize: 'clamp(18px,2.5vw,36px)', letterSpacing: '-0.36px', lineHeight: 1, color: '#000', textAlign: 'center' }}>
              весь контент вокруг — ai-generated
            </p>
          </div>
        </div>

        {/* Target */}
        <p style={{ ...T50, color: '#000', textAlign: 'center', maxWidth: 774 }}>
          курс для дизайнеров, маркетологов и креативщиков, которые хотят работать быстрее и стоить дороже
        </p>
      </section>

      {/* ── S2 Program weeks ─────────────────────────────────────── */}
      <section style={{ ...PX, paddingTop: 90, paddingBottom: 90, display: 'flex', flexDirection: 'column', gap: 80 }}>
        {WEEKS.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Week header */}
            <div>
              <p style={{ ...T50, color: '#000' }}>{week.weekLabel}</p>
              <p style={{ ...T50, color: PURP }}>{week.topic}</p>
            </div>
            {/* Tool pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {week.tools.map((tool, ti) => (
                <span key={ti} style={{ border: `1px solid ${PURP}`, borderRadius: 60, padding: 10, fontSize: 17, fontWeight: 500, color: PURP, fontFamily: "'Unica 77 LL Cyr', sans-serif" }}>
                  {tool}
                </span>
              ))}
            </div>
            {/* Content row */}
            <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {/* Image */}
              <div style={{ width: 'clamp(200px,28vw,380px)', flexShrink: 0, height: 318, borderRadius: 10, overflow: 'hidden', background: '#2a2a30' }}>
                {week.image ? (
                  <Image src={week.image} alt={week.weekLabel} fill={false} width={380} height={318} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#1e1e22' }} />
                )}
              </div>
              {/* Text */}
              <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column', gap: 50 }}>
                <p style={{ fontSize: 'clamp(18px,2.5vw,36px)', fontWeight: 500, color: YLW, lineHeight: 0.91, letterSpacing: '-0.72px', fontFamily: "'Unica 77 LL Cyr', sans-serif" }}>
                  {week.claim}
                </p>
                <div>
                  <p style={{ fontSize: 21, fontWeight: 500, color: YLW, fontFamily: "'Unica 77 LL Cyr', sans-serif", marginBottom: 8 }}>
                    После этой недели ты сможешь делать:
                  </p>
                  <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {week.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: 21, fontWeight: 500, color: YLW, fontFamily: "'Unica 77 LL Cyr', sans-serif", borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 8, marginBottom: 8 }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── S3 Tools note ────────────────────────────────────────── */}
      <section style={{ ...SEC }}>
        <p style={{ ...T50, color: YLW, marginBottom: 24 }}>
          мы будем работать с современными западными инструментами: krea, kive, claude, capcut
        </p>
        <p style={{ ...T50, color: PURP, marginBottom: 24 }}>
          на них понадобится от $50 до $150. эти деньги быстро окупятся первыми проектами после курса
        </p>
        <p style={{ fontSize: 'clamp(18px,2.5vw,36px)', fontWeight: 500, color: PURP, lineHeight: 0.91, letterSpacing: '-0.36px', fontFamily: "'Unica 77 LL Cyr', sans-serif" }}>
          оплатить можно иностранной картой или через сервисы для оплаты иностранных инструментов
        </p>
      </section>

      {/* ── S4 Atmosphere note ───────────────────────────────────── */}
      <section style={{ ...SEC }}>
        <p style={{ ...T50, color: YLW }}>
          тебя ждёт особая атмосфера — 4 активные недели, короткие видеоуроки,
          фидбэк несколько раз в неделю, ежедневная поддержка в чате
        </p>
      </section>

      {/* ── S5 Tariff cards ──────────────────────────────────────── */}
      <section style={{ ...PX, paddingTop: 90, paddingBottom: 90, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'stretch' }}>
        {/* Card 1 — view */}
        <div style={{ flex: 1, minWidth: 280, background: '#3e3d42', border: `1px solid ${YLW}`, borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ ...T50, color: YLW }}>view</p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <p style={{ ...T50, color: YLW }}>22 864₽</p>
            <a href="#" style={{ background: '#000', color: YLW, borderRadius: 90, padding: '8px 24px', textDecoration: 'none', fontFamily: "'Unica 77 LL Cyr', sans-serif", fontWeight: 500, fontSize: 17 }}>
              участвовать
            </a>
          </div>
          <div style={{ border: `1px solid ${YLW}`, borderRadius: 4, padding: '4px 8px', display: 'inline-block' }}>
            <p className="text-small" style={{ color: YLW }}>присоединиться к обучению можно до 26 марта</p>
          </div>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { text: 'смотришь видеоуроки и приходишь на лайв-эфиры', dim: false },
              { text: 'состоишь в чате учеников', dim: false },
              { text: 'нет фидбэка дени на твою работу', dim: true },
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 'clamp(16px,1.8vw,24px)', fontWeight: 500, color: YLW, opacity: item.dim ? 0.2 : 1, fontFamily: "'Unica 77 LL Cyr', sans-serif", lineHeight: 0.84, letterSpacing: '-0.72px' }}>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2 — real practice */}
        <div style={{ flex: 1, minWidth: 280, background: '#000', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ ...T50, color: YLW }}>real practice</p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <p style={{ ...T50, color: YLW }}>33 846₽</p>
            <a href="#" style={{ background: YLW, color: '#000', borderRadius: 90, padding: '8px 24px', textDecoration: 'none', fontFamily: "'Unica 77 LL Cyr', sans-serif", fontWeight: 500, fontSize: 17 }}>
              участвовать
            </a>
          </div>
          <div style={{ border: `1px solid ${YLW}`, borderRadius: 4, padding: '4px 8px', display: 'inline-block' }}>
            <p className="text-small" style={{ color: YLW }}>присоединиться к обучению можно до 26 марта</p>
          </div>
          {/* Progress bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <p className="text-small" style={{ color: YLW }}>осталось мест</p>
              <p className="text-small" style={{ color: YLW }}>19/30</p>
            </div>
            <div style={{ height: 4, background: '#3e3d42', borderRadius: 2 }}>
              <div style={{ width: '53%', height: '100%', background: YLW, borderRadius: 2 }} />
            </div>
          </div>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['всё, что в тарифе view', 'постоянный фидбэк дени на твою работу'].map((item, i) => (
              <li key={i} style={{ fontSize: 'clamp(16px,1.8vw,24px)', fontWeight: 500, color: YLW, fontFamily: "'Unica 77 LL Cyr', sans-serif", lineHeight: 0.84, letterSpacing: '-0.72px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── S6 Reviews ───────────────────────────────────────────── */}
      <section style={{ ...SEC, display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'center' }}>
        <p style={{ ...T50, color: YLW, textAlign: 'center' }}>отзывы</p>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {REVIEWS.map((src, i) => (
            <div key={i} style={{ background: YLW, borderRadius: 20, padding: 10, width: '100%' }}>
              <Image
                src={src}
                alt={`отзыв ${i + 1}`}
                width={1200}
                height={600}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── S7 FAQ ───────────────────────────────────────────────── */}
      <section style={{ ...SEC }}>
        <p style={{ ...T50, color: YLW, marginBottom: 48 }}>Q&amp;A</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 35 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3, borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: 8 }}>
              <p style={{ fontSize: 'clamp(16px,1.8vw,24px)', fontWeight: 500, color: YLW, opacity: 0.5, lineHeight: 0.84, letterSpacing: '-0.72px', fontFamily: "'Unica 77 LL Cyr', sans-serif" }}>
                {faq.q}
              </p>
              <p style={{ fontSize: 'clamp(16px,1.8vw,24px)', fontWeight: 500, color: YLW, lineHeight: 0.84, letterSpacing: '-0.72px', fontFamily: "'Unica 77 LL Cyr', sans-serif" }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}

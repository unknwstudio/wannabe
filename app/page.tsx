import type { CSSProperties } from 'react'
import Image from 'next/image'
import Nav from '@/components/global/Nav'
import Footer from '@/components/global/Footer'

const PX: CSSProperties = {
  paddingLeft:  'clamp(20px,15vw,220px)',
  paddingRight: 'clamp(20px,15vw,220px)',
}

const COURSES = [
  {
    bg:    '/images/course-nlc-bg.jpg',
    title: 'next level concepts',
    titleColor: '#fff',
    photo: '/images/persons/misha-rozov.webp',
    desc:  'научу проектировать омниканальные концепты будущего — эмоции, интерфейсы, 2D-анимация, AI-Gen, Spatial Design',
    descColor: '#fff',
    overlay: 'rgba(0,0,0,0.2)',
    href:   '/design/next-level-concepts',
    btnBg:  '#000',
    btnColor: '#fff',
  },
  {
    bg:    '/images/course-sp-bg.jpg',
    title: 'superpowered ux/ui',
    titleColor: '#000',
    photo: '/images/persons/dasha-shcherbakova.webp',
    desc:  'научу работать над дизайном продукта',
    descColor: '#000',
    overlay: undefined,
    href:   '/design/superpowered',
    btnBg:  '#000',
    btnColor: '#fff',
  },
  {
    bg:    '/images/course-eada-bg.jpg',
    title: 'emotional ai digital adverts',
    titleColor: '#79ff80',
    photos: ['/images/persons/misha-rozov.webp', '/images/persons/artem-kazakov.webp'],
    desc:   'научим делать современную цифровую рекламу с помощью ai',
    descColor: '#79ff80',
    overlay: undefined,
    href:   '/design/emotional-ai',
    btnBg:  '#79ff80',
    btnColor: '#000',
  },
] as const

const LOGOS = [
  { src: '/images/logo-yandex.svg',      alt: 'Яндекс Практикум' },
  { src: '/images/logo-skillfactory.svg', alt: 'Skillfactory'      },
  { src: '/images/logo-frame.svg',        alt: 'Frame'              },
  { src: '/images/logo-utair.svg',        alt: 'UTair'              },
  { src: '/images/logo-raif-1.svg',       alt: 'Raiffeisen'         },
  { src: '/images/logo-raif-2.svg',       alt: 'Raiffeisen Bank'    },
]

export default function HomePage() {
  return (
    <main style={{ backgroundColor: '#eaeaea' }}>
      <Nav />

      {/* ── S1 Hero tagline ───────────────────────────────────────── */}
      <section style={{ ...PX, paddingTop: 96, paddingBottom: 96 }}>
        <p className="text-h1" style={{ color: '#000' }}>
          креативный дом для дизайнеров, где каждый сезон приносит новые идеи
          и навыки — формируя непрерывный ритм роста, и доказательств твоей силы
        </p>
      </section>

      {/* ── S2 Course cards ───────────────────────────────────────── */}
      <section style={{ ...PX, paddingBottom: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {COURSES.map((c, i) => (
          <div key={i} style={{ position: 'relative', height: 480, borderRadius: 12, overflow: 'hidden' }}>
            {/* Background image */}
            <Image
              src={c.bg}
              alt={c.title}
              fill
              sizes="(min-width:768px) 70vw, 100vw"
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
            {/* Optional dark overlay */}
            {c.overlay && (
              <div style={{ position: 'absolute', inset: 0, background: c.overlay }} />
            )}
            {/* Content */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 16, padding: 48, textAlign: 'center',
            }}>
              <p className="text-h1" style={{ color: c.titleColor }}>{c.title}</p>

              {/* Author photo(s) */}
              <div style={{ display: 'flex', gap: 8 }}>
                {'photo' in c ? (
                  <div style={{ position: 'relative', width: 85, height: 85, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                    <Image src={c.photo} alt="автор" fill sizes="85px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                ) : (
                  c.photos.map((ph, pi) => (
                    <div key={pi} style={{ position: 'relative', width: 85, height: 85, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={ph} alt="автор" fill sizes="85px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  ))
                )}
              </div>

              <p style={{ fontSize: 25, fontWeight: 400, color: c.descColor, fontFamily: "'Unica 77 LL Cyr', sans-serif", lineHeight: 1.2, maxWidth: 600 }}>
                {c.desc}
              </p>

              <a href={c.href} style={{
                background: c.btnBg, color: c.btnColor,
                borderRadius: 90, padding: '12px 32px',
                textDecoration: 'none', fontFamily: "'Unica 77 LL Cyr', sans-serif",
                fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 500,
              }}>
                подробнее
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* ── S3 Companies logos ────────────────────────────────────── */}
      <section style={{ ...PX, paddingTop: 90, paddingBottom: 90, background: '#fff' }}>
        <p className="text-h2" style={{ color: '#000', marginBottom: 48 }}>
          У нас учатся специалисты из международных и российских компаний:
        </p>
        <div style={{ background: '#fff', borderRadius: 12, padding: 48, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          {LOGOS.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              style={{ height: 40, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
            />
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <a href="/about" style={{
            background: '#000', color: '#fff',
            borderRadius: 90, padding: '12px 32px',
            textDecoration: 'none', fontFamily: "'Unica 77 LL Cyr', sans-serif",
            fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 500,
            display: 'inline-block',
          }}>
            подробнее
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}

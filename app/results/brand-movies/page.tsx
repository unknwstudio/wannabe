import type { CSSProperties } from 'react'
import Image from 'next/image'
import Nav from '@/components/global/Nav'
import Footer from '@/components/global/Footer'

const T50: CSSProperties = {
  fontSize: 'clamp(28px,4vw,50px)',
  fontWeight: 500,
  fontFamily: "'Unica 77 LL Cyr', sans-serif",
  letterSpacing: '-2.5px',
  lineHeight: 0.8,
}

const T25: CSSProperties = {
  fontSize: 'clamp(16px,2vw,25px)',
  fontWeight: 500,
  fontFamily: "'Unica 77 LL Cyr', sans-serif",
  letterSpacing: '0.25px',
  lineHeight: 1.1,
  color: '#fff',
}

const STEPS = [
  'выбрать проект',
  'подготовить сценарий сториборд',
  'сгенерировать статичные финальные кадры для сториборда',
  'на основе статики сгенерировать видео',
  'подобрать музыку, сделать монтаж',
  'сделать голос за кадром',
  'добавить визуальные и световые решения.',
]

export default function BrandMoviesResultsPage() {
  return (
    <main style={{ backgroundColor: '#000' }}>
      <Nav dark />

      <div style={{
        maxWidth: 1000,
        margin: '0 auto',
        paddingLeft:  'clamp(20px,15vw,220px)',
        paddingRight: 'clamp(20px,15vw,220px)',
        paddingTop: 48,
        paddingBottom: 48,
        display: 'flex',
        flexDirection: 'column',
        gap: 150,
      }}>

        {/* ── S1 Page header ──────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ ...T50, color: '#79ff80' }}>brand movies oct2025 results</p>
          <p style={{ ...T50, color: '#fff' }}>
            мы делали 1 проект — рекламный ролик для выбранного бренда
          </p>
        </div>

        {/* ── S2 Process description ───────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {/* Process text + steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={T25}>
              сначала была теория и практика, затем каждый участник прошел по профессиональному процессу:
            </p>
            <ol style={{ paddingLeft: 24, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STEPS.map((step, i) => (
                <li key={i} style={T25}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Review intro */}
          <p style={T25}>вот один из отзывов</p>

          {/* Review screenshot */}
          <div style={{ width: '100%', borderRadius: 8, overflow: 'hidden' }}>
            <Image
              src="/images/brand-movies-review.jpg"
              alt="отзыв участника"
              width={1418}
              height={996}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

        {/* ── S3 Student works ────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <p style={{ ...T50, color: '#fff' }}>а вот работа лизы и всех остальных:</p>

          {/* Video placeholders */}
          {[0, 1].map(i => (
            <div key={i} style={{
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#d9d9d9',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ fontSize: 16, color: '#7c7c7c', fontFamily: "'Unica 77 LL Cyr', sans-serif" }}>
                видео
              </p>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </main>
  )
}

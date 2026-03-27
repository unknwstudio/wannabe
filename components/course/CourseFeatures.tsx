import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY: React.CSSProperties = { paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)' }

type Feature = { main: string; sub: string; italic?: string }

const DEFAULTS: Feature[] = [
  { main: 'концептуальный', sub: 'подход к дизайну' },
  { main: 'работа с', sub: 'реальными проектами', italic: 'реальными' },
  { main: 'международный', sub: 'уровень качества' },
  { main: 'арт-дирекшн', sub: 'и визуальный язык' },
]

export default function CourseFeatures({ features = DEFAULTS }: { features?: Feature[] }) {
  return (
    <section style={{ background: '#1c1a31', ...PX, ...PY }}>
      <p className="font-panama text-display-sm" style={{ color: '#fff', textAlign: 'center', margin: '0 0 48px' }}>
        почему это работает
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="text-feature" style={{ color: '#fff', margin: 0, fontWeight: 500 }}>
              {f.italic ? (
                <>
                  {f.main.split(f.italic)[0]}
                  <span className="font-saint">{f.italic}</span>
                  {f.main.split(f.italic)[1]}
                </>
              ) : f.main}
            </p>
            <p className="text-feature font-panama" style={{ color: '#4ef968', margin: 0 }}>{f.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

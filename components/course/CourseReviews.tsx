import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY: React.CSSProperties = { paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)' }

type VideoCard = { name: string; role: string; thumb?: string }

const DEFAULTS: VideoCard[] = [
  { name: 'Аня К.', role: 'UI/UX дизайнер' },
  { name: 'Серёжа Л.', role: 'Product Designer' },
  { name: 'Оля В.', role: 'Графический дизайнер' },
  { name: 'Паша Р.', role: 'Junior Designer' },
  { name: 'Катя М.', role: 'Art Director' },
]

const CSS = `
  .cr-top { display:flex; gap:48px; flex-wrap:wrap; margin-bottom:24px; }
  .cr-stats { display:flex; gap:48px; flex-wrap:wrap; }
  .cr-videos { display:flex; gap:4px; flex-wrap:wrap; }
  .cr-videos > * { flex:1; min-width:140px; }
  .cr-thumb { position:relative; aspect-ratio:9/16; background:#eaeaea; border-radius:8px; overflow:hidden; display:flex; align-items:center; justify-content:center; }
  @media(max-width:600px){ .cr-top{ flex-direction:column; } }
`

export default function CourseReviews({
  heading = 'отзывы',
  description = 'уже более 500 дизайнеров прошли через наши программы и изменили свою карьеру',
  stats = [{ number: '500+', label: 'выпускников' }, { number: '4.9', label: 'средняя оценка' }],
  featuredReview = {
    name: 'Маша Тихонова',
    date: '15 марта 2025',
    quote: 'Это был переломный момент в моей карьере. После курса я получила оффер в международную студию.',
  },
  videos = DEFAULTS,
}: {
  heading?: string
  description?: string
  stats?: { number: string; label: string }[]
  featuredReview?: { name: string; date: string; quote: string }
  videos?: VideoCard[]
}) {
  return (
    <section style={{ background: '#eaeaea', ...PX, ...PY }}>
      <style>{CSS}</style>
      <p className="text-h2" style={{ color: '#1c1a31', margin: '0 0 48px' }}>{heading}</p>

      {/* Top row */}
      <div className="cr-top">
        <p className="text-h3" style={{ color: '#1c1a31', flex: 1, margin: 0 }}>{description}</p>
        <div className="cr-stats">
          {stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p className="text-stat" style={{ color: '#1c1a31', margin: 0, fontWeight: 500 }}>{s.number}</p>
              <p className="text-h3" style={{ color: '#7c7c7c', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured review */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <span className="text-small" style={{ color: '#1c1a31' }}>{featuredReview.name}</span>
          <span className="text-small" style={{ color: '#7c7c7c' }}>{featuredReview.date}</span>
        </div>
        <p className="text-h3" style={{ color: '#1c1a31', margin: '0 0 16px' }}>{featuredReview.quote}</p>
        <button style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', fontSize: 14, color: '#1c1a31', textDecoration: 'underline', cursor: 'pointer' }}>Читать полностью →</button>
      </div>

      {/* Video cards */}
      <div className="cr-videos">
        {videos.map((v, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 12 }}>
            <div className="cr-thumb">
              {v.thumb ? <img src={v.thumb} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
              <div style={{ position: 'absolute', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: 16 }}>▶</span>
              </div>
            </div>
            <p className="text-small" style={{ color: '#1c1a31', margin: '8px 0 2px' }}>{v.name}</p>
            <p className="text-small" style={{ color: '#7c7c7c', margin: 0 }}>{v.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

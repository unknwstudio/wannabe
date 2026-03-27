import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY: React.CSSProperties = { paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)' }

type CorporateCard = { number: string; text: string; highlight?: string }

const DEFAULTS: CorporateCard[] = [
  { number: '01', text: 'от 3 человек — скидка ', highlight: '10%' },
  { number: '02', text: 'от 5 человек — скидка ', highlight: '20%' },
]

export default function CourseCorporate({
  heading = 'корпоративное обучение',
  description = 'обучайте команду дизайнеров целиком — специальные условия для групп',
  cards = DEFAULTS,
  ctaLabel = 'Оставить заявку →',
}: {
  heading?: string
  description?: string
  cards?: CorporateCard[]
  ctaLabel?: string
}) {
  return (
    <section style={{ background: '#fff', ...PX, ...PY }}>
      <p className="text-h2" style={{ color: '#1c1a31', margin: '0 0 16px' }}>{heading}</p>
      <p className="text-body" style={{ color: '#7c7c7c', margin: '0 0 48px' }}>{description}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 }}>
        {cards.map((c) => (
          <div key={c.number} style={{ background: '#eaeaea', borderRadius: 12, padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <span className="text-body" style={{ color: '#7c7c7c', width: 72, flexShrink: 0 }}>{c.number}</span>
            <p className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>
              {c.text}
              {c.highlight && <strong style={{ color: '#1c1a31' }}>{c.highlight}</strong>}
            </p>
          </div>
        ))}
      </div>

      <button className="btn-subscribe-black" style={{ borderRadius: 40, width: '100%' }}>
        <span>{ctaLabel}</span><span />
      </button>
    </section>
  )
}

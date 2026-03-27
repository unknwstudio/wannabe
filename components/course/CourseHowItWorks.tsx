import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY: React.CSSProperties = { paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)' }

type Step = { number: string; title: string; subtitle: string }

const DEFAULTS: Step[] = [
  { number: '01', title: 'смотришь лекции', subtitle: 'в удобное время — видео доступны в личном кабинете' },
  { number: '02', title: 'делаешь практику', subtitle: 'задания по каждой теме с проверкой от кураторов' },
  { number: '03', title: 'получаешь фидбек', subtitle: 'арт-директора проверяют работы и дают подробные комментарии' },
  { number: '04', title: 'защищаешь концепт', subtitle: 'финальная презентация перед командой арт-директоров' },
]

export default function CourseHowItWorks({ steps = DEFAULTS, heading = 'как всё устроено' }: { steps?: Step[]; heading?: string }) {
  return (
    <section style={{ background: '#eaeaea', ...PX, ...PY }}>
      <p className="text-h1" style={{ color: '#1c1a31', margin: '0 0 48px' }}>{heading}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {steps.map((s) => (
          <div key={s.number} style={{ background: '#fff', borderRadius: 12, padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <span className="text-small" style={{ color: '#7c7c7c', width: 72, flexShrink: 0 }}>{s.number}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p className="text-body" style={{ color: '#1c1a31', margin: 0, fontWeight: 500 }}>{s.title}</p>
              <p className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>{s.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

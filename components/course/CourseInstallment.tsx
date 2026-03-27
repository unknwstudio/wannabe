import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY: React.CSSProperties = { paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)' }

type InstallmentStep = { step: string; description: string; note?: string; mockupLabel: string }

const DEFAULTS: InstallmentStep[] = [
  {
    step: 'шаг 1',
    description: 'нажми «оплатить в рассрочку» на странице оформления',
    note: 'без банка, без процентов',
    mockupLabel: 'страница оформления',
  },
  {
    step: 'шаг 2',
    description: 'выбери удобный срок: 3, 6 или 12 месяцев',
    mockupLabel: 'выбор срока рассрочки',
  },
]

export default function CourseInstallment({ heading = 'рассрочка без банка', description, steps = DEFAULTS }: { heading?: string; description?: string; steps?: InstallmentStep[] }) {
  return (
    <section style={{ background: '#eaeaea', ...PX, ...PY }}>
      <p className="text-h2" style={{ color: '#1c1a31', margin: '0 0 16px' }}>{heading}</p>
      {description && (
        <p className="text-body" style={{ color: '#7c7c7c', margin: '0 0 48px' }}>
          {description}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {/* Left */}
              <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span className="text-small" style={{ border: '1px solid #cacaca', borderRadius: 40, padding: '4px 12px', display: 'inline-block', color: '#7c7c7c' }}>{s.step}</span>
                <p className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>{s.description}</p>
                {s.note && <p className="text-small" style={{ color: '#7c7c7c', margin: 0 }}>{s.note}</p>}
              </div>
              {/* Right — UI mockup */}
              <div style={{ flex: 1, minWidth: 200, background: '#eaeaea', borderRadius: 8, padding: 16 }}>
                <p className="text-small" style={{ color: '#7c7c7c', margin: 0 }}>{s.mockupLabel}</p>
                <div style={{ marginTop: 12, height: 60, background: '#cacaca', borderRadius: 4 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', fontSize: 14, color: '#1c1a31', textDecoration: 'underline', cursor: 'pointer' }}>
        Посмотреть все шаги →
      </button>
    </section>
  )
}

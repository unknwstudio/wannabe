import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY: React.CSSProperties = { paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)' }

type Column = { label: string; items: string[]; outro: string; outroColor: string; courseTag: string }

const DEFAULTS: Column[] = [
  {
    label: 'если тебе важно:',
    items: ['работать с концептом', 'арт-дирекшн и визуальный язык', 'нестандартные решения'],
    outro: 'тебе на',
    outroColor: '#ff6225',
    courseTag: 'next level concepts',
  },
  {
    label: 'если тебе важно:',
    items: ['системный подход к продукту', 'ux и пользовательское мышление', 'интерфейсная логика'],
    outro: 'тебе на',
    outroColor: '#ff6225',
    courseTag: 'superpowered',
  },
]

const CSS = `
  .ccg-cols { display:flex; gap:48px; flex-wrap:wrap; }
  .ccg-col { flex:1; min-width:260px; display:flex; flex-direction:column; gap:16px; }
  @media(max-width:600px){ .ccg-cols{ flex-direction:column; } }
`

export default function CourseChoiceGuide({ columns = DEFAULTS, heading = 'как выбрать курс' }: { columns?: Column[]; heading?: string }) {
  return (
    <section style={{ background: '#1c1a31', ...PX, ...PY }}>
      <style>{CSS}</style>
      <p className="font-panama text-display-sm" style={{ color: '#fff', textAlign: 'center', margin: '0 0 48px' }}>{heading}</p>

      <div className="ccg-cols">
        {columns.map((col, ci) => (
          <div key={ci} className="ccg-col">
            <p className="text-body-xl" style={{ color: '#fff', margin: 0, fontWeight: 500 }}>{col.label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {col.items.map((item, ii) => (
                <p key={ii} className="text-body-lg" style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>{item}</p>
              ))}
            </div>
            <p className="text-body-lg" style={{ margin: 0 }}>
              <span style={{ color: col.outroColor }}>{col.outro} </span>
              <span style={{ color: '#4ef968', fontWeight: 500 }}>{col.courseTag}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

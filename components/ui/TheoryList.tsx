'use client'
import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }

const HR = () => <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.3)', margin: 0 }} />

const topics = [
  { title: 'experimental ux',               desc: 'нестандартные паттерны взаимодействия и ux нового поколения',                color: '#fff'    },
  { title: 'все детали ui',                 desc: 'полный разбор интерфейсных компонентов: от типографики до микроанимаций',    color: '#fff'    },
  { title: 'experimental ui',               desc: 'экспериментальные визуальные решения и нестандартные подходы к дизайну',    color: '#fff'    },
  { title: 'after effects base & advanced', desc: 'базовые и продвинутые техники моушн-дизайна для дизайнеров интерфейсов',   color: '#fff'    },
  { title: 'claude code',                   desc: 'разработка интерфейсов с помощью ai инструментов нового поколения',         color: '#FF6225' },
  { title: 'ai static & motion',            desc: 'создание статичных и анимированных материалов с помощью ai',                color: '#4EF968' },
]

const CSS = `
  .tl-item { display:flex; flex-direction:column; gap:20px; padding:48px 0; }
  @media(max-width:600px) {
    .tl-item { gap:6px; padding:30px 0; }
  }
`

export default function TheoryList() {
  return (
    <section style={{ ...PX, paddingBottom: 90 }}>
      <style>{CSS}</style>
      <HR />
      <p className="text-h2" style={{ color: '#fff', textAlign: 'center', padding: '48px 0', margin: 0 }}>теория</p>
      {topics.map(({ title, desc, color }) => (
        <React.Fragment key={title}>
          <HR />
          <div className="tl-item">
            <p className="text-h3" style={{ color, margin: 0 }}>{title}</p>
            <p className="text-body" style={{ color, margin: 0 }}>{desc}</p>
          </div>
        </React.Fragment>
      ))}
    </section>
  )
}

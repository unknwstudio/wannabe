import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY: React.CSSProperties = { paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)' }

type Guest = { name: string; photo?: string }

const DEFAULTS: Guest[] = [
  { name: 'Катя Соловьёва' },
  { name: 'Иван Петров' },
  { name: 'Маша Тихонова' },
  { name: 'Антон Дмитриев' },
]

const CSS = `
  .cg-grid { display:flex; gap:16px; flex-wrap:wrap; }
  .cg-grid > * { flex:1; min-width:140px; display:flex; flex-direction:column; align-items:center; gap:16px; }
`

export default function CourseGuests({ guests = DEFAULTS, heading = 'гости' }: { guests?: Guest[]; heading?: string }) {
  return (
    <section style={{ background: '#1c1a31', ...PX, ...PY, position: 'relative', overflow: 'hidden' }}>
      <style>{CSS}</style>

      {/* Watermark */}
      <p
        className="tracking-watermark font-panama"
        aria-hidden
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontSize: 250, color: 'rgba(255,255,255,0.04)',
          whiteSpace: 'nowrap', pointerEvents: 'none', margin: 0, lineHeight: 1,
        }}
      >
        гости
      </p>

      <p className="font-panama text-display-sm" style={{ color: '#fff', textAlign: 'center', margin: '0 0 48px', position: 'relative' }}>{heading}</p>

      <div className="cg-grid" style={{ position: 'relative' }}>
        {guests.map((g, i) => (
          <div key={i}>
            {g.photo ? (
              <img src={g.photo} alt={g.name} style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: 150, height: 150, borderRadius: '50%', background: '#2a2550', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="text-h3" style={{ color: '#cfbeff' }}>{g.name[0]}</span>
              </div>
            )}
            <p className="text-body" style={{ color: '#fff', margin: 0, textAlign: 'center' }}>{g.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

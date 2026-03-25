'use client'
import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const CARD: React.CSSProperties = { padding: '21px 23px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }

function Sub({ text, color = '#fff', center = false, maxWidth }: { text: string; color?: string; center?: boolean; maxWidth?: number }) {
  return <p className="text-body" style={{ color, textAlign: center ? 'center' : undefined, width: '100%', maxWidth, margin: 0 }}>{text}</p>
}

const CSS = `
  .ps-row1 { display:flex; gap:5px; height:clamp(300px,35vw,480px); }
  .ps-ca { width:clamp(200px,22vw,313px); background:#6243F5; border-radius:30px; }
  .ps-cb { flex:1; background:#4EF968; border-radius:999px; }
  .ps-cc { background:#FF6225; border-radius:999px; width:100%; height:clamp(300px,35vw,480px); }
  .ps-row3 { background:#000; padding:10px; border-radius:0; }
  .ps-cd { border:1px solid #fff; border-radius:999px; height:clamp(300px,35vw,480px); }
  .ps-nowrap { white-space:nowrap; }
  @media(max-width:600px) {
    .ps-row1 { flex-direction:column; height:auto; }
    .ps-ca,.ps-cb { width:100%; height:clamp(300px,35vw,480px); border-radius:120px; }
    .ps-cc { border-radius:30px; }
    .ps-row3 { border-radius:150px; }
    .ps-cd { border-radius:140px; }
    .ps-nowrap { white-space:normal; }
  }
`

export default function ProgramStages() {
  return (
    <section style={{ background: '#1C1A31', ...PX, paddingTop: 20, paddingBottom: 20 }}>
      <style>{CSS}</style>
      <p className="text-h2" style={{ color: '#fff', textAlign: 'center', maxWidth: 789, margin: '0 auto 48px' }}>в новом сезоне пройдём этапы создания концептов будущего</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

        {/* Row 1 */}
        <div className="ps-row1">
          <div className="ps-ca" style={{ ...CARD, height: '100%' }}>
            <p className="text-h2" style={{ color: '#fff' }}>ideation</p>
            <div>
              <img src="/images/stage-ideation.png" alt="" style={{ width: 155, height: 190, objectFit: 'contain', mixBlendMode: 'screen', display: 'block', marginBottom: 8 }} />
              <Sub text="начало работы: исследование, синтез, поиск идей" />
            </div>
          </div>
          <div className="ps-cb" style={{ ...CARD, height: '100%', alignItems: 'center' }}>
            <p className="text-h2" style={{ color: '#1C1A31', textAlign: 'center' }}>concept</p>
            <img src="/images/stage-concept.png" alt="" style={{ width: 236, height: 202, objectFit: 'contain', mixBlendMode: 'screen' }} />
            <Sub text="визуализация и оформление концепции" color="#1C1A31" center />
          </div>
        </div>

        {/* Row 2 */}
        <div className="ps-cc" style={{ ...CARD, alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
          <p className="text-h2 ps-nowrap" style={{ color: '#fff', position: 'relative', zIndex: 1 }}>design development</p>
          <img src="/images/stage-development.png" alt="" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 1000, height: 500, objectFit: 'contain', mixBlendMode: 'screen' }} />
          <Sub text="детальная проработка всех элементов концепта" center maxWidth={330} />
        </div>

        {/* Row 3 */}
        <div className="ps-row3">
          <div className="ps-cd" style={{ ...CARD, alignItems: 'center', overflow: 'hidden', textAlign: 'center' }}>
            <p className="text-h2" style={{ color: '#fff' }}>showcase</p>
            <Sub text="финальная презентация и защита перед командой арт-директоров" center maxWidth={582} />
            <Sub text="твой новый кейс мирового уровня готов" center />
          </div>
        </div>

      </div>
    </section>
  )
}

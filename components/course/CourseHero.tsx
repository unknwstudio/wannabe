'use client'
import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }

const CSS = `
  .ch-root { position:relative; min-height:100vh; background:#1c1a31; color:#fff; display:flex; flex-direction:column; }
  .ch-bg { position:absolute; inset:0; z-index:0; }
  .ch-bg img { width:100%; height:100%; object-fit:cover; opacity:0.3; }
  .ch-inner { position:relative; z-index:1; display:flex; flex-direction:column; flex:1; }
  .ch-announce { width:100%; padding:10px 24px; background:linear-gradient(90deg,#8f67ff,#cfbeff); display:flex; justify-content:space-between; align-items:center; }
  .ch-nav { display:flex; justify-content:space-between; align-items:center; padding:16px 0; }
  .ch-nav-l { display:flex; align-items:center; gap:24px; }
  .ch-tabs { display:flex; gap:4px; flex-wrap:wrap; }
  .ch-center { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:48px 0; gap:24px; }
  .ch-cta-card { background:rgba(127,255,255,0.9); border-radius:90px; padding:24px 48px; display:flex; flex-direction:column; align-items:center; gap:16px; max-width:560px; width:100%; }
  .ch-cta-btns { display:flex; gap:16px; align-items:center; flex-wrap:wrap; justify-content:center; }
  @media(max-width:600px){ .ch-announce{ flex-direction:column; gap:4px; } .ch-cta-card{ padding:24px 24px; } }
`

type CourseHeroProps = {
  announcementLeft?: string
  announcementRight?: string
  title?: string
  subtitle?: string
  speakerAvatar?: string
  speakerName?: string
  priceLabel?: string
  priceNote?: string
  ctaLabel?: string
}

export default function CourseHero({
  announcementLeft = 'скоро старт нового сезона',
  announcementRight = 'набор открыт до 15 апреля',
  title = 'next level concepts',
  subtitle = 'интенсив по концептуальному дизайну для продвинутых дизайнеров',
  speakerAvatar,
  speakerName = 'Миша Розов',
  priceLabel = 'от 29 900 ₽',
  priceNote = 'старт 22 апреля · 6 недель',
  ctaLabel = 'участвовать',
}: CourseHeroProps) {
  return (
    <div className="ch-root">
      <style>{CSS}</style>

      {/* Background */}
      <div className="ch-bg">
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg,#2a2550 0%,#1c1a31 60%)' }} />
      </div>

      <div className="ch-inner">
        {/* Announcement bar */}
        <div className="ch-announce">
          <span className="text-small">{announcementLeft}</span>
          <span className="text-small">{announcementRight}</span>
        </div>

        {/* Nav */}
        <div style={PX}>
          <div className="ch-nav">
            <div className="ch-nav-l">
              <span className="text-body" style={{ fontWeight: 700, color: '#fff' }}>wannabe</span>
              <div className="ch-tabs">
                {['дизайн', 'продакт', 'конференция'].map(tab => (
                  <span key={tab} className="chip" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none' }}>{tab}</span>
                ))}
              </div>
            </div>
            <button className="btn-subscribe" style={{ borderRadius: 40 }}>профиль</button>
          </div>
        </div>

        {/* Center content */}
        <div className="ch-center" style={PX}>
          <p className="text-display font-panama" style={{ color: '#fff', margin: 0, maxWidth: 900 }}>{title}</p>

          {speakerAvatar ? (
            <img src={speakerAvatar} alt={speakerName} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#cfbeff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="text-small">{speakerName[0]}</span>
            </div>
          )}

          <p className="text-body" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: 0 }}>{subtitle}</p>

          {/* Mint CTA card */}
          <div className="ch-cta-card">
            <p className="text-h3" style={{ color: '#1c1a31', margin: 0 }}>{priceLabel}</p>
            <p className="text-small" style={{ color: '#1c1a31', margin: 0 }}>{priceNote}</p>
            <div className="ch-cta-btns">
              <button style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 90, padding: '12px 32px', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer' }}>{ctaLabel}</button>
              <button style={{ background: 'none', border: 'none', color: '#1c1a31', textDecoration: 'underline', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer' }}>задать вопрос</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

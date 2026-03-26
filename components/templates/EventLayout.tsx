'use client'
import React, { useState } from 'react'
import Footer from '@/components/global/Footer'
import { getPersonById } from '@/lib/persons'

type EventLayoutProps = {
  badges: string[]
  title: string
  ctaLabel: string
  description: string
  eventDate: string
  eventInfo: string
  speakerId?: string
  speakerAvatar?: string
  speakerName?: string
  speakerRoles?: string[]
  quote: string
  quoteHighlight: string
  forWhomTitle: string
  forWhom: { number: string; boldText: string; text: string }[]
  programTitle: string
  programDate: string
  programItems: { number: string; text: string }[]
  speakerSectionTitle: string
  speakerAbout: { icon: string; text: string; links?: { label: string; href: string }[] }[]
  hosts?: {
    title: string
    speakerIds: string[]
  }
  formDate: string
  formInfo: string
  formEndpoint: string
}

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY = { paddingTop: 'clamp(40px,6vw,90px)' as const, paddingBottom: 'clamp(40px,6vw,90px)' as const }
const PLAIN: React.CSSProperties = { background: '#fff', borderRadius: 12, padding: 24 }
const CARD: React.CSSProperties = { background: '#fff', borderRadius: 12, padding: 24 }
const BG: React.CSSProperties = { background: '#e5e5e5', ...PX, paddingBottom: 'clamp(40px,6vw,90px)' }

const CSS = `
  .ev-hero { display:flex; gap:48px; align-items:flex-start; padding-top:clamp(40px,6vw,90px); }
  .ev-hero-l { flex:1; min-width:0; }
  .ev-hero-r { width:clamp(180px,18vw,240px); flex-shrink:0; }
  .ev-two { display:flex; gap:48px; align-items:flex-start; }
  .ev-quote { display:flex; gap:24px; align-items:flex-start; }
  .ev-cards { display:flex; gap:4px; flex-wrap:wrap; }
  .ev-cards > * { flex:1; min-width:180px; }
  .ev-prog > * + * { margin-top:4px; }
  .ev-hosts { display:flex; gap:4px; flex-wrap:wrap; }
  .ev-hosts > * { flex:1; min-width:200px; }
  @media(max-width:600px) {
    .ev-hero, .ev-two, .ev-quote { flex-direction:column; }
    .ev-hero-r { width:100%; }
  }
`

export default function EventLayout(p: EventLayoutProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', question: '' })
  const hi = p.quote.indexOf(p.quoteHighlight)
  const [datePart, ...restParts] = p.formDate.split(' ')

  const person = p.speakerId ? getPersonById(p.speakerId) : null
  const speakerPhoto = person?.photo || p.speakerAvatar || ''
  const speakerName  = person?.name  || p.speakerName  || ''
  const speakerRoles = person?.roles || p.speakerRoles || []

  return (
    <div>
      <style>{CSS}</style>

      {/* 1 — Hero */}
      <section style={{ background: '#e5e5e5', ...PX }}>
        <div className="ev-hero">
          <div className="ev-hero-l">
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
              {p.badges.map(b => <span key={b} className="chip">{b}</span>)}
            </div>
            <p className="text-h1" style={{ margin: '0 0 24px' }}>{p.title}</p>
            <button className="btn-subscribe-black" style={{ marginBottom: 16 }}><span>{p.ctaLabel}</span><span>↓</span></button>
            <p className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>{p.description}</p>
          </div>
          <div className="ev-hero-r">
            <div style={{ background: '#cfbeff', borderRadius: 12, padding: 16 }}>
              <img src={speakerPhoto} alt={speakerName} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', display: 'block', marginBottom: 8 }} />
              <p className="text-small" style={{ margin: '0 0 4px' }}>{p.eventInfo}</p>
              <p className="text-h3" style={{ margin: 0 }}>{p.eventDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Quote */}
      <section style={{ ...BG, paddingTop: 'clamp(40px,6vw,90px)' }}>
        <div className="ev-quote">
          <img src={speakerPhoto} alt={speakerName} style={{ width: 128, height: 128, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          <p className="text-h3" style={{ color: '#7c7c7c', margin: 0 }}>
            {p.quote.slice(0, hi)}
            <span style={{ color: '#8f67ff' }}>{p.quoteHighlight}</span>
            {p.quote.slice(hi + p.quoteHighlight.length)}
          </p>
        </div>
      </section>

      {/* 3 — For whom */}
      <section style={BG}>
        <p className="text-h2" style={{ margin: '0 0 24px' }}>{p.forWhomTitle}</p>
        <div className="ev-cards">
          {p.forWhom.map(f => (
            <div key={f.number} style={PLAIN}>
              <p className="text-small" style={{ color: '#7c7c7c', margin: '0 0 4px' }}>{f.number}</p>
              <p className="text-body" style={{ margin: 0 }}><strong>{f.boldText}</strong>{f.text ? ` ${f.text}` : ''}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 — Program */}
      <section style={BG}>
        <p className="text-h2" style={{ margin: '0 0 16px' }}>{p.programTitle}</p>
        <p className="text-h3" style={{ color: '#8f67ff', margin: '0 0 24px' }}>{p.programDate}</p>
        <div className="ev-prog">
          {p.programItems.map(item => (
            <div key={item.number} style={{ ...PLAIN, display: 'flex', gap: 16, padding: '16px 24px' }}>
              <span className="text-body" style={{ color: '#7c7c7c', width: 72, flexShrink: 0 }}>{item.number}</span>
              <span className="text-body" style={{ color: '#000000' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — Speaker */}
      <section style={BG}>
        <p className="text-h2" style={{ margin: '0 0 24px' }}>{p.speakerSectionTitle}</p>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', width: '100%', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <img src={speakerPhoto} alt={speakerName} style={{ width: 375, height: 375, maxWidth: '100%', borderRadius: 12, objectFit: 'cover', display: 'block' }} />
            <p className="text-h3" style={{ margin: 0 }}>{speakerName}</p>
            <div>{speakerRoles.map((r, i) => <p key={i} className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>— {r}</p>)}</div>
          </div>
          <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {p.speakerAbout.map((ab, i) => (
              <div key={i} style={CARD}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#cfbeff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>{ab.icon}</span>
                  <p className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>{ab.text}</p>
                </div>
                {ab.links && (
                  <div style={{ borderTop: '1px solid #cacaca', marginTop: 16, paddingTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {ab.links.map(l => <a key={l.href} href={l.href} className="chip">{l.label}</a>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Hosts (optional) */}
      {p.hosts && (
        <section style={{ background: '#e5e5e5', ...PX, ...PY }}>
          <p className="text-h2" style={{ margin: '0 0 24px' }}>{p.hosts.title}</p>
          <div className="ev-hosts">
            {p.hosts.speakerIds.map(id => {
              const person = getPersonById(id)
              if (!person) return null
              return (
                <div key={id} style={{ ...PLAIN, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <img src={person.photo} alt={person.name} style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }} />
                  <p className="text-h3" style={{ margin: 0 }}>{person.name}</p>
                  <div>{person.roles.map((r, i) => <p key={i} className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>— {r}</p>)}</div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 7 — Registration */}
      <section style={{ background: '#fff', ...PX, ...PY }}>
        <div className="ev-two">
          <div style={{ flex: 1 }}>
            <p className="text-h3" style={{ margin: '0 0 16px' }}>
              <span style={{ color: '#8f67ff' }}>{datePart}</span>{restParts.length ? ' ' + restParts.join(' ') : ''}
            </p>
            <p className="text-body" style={{ margin: 0 }}>{p.formInfo}</p>
          </div>
          <form style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}
            onSubmit={async e => { e.preventDefault(); await fetch(p.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }) }}>
            {(['name', 'email', 'phone'] as const).map(f => (
              <input key={f} type={f === 'email' ? 'email' : 'text'}
                placeholder={f === 'name' ? 'Имя' : f === 'email' ? 'Email' : 'Телефон'}
                value={form[f]} onChange={e => setForm(s => ({ ...s, [f]: e.target.value }))}
                className="text-body" style={{ background: '#eaeaea', border: 'none', borderRadius: 4, padding: 16, outline: 'none' }} />
            ))}
            <textarea placeholder="Вопрос" value={form.question} onChange={e => setForm(s => ({ ...s, question: e.target.value }))}
              className="text-body" rows={4} style={{ background: '#eaeaea', border: 'none', borderRadius: 4, padding: 16, resize: 'vertical', fontFamily: 'inherit', outline: 'none' }} />
            <button type="submit" className="btn-subscribe-black"><span>Зарегистрироваться</span><span>→</span></button>
            <p className="text-small" style={{ color: '#7c7c7c', margin: 0 }}>
              Нажимая кнопку, я принимаю <u>условия оферты</u> и соглашаюсь на <u>обработку персональных данных</u>
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

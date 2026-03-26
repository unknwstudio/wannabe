'use client'
import React, { useState } from 'react'
import Footer from '@/components/global/Footer'
import { getPersonById } from '@/lib/persons'

type ContentSection = { headline: string; items: string[] }
type SpeakerFull = {
  speakerId: string
  description?: string
  bullets: string[]
  links?: { label: string; href: string }[]
}
export type EventLayoutProps = {
  badges?: string[]
  title: string
  ctaLabel?: string
  description?: string
  speakerIds?: string[]
  heroSubline?: string
  eventDate?: string
  quote?: string
  quoteHighlight?: string
  quoteSpeakerId?: string
  contentSections?: ContentSection[]
  speakerCardIds?: string[]
  speakerFull?: SpeakerFull
  formDate?: string
  formInfo?: string
  formEndpoint?: string
}

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY = { paddingTop: 'clamp(40px,6vw,90px)' as const, paddingBottom: 'clamp(40px,6vw,90px)' as const }
const BG: React.CSSProperties = { background: '#e5e5e5', ...PX, ...PY }
const CARD: React.CSSProperties = { background: '#fff', borderRadius: 12, padding: 16 }

const CSS = `
  .ev-hero{display:flex;gap:48px;align-items:flex-start;}
  .ev-hero-l{flex:1;min-width:0;display:flex;flex-direction:column;gap:16px;}
  .ev-hero-r{width:clamp(180px,18vw,240px);flex-shrink:0;}
  .ev-two{display:flex;gap:48px;align-items:flex-start;flex-wrap:wrap;}
  .ev-two>*{flex:1;min-width:220px;}
  .ev-quote{display:flex;gap:24px;align-items:flex-start;}
  .ev-cards{display:flex;gap:4px;flex-wrap:wrap;}
  .ev-cards>*{flex:1;min-width:180px;}
  @media(max-width:600px){
    .ev-hero,.ev-two,.ev-quote{flex-direction:column;}
    .ev-hero-r{width:100%;}
  }
`

export default function EventLayout(p: EventLayoutProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', question: '' })
  const [datePart, ...rest] = (p.formDate || '').split(' ')
  const hi = p.quote && p.quoteHighlight ? p.quote.indexOf(p.quoteHighlight) : -1
  const quotePerson = p.quoteSpeakerId ? getPersonById(p.quoteSpeakerId) : null
  const heroAvatar  = p.speakerIds?.[0] ? getPersonById(p.speakerIds[0]) : null

  return (
    <div>
      <style>{CSS}</style>

      {/* 1 — Hero */}
      <section style={{ background: '#e5e5e5', ...PX, ...PY }}>
        <div className="ev-hero">
          <div className="ev-hero-l">
            {!!p.badges?.length && <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{p.badges.map(b => <span key={b} className="chip">{b}</span>)}</div>}
            <p className="text-h1" style={{ margin: 0 }}>{p.title}</p>
            {p.ctaLabel && <button className="btn-subscribe-black"><span>{p.ctaLabel}</span><span>↓</span></button>}
            {p.description && <p className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>{p.description}</p>}
            {!!p.speakerIds?.length && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {p.speakerIds.map(id => { const q = getPersonById(id); return q ? <img key={id} src={q.photo} alt={q.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} /> : null })}
                {p.heroSubline && <p className="text-body" style={{ margin: 0 }}>{p.heroSubline}</p>}
              </div>
            )}
            {p.eventDate && <p className="text-body" style={{ margin: 0 }}>{p.eventDate}</p>}
          </div>
          {p.eventDate && (
            <div className="ev-hero-r">
              <div style={{ background: '#cfbeff', borderRadius: 12, padding: 16 }}>
                {heroAvatar && <img src={heroAvatar.photo} alt={heroAvatar.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', display: 'block', marginBottom: 8 }} />}
                <p className="text-h3" style={{ margin: 0 }}>{p.eventDate}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2 — Quote */}
      {p.quote && hi >= 0 && (
        <section style={BG}>
          <div className="ev-quote">
            {quotePerson && <img src={quotePerson.photo} alt={quotePerson.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />}
            <p className="text-h3" style={{ color: '#7c7c7c', margin: 0 }}>
              {p.quote.slice(0, hi)}<span style={{ color: '#8f67ff' }}>{p.quoteHighlight}</span>{p.quote.slice(hi + (p.quoteHighlight?.length ?? 0))}
            </p>
          </div>
        </section>
      )}

      {/* 3 — Content sections */}
      {p.contentSections?.map((sec, si) => (
        <section key={si} style={BG}>
          <p className="text-h1" style={{ margin: '0 0 24px' }}>{sec.headline}</p>
          <div className="ev-cards">{sec.items.map((item, ii) => <div key={ii} style={CARD}><p className="text-body" style={{ margin: 0 }}>{item}</p></div>)}</div>
        </section>
      ))}

      {/* 4 — Speaker cards */}
      {!!p.speakerCardIds?.length && (
        <section style={BG}>
          <p className="text-h1" style={{ margin: '0 0 24px' }}>спикеры</p>
          <div className="ev-cards">
            {p.speakerCardIds.map(id => { const q = getPersonById(id); return q ? (
              <div key={id} style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <img src={q.photo} alt={q.name} style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }} />
                <p className="text-h3" style={{ margin: 0 }}>{q.name}</p>
                <div>{q.roles.map((r, i) => <p key={i} className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>— {r}</p>)}</div>
              </div>
            ) : null })}
          </div>
        </section>
      )}

      {/* 5 — Speaker full */}
      {p.speakerFull && (() => {
        const q = getPersonById(p.speakerFull.speakerId)
        return (
          <section style={BG}>
            <p className="text-h1" style={{ margin: '0 0 24px' }}>спикер</p>
            <div className="ev-two">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {q && <><img src={q.photo} alt={q.name} style={{ width: 375, height: 375, maxWidth: '100%', borderRadius: 12, objectFit: 'cover' }} /><p className="text-h3" style={{ margin: 0 }}>{q.name}</p><div>{q.roles.map((r, i) => <p key={i} className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>— {r}</p>)}</div></>}
                {p.speakerFull.description && <p className="text-body" style={{ margin: 0 }}>{p.speakerFull.description}</p>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {p.speakerFull.bullets.map((b, i) => <p key={i} className="text-body" style={{ margin: 0 }}>{b}</p>)}
                {!!p.speakerFull.links?.length && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{p.speakerFull.links.map(l => <a key={l.href} href={l.href} className="chip">{l.label}</a>)}</div>}
              </div>
            </div>
          </section>
        )
      })()}

      {/* 6 — Form */}
      <section style={{ background: '#fff', ...PX, ...PY }}>
        <div className="ev-two">
          <div>
            {p.formDate && <p className="text-h3" style={{ margin: '0 0 16px' }}><span style={{ color: '#8f67ff' }}>{datePart}</span>{rest.length ? ' ' + rest.join(' ') : ''}</p>}
            {p.formInfo && <p className="text-body" style={{ margin: 0 }}>{p.formInfo}</p>}
          </div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            onSubmit={async e => { e.preventDefault(); if (p.formEndpoint) await fetch(p.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }) }}>
            {(['name', 'email', 'phone'] as const).map(f => (
              <input key={f} type={f === 'email' ? 'email' : 'text'} placeholder={f === 'name' ? 'Имя' : f === 'email' ? 'Email' : 'Телефон'}
                value={form[f]} onChange={e => setForm(s => ({ ...s, [f]: e.target.value }))}
                className="text-body" style={{ background: '#eaeaea', border: 'none', borderRadius: 4, padding: 16, outline: 'none' }} />
            ))}
            <textarea placeholder="Вопрос" value={form.question} onChange={e => setForm(s => ({ ...s, question: e.target.value }))}
              className="text-body" rows={4} style={{ background: '#eaeaea', border: 'none', borderRadius: 4, padding: 16, resize: 'vertical', fontFamily: 'inherit', outline: 'none' }} />
            <button type="submit" className="btn-subscribe-black"><span>Зарегистрироваться</span><span>→</span></button>
            <p className="text-small" style={{ color: '#7c7c7c', margin: 0 }}>Нажимая кнопку, я принимаю <u>условия оферты</u> и соглашаюсь на <u>обработку персональных данных</u></p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

'use client'
import React, { useState } from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY: React.CSSProperties = { paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)' }

type CourseEmailCaptureProps = {
  heading?: string
  body?: string
  placeholder?: string
  submitLabel?: string
}

export default function CourseEmailCapture({
  heading = 'будь в курсе новых программ',
  body = 'оставь email и получи подборку материалов по концептуальному дизайну бесплатно',
  placeholder = 'твой email',
  submitLabel = 'получить',
}: CourseEmailCaptureProps) {
  const [email, setEmail] = useState('')

  return (
    <section style={{ background: '#eaeaea', ...PX, ...PY, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <p className="text-stat" style={{ color: '#1c1a31', textAlign: 'center', margin: 0, fontWeight: 500 }}>{heading}</p>
      <p className="text-body" style={{ color: '#7c7c7c', textAlign: 'center', maxWidth: 480, margin: 0 }}>{body}</p>
      <form
        style={{ display: 'flex', gap: 4, width: '100%', maxWidth: 520, flexWrap: 'wrap' }}
        onSubmit={e => { e.preventDefault() }}
      >
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={placeholder}
          className="text-body"
          style={{ flex: 1, minWidth: 200, background: '#fff', border: 'none', borderRadius: 90, padding: '12px 24px', outline: 'none', fontFamily: 'inherit' }}
        />
        <button type="submit" className="btn-subscribe-black" style={{ borderRadius: 90, flexShrink: 0 }}>
          <span>{submitLabel}</span><span>→</span>
        </button>
      </form>
      <p className="text-small" style={{ color: '#7c7c7c', margin: 0, textAlign: 'center' }}>
        нажимая кнопку, я принимаю <u>условия оферты</u> и соглашаюсь на <u>обработку данных</u>
      </p>
    </section>
  )
}

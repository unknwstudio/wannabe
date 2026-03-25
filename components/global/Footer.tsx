'use client'
import { useState } from 'react'

const COURSES = ['next level concepts','next level ui','superpowered','t-shaped','ai brands shorts','ai movies shorts']
const DOCS = ['Публичная оферта','Пользовательское соглашение','Информация об «ООО»','Info@wannabelike.ru']
const RESOURCES = ['Гайды и чеклисты','Мероприятия','Клуб CPO','Телеграм-канал','Статьи']

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer style={{ background: '#000' }}>
      <div style={{
        paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)',
        paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)',
      }}>

        {/* ── Top two columns ──────────────────────── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, marginBottom: 48 }}>

          {/* Left */}
          <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column', gap: 48 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {COURSES.map(c => <a key={c} href="#" className="chip">{c}</a>)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span className="text-body" style={{ color: '#cfbeff', fontWeight: 500 }}>Документы</span>
              {DOCS.map(d => (
                <a key={d} href="#" className="text-body" style={{ color: '#fff', textDecoration: 'none' }}>{d}</a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ width: 'clamp(240px,33vw,476px)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="text-body" style={{ color: '#cfbeff', fontWeight: 500 }}>Ресурсы</span>
            {RESOURCES.map(r => (
              <a key={r} href="#" className="text-body" style={{ color: '#fff', textDecoration: 'none' }}>{r}</a>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <input
                className="input-email"
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="ivanivanov@gmail.ru"
              />
              <button className="btn-subscribe">Подписаться <span>→</span></button>
              <p className="text-small" style={{ margin: 0, color: '#7c7c7c', lineHeight: 1.4 }}>
                Нажимая кнопку, я принимаю <u>условия оферты</u> и соглашаюсь на <u>обработку персональных данных</u>
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom ───────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="text-h1" style={{ color: '#fff' }}>wannabe</span>
            <img src="/icons/wannabe-logo.svg" alt="wannabe" style={{ width: 'clamp(40px,5.3vw,76px)', filter: 'invert(1)' }} />
          </div>
          <p className="text-body" style={{ margin: 0, fontWeight: 500, color: '#fff' }}>Проект создан в 2019 году.</p>
        </div>

      </div>
    </footer>
  )
}

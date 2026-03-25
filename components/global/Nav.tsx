'use client'
import { useState } from 'react'

const COURSES = ['next level concepts','next level ui','superpowered','t-shaped','ai brands shorts','ai movies shorts']
const LINKS = ['библиотека','мероприятия','для компаний']

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #cacaca', position: 'sticky', top: 0, zIndex: 50 }}>

      {/* ── Desktop row 1 ──────────────────────────── */}
      <div className="hidden md:flex" style={{ ...PX, paddingTop: 16, paddingBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', color: '#000' }}>
          <img src="/icons/wannabe-logo.svg" alt="" style={{ width: 38, height: 38 }} />
          <span className="text-h3" style={{ letterSpacing: '-0.04em' }}>wannabe</span>
        </a>
        <div style={{ display: 'flex', gap: 24 }}>
          {LINKS.map(l => (
            <a key={l} href="#" className="text-body" style={{ textDecoration: 'none', color: '#000', letterSpacing: '0.01em' }}>{l}</a>
          ))}
        </div>
      </div>

      {/* ── Desktop row 2 ──────────────────────────── */}
      <div className="hidden md:flex" style={{ ...PX, paddingTop: 4, paddingBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {COURSES.map(c => <a key={c} href="#" className="chip">{c}</a>)}
        </div>
        <a href="#" className="chip">Профили</a>
      </div>

      {/* ── Mobile row ─────────────────────────────── */}
      <div className="flex md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', color: '#000' }}>
          <img src="/icons/wannabe-logo.svg" alt="" style={{ width: 30, height: 30 }} />
          <span className="text-h3" style={{ letterSpacing: '-0.04em' }}>wannabe</span>
        </a>
        <button className="btn-menu" onClick={() => setOpen(o => !o)}>
          {open ? '×меню' : '+меню'}
        </button>
      </div>

      {/* ── Mobile overlay ─────────────────────────── */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 40, padding: '80px 24px 24px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
          {LINKS.map(l => (
            <a key={l} href="#" onClick={() => setOpen(false)}
              className="text-h4" style={{ textDecoration: 'none', color: '#000' }}>{l}</a>
          ))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 16 }}>
            {COURSES.map(c => <a key={c} href="#" className="chip" onClick={() => setOpen(false)}>{c}</a>)}
          </div>
        </div>
      )}
    </nav>
  )
}

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
          <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 38, height: 38, flexShrink: 0 }}><path d="M51.3874 76.3165C59.6535 78.5028 68.3465 78.5028 76.6126 76.3165C78.9117 75.7043 81.3642 76.2837 83.1488 77.8578L113.355 104.487C110.356 108.181 106.94 111.537 103.184 114.478L78.3205 92.5605C77.2366 91.5985 75.7367 91.2487 74.3353 91.6204C72.4303 92.1233 71.1165 93.8395 71.1165 95.8071V127.596C68.7845 127.858 66.4087 128 64 128C61.5914 128 59.2156 127.858 56.8835 127.596V95.8071C56.8835 93.8395 55.5588 92.1233 53.6647 91.6204C52.2633 91.2487 50.7743 91.5985 49.6795 92.5605L24.8157 114.478C21.0604 111.537 17.6445 108.181 14.6446 104.487L44.8512 77.8578C46.6358 76.2837 49.0883 75.7043 51.3874 76.3165Z" fill="currentColor"/><path d="M81.6139 67.6674C79.3772 59.4268 75.0307 51.9101 69.0013 45.8558C67.3208 44.1738 66.5971 41.7636 67.0701 39.4334L75.064 0C79.7687 0.746513 84.3875 2.0222 88.8157 3.79906L82.237 36.257C81.9446 37.6752 82.3911 39.147 83.4142 40.1729C84.8028 41.5688 86.9484 41.8467 88.6551 40.8628L116.228 24.9686C117.621 26.8539 118.932 28.8371 120.137 30.9198C121.341 33.0025 122.406 35.1279 123.344 37.2755L95.7715 53.1697C94.0648 54.1536 93.2386 56.1572 93.7495 58.0463C94.1278 59.4439 95.1757 60.5565 96.5575 61.0222L128 71.5627C127.327 76.2801 126.124 80.9118 124.419 85.3531L86.2189 72.5485C83.9612 71.7924 82.2325 69.9615 81.6139 67.6674Z" fill="currentColor"/><path d="M58.9987 45.8558C52.9693 51.9102 48.6228 59.4268 46.3861 67.6674C45.7675 69.9615 44.0388 71.7924 41.7811 72.5485L3.58065 85.3531C1.8758 80.9118 0.672898 76.2802 0 71.5628L31.4425 61.0223C32.8188 60.566 33.8722 59.444 34.2505 58.0464C34.7669 56.1477 33.9352 54.1536 32.2285 53.1698L4.65602 37.2756C5.59447 35.1279 6.6591 33.0026 7.86343 30.9199C9.06775 28.8372 10.3789 26.8539 11.7725 24.9687L39.345 40.8629C41.0516 41.8467 43.2026 41.5593 44.5858 40.173C45.6089 39.147 46.05 37.6847 45.763 36.257L39.1843 3.7991C43.6125 2.02224 48.2313 0.746548 52.936 3.41457e-05L60.9299 39.4335C61.4029 41.7636 60.6792 44.1739 58.9987 45.8558Z" fill="currentColor"/></svg>
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
          <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 30, height: 30, flexShrink: 0 }}><path d="M51.3874 76.3165C59.6535 78.5028 68.3465 78.5028 76.6126 76.3165C78.9117 75.7043 81.3642 76.2837 83.1488 77.8578L113.355 104.487C110.356 108.181 106.94 111.537 103.184 114.478L78.3205 92.5605C77.2366 91.5985 75.7367 91.2487 74.3353 91.6204C72.4303 92.1233 71.1165 93.8395 71.1165 95.8071V127.596C68.7845 127.858 66.4087 128 64 128C61.5914 128 59.2156 127.858 56.8835 127.596V95.8071C56.8835 93.8395 55.5588 92.1233 53.6647 91.6204C52.2633 91.2487 50.7743 91.5985 49.6795 92.5605L24.8157 114.478C21.0604 111.537 17.6445 108.181 14.6446 104.487L44.8512 77.8578C46.6358 76.2837 49.0883 75.7043 51.3874 76.3165Z" fill="currentColor"/><path d="M81.6139 67.6674C79.3772 59.4268 75.0307 51.9101 69.0013 45.8558C67.3208 44.1738 66.5971 41.7636 67.0701 39.4334L75.064 0C79.7687 0.746513 84.3875 2.0222 88.8157 3.79906L82.237 36.257C81.9446 37.6752 82.3911 39.147 83.4142 40.1729C84.8028 41.5688 86.9484 41.8467 88.6551 40.8628L116.228 24.9686C117.621 26.8539 118.932 28.8371 120.137 30.9198C121.341 33.0025 122.406 35.1279 123.344 37.2755L95.7715 53.1697C94.0648 54.1536 93.2386 56.1572 93.7495 58.0463C94.1278 59.4439 95.1757 60.5565 96.5575 61.0222L128 71.5627C127.327 76.2801 126.124 80.9118 124.419 85.3531L86.2189 72.5485C83.9612 71.7924 82.2325 69.9615 81.6139 67.6674Z" fill="currentColor"/><path d="M58.9987 45.8558C52.9693 51.9102 48.6228 59.4268 46.3861 67.6674C45.7675 69.9615 44.0388 71.7924 41.7811 72.5485L3.58065 85.3531C1.8758 80.9118 0.672898 76.2802 0 71.5628L31.4425 61.0223C32.8188 60.566 33.8722 59.444 34.2505 58.0464C34.7669 56.1477 33.9352 54.1536 32.2285 53.1698L4.65602 37.2756C5.59447 35.1279 6.6591 33.0026 7.86343 30.9199C9.06775 28.8372 10.3789 26.8539 11.7725 24.9687L39.345 40.8629C41.0516 41.8467 43.2026 41.5593 44.5858 40.173C45.6089 39.147 46.05 37.6847 45.763 36.257L39.1843 3.7991C43.6125 2.02224 48.2313 0.746548 52.936 3.41457e-05L60.9299 39.4335C61.4029 41.7636 60.6792 44.1739 58.9987 45.8558Z" fill="currentColor"/></svg>
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

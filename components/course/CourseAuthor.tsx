import React from 'react'

type CourseAuthorProps = {
  imageSrc?: string
  authorLabel?: string
}

const CSS = `
  .ca-root { position:relative; min-height:clamp(400px,50vw,700px); background:#1c1a31; overflow:hidden; display:flex; align-items:flex-end; justify-content:center; }
  .ca-img { position:absolute; inset:0; }
  .ca-img img { width:100%; height:100%; object-fit:cover; }
  .ca-badge-wrap { position:relative; z-index:1; padding:48px; display:flex; justify-content:center; }
  .ca-badge-outer { border:1px solid #fff; border-radius:40px; padding:4px; }
  .ca-badge-inner { background:#4ef968; border-radius:36px; padding:12px 24px; display:flex; align-items:center; gap:12px; }
`

export default function CourseAuthor({
  imageSrc,
  authorLabel = 'автор и ведущий интенсива',
}: CourseAuthorProps) {
  return (
    <div className="ca-root">
      <style>{CSS}</style>

      {/* Author image / background */}
      <div className="ca-img">
        {imageSrc ? (
          <img src={imageSrc} alt="Автор курса" />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg,#2a2550 0%,#1c1a31 100%)' }} />
        )}
      </div>

      {/* Badge */}
      <div className="ca-badge-wrap">
        <div className="ca-badge-outer">
          <div className="ca-badge-inner">
            {/* Wannabe logomark placeholder */}
            <div style={{ width: 24, height: 24, background: '#1c1a31', borderRadius: 4 }} aria-hidden />
            <span className="font-panama text-body" style={{ color: '#1c1a31', fontWeight: 500 }}>{authorLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

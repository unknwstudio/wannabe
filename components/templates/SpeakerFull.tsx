'use client'
import Image from 'next/image'
import { getPersonById } from '@/lib/persons'

type Bullet =
  | { type: 'text'; text: string }
  | { type: 'text+link'; text: string; link: { label: string; href: string } }

type SpeakerFullProps = {
  speakerId: string
  sectionTitle?: string
  bullets: Bullet[]
  links?: { label: string; href: string }[]
}

const PX: React.CSSProperties = {
  paddingLeft: 'clamp(20px,15vw,220px)',
  paddingRight: 'clamp(20px,15vw,220px)',
}
const PY: React.CSSProperties = {
  paddingTop: 'clamp(40px,6vw,90px)',
  paddingBottom: 'clamp(40px,6vw,90px)',
}

const CSS = `
  .sf-row { display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap; }
  .sf-left { flex:1; max-width:375px; display:flex; flex-direction:column; gap:24px; }
  .sf-right { flex:1; min-width:220px; display:flex; flex-direction:column; gap:12px; }
  @media(max-width:600px){ .sf-row{ flex-direction:column; } .sf-left{ max-width:100%; } }
`

export default function SpeakerFull({ speakerId, sectionTitle, bullets, links }: SpeakerFullProps) {
  const person = getPersonById(speakerId)
  if (!person) return null

  const displayRoles = person.shortRoles ?? person.roles

  return (
    <section style={{ background: '#e5e5e5', ...PX, ...PY }}>
      <style>{CSS}</style>
      <p className="text-h2" style={{ margin: '0 0 48px' }}>{sectionTitle ?? 'Спикер'}</p>

      <div className="sf-row">
        {/* Left col — photo + name + roles */}
        <div className="sf-left">
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden' }}>
            <Image
              src={person.photo}
              alt={person.name}
              fill
              sizes="375px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className="text-h3" style={{ margin: 0 }}>{person.name}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {displayRoles.map((r, i) => (
              <p key={i} className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>— {r}</p>
            ))}
          </div>
        </div>

        {/* Right col — bullet cards */}
        <div className="sf-right">
          {bullets.map((b, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>{b.text}</p>
              {b.type === 'text+link' && (
                <a
                  href={b.link.href}
                  style={{
                    display: 'flex', gap: 4, alignItems: 'center',
                    background: '#ececec', borderRadius: 4, padding: '8px',
                    textDecoration: 'none', color: '#000', width: '100%',
                  }}
                  className="text-small"
                >
                  {b.link.label} →
                </a>
              )}
            </div>
          ))}

          {!!links?.length && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 4 }}>
              {links.map(l => (
                <a key={l.href} href={l.href} className="chip">{l.label}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

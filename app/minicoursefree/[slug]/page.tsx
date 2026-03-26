import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import EventLayout from '@/components/templates/EventLayout'

function arr<T>(v: unknown): T[] { return Array.isArray(v) ? (v as T[]) : [] }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withDefaults(d: any): any {
  return {
    badges:             arr(d.badges),
    title:              d.title              ?? '',
    ctaLabel:           d.ctaLabel           ?? 'Зарегистрироваться',
    description:        d.description        ?? '',
    eventDate:          d.eventDate          ?? '',
    eventInfo:          d.eventInfo          ?? '',
    speakerAvatar:      d.speakerAvatar      ?? '',
    speakerName:        d.speakerName        ?? '',
    speakerRoles:       arr(d.speakerRoles),
    quote:              d.quote              ?? '',
    quoteHighlight:     d.quoteHighlight     ?? '',
    forWhomTitle:       d.forWhomTitle       ?? 'для кого',
    forWhom:            arr(d.forWhom),
    programTitle:       d.programTitle       ?? 'программа',
    programDate:        d.programDate        ?? '',
    programItems:       arr(d.programItems),
    speakerSectionTitle: d.speakerSectionTitle ?? 'спикер',
    speakerAbout:       arr(d.speakerAbout),
    hosts:              d.hosts              ?? null,
    formDate:           d.formDate           ?? '',
    formInfo:           d.formInfo           ?? '',
    formEndpoint:       d.formEndpoint       ?? '',
  }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const file = path.join(process.cwd(), 'content/events', `${slug}.json`)
  let data
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    notFound()
  }
  return <EventLayout {...withDefaults(data)} />
}

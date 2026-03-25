import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import EventLayout from '@/components/templates/EventLayout'

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const file = path.join(process.cwd(), 'content/events', `${slug}.json`)
  let data
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    notFound()
  }
  return <EventLayout {...data} />
}

import { notFound } from 'next/navigation'
import Nav from '@/components/global/Nav'
import Footer from '@/components/global/Footer'
import TariffSection from '@/components/ui/TariffSection'
import ProgramStages from '@/components/ui/ProgramStages'
import TheoryList from '@/components/ui/TheoryList'

const label: React.CSSProperties = {
  fontSize: 14,
  color: '#7c7c7c',
  textTransform: 'uppercase',
  letterSpacing: 2,
  margin: '0 0 16px',
  fontFamily: 'inherit',
}

const section: React.CSSProperties = {
  borderBottom: '1px solid #eaeaea',
  marginBottom: 48,
  paddingBottom: 48,
}

export default function ComponentsPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return (
    <div style={{ background: '#fff', padding: 'clamp(20px,5vw,80px)' }}>
      <section style={section}>
        <p style={label}>NAV</p>
        <Nav />
      </section>
      <section style={section}>
        <p style={label}>FOOTER</p>
        <Footer />
      </section>
      <section style={section}>
        <p style={label}>TARIFF SECTION</p>
        <TariffSection />
      </section>
      <section style={section}>
        <p style={label}>PROGRAM STAGES</p>
        <ProgramStages />
      </section>
      <section style={{ borderBottom: 'none' }}>
        <p style={label}>THEORY LIST</p>
        <TheoryList />
      </section>
    </div>
  )
}

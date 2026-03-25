import Nav from '@/components/global/Nav'
import Footer from '@/components/global/Footer'
import ProgramStages from '@/components/ui/ProgramStages'
import TheoryList from '@/components/ui/TheoryList'
import TariffSection from '@/components/ui/TariffSection'

export default function Home() {
  return (
    <main style={{ backgroundColor: '#1c1a31' }}>
      <Nav />
      <ProgramStages />
      <TheoryList />
      <TariffSection />
      <Footer />
    </main>
  )
}

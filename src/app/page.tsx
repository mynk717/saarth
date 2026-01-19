import Navbar from '../components/common/Navbar'
import Hero from '../components/common/Hero'
import SearchSection from '../components/common/SearchSection'
import PopularDestinations from '../components/common/PopularDestinations'
import Features from '../components/common/Features'
import Footer from '../components/common/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navbar />
      <Hero />
      <SearchSection />
      <PopularDestinations />
      <Features />
      <Footer />
    </main>
  )
}

import { useState } from 'react'
import Hero from './components/Hero'
import ConceptSection from './components/ConceptSection'
import MapSection from './components/MapSection'
import RoutesSection from './components/RoutesSection'
import CTARandom from './components/CTARandom'
import CTACompanion from './components/CTACompanion'
import TrailModal from './components/TrailModal'
import Footer from './components/Footer'
import { Trail } from './types'
import { recommendedRoutes, ecoTrails } from './data/trails'

function App() {
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (trail: Trail) => {
    setSelectedTrail(trail)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTrail(null)
  }

  const handleRandomClick = () => {
    const allTrails = [...recommendedRoutes, ...ecoTrails]
    const randomTrail = allTrails[Math.floor(Math.random() * allTrails.length)]
    openModal(randomTrail)
  }

  return (
    <>
      <main>
        <Hero 
          onMapClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })} 
          onRoutesClick={() => document.getElementById('routes-section')?.scrollIntoView({ behavior: 'smooth' })} 
        />
        <ConceptSection />
        <MapSection onTrailClick={openModal} />
        <RoutesSection onTrailClick={openModal} />
        <CTARandom onRandomClick={handleRandomClick} />
        <CTACompanion />
      </main>
      <TrailModal trail={selectedTrail} isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </>
  )
}

export default App

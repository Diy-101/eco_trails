import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import ConceptSection from './components/ConceptSection'
import ParallaxImage from './components/ParallaxImage'
import MapSection from './components/MapSection'
import RoutesSection from './components/RoutesSection'
import CTARandom from './components/CTARandom'
import CTACompanion from './components/CTACompanion'
import TrailModal from './components/TrailModal'
import RoutesModal from './components/RoutesModal'
import Footer from './components/Footer'
import { Trail } from './types'
import { recommendedRoutes, ecoTrails } from './data/trails'

function App() {
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRoutesModalOpen, setIsRoutesModalOpen] = useState(false)

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

  const [selectedFilterType, setSelectedFilterType] = useState<'look' | 'listen' | 'taste' | 'touch' | 'feel' | null>(null)

  const handleConceptCardClick = (filterType: 'look' | 'listen' | 'taste' | 'touch' | 'feel' | null) => {
    setSelectedFilterType(filterType)
    setIsRoutesModalOpen(true)
  }

  const allRoutes = [...recommendedRoutes, ...ecoTrails]

  const scrollToMap = () => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToRoutes = () => document.getElementById('routes-section')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToConcept = () => document.getElementById('concept-section')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Header 
        onMapClick={scrollToMap}
        onRoutesClick={scrollToRoutes}
        onConceptClick={scrollToConcept}
      />
      <main className="overflow-x-hidden">
        <div id="hero">
          <Hero 
            onMapClick={scrollToMap} 
            onRoutesClick={scrollToRoutes} 
          />
        </div>
        <Marquee />
        <ConceptSection onCardClick={handleConceptCardClick} />
        <ParallaxImage imageSrc="luca-bravo-uDwtAiRRvs4-unsplash.jpg" alt="Пейзаж экотропы" height="600px" />
        <MapSection onTrailClick={openModal} />
        <RoutesSection onTrailClick={openModal} />
        <CTARandom onRandomClick={handleRandomClick} />
        <CTACompanion />
      </main>
      <TrailModal trail={selectedTrail} isOpen={isModalOpen} onClose={closeModal} />
      <RoutesModal 
        isOpen={isRoutesModalOpen} 
        onClose={() => {
          setIsRoutesModalOpen(false)
          setSelectedFilterType(null)
        }} 
        routes={allRoutes}
        onTrailClick={openModal}
        filterType={selectedFilterType}
      />
      <Footer />
    </>
  )
}

export default App

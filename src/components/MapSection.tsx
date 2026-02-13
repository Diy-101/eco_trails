import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Trail } from '../types'
import { ecoTrails } from '../data/trails'
import 'leaflet/dist/leaflet.css'

// Fix для иконок Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapSectionProps {
  onTrailClick: (trail: Trail) => void
}

function MapController({ onTrailClick }: { onTrailClick: (trail: Trail) => void }) {
  const map = useMap()

  useEffect(() => {
    const bounds = L.latLngBounds(
      [59.0, 28.0],
      [61.5, 32.5]
    )

    map.setMaxBounds(bounds)
    map.setMinZoom(8)
    map.setMaxZoom(12)

    const handleDrag = () => {
      const center = map.getCenter()
      if (!bounds.contains(center)) {
        map.panInsideBounds(bounds, { animate: false })
      }
    }

    map.on('drag', handleDrag)
    map.on('moveend', handleDrag)
    map.on('move', handleDrag)

    return () => {
      map.off('drag', handleDrag)
      map.off('moveend', handleDrag)
      map.off('move', handleDrag)
    }
  }, [map])

  return null
}

function CustomMarker({ trail, onTrailClick }: { trail: Trail; onTrailClick: (trail: Trail) => void }) {
  const markerSize = 50
  const circleSize = 64

  const icon = L.divIcon({
    className: 'map-marker-with-circle',
    html: `
      <span class="map-marker-circle"></span>
      <img src="${trail.icon}" alt="" class="map-marker-icon" width="${markerSize}" height="${markerSize}" />
    `,
    iconSize: [circleSize, circleSize],
    iconAnchor: [circleSize / 2, circleSize],
    popupAnchor: [0, -circleSize]
  })

  return (
    <Marker
      position={trail.coords!}
      icon={icon}
      eventHandlers={{
        click: () => onTrailClick(trail)
      }}
    />
  )
}

export default function MapSection({ onTrailClick }: MapSectionProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filterOptions = [
    { filter: 'look', icon: 'увидь.png', text: 'Присмотрись' },
    { filter: 'listen', icon: 'услышь.png', text: 'Прислушайся' },
    { filter: 'taste', icon: 'попробуй.png', text: 'Попробуй' },
    { filter: 'touch', icon: 'потрогай.png', text: 'Прикоснись' },
    { filter: 'feel', icon: 'ощути.png', text: 'Почувствуй' },
  ]

  const handleFilterClick = (filterType: string) => {
    const targetTrail = ecoTrails.find(trail => trail.filterType === filterType)
    if (targetTrail) {
      onTrailClick(targetTrail)
    }
    setIsFilterOpen(false)
  }

  return (
    <section id="map-section" className="relative py-3 px-2 bg-[#4D5C47] overflow-visible">
      <div className="max-w-full mx-auto relative z-[1]">
        <h2 className="text-[clamp(22px,3.5vw,36px)] font-extrabold text-primary-orange text-center mb-[10px] tracking-[-0.03em] bg-gradient-to-r from-[#ffb84d] to-[#ff8c42] bg-clip-text text-transparent">
          Карта троп
        </h2>
        
        <div className="flex justify-center mb-[10px] relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-6 py-[10px] text-[15px] font-bold font-sans text-primary-orange bg-white/95 border-2 border-primary-orange rounded-full cursor-pointer transition-all duration-300 relative z-10 hover:bg-primary-orange hover:text-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,140,66,0.2)]"
          >
            <span className="font-bold">Фильтр</span>
            <svg 
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 12L4 8L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className={`absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-[260px] bg-gradient-to-br from-[#2d3a2a] to-[#3a4a38] rounded-2xl border-2 border-[rgba(255,140,66,0.3)] overflow-hidden opacity-0 invisible -translate-y-2.5 transition-all duration-300 z-[100] shadow-[0_12px_32px_rgba(0,0,0,0.4),0_4px_16px_rgba(0,0,0,0.2)] backdrop-blur-[10px] ${isFilterOpen ? 'opacity-100 visible translate-y-0' : ''}`}>
            {filterOptions.map((option) => (
              <div
                key={option.filter}
                onClick={() => handleFilterClick(option.filter)}
                className="flex items-center gap-3.5 px-[18px] py-3 cursor-pointer transition-all duration-200 border-b border-[rgba(255,140,66,0.15)] relative hover:bg-[rgba(255,140,66,0.08)] hover:pl-[22px] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-gradient-to-r before:from-[rgba(255,140,66,0.2)] before:to-transparent before:transition-[width] before:duration-300 hover:before:w-1"
              >
                <img 
                  src={option.icon} 
                  alt="" 
                  className="w-6 h-6 object-contain flex-shrink-0 brightness-0 saturate-100 invert-[67%] sepia-[95%] saturate-[1352%] hue-rotate-[350deg] brightness-[101%] contrast-[101%] transition-all duration-200 hover:scale-110 hover:brightness-0 hover:saturate-100 hover:invert-[67%] hover:sepia-[95%] hover:saturate-[1352%] hover:hue-rotate-[350deg] hover:brightness-[120%] hover:contrast-[101%]"
                />
                <span className="text-[15px] font-semibold font-sans text-white flex-1 tracking-[0.01em] transition-colors duration-200 hover:text-[#ffb84d]">
                  {option.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative w-full mx-auto">
          <div className="relative w-full min-h-[60vh] bg-[#f5f5f5] overflow-visible shadow-[0_0_60px_rgba(140,180,130,1),0_0_100px_rgba(120,160,110,0.9),0_0_140px_rgba(100,140,90,0.7),0_20px_60px_rgba(0,0,0,0.2)] translate-z-0 will-change-transform backface-hidden"
               style={{
                 WebkitMaskImage: "url('маска карты.svg')",
                 WebkitMaskSize: "100% 100%",
                 WebkitMaskRepeat: "no-repeat",
                 WebkitMaskPosition: "center",
                 maskImage: "url('маска карты.svg')",
                 maskSize: "100% 100%",
                 maskRepeat: "no-repeat",
                 maskPosition: "center"
               }}>
            <MapContainer
              center={[59.9343, 30.3351]}
              zoom={9}
              style={{ width: '100%', height: '100%', minHeight: '95vh' }}
              className="relative z-[1] translate-z-0 will-change-transform overflow-hidden max-md:min-h-[60vh]"
            >
              <MapController onTrailClick={onTrailClick} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={18}
              />
              {ecoTrails.filter(trail => trail.coords).map((trail, index) => (
                <CustomMarker key={index} trail={trail} onTrailClick={onTrailClick} />
              ))}
            </MapContainer>
          </div>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
            <svg viewBox="0 0 941 640" preserveAspectRatio="none" className="w-full h-full block pointer-events-none">
              <path 
                fillRule="evenodd" 
                className="fill-transparent pointer-events-auto" 
                d="M0,0 L941,0 L941,640 L0,640 Z M477.647 1.1795C545.037 -1.83569 616.294 4.80555 673.882 28.724C730.391 52.1942 751.357 99.9896 795.796 133.318C840.323 166.713 919.715 182.862 937.285 226.272C955.027 270.108 893.909 311.471 886.177 356.624C878.541 401.212 921.232 449.423 892.166 489.755C863.364 529.719 788.658 542.071 734.462 567.141C681.584 591.602 637.036 627.144 574.58 636.669C512.018 646.209 448.576 629.316 385.843 620.306C323.08 611.292 256.612 607.706 203.443 583.366C149.827 558.822 116.712 519.417 83.3601 481.836C49.639 443.84 17.0344 404.837 6.19277 361.107C-4.90644 316.338 0.480742 270.138 20.1148 226.736C39.8822 183.04 112.564 165.301 160.727 133.318C207.985 101.937 232.199 64.0495 292.615 45.7827C353.059 27.5073 411.607 4.13427 477.647 1.1795Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

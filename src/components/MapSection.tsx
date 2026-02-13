import { useEffect, useState, useRef } from 'react'
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

interface FilterState {
  feeling?: 'look' | 'listen' | 'taste' | 'touch' | 'feel';
  age?: 'family' | 'adults' | 'seniors' | 'all';
  distance?: 'short' | 'medium' | 'long';
  distanceFromCity?: 'near' | 'medium' | 'far';
}

function MapController() {
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

function CustomMarker({ trail, onTrailClick, isVisible }: { trail: Trail; onTrailClick: (trail: Trail) => void; isVisible: boolean }) {
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

  if (!isVisible) return null

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
  const [filters, setFilters] = useState<FilterState>({})
  const filterRef = useRef<HTMLDivElement>(null)

  const feelingFilters = [
    { filter: 'look', icon: 'увидь.png', text: 'Присмотрись' },
    { filter: 'listen', icon: 'услышь.png', text: 'Прислушайся' },
    { filter: 'taste', icon: 'попробуй.png', text: 'Попробуй' },
    { filter: 'touch', icon: 'потрогай.png', text: 'Прикоснись' },
    { filter: 'feel', icon: 'ощути.png', text: 'Почувствуй' },
  ]

  const ageFilters = [
    { filter: 'all', text: 'Все возрасты', icon: '👥' },
    { filter: 'family', text: 'Семьи', icon: '👨‍👩‍👧‍👦' },
    { filter: 'adults', text: 'Взрослые', icon: '🧑' },
    { filter: 'seniors', text: 'Пожилые', icon: '👴' },
  ]

  const distanceFilters = [
    { filter: 'short', text: 'Короткие (< 3 км)', icon: '🚶' },
    { filter: 'medium', text: 'Средние (3-8 км)', icon: '🏃' },
    { filter: 'long', text: 'Длинные (> 8 км)', icon: '🥾' },
  ]

  const cityDistanceFilters = [
    { filter: 'near', text: 'Близко (< 50 км)', icon: '📍' },
    { filter: 'medium', text: 'Средне (50-70 км)', icon: '🗺️' },
    { filter: 'far', text: 'Далеко (> 70 км)', icon: '🌲' },
  ]

  // Закрытие фильтров при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleFilterChange = (category: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      if (category === 'feeling') {
        if (newFilters.feeling === value) {
          delete newFilters.feeling
        } else {
          newFilters.feeling = value as any
        }
      } else if (category === 'age') {
        if (newFilters.age === value) {
          delete newFilters.age
        } else {
          newFilters.age = value as any
        }
      } else if (category === 'distance') {
        if (newFilters.distance === value) {
          delete newFilters.distance
        } else {
          newFilters.distance = value as any
        }
      } else if (category === 'cityDistance') {
        if (newFilters.distanceFromCity === value) {
          delete newFilters.distanceFromCity
        } else {
          newFilters.distanceFromCity = value as any
        }
      }
      return newFilters
    })
  }

  const getFilteredTrails = () => {
    return ecoTrails.filter(trail => {
      if (!trail.coords) return false

      // Фильтр по чувствам
      if (filters.feeling && trail.filterType !== filters.feeling) return false

      // Фильтр по возрасту
      if (filters.age && trail.ageGroup && trail.ageGroup !== filters.age && trail.ageGroup !== 'all') return false

      // Фильтр по расстоянию маршрута
      if (filters.distance) {
        const distanceNum = parseFloat(trail.distance.replace(' KM', '').replace(' ', ''))
        if (filters.distance === 'short' && distanceNum >= 3) return false
        if (filters.distance === 'medium' && (distanceNum < 3 || distanceNum > 8)) return false
        if (filters.distance === 'long' && distanceNum <= 8) return false
      }

      // Фильтр по отдаленности от города
      if (filters.distanceFromCity && trail.distanceCategory !== filters.distanceFromCity) return false

      return true
    })
  }

  const filteredTrails = getFilteredTrails()
  const activeFiltersCount = Object.keys(filters).length

  const handleQuickFilter = (filterType: string) => {
    const targetTrail = ecoTrails.find(trail => trail.filterType === filterType)
    if (targetTrail) {
      onTrailClick(targetTrail)
    }
  }

  return (
    <section id="map-section" className="relative py-8 px-4 bg-gradient-to-b from-[#4D5C47] via-[#556350] to-[#4D5C47] overflow-visible">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-primary-orange-light rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-full mx-auto relative z-[1]">
        <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white text-center mb-6 tracking-[-0.03em]">
          Карта <span className="text-primary-orange bg-gradient-to-r from-primary-orange-light to-primary-orange bg-clip-text text-transparent">троп</span>
        </h2>
        
        {/* Панель фильтров */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 max-w-6xl mx-auto" ref={filterRef}>
          {/* Кнопка открытия фильтров */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`
              flex items-center gap-2 px-6 py-3 text-sm font-bold font-sans rounded-full cursor-pointer transition-all duration-300 relative z-10
              ${isFilterOpen || activeFiltersCount > 0
                ? 'bg-primary-orange text-white shadow-lg shadow-primary-orange/30'
                : 'bg-white/95 text-primary-orange border-2 border-primary-orange hover:bg-primary-orange hover:text-white'
              }
            `}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Фильтры</span>
            {activeFiltersCount > 0 && (
              <span className="bg-white text-primary-orange rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {activeFiltersCount}
              </span>
            )}
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Быстрые фильтры по чувствам */}
          <div className="flex flex-wrap gap-2">
            {feelingFilters.map((option) => (
              <button
                key={option.filter}
                onClick={() => handleQuickFilter(option.filter)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-semibold hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
              >
                <img src={option.icon} alt="" className="w-4 h-4 object-contain brightness-0 invert" />
                <span>{option.text}</span>
              </button>
            ))}
          </div>

          {/* Панель расширенных фильтров */}
          {isFilterOpen && (
            <div className="w-full mt-4 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Фильтр по чувствам */}
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <span>✨</span> Чувства
                  </h3>
                  <div className="space-y-2">
                    {feelingFilters.map((option) => (
                      <button
                        key={option.filter}
                        onClick={() => handleFilterChange('feeling', option.filter)}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${filters.feeling === option.filter
                            ? 'bg-primary-orange text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                        `}
                      >
                        <img src={option.icon} alt="" className="w-5 h-5 object-contain brightness-0" style={{ filter: filters.feeling === option.filter ? 'invert(1)' : 'none' }} />
                        <span>{option.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Фильтр по возрасту */}
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <span>👥</span> Возраст
                  </h3>
                  <div className="space-y-2">
                    {ageFilters.map((option) => (
                      <button
                        key={option.filter}
                        onClick={() => handleFilterChange('age', option.filter)}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${filters.age === option.filter
                            ? 'bg-primary-orange text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                        `}
                      >
                        <span className="text-lg">{option.icon}</span>
                        <span>{option.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Фильтр по расстоянию маршрута */}
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <span>📏</span> Расстояние
                  </h3>
                  <div className="space-y-2">
                    {distanceFilters.map((option) => (
                      <button
                        key={option.filter}
                        onClick={() => handleFilterChange('distance', option.filter)}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${filters.distance === option.filter
                            ? 'bg-primary-orange text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                        `}
                      >
                        <span className="text-lg">{option.icon}</span>
                        <span>{option.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Фильтр по отдаленности от города */}
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <span>🏙️</span> От города
                  </h3>
                  <div className="space-y-2">
                    {cityDistanceFilters.map((option) => (
                      <button
                        key={option.filter}
                        onClick={() => handleFilterChange('cityDistance', option.filter)}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${filters.distanceFromCity === option.filter
                            ? 'bg-primary-orange text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                        `}
                      >
                        <span className="text-lg">{option.icon}</span>
                        <span>{option.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Кнопка сброса фильтров */}
              {activeFiltersCount > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
                  <button
                    onClick={() => setFilters({})}
                    className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Сбросить все фильтры
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Карта */}
        <div className="relative w-full mx-auto">
          <div className="relative w-full min-h-[70vh] bg-[#f5f5f5] overflow-visible shadow-[0_0_60px_rgba(140,180,130,1),0_0_100px_rgba(120,160,110,0.9),0_0_140px_rgba(100,140,90,0.7),0_20px_60px_rgba(0,0,0,0.2)] translate-z-0 will-change-transform backface-hidden rounded-3xl overflow-hidden"
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
              style={{ width: '100%', height: '100%', minHeight: '70vh' }}
              className="relative z-[1] translate-z-0 will-change-transform overflow-hidden"
            >
              <MapController />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={18}
              />
              {ecoTrails.filter(trail => trail.coords).map((trail, index) => (
                <CustomMarker 
                  key={index} 
                  trail={trail} 
                  onTrailClick={onTrailClick}
                  isVisible={filteredTrails.includes(trail)}
                />
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

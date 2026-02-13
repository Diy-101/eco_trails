import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
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

    // Настройки карты как в оригинале
    map.setMaxBounds(bounds)
    map.setMinZoom(8)
    map.setMaxZoom(12)
    map.setMaxBounds(bounds)
    
    // Жесткая блокировка выхода за границы
    const handleDrag = () => {
      const center = map.getCenter()
      if (!bounds.contains(center)) {
        map.panInsideBounds(bounds, { animate: false })
      }
    }

    const handleMove = () => {
      const center = map.getCenter()
      if (!bounds.contains(center)) {
        map.panInsideBounds(bounds, { animate: false })
      }
    }

    map.on('drag', handleDrag)
    map.on('moveend', handleDrag)
    map.on('move', handleMove)

    // Устанавливаем границы при готовности карты
    map.whenReady(() => {
      map.setMaxBounds(bounds)
    })

    return () => {
      map.off('drag', handleDrag)
      map.off('moveend', handleDrag)
      map.off('move', handleMove)
    }
  }, [map])

  return null
}

function CustomMarker({ trail, onTrailClick, isVisible }: { trail: Trail; onTrailClick: (trail: Trail) => void; isVisible: boolean }) {
  const markerSize = 56
  const circleSize = 72

  const icon = L.divIcon({
    className: 'map-marker-with-circle',
    html: `
      <div class="marker-pulse"></div>
      <span class="map-marker-circle"></span>
      <img src="${trail.icon}" alt="${trail.name}" class="map-marker-icon" width="${markerSize}" height="${markerSize}" />
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
        click: () => onTrailClick(trail),
        mouseover: () => {},
        mouseout: () => {}
      }}
    >
      <Popup className="custom-popup" closeButton={false}>
        <div className="popup-content">
          <h3 className="popup-title">{trail.name} {trail.subtitle}</h3>
          <p className="popup-description">{trail.description.substring(0, 100)}...</p>
          <button 
            onClick={() => onTrailClick(trail)}
            className="popup-button"
          >
            Подробнее
          </button>
        </div>
      </Popup>
    </Marker>
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
    { filter: 'all', text: 'Все возрасты', icon: '👥', color: 'from-gray-400 to-gray-600' },
    { filter: 'family', text: 'Семьи', icon: '👨‍👩‍👧‍👦', color: 'from-blue-400 to-blue-600' },
    { filter: 'adults', text: 'Взрослые', icon: '🧑', color: 'from-purple-400 to-purple-600' },
    { filter: 'seniors', text: 'Пожилые', icon: '👴', color: 'from-green-400 to-green-600' },
  ]

  const distanceFilters = [
    { filter: 'short', text: 'Короткие', subtext: '< 3 км', icon: '🚶', color: 'from-green-400 to-green-600' },
    { filter: 'medium', text: 'Средние', subtext: '3-8 км', icon: '🏃', color: 'from-yellow-400 to-yellow-600' },
    { filter: 'long', text: 'Длинные', subtext: '> 8 км', icon: '🥾', color: 'from-red-400 to-red-600' },
  ]

  const cityDistanceFilters = [
    { filter: 'near', text: 'Близко', subtext: '< 50 км', icon: '📍', color: 'from-green-400 to-green-600' },
    { filter: 'medium', text: 'Средне', subtext: '50-70 км', icon: '🗺️', color: 'from-yellow-400 to-yellow-600' },
    { filter: 'far', text: 'Далеко', subtext: '> 70 км', icon: '🌲', color: 'from-orange-400 to-orange-600' },
  ]

  // Закрытие фильтров при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFilterOpen])

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
    <section id="map-section" className="relative py-12 px-4 bg-gradient-to-b from-[#2a3528] via-[#4D5C47] to-[#2a3528] overflow-visible">
      {/* Анимированные декоративные элементы */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-orange rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary-orange-light rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-[1]">
        {/* Заголовок с улучшенным дизайном */}
        <div className="text-center mb-8">
          <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold text-white mb-3 tracking-[-0.03em] relative inline-block">
            <span className="relative z-10">Карта</span>{' '}
            <span className="relative z-10 bg-gradient-to-r from-primary-orange-light via-primary-orange to-primary-orange-dark bg-clip-text text-transparent">
              троп
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-orange to-transparent opacity-50"></div>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Найдите идеальный маршрут для вашего путешествия
          </p>
        </div>
        
        {/* Улучшенная панель фильтров */}
        <div className="flex flex-col items-center gap-4 mb-8 max-w-7xl mx-auto" ref={filterRef}>
          {/* Основная кнопка фильтров */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`
                group flex items-center gap-3 px-6 py-3.5 text-sm font-bold rounded-2xl cursor-pointer transition-all duration-300 relative z-10
                ${isFilterOpen || activeFiltersCount > 0
                  ? 'bg-gradient-to-r from-primary-orange to-primary-orange-dark text-white shadow-xl shadow-primary-orange/40 scale-105'
                  : 'bg-white/95 text-primary-orange border-2 border-primary-orange hover:bg-gradient-to-r hover:from-primary-orange hover:to-primary-orange-dark hover:text-white hover:scale-105 hover:shadow-lg'
                }
              `}
            >
              <svg className="w-5 h-5 transition-transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Фильтры</span>
              {activeFiltersCount > 0 && (
                <span className="bg-white text-primary-orange rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                  {activeFiltersCount}
                </span>
              )}
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Быстрые фильтры по чувствам */}
            <div className="flex flex-wrap gap-2">
              {feelingFilters.map((option) => (
                <button
                  key={option.filter}
                  onClick={() => handleQuickFilter(option.filter)}
                  className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-orange to-primary-orange-dark rounded-xl text-white text-xs font-bold hover:scale-110 hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 active:scale-95"
                >
                  <img src={option.icon} alt="" className="w-5 h-5 object-contain brightness-0 invert transition-transform group-hover:rotate-12 duration-300" />
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Расширенная панель фильтров с улучшенным дизайном */}
          {isFilterOpen && (
            <div className="w-full mt-2 bg-white/98 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 animate-fadeInUp">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Фильтр по чувствам */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2 text-primary-orange">
                    <span className="text-lg">✨</span> Чувства
                  </h3>
                  <div className="space-y-2">
                    {feelingFilters.map((option) => (
                      <button
                        key={option.filter}
                        onClick={() => handleFilterChange('feeling', option.filter)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                          ${filters.feeling === option.filter
                            ? 'bg-gradient-to-r from-primary-orange to-primary-orange-dark text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                          }
                        `}
                      >
                        <img 
                          src={option.icon} 
                          alt="" 
                          className="w-5 h-5 object-contain transition-all duration-300" 
                          style={{ filter: filters.feeling === option.filter ? 'brightness(0) invert(1)' : 'brightness(0)' }}
                        />
                        <span className="flex-1 text-left">{option.text}</span>
                        {filters.feeling === option.filter && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Фильтр по возрасту */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2 text-primary-orange">
                    <span className="text-lg">👥</span> Возраст
                  </h3>
                  <div className="space-y-2">
                    {ageFilters.map((option) => (
                      <button
                        key={option.filter}
                        onClick={() => handleFilterChange('age', option.filter)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                          ${filters.age === option.filter
                            ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                          }
                        `}
                      >
                        <span className="text-xl">{option.icon}</span>
                        <span className="flex-1 text-left">{option.text}</span>
                        {filters.age === option.filter && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Фильтр по расстоянию маршрута */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2 text-primary-orange">
                    <span className="text-lg">📏</span> Расстояние
                  </h3>
                  <div className="space-y-2">
                    {distanceFilters.map((option) => (
                      <button
                        key={option.filter}
                        onClick={() => handleFilterChange('distance', option.filter)}
                        className={`
                          w-full flex flex-col items-start gap-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                          ${filters.distance === option.filter
                            ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <span className="text-lg">{option.icon}</span>
                          <span className="flex-1 text-left">{option.text}</span>
                          {filters.distance === option.filter && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs ${filters.distance === option.filter ? 'text-white/90' : 'text-gray-500'}`}>
                          {option.subtext}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Фильтр по отдаленности от города */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2 text-primary-orange">
                    <span className="text-lg">🏙️</span> От города
                  </h3>
                  <div className="space-y-2">
                    {cityDistanceFilters.map((option) => (
                      <button
                        key={option.filter}
                        onClick={() => handleFilterChange('cityDistance', option.filter)}
                        className={`
                          w-full flex flex-col items-start gap-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                          ${filters.distanceFromCity === option.filter
                            ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <span className="text-lg">{option.icon}</span>
                          <span className="flex-1 text-left">{option.text}</span>
                          {filters.distanceFromCity === option.filter && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs ${filters.distanceFromCity === option.filter ? 'text-white/90' : 'text-gray-500'}`}>
                          {option.subtext}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Кнопка сброса фильтров */}
              {activeFiltersCount > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
                  <button
                    onClick={() => setFilters({})}
                    className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-xl text-sm font-bold hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Сбросить все фильтры ({activeFiltersCount})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Переделанная карта с интересным дизайном */}
        <div className="relative w-full mx-auto max-w-7xl">
          {/* Внешний контейнер с эффектами */}
          <div className="relative w-full h-[85vh] min-h-[650px] group">
            {/* Декоративные градиенты вокруг карты */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-orange/20 via-primary-orange-light/10 to-transparent rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#4D5C47]/30 via-transparent to-[#556350]/20 rounded-[2.5rem] blur-xl"></div>
            
            {/* Основной контейнер карты */}
            <div className="relative w-full h-full bg-gradient-to-br from-[#e8f5e9] via-[#d4edda] to-[#c8e6c9] rounded-[2.5rem] overflow-hidden shadow-[0_25px_120px_rgba(77,92,71,0.3),0_0_80px_rgba(255,140,66,0.15),inset_0_2px_0_rgba(255,255,255,0.6)] border-[3px] border-white/40 backdrop-blur-sm">
              {/* Анимированные декоративные элементы */}
              <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/30 via-white/10 to-transparent"></div>
                <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-white/30 via-white/10 to-transparent"></div>
                <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-white/30 via-white/10 to-transparent"></div>
                
                {/* Плавающие световые эффекты */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-orange/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-orange-light/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <MapContainer
                center={[59.9343, 30.3351]}
                zoom={9}
                style={{ width: '100%', height: '100%' }}
                className="relative z-[1] map-container-custom"
                scrollWheelZoom={true}
                doubleClickZoom={true}
                dragging={true}
                touchZoom={true}
              >
                <MapController />
                {/* Красивый стиль карты - Stamen Terrain для природных маршрутов */}
                <TileLayer
                  url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
                  attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  subdomains="abcd"
                  minZoom={0}
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
          </div>
        </div>
      </div>
    </section>
  )
}

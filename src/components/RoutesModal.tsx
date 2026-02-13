import { useEffect, useMemo } from 'react'
import { Trail } from '../types'

interface RoutesModalProps {
  isOpen: boolean
  onClose: () => void
  routes: Trail[]
  onTrailClick: (trail: Trail) => void
  filterType?: 'look' | 'listen' | 'taste' | 'touch' | 'feel' | null
}

export default function RoutesModal({ isOpen, onClose, routes, onTrailClick, filterType }: RoutesModalProps) {
  // Фильтруем маршруты по выбранному чувству
  const filteredRoutes = useMemo(() => {
    if (!filterType) {
      return routes
    }
    return routes.filter(route => route.filterType === filterType)
  }, [routes, filterType])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div 
      className="fixed inset-0 w-screen h-screen z-[999999] flex items-center justify-center transition-all duration-300"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto'
      }}
    >
      <div 
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/85 to-black/75 backdrop-blur-[10px] backdrop-saturate-[180%] z-[1] transition-all duration-300"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%'
        }}
      />
      <div 
        className="relative z-[2] w-[90%] max-w-[1400px] h-[85vh] max-h-[85vh] overflow-hidden scale-100 translate-y-0 blur-0 opacity-100 transition-all duration-500 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/95 hover:bg-white border border-gray-300 rounded-full cursor-pointer z-20 transition-all duration-200 text-black shadow-md hover:scale-105"
          aria-label="Закрыть"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)] h-full flex flex-col">
          {/* Заголовок */}
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-[#4D5C47] to-[#556350]">
            <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-white mb-2 leading-[1.2] tracking-[-0.02em]">
              {filterType ? 'Маршруты по выбранному чувству' : 'Все маршруты'}
            </h2>
            <p className="text-white/90 text-lg">
              {filteredRoutes.length > 0 
                ? `Найдено маршрутов: ${filteredRoutes.length}` 
                : 'Маршруты не найдены'}
            </p>
          </div>

          {/* Контент с карточками маршрутов */}
          <div className="flex-1 overflow-y-auto p-8">
            {filteredRoutes.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-xl">Маршруты не найдены</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRoutes.map((route, index) => (
                <article
                  key={index}
                  onClick={() => {
                    onTrailClick(route)
                    onClose()
                  }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
                >
                  {/* Изображение маршрута */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img 
                      src={route.image} 
                      alt={route.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        // Пробуем найти изображение с " карточка"
                        if (!route.image.includes(' карточка')) {
                          const cardImage = route.image.replace('.png', ' карточка.png')
                          target.src = cardImage
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    {route.filterType && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-primary-orange uppercase tracking-wide">
                          {route.filterType === 'look' && 'Увидь'}
                          {route.filterType === 'listen' && 'Услышь'}
                          {route.filterType === 'taste' && 'Попробуй'}
                          {route.filterType === 'touch' && 'Потрогай'}
                          {route.filterType === 'feel' && 'Ощути'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Контент карточки */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 leading-[1.3] tracking-[-0.02em] group-hover:text-primary-orange transition-colors duration-300">
                      {route.name}
                    </h3>
                    {route.subtitle && (
                      <p className="text-base text-primary-orange font-semibold mb-3">
                        {route.subtitle}
                      </p>
                    )}
                    <p className="text-sm font-normal text-[#666666] leading-[1.6] mb-4 line-clamp-3">
                      {route.description}
                    </p>

                    {/* Информация о маршруте */}
                    <div className="flex gap-4 pt-4 border-t border-gray-100">
                      {route.distance && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm font-bold text-primary-orange">{route.distance}</span>
                        </div>
                      )}
                      {route.timing && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-bold text-primary-orange">{route.timing}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

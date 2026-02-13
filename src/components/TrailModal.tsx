import { useEffect, useRef, useState } from 'react'
import { Trail } from '../types'
import { getAssetPath } from '../utils/paths'

interface TrailModalProps {
  trail: Trail | null
  isOpen: boolean
  onClose: () => void
}

export default function TrailModal({ trail, isOpen, onClose }: TrailModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Подготовка массива изображений для карусели
  const getImages = (trail: Trail): string[] => {
    const images: string[] = []
    const mainImage = trail.image.includes(' карточка') 
      ? trail.image 
      : trail.image.replace('.png', ' карточка.png')
    images.push(mainImage)
    // Если есть оригинальное изображение и оно отличается, добавляем его
    if (!trail.image.includes(' карточка')) {
      images.push(trail.image)
    }
    return images.map(img => getAssetPath(img))
  }

  const images = trail ? getImages(trail) : []

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      setCurrentImageIndex(0)
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
        setIsPlaying(false)
      }
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
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

  const handleAudioClick = () => {
    if (!trail?.audioUrl) return

    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      const audio = new Audio(trail.audioUrl)
      audioRef.current = audio
      audio.play()
      setIsPlaying(true)
      
      audio.addEventListener('ended', () => {
        audioRef.current = null
        setIsPlaying(false)
      })
      
      audio.addEventListener('error', () => {
        audioRef.current = null
        setIsPlaying(false)
      })
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Не рендерим модальное окно, если нет trail или оно закрыто
  if (!trail || !isOpen) {
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
        className="relative z-[2] w-[85%] max-w-[1000px] h-[80vh] max-h-[80vh] overflow-hidden scale-100 translate-y-0 blur-0 opacity-100 transition-all duration-500 rounded-3xl max-md:w-[95%] max-md:h-[85vh] max-md:max-h-[85vh] max-md:rounded-2xl max-sm:w-[98%] max-sm:h-[90vh] max-sm:max-h-[90vh] max-sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/95 hover:bg-white border border-gray-300 rounded-full cursor-pointer z-20 transition-all duration-200 text-black shadow-md hover:scale-105"
          aria-label="Закрыть"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)] h-full flex flex-col">
          {/* Карусель фотографий */}
          <div className="relative w-full h-[28%] min-h-[200px] max-h-[280px] max-md:h-[25%] max-md:min-h-[180px] max-md:max-h-[220px] max-sm:h-[22%] max-sm:min-h-[150px] max-sm:max-h-[180px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-3xl max-md:rounded-t-2xl max-sm:rounded-t-xl">
            {images.length > 0 && (
              <>
                <div className="relative w-full h-full">
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`${trail.name} - фото ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain transition-opacity duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      // Если изображение с " карточка" не найдено, пробуем оригинальное
                      const currentImage = images[currentImageIndex]
                      if (currentImage.includes(' карточка')) {
                        // Убираем base URL и " карточка" для получения оригинального имени
                        const baseUrl = import.meta.env.BASE_URL
                        const imageName = currentImage.replace(baseUrl, '').replace(' карточка.png', '.png')
                        if (imageName !== currentImage.replace(baseUrl, '')) {
                          target.src = getAssetPath(imageName)
                        }
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
                
                {/* Навигация карусели */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 max-md:w-10 max-md:h-10 max-sm:w-9 max-sm:h-9 flex items-center justify-center bg-white/90 hover:bg-white rounded-full cursor-pointer z-10 transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 max-md:left-2 max-sm:left-1.5"
                      aria-label="Предыдущее фото"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 max-md:w-10 max-md:h-10 max-sm:w-9 max-sm:h-9 flex items-center justify-center bg-white/90 hover:bg-white rounded-full cursor-pointer z-10 transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 max-md:right-2 max-sm:right-1.5"
                      aria-label="Следующее фото"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {/* Индикаторы карусели */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-white w-8' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                          aria-label={`Фото ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Контент с информацией */}
          <div className="flex-1 overflow-y-auto rounded-b-3xl max-md:rounded-b-2xl max-sm:rounded-b-xl">
            <div className="p-6 md:p-10 max-md:p-5 max-sm:p-4 flex flex-col gap-5 max-md:gap-4 max-sm:gap-3">
              {/* Заголовок */}
              <div>
                <h2 className="text-3xl md:text-4xl max-md:text-2xl max-sm:text-xl font-bold text-[#1a1a1a] m-0 leading-[1.2] tracking-[-0.02em]">
                  {trail.name}
                </h2>
                {trail.subtitle && trail.subtitle.trim() && (
                  <p className="text-xl md:text-2xl max-md:text-lg max-sm:text-base text-primary-orange mt-2 max-sm:mt-1.5 font-semibold">
                    {trail.subtitle}
                  </p>
                )}
              </div>

              {/* Основная информация */}
              <div className="flex flex-wrap gap-6 mb-4 max-md:gap-4 max-sm:gap-3 max-sm:mb-3">
                {trail.distance && (
                  <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-xl max-md:px-5 max-md:py-2.5 max-sm:px-4 max-sm:py-2 max-sm:rounded-lg max-sm:gap-2">
                    <svg className="w-6 h-6 max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-sm max-md:text-xs max-sm:text-[10px] text-gray-600 uppercase tracking-wide">Расстояние</div>
                      <div className="text-xl max-md:text-lg max-sm:text-base font-bold text-primary-orange">{trail.distance}</div>
                    </div>
                  </div>
                )}
                {trail.timing && (
                  <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-xl max-md:px-5 max-md:py-2.5 max-sm:px-4 max-sm:py-2 max-sm:rounded-lg max-sm:gap-2">
                    <svg className="w-6 h-6 max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-sm max-md:text-xs max-sm:text-[10px] text-gray-600 uppercase tracking-wide">Время</div>
                      <div className="text-xl max-md:text-lg max-sm:text-base font-bold text-primary-orange">{trail.timing}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Описание */}
              <div>
                <h3 className="text-lg max-md:text-base max-sm:text-sm font-bold text-[#1a1a1a] mb-3 max-sm:mb-2">Описание маршрута</h3>
                <p className="text-base max-md:text-sm max-sm:text-xs font-normal text-[#333333] leading-[1.7] max-sm:leading-[1.6] tracking-[0.01em]">
                  {trail.fullDescription || trail.description}
                </p>
              </div>

              {/* Точки интереса */}
              {trail.points && trail.points.length > 0 && (
                <div>
                  <h3 className="text-lg max-md:text-base max-sm:text-sm font-bold text-[#1a1a1a] mb-3 max-sm:mb-2">Точки интереса</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-sm:gap-2">
                    {trail.points.map((point, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-orange flex-shrink-0 mt-1.5" />
                        <span className="text-sm font-normal text-black leading-[1.6]">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Аудиогид */}
              <div className="mt-4 pt-5 max-sm:mt-3 max-sm:pt-4 border-t border-gray-200">
                <div className="flex flex-col gap-3 max-sm:gap-2">
                  <h3 className="text-lg max-md:text-base max-sm:text-sm font-bold text-[#1a1a1a] mb-2 max-sm:mb-1.5">Аудиогид</h3>
                  <button
                    onClick={handleAudioClick}
                    disabled={!trail.audioUrl}
                    className={`flex items-center gap-4 px-8 py-4 max-md:px-6 max-md:py-3 max-sm:px-4 max-sm:py-2.5 bg-gradient-to-r from-primary-orange to-primary-orange-dark text-white rounded-xl max-sm:rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                      isPlaying ? 'shadow-lg scale-[1.02]' : ''
                    }`}
                  >
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-white/20 ${isPlaying ? 'animate-pulse' : ''}`}>
                      {isPlaying ? (
                        <svg className="w-6 h-6 text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold">
                        {isPlaying ? 'Пауза' : 'Слушать аудиогид'}
                      </div>
                      <div className="text-sm opacity-90">
                        {trail.audioUrl ? 'Прослушайте подробную информацию о маршруте' : 'Аудиогид пока недоступен'}
                      </div>
                    </div>
                    {isPlaying && (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div 
                            key={i}
                            className="w-1 bg-white rounded-full animate-pulse"
                            style={{
                              height: `${8 + i * 3}px`,
                              animationDelay: `${(i - 1) * 0.1}s`,
                              animationDuration: '1s'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

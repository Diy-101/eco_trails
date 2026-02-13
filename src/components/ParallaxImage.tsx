import { useEffect, useRef, useState } from 'react'

interface ParallaxImageProps {
  imageSrc: string
  alt?: string
  height?: string
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
}

export default function ParallaxImage({ 
  imageSrc, 
  alt = 'Parallax image',
  height = '600px',
  gradientFrom = '#4D5C47',
  gradientVia = 'transparent',
  gradientTo = '#2a3528'
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Вычисляем позицию элемента относительно окна
      const elementTop = rect.top
      const elementHeight = rect.height
      const elementCenter = elementTop + elementHeight / 2
      
      // Когда элемент виден на экране
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        // Параллакс эффект: изображение движется медленнее, чем скролл
        // Используем более сильный эффект для лучшей видимости
        const scrollProgress = (windowHeight - elementCenter) / windowHeight
        const parallaxOffset = scrollProgress * 150 // увеличиваем диапазон для более заметного эффекта
        
        setOffset(parallaxOffset)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Вызываем сразу для начальной позиции

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden max-md:h-[400px] max-sm:h-[300px]"
      style={{ height }}
    >
      <div 
        className="absolute inset-0 w-full h-[140%]"
        style={{
          transform: `translateY(${offset - 80}px)`,
          willChange: 'transform'
        }}
      >
        <img 
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center -60%'
          }}
        />
        {/* Затемнение для плавного перехода */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${gradientFrom}CC, ${gradientVia}, ${gradientTo}CC)`
          }}
        ></div>
      </div>
    </div>
  )
}

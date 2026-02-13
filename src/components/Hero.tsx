import { useEffect, useRef } from 'react'
import { getAssetPath } from '../utils/paths'

interface HeroProps {
  onMapClick: () => void
  onRoutesClick: () => void
}

export default function Hero({ onMapClick, onRoutesClick }: HeroProps) {
  const titleRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const heroTitle = titleRef.current
    if (!heroTitle) return

    let ticking = false

    const updateParallax = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const parallaxOffset = scrollY * 0.5
      const maxOffset = windowHeight * 0.3
      const offset = Math.min(parallaxOffset, maxOffset)
      // Ограничиваем движение, чтобы заголовок не выходил за границы
      const clampedOffset = Math.max(0, Math.min(maxOffset, offset))
      
      heroTitle.style.transform = `translate3d(-50%, calc(-50% - ${clampedOffset}px), 0)`
      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener("scroll", requestTick, { passive: true })
    updateParallax()

    return () => {
      window.removeEventListener("scroll", requestTick)
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center max-md:h-auto max-md:min-h-[40vh] max-md:max-h-[50vh] max-sm:min-h-[35vh] max-sm:max-h-[45vh] pt-48 max-md:pt-36 max-sm:pt-28" style={{ overflow: 'hidden' }}>
      <img 
        src={getAssetPath("фон.png")} 
        alt="" 
        className="absolute top-0 left-0 w-full h-full object-cover z-[1] object-top max-sm:hidden" 
        style={{ maxWidth: '100%', overflow: 'hidden' }}
      />
      <img 
        src={getAssetPath("фон для мобилок.png")} 
        alt="" 
        className="hidden max-sm:block absolute top-0 left-0 w-full h-full object-cover z-[1] object-top" 
        style={{ maxWidth: '100%', overflow: 'hidden' }}
      />
      
      <img 
        src={getAssetPath("елки и холм.png")} 
        alt="" 
        className="absolute bottom-0 left-0 w-full h-auto object-contain object-bottom z-[3] max-md:max-h-[60%]" 
        style={{ maxWidth: '100%', overflow: 'hidden' }}
      />
      
      <img 
        ref={titleRef}
        src={getAssetPath("надпись.png")} 
        alt="ЭКОТРОПЫ" 
        id="hero-title"
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.88] z-[2] max-w-[72%] w-auto h-auto max-h-[28vh] will-change-transform pointer-events-none backface-hidden object-contain max-md:top-[50%] max-md:max-w-[75%] max-md:max-h-[22vh] max-md:scale-[0.75] max-sm:top-[48%] max-sm:max-w-[78%] max-sm:max-h-[20vh] max-sm:scale-[0.7]"
        style={{ transform: 'translate(-50%, -50%) scale(0.88) translateZ(0)' }}
      />
      
      <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4] text-center w-full max-w-[800px] px-5 max-md:top-auto max-md:bottom-[6%] max-md:left-1/2 max-md:-translate-x-1/2 max-md:translate-y-0 max-md:px-4 max-sm:bottom-[5%] max-sm:px-3">
        <p className="text-white text-[clamp(24px,4vw,32px)] font-bold mb-10 leading-[1.4] font-display tracking-[-0.01em] drop-shadow-[0_2px_20px_rgba(0,0,0,0.3),0_4px_40px_rgba(0,0,0,0.2)] animate-[fadeInUp_0.8s_ease-out] max-md:mb-4 max-md:text-[clamp(12px,3vw,16px)] max-md:leading-[1.3] max-sm:mb-3 max-sm:text-[clamp(11px,2.8vw,14px)] max-sm:leading-[1.25]">
          Познакомься с природой Ленинградской области в 5 раз эффективнее
        </p>
        <div className="flex gap-5 justify-center flex-wrap max-md:gap-2.5 max-md:flex-col max-md:items-center max-md:w-full max-sm:gap-2">
          <button 
            onClick={onMapClick}
            className="px-12 py-5 text-[clamp(16px,2vw,20px)] font-semibold font-display rounded-full cursor-pointer transition-all duration-300 border-none whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.15)] relative overflow-hidden bg-gradient-to-br from-[#ffb84d] via-[#ff8c42] to-[#ff7040] text-white shadow-[0_8px_30px_rgba(255,140,66,0.4),0_4px_15px_rgba(255,140,66,0.3)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_40px_rgba(255,140,66,0.5),0_6px_20px_rgba(255,140,66,0.4)] active:-translate-y-0.5 active:scale-[1.02] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-[left] before:duration-500 hover:before:left-full max-md:px-4 max-md:py-2 max-md:text-[clamp(11px,2vw,13px)] max-md:w-full max-md:max-w-[75%] max-md:whitespace-normal max-sm:px-3 max-sm:py-1.5 max-sm:text-[clamp(10px,1.8vw,12px)] max-sm:w-full max-sm:max-w-[80%]"
          >
            Карта троп
          </button>
          <button 
            onClick={onRoutesClick}
            className="px-12 py-5 text-[clamp(16px,2vw,20px)] font-semibold font-display rounded-full cursor-pointer transition-all duration-300 border-2 border-[rgba(255,140,66,0.8)] bg-white/10 backdrop-blur-[10px] text-white shadow-[0_4px_20px_rgba(255,140,66,0.2)] hover:-translate-y-1 hover:scale-105 hover:bg-[rgba(255,140,66,0.2)] hover:border-[#ff8c42] hover:shadow-[0_8px_30px_rgba(255,140,66,0.4)] active:-translate-y-0.5 active:scale-[1.02] max-md:px-4 max-md:py-2 max-md:text-[clamp(11px,2vw,13px)] max-md:w-full max-md:max-w-[75%] max-md:whitespace-normal max-sm:px-3 max-sm:py-1.5 max-sm:text-[clamp(10px,1.8vw,12px)] max-sm:w-full max-sm:max-w-[80%]"
          >
            Рекомендуемые маршруты
          </button>
        </div>
      </div>
    </section>
  )
}

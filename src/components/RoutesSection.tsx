import { useState, useEffect } from 'react'
import { Trail } from '../types'
import { recommendedRoutes } from '../data/trails'

interface RoutesSectionProps {
  onTrailClick: (trail: Trail) => void
}

const cardPositions = [
  { top: '5%', left: '3%', rotate: '-2deg' },
  { top: '25%', right: '3%', rotate: '3deg' },
  { top: '50%', left: '3%', rotate: '-4deg' },
  { top: '70%', right: '3%', rotate: '2deg' },
  { top: '95%', left: '3%', rotate: '-3deg' },
]

export default function RoutesSection({ onTrailClick }: RoutesSectionProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  return (
    <section id="routes-section" className="relative p-0 bg-black overflow-visible w-full flex flex-col min-h-full">
      <img 
        src="фон рекомендуемые маршруты.png" 
        alt="" 
        className="absolute top-0 left-0 w-full h-full min-h-full object-cover object-center z-0 block"
      />
      <div className="relative w-full min-h-[150vh] py-[100px] px-10 pb-[400px] z-[1] box-border max-md:py-[60px] max-md:px-4 max-md:pb-[250px] max-md:min-h-full">
        <h2 className="text-[clamp(36px,5.5vw,58px)] font-extrabold text-white text-center m-0 mb-20 tracking-[-0.03em] relative z-[2]">
          Рекомендуемые маршруты
        </h2>
        
        <div className="relative w-full min-h-[150vh] max-w-[1600px] mx-auto pb-[300px] max-md:min-h-auto max-md:pb-0">
          {recommendedRoutes.map((route, index) => {
            const position = cardPositions[index] || cardPositions[0]
            return (
              <article
                key={index}
                onClick={() => onTrailClick(route)}
                className="absolute rounded-[20px] p-5 pr-[140px] pl-5 w-[520px] h-[280px] shadow-[0_12px_40px_rgba(0,0,0,0.2),0_4px_16px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,140,66,0.1)] translate-z-0 will-change-transform transition-all duration-400 flex flex-col overflow-hidden box-border backdrop-blur-[10px] cursor-pointer hover:-translate-y-3 hover:scale-[1.03] hover:z-10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.2),0_0_0_2px_rgba(255,140,66,0.3)] after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-gradient-to-br after:from-[rgba(255,184,77,0.05)] after:via-[rgba(255,140,66,0.05)] after:to-transparent after:opacity-0 after:transition-opacity after:duration-400 after:pointer-events-none after:rounded-[20px] hover:after:opacity-100 max-md:relative max-md:w-[90%] max-md:max-w-[500px] max-md:h-auto max-md:min-h-[240px] max-md:max-h-[260px] max-md:p-4 max-md:pr-[140px] max-md:mb-5 max-md:left-auto max-md:right-auto max-md:top-auto max-md:transform-none max-md:hover:transform-none max-md:hover:-translate-y-1 max-md:hover:scale-[1.01]"
                style={{
                  backgroundImage: "url('карточка маршрута.png')",
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  top: !isMobile ? position.top : 'auto',
                  left: !isMobile ? position.left : 'auto',
                  right: !isMobile ? position.right : 'auto',
                  transform: !isMobile ? `rotate(${position.rotate})` : 'none',
                }}
              >
                <div className="flex gap-5 mb-4 max-w-full overflow-hidden w-full flex-shrink-1 min-h-0 items-start">
                  <div className="flex-shrink-0 w-[140px] h-[140px] min-w-[140px] min-h-[140px] rounded-2xl overflow-hidden border-[3px] border-[#B0D4E8] box-border shadow-[0_8px_24px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-400 relative group hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,0,0,0.25),0_6px_16px_rgba(0,0,0,0.2)]">
                    <img 
                      src={route.image} 
                      alt={route.name} 
                      className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5 min-w-0 max-w-full overflow-hidden flex-shrink-1 min-h-0 break-words overflow-wrap-break-word">
                    <h3 className="text-[22px] font-bold text-[#1a1a1a] m-0 mb-2 tracking-[-0.02em] break-words overflow-wrap-break-word max-w-full leading-[1.3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      {route.name}
                    </h3>
                    <p className="text-sm font-normal text-[#333333] m-0 leading-[1.5] break-words overflow-wrap-break-word max-w-full overflow-hidden line-clamp-4 flex-shrink-1 tracking-[0.01em]">
                      {route.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-7 flex-wrap pt-3 border-t-2 border-black/8 max-w-full overflow-hidden w-full flex-shrink-0 flex-grow-0 break-words overflow-wrap-break-word">
                  <div className="flex items-center gap-2.5 py-1 transition-transform duration-200 hover:translate-x-0.5">
                    <svg className="flex-shrink-0 w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:scale-110" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0C6.134 0 3 3.134 3 7C3 11.5 10 16 10 16S17 11.5 17 7C17 3.134 13.866 0 10 0ZM10 9.5C8.619 9.5 7.5 8.381 7.5 7C7.5 5.619 8.619 4.5 10 4.5C11.381 4.5 12.5 5.619 12.5 7C12.5 8.381 11.381 9.5 10 9.5Z" fill="#000000"/>
                    </svg>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-lg font-bold text-primary-orange leading-[1.2] tracking-[0.02em] drop-shadow-[0_1px_2px_rgba(255,140,66,0.3)]">
                        {route.distance}
                      </span>
                      <span className="text-[10px] font-semibold text-[#666666] uppercase tracking-[0.08em] leading-[1.2] opacity-85">
                        РАССТОЯНИЕ
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 py-1 transition-transform duration-200 hover:translate-x-0.5">
                    <svg className="flex-shrink-0 w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:scale-110" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" stroke="#000000" strokeWidth="2"/>
                      <path d="M10 5V10L13 13" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-lg font-bold text-primary-orange leading-[1.2] tracking-[0.02em] drop-shadow-[0_1px_2px_rgba(255,140,66,0.3)]">
                        {route.timing}
                      </span>
                      <span className="text-[10px] font-semibold text-[#666666] uppercase tracking-[0.08em] leading-[1.2] opacity-85">
                        ТАЙМИНГ
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 py-1 transition-transform duration-200 hover:translate-x-0.5">
                    <svg className="flex-shrink-0 w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:scale-110" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" fill="#000000"/>
                      <path d="M6 10L9 13L14 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-semibold text-[#666666] uppercase tracking-[0.08em] leading-[1.2] opacity-85">
                        ЧУВСТВО
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

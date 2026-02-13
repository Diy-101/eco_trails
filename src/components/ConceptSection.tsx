import { useState, useEffect, useRef } from 'react'
import { conceptCards } from '../data/trails'

export default function ConceptSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Анимация появления карточек при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(new Array(conceptCards.length).fill(true))
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Параллакс для изображения
  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current || !sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * 0.1
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        imageRef.current.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-[80px] px-10 bg-gradient-to-b from-[#4D5C47] via-[#556350] to-[#4D5C47] overflow-hidden"
    >
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-orange-light rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative grid grid-cols-[1.12fr_0.88fr] gap-7 items-start max-lg:grid-cols-1 max-lg:gap-[30px] z-10">
        <div className="relative z-[2] max-lg:order-1">
          <h2 className="text-[clamp(34px,5.2vw,52px)] font-extrabold text-white mb-3 leading-[1.15] tracking-[-0.03em] max-w-full">
            Пусть маршрут точно придется тебе{' '}
            <span className="text-primary-orange font-extrabold bg-gradient-to-r from-primary-orange-light to-primary-orange bg-clip-text text-transparent">
              по вкусу
            </span>
          </h2>
          <p className="text-[clamp(16px,2vw,19px)] font-normal text-white mb-[40px] leading-[1.55] max-w-full tracking-[-0.01em]">
            Мы сделали так, чтобы ты мог выбрать ту экотропу, которая подарит тебе{' '}
            <span className="text-primary-orange font-medium">нужные эмоции</span>
          </p>
          
          <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
            {conceptCards.map((card, index) => (
              <article 
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-500 cursor-pointer group
                  ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  ${hoveredIndex === index ? '-translate-y-3 scale-[1.02] shadow-2xl' : ''}
                `}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Изображение/фон сверху */}
                <div className="relative h-32 bg-gradient-to-br from-primary-orange via-primary-orange-light to-primary-orange-dark overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`
                      w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                      transition-all duration-500
                      ${hoveredIndex === index ? 'scale-125 rotate-12' : ''}
                    `}>
                      <img 
                        src={card.icon} 
                        alt={card.title} 
                        className="w-12 h-12 object-contain brightness-0 invert"
                      />
                    </div>
                  </div>
                  {/* Декоративные элементы */}
                  <div className="absolute top-2 right-2 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-2 left-2 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
                </div>

                {/* Контент карточки */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#1a1a1a] m-0 mb-3 tracking-[-0.02em] leading-[1.2]">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm font-normal text-[#666666] leading-[1.6]">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        
        <div className="sticky top-[120px] self-start w-full z-[1] max-lg:relative max-lg:top-0 max-lg:mt-5 max-lg:order-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/20 to-transparent rounded-3xl blur-2xl"></div>
            <img 
              ref={imageRef}
              src="мужик.png" 
              alt="Человек с дроном на экотропе" 
              className="w-full max-h-[520px] h-auto block object-contain relative z-10 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

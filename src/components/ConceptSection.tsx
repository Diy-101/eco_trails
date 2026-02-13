import { useState, useEffect, useRef } from 'react'
import { conceptCards } from '../data/trails'
import { getAssetPath } from '../utils/paths'

interface ConceptSectionProps {
  onCardClick: (filterType: 'look' | 'listen' | 'taste' | 'touch' | 'feel' | null) => void
}

export default function ConceptSection({ onCardClick }: ConceptSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section 
      id="concept-section"
      ref={sectionRef}
      className="relative py-[100px] px-10 bg-gradient-to-b from-[#4D5C47] via-[#556350] to-[#4D5C47] overflow-hidden max-md:py-[60px] max-md:px-6 max-sm:py-[50px] max-sm:px-4"
    >
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-orange rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-primary-orange-light rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-orange/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16 max-md:mb-12 max-sm:mb-10">
          <h2 className="text-[clamp(36px,5.5vw,64px)] font-extrabold text-white mb-4 leading-[1.15] tracking-[-0.03em] max-md:mb-3 max-md:text-[clamp(28px,6vw,40px)] max-sm:mb-2 max-sm:text-[clamp(24px,6.5vw,32px)] flex flex-col items-center justify-center px-4 max-sm:px-2">
            <span className="text-center">Пусть маршрут точно придется тебе</span>
            <span className="text-primary-orange font-extrabold bg-gradient-to-r from-primary-orange-light via-primary-orange to-primary-orange-dark bg-clip-text text-transparent">
              по вкусу
            </span>
          </h2>
          <p className="text-[clamp(18px,2.2vw,22px)] font-normal text-white/90 max-w-3xl mx-auto leading-[1.6] tracking-[-0.01em] max-md:text-[clamp(16px,2.5vw,18px)] max-md:leading-[1.5] max-sm:text-[clamp(14px,2.2vw,16px)] max-sm:px-2">
            Мы сделали так, чтобы ты мог выбрать ту экотропу, которая подарит тебе{' '}
            <span className="text-primary-orange font-medium">нужные эмоции</span>
          </p>
        </div>
        
        {/* Карточки в улучшенной сетке */}
        <div className="grid grid-cols-5 gap-6 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4 max-sm:gap-3">
          {conceptCards.map((card, index) => {
            // Маппинг между названиями карточек и типами фильтров
            const getFilterType = (title: string): 'look' | 'listen' | 'taste' | 'touch' | 'feel' | null => {
              const mapping: Record<string, 'look' | 'listen' | 'taste' | 'touch' | 'feel'> = {
                'Увидь': 'look',
                'Прислушайся': 'listen',
                'Попробуй': 'taste',
                'Потрогай': 'touch',
                'Почувствуй': 'feel'
              }
              return mapping[title] || null
            }

            const filterType = getFilterType(card.title)

            return (
            <article 
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onCardClick(filterType)}
              className={`
                bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-500 cursor-pointer group relative
                ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                ${hoveredIndex === index ? '-translate-y-4 scale-[1.03] shadow-2xl z-20' : ''}
                ${index === 0 || index === 4 ? 'max-xl:col-span-1' : ''}
              `}
              style={{
                transitionDelay: `${index * 80}ms`
              }}
            >
              {/* Градиентный фон сверху с иконкой */}
              <div className="relative h-40 max-md:h-32 max-sm:h-28 bg-gradient-to-br from-primary-orange via-primary-orange-light to-primary-orange-dark overflow-hidden">
                {/* Анимированный фон */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Иконка в центре */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`
                    w-24 h-24 max-md:w-20 max-md:h-20 max-sm:w-16 max-sm:h-16 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center shadow-2xl
                    transition-all duration-500 border-2 border-white/30
                    ${hoveredIndex === index ? 'scale-125 rotate-[15deg] shadow-primary-orange/50' : 'scale-100 rotate-0'}
                  `}>
                    <img 
                      src={getAssetPath(card.icon)} 
                      alt={card.title} 
                      className="w-14 h-14 max-md:w-12 max-md:h-12 max-sm:w-10 max-sm:h-10 object-contain brightness-0 invert drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Декоративные элементы */}
                <div className="absolute top-3 right-3 w-20 h-20 bg-white/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-3 left-3 w-16 h-16 bg-white/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                
                {/* Световые блики */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Контент карточки */}
              <div className="p-6 max-md:p-5 max-sm:p-4 relative">
                {/* Декоративная линия сверху */}
                <div className="absolute top-0 left-6 right-6 max-md:left-5 max-md:right-5 max-sm:left-4 max-sm:right-4 h-0.5 bg-gradient-to-r from-transparent via-primary-orange/30 to-transparent"></div>
                
                <h3 className="text-2xl max-md:text-xl max-sm:text-lg font-bold text-[#1a1a1a] m-0 mb-3 max-md:mb-2 max-sm:mb-1.5 tracking-[-0.02em] leading-[1.2] transition-colors duration-300 group-hover:text-primary-orange text-center">
                  {card.title}
                </h3>
                
                <p className="text-sm max-md:text-[13px] max-sm:text-xs font-normal text-[#666666] leading-[1.65] max-md:leading-[1.5] m-0 text-center">
                  {card.description}
                </p>

                {/* Декоративный элемент внизу */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Свечение при hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-orange/0 via-primary-orange/0 to-primary-orange/0 group-hover:from-primary-orange/5 group-hover:via-primary-orange/10 group-hover:to-primary-orange/5 transition-all duration-500 pointer-events-none"></div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

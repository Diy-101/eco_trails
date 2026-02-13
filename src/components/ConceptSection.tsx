import { conceptCards } from '../data/trails'

export default function ConceptSection() {
  return (
    <section className="relative py-[50px] px-10 bg-[#4D5C47] overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative grid grid-cols-[1.12fr_0.88fr] gap-7 items-start max-lg:grid-cols-1 max-lg:gap-[30px]">
        <div className="relative z-[2] max-lg:order-1">
          <h2 className="text-[clamp(34px,5.2vw,52px)] font-extrabold text-white mb-3 leading-[1.15] tracking-[-0.03em] max-w-full">
            Пусть маршрут точно придется тебе{' '}
            <span className="text-primary-orange font-extrabold">по вкусу</span>
          </h2>
          <p className="text-[clamp(16px,2vw,19px)] font-normal text-white mb-[30px] leading-[1.55] max-w-full tracking-[-0.01em]">
            Мы сделали так, чтобы ты мог выбрать ту экотропу, которая подарит тебе{' '}
            <span className="text-primary-orange font-medium">нужные эмоции</span>
          </p>
          
          <div className="grid grid-cols-3 gap-x-5 gap-y-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-5">
            {conceptCards.map((card, index) => (
              <article 
                key={index}
                className="flex flex-row items-start gap-4 p-0 transition-all duration-400 hover:-translate-y-2"
              >
                <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#ffb84d] via-[#ff8c42] to-[#ff7040] flex items-center justify-center flex-shrink-0 shadow-[0_8px_24px_rgba(255,140,66,0.4),0_4px_12px_rgba(255,140,66,0.3)] transition-all duration-400 p-3 translate-z-0 will-change-transform backface-hidden relative group">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#ffb84d] via-[#ff8c42] to-[#ff7040] opacity-0 transition-opacity duration-400 -z-10 blur-[8px] group-hover:opacity-60"></div>
                  <img 
                    src={card.icon} 
                    alt={card.title} 
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white m-0 tracking-[-0.02em] leading-[1.2]">
                    {card.title}
                  </h3>
                  <p className="text-sm font-normal text-white m-0 leading-[1.55] tracking-[-0.01em] opacity-88">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        
        <div className="sticky top-[120px] self-start w-full z-[1] max-lg:relative max-lg:top-0 max-lg:mt-5 max-lg:order-2">
          <img 
            src="мужик.png" 
            alt="Человек с дроном на экотропе" 
            className="w-full max-h-[520px] h-auto block object-contain"
          />
        </div>
      </div>
    </section>
  )
}

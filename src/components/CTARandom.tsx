interface CTARandomProps {
  onRandomClick: () => void
}

export default function CTARandom({ onRandomClick }: CTARandomProps) {
  return (
    <section className="w-full bg-gradient-to-b from-[#FF9800] to-[#FF6F00] py-[72px] px-8 relative overflow-hidden">
      <div className="max-w-[720px] mx-auto relative flex items-center justify-center min-h-[300px] z-[1]">
        <div className="relative flex items-center justify-center w-full max-w-[640px]">
          <img 
            src="линии абстрактные.png" 
            alt="" 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[580px] h-auto object-contain pointer-events-none z-0 opacity-95"
          />
          <div className="relative z-[1] text-center py-10 px-9 max-w-[420px] w-full box-border">
            <p className="font-sans text-[clamp(15px,2vw,18px)] font-medium text-[#2F2F2F] leading-[1.6] m-0 mb-6 tracking-[0.01em]">
              Не смог определиться с экотропой? Положись на волю судьбы и отправься в особое путешествие. Наш сайт подберёт для тебя интересный маршрут с помощью рандомайзера.
            </p>
            <button 
              onClick={onRandomClick}
              type="button" 
              className="inline-block py-[18px] px-11 font-sans text-[13px] font-bold text-white uppercase tracking-[0.12em] bg-[#5D6A56] border-none rounded-full cursor-pointer transition-all duration-[250ms] hover:bg-[#4d5a48] hover:-translate-y-0.5"
            >
              Случайный выбор
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

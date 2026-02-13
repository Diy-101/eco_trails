import { getAssetPath } from '../utils/paths'

export default function CTACompanion() {
  return (
    <section className="w-full bg-gradient-to-b from-[#596652] to-[#6C7965] py-[72px] px-12 max-md:py-[56px] max-md:px-8 max-sm:py-[44px] max-sm:px-4 relative overflow-hidden">
      <div className="max-w-[1180px] mx-auto grid grid-cols-2 gap-14 items-center relative z-[1] max-md:grid-cols-1 max-md:gap-8 max-md:text-center max-sm:gap-6">
        <div className="max-w-[520px] max-md:max-w-full">
          <h2 className="font-sans text-[clamp(28px,4vw,40px)] max-md:text-[clamp(24px,5vw,32px)] max-sm:text-[clamp(20px,5.5vw,26px)] font-extrabold leading-[1.18] m-0 mb-6 max-md:mb-5 max-sm:mb-4 tracking-[-0.03em]">
            <span className="block text-white">Нашел маршрут —</span>
            <span className="block text-[#FFBD47]">найди и пару!</span>
          </h2>
          <p className="font-sans text-[clamp(15px,1.8vw,17px)] max-md:text-[clamp(14px,2vw,16px)] max-sm:text-[clamp(13px,2.2vw,15px)] font-normal text-white leading-[1.7] max-sm:leading-[1.6] m-0 mb-8 max-md:mb-6 max-sm:mb-4 tracking-[0.01em]">
            Мы знаем, что иногда для ярких моментов может не хватать попутчика, готового их разделить. Поэтому мы создали мини-приложение в Telegram, где сотни желающих погулять по экотропам Ленинградской области ищут себе компанию, и, возможно, именно тебя!
          </p>
          <button 
            type="button" 
            className="inline-block py-[18px] px-10 max-md:py-4 max-md:px-8 max-sm:py-3 max-sm:px-6 font-sans text-base max-md:text-sm max-sm:text-[13px] font-bold text-[#2F2F2F] bg-gradient-to-b from-[#FFBF47] to-[#F4A560] border-none rounded-full max-sm:rounded-lg cursor-pointer transition-all duration-[250ms] hover:opacity-95 hover:-translate-y-0.5 active:scale-[0.98] w-full max-sm:w-full"
          >
            Найти попутчика
          </button>
        </div>
        <div className="flex justify-center items-center max-md:order-[-1]">
          <img 
            src={getAssetPath("нашел маршрут найди пару.png")} 
            alt="Попутчики на экотропе" 
            className="w-full max-w-[460px] max-md:max-w-[400px] max-sm:max-w-full h-auto rounded-[20px] max-md:rounded-xl max-sm:rounded-lg object-cover shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>
    </section>
  )
}

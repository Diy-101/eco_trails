export default function Marquee() {
  const items = [
    { text: 'ЭКОТРОПЫ ЛЕНИНГРАДСКОЙ ОБЛАСТИ', icon: '🌲' },
    { text: 'ПРИРОДА ЖДЁТ', icon: '⛰️' },
    { text: 'ОТКРОЙ ДЛЯ СЕБЯ', icon: '👁️' },
    { text: 'ПОГРУЗИСЬ В ПРИРОДУ', icon: '🌿' },
    { text: '5 ЧУВСТВ', icon: '✨' },
    { text: 'УНИКАЛЬНЫЕ МАРШРУТЫ', icon: '🗺️' },
    { text: 'ПОЗНАЙ ЛЕНОБЛАСТЬ', icon: '🚶' },
    { text: 'ЭКОЛОГИЧЕСКИЕ ТРОПЫ', icon: '🌳' },
  ]

  return (
    <section className="relative w-full bg-gradient-to-r from-primary-orange via-primary-orange-light to-primary-orange overflow-hidden py-3 border-y-2 border-primary-orange-dark/30">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-4 px-8 text-white font-bold text-base uppercase tracking-wider"
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <span>{item.text}</span>
            <span className="text-xl flex-shrink-0">✦</span>
          </div>
        ))}
      </div>
    </section>
  )
}

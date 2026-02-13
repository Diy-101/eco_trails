import { useRef } from 'react'

interface CTARandomProps {
  onRandomClick: () => void
}

interface TicketCardProps {
  size: number
  rotation: number
  delay: number
}

function TicketCard({ size, rotation, delay }: TicketCardProps) {
  const uniqueId = `ticket-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div 
      className="relative ticket-card-wrapper"
      style={{
        width: `${size}px`,
        height: `${size * 0.65}px`,
        transform: `rotate(${rotation}deg)`,
        animationDelay: `${delay}s`,
      }}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.1)] transform transition-all duration-500 hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] overflow-hidden"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div className="flex h-full relative">
          {/* Левая часть - штриховка (вместо фото) */}
          <div className="w-[45%] h-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
            {/* Штриховка */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  #FF9800,
                  #FF9800 8px,
                  transparent 8px,
                  transparent 16px
                )`,
              }}
            ></div>
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  #FF9800,
                  #FF9800 8px,
                  transparent 8px,
                  transparent 16px
                )`,
              }}
            ></div>
            
            {/* Дополнительная текстура */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-gray-300/30"></div>
          </div>
          
          {/* Перфорация (отрывная часть) */}
          <div className="absolute left-[45%] top-0 bottom-0 w-[3%] flex flex-col items-center justify-center z-10">
            {/* Верхний полукруг */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-dashed border-gray-300"></div>
            
            {/* Пунктирная линия */}
            <div className="w-px h-full border-l border-dashed border-gray-300"></div>
            
            {/* Нижний полукруг */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-dashed border-gray-300"></div>
            
            {/* Дополнительные маленькие круги для эффекта перфорации */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border border-dashed border-gray-300"></div>
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border border-dashed border-gray-300"></div>
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border border-dashed border-gray-300"></div>
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border border-dashed border-gray-300"></div>
          </div>
          
          {/* Правая часть - знак вопроса */}
          <div className="flex-1 h-full flex items-center justify-center bg-white relative">
            <div className="relative flex items-center justify-center w-full h-full">
              <svg 
                width="90" 
                height="90" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
                style={{ margin: '0 auto' }}
              >
                <defs>
                  <linearGradient id={`questionGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF9800" />
                    <stop offset="50%" stopColor="#FF8C42" />
                    <stop offset="100%" stopColor="#FF6F00" />
                  </linearGradient>
                </defs>
                
                {/* Круг - более жирный */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  stroke="#FF9800"
                  strokeWidth="7" 
                  fill="none"
                />
                
                {/* Вопрос - более заметный */}
                <path 
                  d="M32 32C32 24, 38 20, 44 20C50 20, 56 24, 56 30C56 36, 50 38, 44 38" 
                  stroke="#FF9800"
                  strokeWidth="7" 
                  strokeLinecap="round"
                  fill="none"
                />
                <circle 
                  cx="44" 
                  cy="68" 
                  r="5" 
                  fill="#FF9800"
                />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Указатель внизу (как на карточке из изображения) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-white"></div>
      </div>
    </div>
  )
}

export default function CTARandom({ onRandomClick }: CTARandomProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Создаем билеты разных размеров для карусели
  const tickets = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: 240 + (i % 3) * 30, // Размеры от 240 до 300px
    rotation: -6 + (i % 5) * 2.5, // Повороты от -6 до 4 градусов
    delay: i * 0.3,
  }))

  return (
    <section className="w-full bg-gradient-to-b from-[#FF9800] via-[#FF8C42] to-[#FF6F00] px-4 relative overflow-hidden">
      {/* Верхняя часть - билеты карусель (почти касаются границ) */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden pointer-events-none"
        style={{
          height: 'calc(100vh - 180px)',
          minHeight: '80px',
          maxHeight: '250px',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        <div className="ticket-carousel">
          {/* Первый набор билетов */}
          {tickets.map((ticket) => (
            <div
              key={`first-${ticket.id}`}
              className="ticket-item"
            >
              <TicketCard 
                size={ticket.size} 
                rotation={ticket.rotation}
                delay={ticket.delay}
              />
            </div>
          ))}
          {/* Дублируем для бесшовной анимации */}
          {tickets.map((ticket) => (
            <div
              key={`second-${ticket.id}`}
              className="ticket-item"
            >
              <TicketCard 
                size={ticket.size} 
                rotation={ticket.rotation}
                delay={ticket.delay}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ticket-carousel {
          display: flex;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          gap: 150px;
          align-items: center;
          animation: ticketCarouselMove 30s linear infinite;
          will-change: transform;
        }

        .ticket-item {
          flex-shrink: 0;
        }

        @keyframes ticketCarouselMove {
          0% {
            transform: translateY(-50%) translateX(0);
          }
          100% {
            transform: translateY(-50%) translateX(calc(-50% - 75px));
          }
        }

        @keyframes gentle-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.95;
          }
        }

        .animate-gentle-pulse {
          animation: gentle-pulse 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>

      {/* Нижняя часть - текст и кнопка (контрастный блок) */}
      <div className="relative z-[10] max-w-[500px] mx-auto text-center -mt-4 pb-8">
        <div className="relative bg-white rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-2 border-gray-200">
          {/* Контент */}
          <div className="relative z-10">
            <h2 className="text-[clamp(24px,3.5vw,32px)] font-extrabold text-gray-900 mb-4 leading-[1.2] tracking-[-0.02em]">
              Не можешь выбрать?
            </h2>
            <p className="font-sans text-[clamp(15px,2vw,17px)] font-normal text-gray-700 leading-[1.6] m-0 mb-8">
              Положись на волю судьбы и отправься в особое путешествие.
            </p>
            <button 
              onClick={onRandomClick}
              type="button" 
              className="inline-block py-4 px-10 font-sans text-[13px] font-bold text-white uppercase tracking-[0.12em] bg-[#5D6A56] border-none rounded-full cursor-pointer transition-all duration-300 hover:bg-[#4d5a48] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(93,106,86,0.5)]"
            >
              Случайный выбор
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

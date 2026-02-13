import { useState, useEffect, useRef } from 'react'
import { getAssetPath } from '../utils/paths'

interface HeaderProps {
  onMapClick?: () => void
  onRoutesClick?: () => void
  onConceptClick?: () => void
}

export default function Header({ onMapClick, onRoutesClick, onConceptClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Отслеживание скролла и активной секции
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      // Вычисление прогресса скролла
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollY / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))

      // Определение активной секции
      const sections = ['hero', 'concept-section', 'map-section', 'routes-section']
      let currentSection = 'hero'

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top + scrollY
          const offset = windowHeight * 0.3 // Смещение для активации

          if (scrollY + offset >= sectionTop) {
            currentSection = sections[i]
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Инициализация

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Закрытие мобильного меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('button[aria-label="Меню"]')
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (handler?: () => void, sectionId?: string) => {
    if (handler) {
      handler()
    } else if (sectionId) {
      scrollToSection(sectionId)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      {/* Индикатор прогресса скролла */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div 
          className="h-full bg-gradient-to-r from-[#ffb84d] via-[#ff8c42] to-[#ff7040] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,140,66,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
        
        {/* Птичка на кончике прогресс-бара */}
        <div
          className="absolute bottom-0 transition-all duration-150 ease-out z-10"
          style={{ 
            left: `calc(${scrollProgress}% - 20px)`,
            transform: 'translateY(90%)'
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-bird-fly"
            style={{
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))'
            }}
          >
            {/* Крыло (верхнее) */}
            <path
              d="M8 10C7 9 6 10 6 11C6 12 7 13 8 12C9 11 9 10 8 10Z"
              fill="#ffb84d"
            />
            {/* Тело птички */}
            <ellipse
              cx="12"
              cy="12"
              rx="5"
              ry="4"
              fill="#ff8c42"
              stroke="#ff7040"
              strokeWidth="0.8"
            />
            {/* Крыло (нижнее) */}
            <path
              d="M10 13C9 14 8 15 9 16C10 17 11 16 11 15C11 14 10 13 10 13Z"
              fill="#ffb84d"
            />
            {/* Голова */}
            <circle
              cx="14"
              cy="10"
              r="3"
              fill="#ff8c42"
              stroke="#ff7040"
              strokeWidth="0.8"
            />
            {/* Глаз */}
            <circle
              cx="15"
              cy="9.5"
              r="1.2"
              fill="#fff"
            />
            <circle
              cx="15.2"
              cy="9.3"
              r="0.6"
              fill="#333"
            />
            {/* Клюв */}
            <path
              d="M16.5 10.5L18 11L16.5 11.5Z"
              fill="#ff7040"
            />
            {/* Хвост */}
            <path
              d="M7 12L5 13L6 14L7 12Z"
              fill="#ff8c42"
            />
          </svg>
        </div>
      </div>

      {/* Декоративный градиент сверху при скролле */}
      {isScrolled && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff8c42]/30 to-transparent opacity-50" />
      )}
      <nav className="max-w-[1400px] mx-auto px-4 md:px-5 flex items-center justify-between">
        {/* Логотип */}
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span 
            className={`text-base md:text-xl font-bold font-display uppercase transition-all duration-300 group-hover:tracking-wide ${
              isScrolled ? 'text-[#4D5C47]' : 'text-white drop-shadow-lg'
            }`}
          >
            ленстройтрест
          </span>
        </div>

        {/* Десктопное меню */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleNavClick(onConceptClick, 'concept-section')}
            className={`relative px-4 py-2 text-sm font-semibold font-display rounded-full transition-all duration-300 group ${
              isScrolled
                ? activeSection === 'concept-section'
                  ? 'text-[#ff8c42]'
                  : 'text-[#4D5C47] hover:text-[#ff8c42]'
                : activeSection === 'concept-section'
                  ? 'text-[#ffb84d]'
                  : 'text-white hover:text-[#ffb84d] drop-shadow-md'
            } hover:scale-105`}
          >
            О проекте
            {/* Активный индикатор */}
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-[#ffb84d] to-[#ff8c42] transition-all duration-300 ${
                activeSection === 'concept-section' ? 'opacity-100 scale-150' : 'opacity-0 scale-0'
              }`}
            />
            {/* Подчеркивание при hover */}
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ffb84d] via-[#ff8c42] to-[#ff7040] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>
          <button
            onClick={() => handleNavClick(onMapClick, 'map-section')}
            className={`relative px-4 py-2 text-sm font-semibold font-display rounded-full transition-all duration-300 group ${
              isScrolled
                ? activeSection === 'map-section'
                  ? 'text-[#ff8c42]'
                  : 'text-[#4D5C47] hover:text-[#ff8c42]'
                : activeSection === 'map-section'
                  ? 'text-[#ffb84d]'
                  : 'text-white hover:text-[#ffb84d] drop-shadow-md'
            } hover:scale-105`}
          >
            Карта троп
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-[#ffb84d] to-[#ff8c42] transition-all duration-300 ${
                activeSection === 'map-section' ? 'opacity-100 scale-150' : 'opacity-0 scale-0'
              }`}
            />
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ffb84d] via-[#ff8c42] to-[#ff7040] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>
          <button
            onClick={() => handleNavClick(onRoutesClick, 'routes-section')}
            className={`relative px-4 py-2 text-sm font-semibold font-display rounded-full transition-all duration-300 group ${
              isScrolled
                ? activeSection === 'routes-section'
                  ? 'text-[#ff8c42]'
                  : 'text-[#4D5C47] hover:text-[#ff8c42]'
                : activeSection === 'routes-section'
                  ? 'text-[#ffb84d]'
                  : 'text-white hover:text-[#ffb84d] drop-shadow-md'
            } hover:scale-105`}
          >
            Маршруты
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-[#ffb84d] to-[#ff8c42] transition-all duration-300 ${
                activeSection === 'routes-section' ? 'opacity-100 scale-150' : 'opacity-0 scale-0'
              }`}
            />
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ffb84d] via-[#ff8c42] to-[#ff7040] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </button>
          <button
            onClick={() => handleNavClick(undefined, 'hero')}
            className={`relative px-6 py-2.5 text-sm font-semibold font-display rounded-full transition-all duration-300 overflow-hidden group ${
              isScrolled
                ? 'bg-gradient-to-br from-[#ffb84d] via-[#ff8c42] to-[#ff7040] text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-white/20 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/30 hover:border-white/50'
            }`}
          >
            <span className="relative z-10">Начать</span>
            {/* Блестящий эффект при hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>

        {/* Мобильная кнопка меню */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2.5 rounded-lg transition-all duration-300 active:scale-95 ${
            isScrolled
              ? 'text-[#4D5C47] hover:bg-gray-100 active:bg-gray-200'
              : 'text-white hover:bg-white/20 active:bg-white/30'
          }`}
          aria-label="Меню"
          aria-expanded={isMobileMenuOpen}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Мобильное меню */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-500 ease-out overflow-hidden border-t border-gray-200/50 ${
          isMobileMenuOpen 
            ? 'max-h-[500px] opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}
        style={{
          transitionProperty: 'max-height, opacity, visibility',
        }}
      >
        <div className="px-4 md:px-5 py-4 flex flex-col gap-2.5">
          <button
            onClick={() => handleNavClick(onConceptClick, 'concept-section')}
            className={`relative text-left px-4 py-3.5 text-[#4D5C47] font-semibold font-display rounded-xl transition-all duration-300 active:scale-[0.98] ${
              activeSection === 'concept-section' 
                ? 'bg-[#ff8c42]/10 text-[#ff8c42] border-l-4 border-[#ff8c42]' 
                : 'hover:bg-[#ff8c42]/10 hover:text-[#ff8c42] active:bg-[#ff8c42]/15'
            }`}
            style={{
              animationDelay: isMobileMenuOpen ? '0.1s' : '0s',
              animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none',
            }}
          >
            <span className="flex items-center gap-2.5 text-base">
              О проекте
              {activeSection === 'concept-section' && (
                <span className="w-2 h-2 rounded-full bg-[#ff8c42] animate-pulse" />
              )}
            </span>
          </button>
          <button
            onClick={() => handleNavClick(onMapClick, 'map-section')}
            className={`relative text-left px-4 py-3.5 text-[#4D5C47] font-semibold font-display rounded-xl transition-all duration-300 active:scale-[0.98] ${
              activeSection === 'map-section' 
                ? 'bg-[#ff8c42]/10 text-[#ff8c42] border-l-4 border-[#ff8c42]' 
                : 'hover:bg-[#ff8c42]/10 hover:text-[#ff8c42] active:bg-[#ff8c42]/15'
            }`}
            style={{
              animationDelay: isMobileMenuOpen ? '0.15s' : '0s',
              animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none',
            }}
          >
            <span className="flex items-center gap-2.5 text-base">
              Карта троп
              {activeSection === 'map-section' && (
                <span className="w-2 h-2 rounded-full bg-[#ff8c42] animate-pulse" />
              )}
            </span>
          </button>
          <button
            onClick={() => handleNavClick(onRoutesClick, 'routes-section')}
            className={`relative text-left px-4 py-3.5 text-[#4D5C47] font-semibold font-display rounded-xl transition-all duration-300 active:scale-[0.98] ${
              activeSection === 'routes-section' 
                ? 'bg-[#ff8c42]/10 text-[#ff8c42] border-l-4 border-[#ff8c42]' 
                : 'hover:bg-[#ff8c42]/10 hover:text-[#ff8c42] active:bg-[#ff8c42]/15'
            }`}
            style={{
              animationDelay: isMobileMenuOpen ? '0.2s' : '0s',
              animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none',
            }}
          >
            <span className="flex items-center gap-2.5 text-base">
              Маршруты
              {activeSection === 'routes-section' && (
                <span className="w-2 h-2 rounded-full bg-[#ff8c42] animate-pulse" />
              )}
            </span>
          </button>
          <button
            onClick={() => handleNavClick(undefined, 'hero')}
            className="mt-3 px-5 py-3.5 bg-gradient-to-br from-[#ffb84d] via-[#ff8c42] to-[#ff7040] text-white font-semibold font-display rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.97] relative overflow-hidden group text-base"
            style={{
              animationDelay: isMobileMenuOpen ? '0.25s' : '0s',
              animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none',
            }}
          >
            <span className="relative z-10">Начать</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>

    </header>
  )
}

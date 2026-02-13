import { useEffect, useRef, useState } from 'react'
import { Trail } from '../types'

interface TrailModalProps {
  trail: Trail | null
  isOpen: boolean
  onClose: () => void
}

export default function TrailModal({ trail, isOpen, onClose }: TrailModalProps) {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause()
        setCurrentAudio(null)
        setIsPlaying(false)
      }
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isOpen, currentAudio])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleAudioClick = () => {
    if (!trail?.audioUrl) return

    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause()
      setCurrentAudio(null)
      setIsPlaying(false)
    } else {
      const audio = new Audio(trail.audioUrl)
      audio.play()
      setCurrentAudio(audio)
      setIsPlaying(true)
      
      audio.addEventListener('ended', () => {
        setCurrentAudio(null)
        setIsPlaying(false)
      })
      
      audio.addEventListener('error', () => {
        setCurrentAudio(null)
        setIsPlaying(false)
      })
    }
  }

  if (!trail) return null

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full z-[99999] flex items-center justify-center opacity-0 invisible transition-all duration-300 pointer-events-none ${isOpen ? 'opacity-100 visible pointer-events-all' : ''}`}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/75 to-black/65 backdrop-blur-[8px] backdrop-saturate-[180%] z-[1] transition-all duration-300"
        onClick={onClose}
      />
      <div 
        className={`relative z-[2] max-w-[1100px] w-[90%] max-h-[90vh] overflow-hidden scale-90 translate-y-5 transition-all duration-400 rounded-2xl blur-sm opacity-0 ${isOpen ? 'scale-100 translate-y-0 blur-0 opacity-100' : ''} max-md:w-[95%] max-md:max-h-[85vh]`}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/95 border-none rounded-full cursor-pointer z-10 transition-all duration-200 text-black hover:bg-white"
          aria-label="Закрыть"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-h-[90vh] flex max-md:flex-col">
          <div className="w-[45%] flex-shrink-0 relative min-h-[500px] flex items-center justify-center bg-[#f5f5f5] max-md:w-full max-md:min-h-[250px] max-md:max-h-[300px]">
            <img 
              src={trail.image.includes(' карточка') ? trail.image : trail.image.replace('.png', ' карточка.png')} 
              alt={trail.name} 
              className="w-full h-full object-contain block min-h-[500px] max-md:min-h-[200px]"
            />
          </div>
          <div className="flex-1 p-10 flex flex-col gap-6 overflow-y-auto max-h-[90vh] max-md:p-6 max-md:max-h-[calc(85vh-300px)]">
            <h3 className="text-[28px] font-bold font-sans text-[#1a1a1a] m-0 leading-[1.3] tracking-[-0.02em]">
              {trail.name}
              {trail.subtitle && trail.subtitle.trim() && (
                <span className="text-primary-orange block mt-1">{trail.subtitle}</span>
              )}
            </h3>
            <p className="text-base font-normal font-sans text-[#333333] m-0 leading-[1.7] tracking-[0.01em]">
              {trail.fullDescription || trail.description}
            </p>
            {trail.points && trail.points.length > 0 && (
              <div className="flex flex-col gap-3 mt-2">
                {trail.points.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-orange flex-shrink-0" />
                    <span className="text-[15px] font-normal font-sans text-black leading-[1.5]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-end gap-10 mt-auto pt-6 border-t-2 border-black/8 max-md:flex-wrap max-md:gap-5 max-md:flex-col max-md:items-start">
              <div className="flex flex-col gap-2 items-start">
                <button
                  onClick={handleAudioClick}
                  className={`flex items-center gap-2 px-5 py-3 bg-primary-orange border-none rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#ff9d5c] ${isPlaying ? 'bg-[#ff6b1f]' : ''}`}
                >
                  <svg className="w-6 h-6 text-white flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                  <div className="flex items-center gap-1 h-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i}
                        className={`w-0.5 bg-white rounded transition-all duration-300 ${isPlaying ? 'animate-[audioWave_1s_ease-in-out_infinite]' : ''}`}
                        style={{
                          height: isPlaying ? undefined : `${8 + i * 2}px`,
                          animationDelay: isPlaying ? `${(i - 1) * 0.1}s` : undefined
                        }}
                      />
                    ))}
                  </div>
                </button>
                <span className="text-[11px] font-medium font-sans text-black uppercase tracking-[0.05em] leading-none">
                  АУДИОГИД
                </span>
              </div>
              <div className="flex items-end gap-10 max-md:w-full max-md:justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-bold font-sans text-primary-orange leading-none">
                    {trail.distance}
                  </span>
                  <span className="text-[11px] font-medium font-sans text-black uppercase tracking-[0.05em] leading-none">
                    РАССТОЯНИЕ
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-bold font-sans text-primary-orange leading-none">
                    {trail.timing}
                  </span>
                  <span className="text-[11px] font-medium font-sans text-black uppercase tracking-[0.05em] leading-none">
                    ТАЙМИНГ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

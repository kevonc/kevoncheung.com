import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Appearances({ appearances }) {
  const [startIndex, setStartIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState('right')
  const itemsPerPage = 3

  const nextCard = () => {
    if (startIndex + itemsPerPage < appearances.length && !isAnimating) {
      setIsAnimating(true)
      setSlideDirection('right')
      
      setTimeout(() => {
        setStartIndex(startIndex + 1)
        setIsAnimating(false)
      }, 200)
    }
  }

  const prevCard = () => {
    if (startIndex > 0 && !isAnimating) {
      setIsAnimating(true)
      setSlideDirection('left')
      
      setTimeout(() => {
        setStartIndex(startIndex - 1)
        setIsAnimating(false)
      }, 200)
    }
  }

  const visibleItems = appearances.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="pt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl">Guest Appearances & Writing</h2>
        <div className="flex gap-4">
          <button 
            onClick={prevCard} 
            disabled={startIndex === 0 || isAnimating}
            className="text-2xl text-gray-400 hover:text-gray-600 disabled:text-gray-200 transition-colors"
          >
            ←
          </button>
          <button 
            onClick={nextCard}
            disabled={startIndex + itemsPerPage >= appearances.length || isAnimating}
            className="text-2xl text-gray-400 hover:text-gray-600 disabled:text-gray-200 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{
            animation: isAnimating 
              ? `${slideDirection === 'right' ? 'slideLeft' : 'slideRight'} 0.2s ease-in-out forwards`
              : 'none'
          }}
        >
          {visibleItems.map((appearance) => (
            <div key={appearance.title}>
              <Link 
                href={appearance.link}
                className="group block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src={appearance.image_url} 
                    alt={appearance.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl mb-2 group-hover:text-blue-600 transition-colors">{appearance.title}</h3>
                <p className="text-gray-600 text-sm">{appearance.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(33.33%);
          }
        }
      `}</style>
    </section>
  )
} 
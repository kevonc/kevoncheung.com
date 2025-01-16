import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Appearances({ appearances }) {
  const [startIndex, setStartIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState('right')
  const [currentItems, setCurrentItems] = useState([])
  const [nextItems, setNextItems] = useState([])
  const itemsPerPage = 3
  const totalPages = Math.ceil(appearances.length / itemsPerPage)
  const currentPage = Math.floor(startIndex / itemsPerPage)

  useEffect(() => {
    setCurrentItems(appearances.slice(startIndex, startIndex + itemsPerPage))
  }, [startIndex, appearances])

  const nextPage = () => {
    if (startIndex + itemsPerPage < appearances.length && !isAnimating) {
      setIsAnimating(true)
      setSlideDirection('right')
      setNextItems(appearances.slice(startIndex + itemsPerPage, startIndex + itemsPerPage * 2))
      
      setTimeout(() => {
        setStartIndex(startIndex + itemsPerPage)
        setIsAnimating(false)
      }, 900)
    }
  }

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0 && !isAnimating) {
      setIsAnimating(true)
      setSlideDirection('left')
      setNextItems(appearances.slice(startIndex - itemsPerPage, startIndex))
      
      setTimeout(() => {
        setStartIndex(startIndex - itemsPerPage)
        setIsAnimating(false)
      }, 900)
    }
  }

  return (
    <section className="pt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl">Guest Appearances & Writing</h2>
        <div className="flex gap-4">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0 || isAnimating}
            className="text-2xl text-gray-400 hover:text-gray-600 disabled:text-gray-200 transition-colors"
          >
            ←
          </button>
          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages - 1 || isAnimating}
            className="text-2xl text-gray-400 hover:text-gray-600 disabled:text-gray-200 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentItems.map((appearance, index) => (
            <div
              key={appearance.title}
              className="relative"
              style={{
                animation: isAnimating 
                  ? `${slideDirection === 'right' ? 'slideOutLeft' : 'slideOutRight'} 0.6s ease-in-out forwards ${index * 150}ms`
                  : 'none'
              }}
            >
              <div
                className={`absolute top-0 left-0 w-full ${isAnimating ? 'block' : 'hidden'}`}
                style={{
                  animation: isAnimating && nextItems[index]
                    ? `${slideDirection === 'right' ? 'slideInRight' : 'slideInLeft'} 0.6s ease-in-out forwards ${index * 150}ms`
                    : 'none'
                }}
              >
                <AppearanceCard appearance={nextItems[index]} />
              </div>
              <div className={isAnimating ? 'invisible' : ''}>
                <AppearanceCard appearance={appearance} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideOutLeft {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-150%);
            opacity: 0;
          }
        }

        @keyframes slideOutRight {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(150%);
            opacity: 0;
          }
        }

        @keyframes slideInRight {
          0% {
            transform: translateX(150%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          0% {
            transform: translateX(-150%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}

function AppearanceCard({ appearance }) {
  if (!appearance) return null
  
  return (
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
  )
} 
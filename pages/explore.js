import Head from 'next/head'
import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import { useState, useEffect } from 'react'

function ScratchCard({ link, index, isRevealed, onReveal }) {
  const [dragStart, setDragStart] = useState(null)
  const [swipeProgress, setSwipeProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [localRevealed, setLocalRevealed] = useState(false)

  // Sync local state with parent state
  useEffect(() => {
    if (isRevealed && !localRevealed) {
      setLocalRevealed(true)
    }
  }, [isRevealed, localRevealed])

  // Handle both touch and mouse events
  const handleStart = (clientX) => {
    if (isRevealed || localRevealed) return
    setDragStart(clientX)
    setIsDragging(true)
  }

  const handleMove = (clientX) => {
    if (isRevealed || localRevealed || !dragStart || !isDragging) return
    
    const diff = clientX - dragStart
    
    // Only track rightward swipes
    if (diff > 0) {
      const progress = Math.min(diff / 150, 1) // 150px to fully reveal
      setSwipeProgress(progress)
      
      // Reveal when swipe is complete
      if (progress >= 1) {
        setLocalRevealed(true)
        setIsDragging(false)
        onReveal(index)
      }
    }
  }

  const handleEnd = () => {
    if (!isRevealed && !localRevealed) {
      if (swipeProgress >= 0.6 && swipeProgress < 1) {
        // Auto-complete if past 60% threshold
        setLocalRevealed(true)
        setSwipeProgress(1)
        onReveal(index)
      } else if (swipeProgress < 0.6) {
        // Reset if not past threshold
        setSwipeProgress(0)
      }
    }
    setDragStart(null)
    setIsDragging(false)
  }

  // Touch event handlers
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Mouse event handlers
  const handleMouseDown = (e) => {
    e.preventDefault()
    handleStart(e.clientX)
  }

  const handleMouseMove = (e) => {
    handleMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd()
    }
  }

  // Determine if content should be shown (either parent says revealed or local reveal happened)
  const shouldShowContent = isRevealed || localRevealed

  const CardContent = () => {
    return (
      <div className="bg-white border-2 border-green-700 rounded-lg px-6 py-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-lg font-medium text-green-700 font-body">
              {link.title}
            </div>
            {link.subtitle && (
              <div 
                className={`text-sm text-gray-500 font-body mt-1 transition-all duration-200 ${
                  shouldShowContent ? 'opacity-100 visible' : 'opacity-0 invisible h-0 overflow-hidden'
                }`}
              >
                {link.subtitle}
              </div>
            )}
          </div>
          {link.image && (
            <img 
              src={link.image} 
              alt={link.title}
              className={`w-12 h-12 rounded object-cover ml-4 transition-all duration-200 ${
                shouldShowContent ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            />
          )}
        </div>

        {/* Scratch-off Overlay */}
        {!shouldShowContent && (
          <div 
            className="absolute inset-0 rounded-lg flex items-center justify-center cursor-pointer select-none"
            style={{
              opacity: 1 - swipeProgress,
              transform: `translateX(${swipeProgress * 100}%)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
              background: `
                repeating-linear-gradient(45deg, #e0e0e0, #e0e0e0 10px, #d0d0d0 10px, #d0d0d0 20px),
                linear-gradient(135deg, #c0c0c0, #e0e0e0)
              `,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-3 bg-gray-800 bg-opacity-80 px-6 py-3 rounded-full">
              <span className="text-base font-semibold text-white">Swipe to reveal</span>
              <svg 
                className="w-6 h-6 text-white animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (shouldShowContent) {
    return (
      <Link
        href={link.url}
        className="block hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
        target={link.url.startsWith('http') ? '_blank' : '_self'}
        rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
      >
        <CardContent />
      </Link>
    )
  }

  return (
    <div className="block">
      <CardContent />
    </div>
  )
}

export default function Explore({ data }) {
  const [revealedCards, setRevealedCards] = useState([])

  const handleReveal = (index) => {
    if (!revealedCards.includes(index)) {
      setRevealedCards([...revealedCards, index])
    }
  }

  return (
    <>
      <Head>
        <title>Explore with Kevon</title>
        <meta name="description" content={data.subtitle} />
        <meta property="og:title" content={`${data.title} | Explore`} />
        <meta property="og:description" content={data.subtitle} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${data.title} | Explore`} />
        <meta name="twitter:description" content={data.subtitle} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-4 px-4">
        <div className="max-w-2xl w-full">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src={data.profileImage} 
                alt={data.title}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1 font-heading">
              {data.title}
            </h1>
            <p className="text-sm text-gray-500 font-body">
              {data.subtitle}
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            {data.links.map((link, index) => (
              <ScratchCard
                key={index}
                link={link}
                index={index}
                isRevealed={revealedCards.includes(index)}
                onReveal={handleReveal}
              />
            ))}
          </div>

          {/* Footer Message */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 font-body">
              🥦 It'll be awesome to connect, <Link href="https://www.instagram.com/kevon/" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-600 underline">so say hi!</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'explore.json')
  const fileContents = await fs.readFile(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  return {
    props: {
      data,
    },
  }
}


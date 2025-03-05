import { useEffect } from 'react'

export default function InstagramEmbed() {
  useEffect(() => {
    // Load Instagram embed script
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [])

  return (
    <blockquote 
      className="instagram-media w-full" 
      data-instgrm-permalink="https://www.instagram.com/kevon/"
      data-instgrm-version="14"
    >
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-gray-500">Loading latest Instagram post...</p>
      </div>
    </blockquote>
  )
} 
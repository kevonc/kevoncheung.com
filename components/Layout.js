import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'

export default function Layout({ children, title, metaDescription, metaImage, robotsDirective = 'index, follow' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pageTitle = !title ? 'Kevon Cheung' : title === 'Home' ? 'Kevon Cheung' : `${title} - Kevon Cheung`
  const defaultMetaImage = 'https://kevoncheung.com/images/meta-image.png' // Default meta image
  const metaImageUrl = metaImage || defaultMetaImage
  const defaultDescription = "Find out what I'm working on and sharing."
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription || defaultDescription} />
        <meta name="robots" content={robotsDirective} />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription || defaultDescription} />
        <meta property="og:image" content={metaImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kevon Cheung" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MeetKevon" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription || defaultDescription} />
        <meta name="twitter:image" content={metaImageUrl} />
      </Head>
      
      <header className="py-4 mb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="no-underline flex items-center">
              <span className="text-xl font-semibold text-gray-900">Kevon Cheung</span>
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-8 list-none p-0 m-0">
                <li className="m-0"><Link href="/about" className="nav-link">About</Link></li>
                <li className="m-0"><Link href="/now" className="nav-link">Now</Link></li>
                <li className="m-0"><Link href="/articles" className="nav-link">Articles</Link></li>
                <li className="m-0"><a href="https://publiclab.co/build-in-public-mastery" className="nav-link" target="_blank" rel="noopener noreferrer">Course</a></li>
                <li className="m-0"><a href="https://kevoncheung.substack.com/" className="nav-link" target="_blank" rel="noopener noreferrer">Newsletter</a></li>
              </ul>
            </nav>
          </div>

          {/* Mobile navigation */}
          <div className={`
            md:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="bg-white h-full w-64 shadow-lg">
              <div className="p-4">
                <nav>
                  <ul className="list-none p-0 m-0 space-y-2">
                    <li>
                      <Link 
                        href="/about" 
                        className="nav-link block py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/now" 
                        className="nav-link block py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Now
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/articles" 
                        className="nav-link block py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Articles
                      </Link>
                    </li>
                    <li>
                      <a 
                        href="https://publiclab.co/build-in-public-mastery" 
                        className="nav-link block py-1.5"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Course
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://kevoncheung.substack.com/" 
                        className="nav-link block py-1.5"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Newsletter
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            {/* Overlay */}
            <div 
              className="bg-green-950 bg-opacity-80 absolute inset-0 -z-10"
              onClick={() => setIsMenuOpen(false)}
            ></div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 max-w-4xl pb-16">
        {children}
      </main>
      
      <footer className="py-8 mt-16 border-t">
        <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center">
          <img 
            src="/images/logo.png" 
            alt="Kevon Cheung" 
            className="h-8 w-auto mb-4"
          />
          <p className="text-gray-600 mb-4">© {new Date().getFullYear()} Kevon Cheung. Let's connect.</p>
          <div className="social-links mb-8 md:mb-0">
          <a href="https://kevoncheung.substack.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/images/social/substack.svg" alt="Substack" width="24" height="24" />
            </a>
            <a href="https://www.youtube.com/@MeetKevon" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/images/social/youtube.svg" alt="YouTube" width="24" height="24" />
            </a>
            <a href="https://www.instagram.com/kevon/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/images/social/instagram.svg" alt="Instagram" width="24" height="24" />
            </a>
            <a href="https://x.com/MeetKevon" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/images/social/x.svg" alt="X" width="24" height="24" />
            </a>
            <a href="https://www.linkedin.com/in/kevoncheung/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/images/social/linkedin.svg" alt="LinkedIn" width="24" height="24" />
            </a>
          </div> 
        </div>
      </footer>
    </div>
  )
} 
import Link from 'next/link'
import Head from 'next/head'

export default function Layout({ children, title }) {
  const pageTitle = title ? `${title} - Kevon Cheung` : 'Kevon Cheung'
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      
      <header className="py-4 mb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-gray-900 no-underline">
              Kevon Cheung
            </Link>
            <nav>
              <ul className="flex items-center space-x-8 list-none p-0 m-0">
                <li className="m-0"><Link href="/about" className="nav-link">About</Link></li>
                <li className="m-0"><Link href="/now" className="nav-link">Now</Link></li>
                <li className="m-0"><Link href="/articles" className="nav-link">Articles</Link></li>
                <li className="m-0"><Link href="https://www.smallschool.is/newsletter" className="nav-link">Newsletter</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 max-w-4xl pb-16">
        {children}
      </main>
      
      <footer className="py-8 mt-16 border-t">
        <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center">
          <p className="text-gray-600 m-0">© {new Date().getFullYear()} Kevon Cheung</p>
          <div class="social-links">
            <a href="https://x.com/MeetKevon" target="_blank" rel="noopener noreferrer" class="social-icon">
              <img src="/images/social/x.svg" alt="X" width="24" height="24" />
            </a>
            <a href="https://www.linkedin.com/in/kevoncheung/" target="_blank" rel="noopener noreferrer" class="social-icon">
              <img src="/images/social/linkedin.svg" alt="LinkedIn" width="24" height="24" />
            </a>
            <a href="https://www.instagram.com/kevon/" target="_blank" rel="noopener noreferrer" class="social-icon">
              <img src="/images/social/instagram.svg" alt="Instagram" width="24" height="24" />
            </a>
            <a href="https://www.threads.net/@kevon" target="_blank" rel="noopener noreferrer" class="social-icon">
              <img src="/images/social/threads.svg" alt="Threads" width="24" height="24" />
            </a>
            <a href="https://www.youtube.com/@MeetKevon" target="_blank" rel="noopener noreferrer" class="social-icon">
              <img src="/images/social/youtube.svg" alt="YouTube" width="24" height="24" />
            </a>
          </div> 
        </div>
      </footer>
    </div>
  )
} 
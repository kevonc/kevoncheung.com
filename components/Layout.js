import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="pt-4 pb-8 mb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-gray-900 no-underline">
              Kevon Cheung
            </Link>
            <nav>
              <ul className="flex items-center space-x-8">
                <li><Link href="/about" className="nav-link">About</Link></li>
                <li><Link href="/now" className="nav-link">Now</Link></li>
                <li><Link href="/blog" className="nav-link">Articles</Link></li>
                <li><Link href="https://www.smallschool.is/newsletter" className="nav-link">Newsletter</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 max-w-4xl pb-16">
        {children}
      </main>
      
      <footer className="py-8 mt-16 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-gray-600">© {new Date().getFullYear()} Kevon Cheung</p>
          <div className="flex space-x-6 mt-4">
            <a href="https://x.com/MeetKevon" className="nav-link">X</a>
            <a href="https://threads.net/@kevon" className="nav-link">Threads</a>
            <a href="https://instagram.com/kevon" className="nav-link">Instagram</a>
            <a href="https://youtube.com/@MeetKevon" className="nav-link">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  )
} 
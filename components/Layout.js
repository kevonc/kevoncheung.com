import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <nav className="py-4">
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/now">Now</Link></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
      <footer className="py-8 mt-8 border-t">
        <p>© Kevon Cheung {new Date().getFullYear()}</p>
        <div className="flex space-x-4 mt-4">
          <a href="https://twitter.com/MadeByKevon">X</a>
          <a href="https://threads.net/@kevoncheung">Threads</a>
          <a href="https://instagram.com/kevoncheung">Instagram</a>
          <a href="https://youtube.com/@MadeByKevon">YouTube</a>
        </div>
      </footer>
    </div>
  )
} 
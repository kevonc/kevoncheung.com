import Layout from '../components/Layout'
import Link from 'next/link'

export default function Custom404() {
  return (
    <Layout 
      title="404 - Page Not Found"
      robotsDirective="noindex, follow"
    >
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <img 
          src="/images/404.gif" 
          alt="404" 
          className="mb-10 w-[480px] h-[252px]" 
        />
        <h1 className="text-3xl font-bold mb-4">Ay ay! What you're looking for doesn't seem to exist.</h1>
        <h2 className="text-xl font-semibold mb-12">Maybe start here?</h2>
        <Link 
          href="/about" 
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Click for surprise
        </Link>
      </div>
    </Layout>
  )
} 
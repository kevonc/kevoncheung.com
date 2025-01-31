import Layout from '../components/Layout'
import Link from 'next/link'

export default function Custom404() {
  return (
    <Layout 
      title="404 - Page Not Found"
      robotsDirective="noindex, follow"
    >
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold mb-4">Oops! Page not found.</h1>
        <h2 className="text-2xl font-semibold mb-6">Do you want to get a fresh start?</h2>
        <Link 
          href="/" 
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Go back
        </Link>
      </div>
    </Layout>
  )
} 
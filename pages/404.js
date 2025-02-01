import Layout from '../components/Layout'
import Link from 'next/link'

export default function Custom404() {
  return (
    <Layout 
      title="404 - Page Not Found"
      robotsDirective="noindex, follow"
    >
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">I'm sorry! This page doesn't exist anymore.</h1>
        <h2 className="text-xl font-semibold mb-12">Why don't you start here instead?</h2>
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
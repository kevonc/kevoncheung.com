import Layout from '../components/Layout'
import Link from 'next/link'

export default function Unsubscribed() {
  return (
    <Layout 
      title="Unsubscribed"
      robotsDirective="noindex, follow"
    >
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">You've been successfully unsubscribed :)</h1>
        <h2 className="text-xl font-semibold mb-12">Thank you for being part of my journey. You can always subscribe again in the future!</h2>
        <Link 
          href="/" 
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </Layout>
  )
} 
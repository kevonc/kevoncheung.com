import Layout from '../components/Layout'
import Link from 'next/link'

export default function Custom404() {
  return (
    <Layout
      title="404 - Page Not Found"
      metaDescription="This page doesn't exist. Head back home or explore more on kevoncheung.com."
      robotsDirective="noindex, follow"
    >
      <div className="max-w-2xl mx-auto">
        <header className="articles-hero">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-800 mb-3">
            Page not found
          </p>
          <h1>Ay ay! What you&apos;re looking for doesn&apos;t seem to exist.</h1>
          <p className="articles-intro">Maybe start here?</p>
        </header>

        <figure className="mb-10">
          <img
            src="/images/404.gif"
            alt=""
            className="w-full max-w-sm rounded-2xl"
          />
        </figure>

        <Link
          href="/about"
          className="inline-flex items-center rounded-lg bg-[#16423c] px-5 py-3 font-semibold text-white hover:bg-[#1f5750] hover:text-white"
        >
          Click for surprise
        </Link>
      </div>
    </Layout>
  )
}

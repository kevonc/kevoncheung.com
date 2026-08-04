import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ArticlePanel from './ArticlePanel'
import SiteSidebar from './SiteSidebar'
import SocialLinks from './SocialLinks'

export default function Layout({
  children,
  title,
  metaDescription,
  metaImage,
  robotsDirective = 'index, follow',
  articlePanel,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pageTitle = !title ? 'Kevon Cheung' : title === 'Home' ? 'Kevon Cheung' : `${title} - Kevon Cheung`
  const defaultMetaImage = 'https://kevoncheung.com/images/meta-image.png'
  const metaImageUrl = metaImage
    ? new URL(metaImage, 'https://kevoncheung.com').toString()
    : defaultMetaImage
  const defaultDescription = "Find out what I'm working on and sharing."

  useEffect(() => {
    setIsMenuOpen(false)
  }, [router.asPath])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div className="site-shell">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription || defaultDescription} />
        <meta name="robots" content={robotsDirective} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription || defaultDescription} />
        <meta property="og:image" content={metaImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kevon Cheung" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MeetKevon" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription || defaultDescription} />
        <meta name="twitter:image" content={metaImageUrl} />
      </Head>

      <header className="mobile-header">
        <Link href="/" className="mobile-brand">Kevon Cheung</Link>
        <button
          className="menu-button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </header>

      <SiteSidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeTopicSlug={articlePanel?.topicSlug}
      />

      <div className={`site-main${articlePanel ? ' has-article-panel' : ''}`}>
        {articlePanel && <ArticlePanel {...articlePanel} />}

        <div className="content-column">
          <main className="page-content">{children}</main>

          <footer className="site-footer">
            <p>© {new Date().getFullYear()} Kevon Cheung. Let&apos;s connect.</p>
            <SocialLinks className="mb-8 md:mb-0" />
          </footer>
        </div>
      </div>
    </div>
  )
}
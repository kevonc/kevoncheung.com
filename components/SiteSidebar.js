import Link from 'next/link'
import { useRouter } from 'next/router'

const topics = [
  { title: 'Life Lessons', slug: 'life-lessons' },
  { title: 'Entrepreneurship', slug: 'entrepreneurship' },
  { title: 'Family', slug: 'family' },
]

function Icon({ type }) {
  const paths = {
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    now: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    work: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18" /></>,
    articles: <><path d="M5 3h11l3 3v15H5z" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
    arrow: <><path d="M7 17 17 7M8 7h9v9" /></>,
  }

  return (
    <svg className="sidebar-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[type] || <><circle cx="12" cy="12" r="9" /><path d="M8 12h8" /></>}
    </svg>
  )
}

function NavLink({ href, icon, children, external = false, onNavigate }) {
  const router = useRouter()
  const active = href === '/' ? router.pathname === '/' : router.asPath.startsWith(href)
  const className = `sidebar-link${active ? ' is-active' : ''}`
  const content = <><Icon type={icon} /><span>{children}</span>{external && <Icon type="arrow" />}</>

  if (external) {
    return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{content}</a>
  }

  return <Link href={href} className={className} onClick={onNavigate}>{content}</Link>
}

export default function SiteSidebar({ isOpen, onClose, activeTopicSlug }) {
  const router = useRouter()

  return (
    <>
      <aside className={`site-sidebar${isOpen ? ' is-open' : ''}`}>
        <div className="sidebar-brand-row">
          <Link href="/" className="sidebar-brand" onClick={onClose}>
            Kevon Cheung
          </Link>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <div className="sidebar-group">
            <NavLink href="/" icon="home" onNavigate={onClose}>Home</NavLink>
            <NavLink href="/about" icon="user" onNavigate={onClose}>About</NavLink>
            <NavLink href="/now" icon="now" onNavigate={onClose}>Now</NavLink>
          </div>

          <div className="sidebar-group">
            <p className="sidebar-label">Articles</p>
            <NavLink href="/articles" icon="articles" onNavigate={onClose}>All articles</NavLink>
            {topics.map((topic) => {
              const active = activeTopicSlug === topic.slug || router.asPath.startsWith(`/topic/${topic.slug}`)
              return (
                <Link
                  key={topic.slug}
                  href={`/topic/${topic.slug}`}
                  className={`sidebar-topic${active ? ' is-active' : ''}`}
                  onClick={onClose}
                >
                  <span className="sidebar-topic-mark" />
                  {topic.title}
                </Link>
              )
            })}
          </div>

          <div className="sidebar-group">
            <p className="sidebar-label">Resources</p>
            <NavLink href="https://kevoncheung.substack.com/" icon="arrow" external>Newsletter</NavLink>
            <NavLink href="https://publiclab.co/build-in-public-mastery" icon="arrow" external>Course</NavLink>
          </div>
        </nav>
      </aside>
      <button
        className={`sidebar-backdrop${isOpen ? ' is-visible' : ''}`}
        onClick={onClose}
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
      />
    </>
  )
}

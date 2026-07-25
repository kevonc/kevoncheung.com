import Link from 'next/link'

function PostList({ posts, activeSlug }) {
  return (
    <ol className="article-panel-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/${post.slug}`}
            className={`article-panel-link${post.slug === activeSlug ? ' is-active' : ''}`}
            aria-current={post.slug === activeSlug ? 'page' : undefined}
          >
            <span>{post.frontmatter.title}</span>
            {post.frontmatter.date && (
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            )}
          </Link>
        </li>
      ))}
    </ol>
  )
}

export default function ArticlePanel({ title, posts = [], activeSlug }) {
  return (
    <>
      <aside className="article-panel" aria-label={`${title} articles`}>
        <div className="article-panel-heading">
          <Link href="/articles">Articles</Link>
          <span>{title}</span>
        </div>
        <PostList posts={posts} activeSlug={activeSlug} />
      </aside>

      <details className="article-dropdown">
        <summary>
          <span>
            <small>Articles</small>
            {title}
          </span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="article-dropdown-content">
          <PostList posts={posts} activeSlug={activeSlug} />
        </div>
      </details>
    </>
  )
}

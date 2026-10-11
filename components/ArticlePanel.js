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
          <span>Read more in {title}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
        </summary>
        <div className="article-dropdown-content">
          <PostList posts={posts} activeSlug={activeSlug} />
        </div>
      </details>
    </>
  )
}

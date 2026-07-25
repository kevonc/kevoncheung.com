import Link from 'next/link'
import Layout from '../components/Layout'
import { getPosts, getTopics } from '../lib/articles'

export default function Articles({ posts, topics }) {
  const getTopicName = (topicSlug) => {
    const topic = topics.find(t => t.slug === topicSlug?.toLowerCase().replace(/\s+/g, '-'))
    return topic?.title || topicSlug
  }

  return (
    <Layout title="Articles">
      <div className="articles-page">
        <header className="articles-hero">
          <h1>Articles</h1>
          <p className="articles-intro">
            Lessons from building, teaching, marketing, and figuring out a meaningful life along the way.
          </p>
          <nav className="articles-topics" aria-label="Article categories">
            <span className="articles-topics-label">Browse topics</span>
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topic/${topic.slug}`}
                className="articles-topic"
              >
                {topic.title}
              </Link>
            ))}
          </nav>
        </header>

        <section aria-labelledby="all-articles-heading">
          <div className="articles-list-heading">
            <h2 id="all-articles-heading">Latest writing</h2>
            <span>{posts.length} articles</span>
          </div>

          <div className="articles-index">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="articles-index-row">
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                  month: 'short',
                    day: 'numeric'
                })}
              </time>
              <span className="articles-index-copy">
                <span className="articles-index-title">{post.frontmatter.title}</span>
                {post.frontmatter.topic && (
                  <span className="articles-index-topic">{getTopicName(post.frontmatter.topic)}</span>
                )}
              </span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: getPosts(),
      topics: getTopics(),
    }
  }
}

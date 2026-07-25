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
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-800 mb-3">Ideas and field notes</p>
          <h1>Articles</h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Lessons from building, teaching, marketing, and figuring out a meaningful life along the way.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topic/${topic.slug}`}
                className="tag"
              >
                {topic.title.toLowerCase()}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="group border-b border-gray-200 pb-8">
              <Link href={`/${post.slug}`} className="block no-underline">
                <h2 className="group-hover:text-green-700 mt-0 mb-2">
                  {post.frontmatter.title}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                  <time>{new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</time>
                  {post.frontmatter.topic && (
                    <>
                      <span className="text-gray-400 mx-2">·</span>
                      <span>{getTopicName(post.frontmatter.topic).toLowerCase()}</span>
                    </>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
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

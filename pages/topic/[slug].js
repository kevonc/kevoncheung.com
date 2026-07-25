import Link from 'next/link'
import Layout from '../../components/Layout'
import { getPosts, getTopics } from '../../lib/articles'

export default function Topic({ posts, topic }) {
  return (
    <Layout
      title={`${topic.title} Articles`}
      articlePanel={{ title: topic.title, topicSlug: topic.slug, posts }}
    >
      <div className="max-w-2xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-800 mb-3">Article collection</p>
        <h1>{topic.title}</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          There {posts.length === 1 ? 'is' : 'are'} {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this collection.
          Choose one from the article index to start reading.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {posts[0] && (
            <Link href={`/${posts[0].slug}`} className="inline-flex items-center rounded-lg bg-[#16423c] px-5 py-3 font-semibold text-white hover:bg-[#1f5750] hover:text-white">
              Read the latest article
            </Link>
          )}
          <Link href="/articles" className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:border-gray-500 hover:text-gray-900">
            Browse all articles
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getTopics().map((topic) => ({
    params: { slug: topic.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const topics = getTopics()
  const topic = topics.find(t => t.slug === slug)

  if (!topic) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      posts: getPosts(slug),
      topic,
    }
  }
} 
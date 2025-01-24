import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '../../components/Layout'

export default function Topic({ posts, topic }) {
  // Add helper function to get topic name from slug
  const getTopicName = (topicSlug) => {
    if (topicSlug?.toLowerCase().replace(/\s+/g, '-') === topic.slug) {
      return topic.title
    }
    return topicSlug
  }

  return (
    <Layout title={`${topic.title} Articles`}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <h1>Articles in {topic.title.toLowerCase()}</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            <Link href="/articles" className="tag hover:bg-gray-200">
              all articles
            </Link>
          </div>
        </div>

        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/${post.slug}`} className="block no-underline">
                <h2 className="group-hover:text-green-700 mb-2">
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

export async function getStaticPaths() {
  const topicsFile = fs.readFileSync(path.join('content', 'articles', '_topics.md'), 'utf-8')
  const { data: topicsData } = matter(topicsFile)
  const topics = topicsData.topics || []

  const paths = topics.map((topic) => ({
    params: { slug: topic.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  // Get topics
  const topicsFile = fs.readFileSync(path.join('content', 'articles', '_topics.md'), 'utf-8')
  const { data: topicsData } = matter(topicsFile)
  const topics = topicsData.topics || []
  const topic = topics.find(t => t.slug === slug)

  if (!topic) {
    return {
      notFound: true
    }
  }

  // Get posts
  const files = fs.readdirSync(path.join('content', 'articles'))
  
  const posts = files
    .filter(filename => filename !== '_topics.md')
    .map(filename => {
      const markdownWithMeta = fs.readFileSync(
        path.join('content', 'articles', filename),
        'utf-8'
      )

      const { data: frontmatter } = matter(markdownWithMeta)

      return {
        frontmatter: {
          ...frontmatter,
          date: frontmatter.date ? frontmatter.date.toString() : ''
        },
        slug: frontmatter.slug || filename.replace('.md', '')
      }
    })
    .filter(post => {
      // Convert both topic strings to slugs for comparison
      const postTopicSlug = post.frontmatter.topic?.toLowerCase().replace(/\s+/g, '-')
      return postTopicSlug === slug
    })
    .sort((a, b) => {
      if (!a.frontmatter.date) return 1
      if (!b.frontmatter.date) return -1
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    })

  return {
    props: {
      posts,
      topic
    }
  }
} 
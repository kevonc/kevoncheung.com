import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Articles({ posts, topics }) {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <h1>Articles</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topic/${topic.slug}`}
                className="tag hover:bg-gray-200"
              >
                {topic.title.toLowerCase()}
              </Link>
            ))}
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
                      <span>{post.frontmatter.topic.toLowerCase()}</span>
                    </>
                  )}
                </div>
                {post.frontmatter.meta_description && (
                  <p className="text-gray-600 leading-relaxed">
                    {post.frontmatter.meta_description}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Get topics
  const topicsFile = fs.readFileSync(path.join('content', 'articles', '_topics.md'), 'utf-8')
  const { data: topicsData } = matter(topicsFile)
  const topics = topicsData.topics || []

  // Get posts
  const files = fs.readdirSync(path.join('content', 'articles'))
  
  const posts = files
    .filter(filename => filename !== '_topics.md' && filename !== '.DS_Store')
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
    .filter(post => post.slug)
    .sort((a, b) => {
      if (!a.frontmatter.date) return 1
      if (!b.frontmatter.date) return -1
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    })

  return {
    props: {
      posts,
      topics
    }
  }
} 
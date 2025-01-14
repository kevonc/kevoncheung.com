import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '../../components/Layout'

export default function Blog({ posts }) {
  return (
    <Layout>
      <h1>Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link href={`/blog/${post.slug}`} className="no-underline">
              <h2 className="hover:text-blue-600 transition-colors">{post.frontmatter.title}</h2>
            </Link>
            <div className="flex gap-4 text-gray-600 text-sm mb-2">
              <time>{post.frontmatter.date}</time>
              {post.frontmatter.category && (
                <span className="bg-gray-100 px-2 py-1 rounded">{post.frontmatter.category}</span>
              )}
            </div>
            {post.frontmatter.meta_description && (
              <p className="text-gray-700">{post.frontmatter.meta_description}</p>
            )}
          </article>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('content', 'essays'))
  
  const posts = files
    .filter(filename => filename !== '_categories.md')
    .map(filename => {
      const markdownWithMeta = fs.readFileSync(
        path.join('content', 'essays', filename),
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
      posts
    }
  }
} 
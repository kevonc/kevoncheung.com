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
              <h2 className="hover:text-blue-600 transition-colors">{post.title}</h2>
            </Link>
            <div className="flex gap-4 text-gray-600 text-sm mb-2">
              <time>{post.date}</time>
              {post.category && (
                <span className="bg-gray-100 px-2 py-1 rounded">{post.category}</span>
              )}
            </div>
            {post.meta_description && (
              <p className="text-gray-700">{post.meta_description}</p>
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
      
      // Ensure date is a string and exists
      const date = frontmatter.date ? frontmatter.date.toString() : ''
      
      return {
        ...frontmatter,
        date,
        slug: filename.replace('.md', '')
      }
    })
    .sort((a, b) => new Date(b.date || '') - new Date(a.date || ''))

  return {
    props: {
      posts: posts.map(post => ({
        ...post,
        date: post.date || ''
      }))
    }
  }
} 
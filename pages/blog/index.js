import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '../../components/Layout'

export default function Blog({ posts, categories }) {
  return (
    <Layout>
      <div className="mb-16">
        <h1 className="font-semibold">Articles</h1>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              href={`/category/${category.slug}`}
              className="tag hover:bg-gray-200"
            >
              {category.title.toLowerCase()}
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/${post.slug}`} className="block no-underline">
              <h2 className="text-3xl text-gray-900 font-medium group-hover:text-green-700 mb-2">
                {post.frontmatter.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                <time>{new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</time>
                {post.frontmatter.category && (
                  <>
                    <span className="text-gray-400 mx-2">·</span>
                    <span>{post.frontmatter.category.toLowerCase()}</span>
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
    </Layout>
  )
}

export async function getStaticProps() {
  // Get categories
  const categoriesFile = fs.readFileSync(path.join('content', 'articles', '_categories.md'), 'utf-8')
  const { data: categoriesData } = matter(categoriesFile)
  const categories = categoriesData.categories || []

  // Get posts
  const files = fs.readdirSync(path.join('content', 'articles'))
  
  const posts = files
    .filter(filename => filename !== '_categories.md')
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
      categories
    }
  }
} 
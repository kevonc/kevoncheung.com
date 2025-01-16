import Layout from '../components/Layout'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Home({ posts }) {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-24">
        <div className="flex-1 space-y-6">
          <h1 className="text-gray-900">Hey! I'm Kevon 👋</h1>
          <p className="text-xl text-gray-600">Welcome to my personal site.</p>
          
          <p className="text-gray-800">
            I enjoy exploring new ideas around business, education, marketing and knowledge sharing. 
            When I realized everyone has the power to share what they know, I started{' '}
            <a href="https://smallschool.io" className="text-emerald-500 hover:text-emerald-600">
              Small School
            </a>.
          </p>

          <p className="text-gray-800">
            I now live in Hong Kong with my wife and two daughters. I like to run, write, 
            and do silly things with my girls.
          </p>

          <p className="text-gray-800">
            Here you'll find my writing and projects. I try my best to show you what I'm learning. 
            Follow me so we can be friends:
          </p>

          <div className="flex gap-6">
            <a href="https://twitter.com/MadeByKevon" className="text-emerald-500 hover:text-emerald-600">X</a>
            <a href="https://threads.net/@kevoncheung" className="text-emerald-500 hover:text-emerald-600">Threads</a>
            <a href="https://instagram.com/kevoncheung" className="text-emerald-500 hover:text-emerald-600">Instagram</a>
            <a href="https://youtube.com/@MadeByKevon" className="text-emerald-500 hover:text-emerald-600">YouTube</a>
          </div>
        </div>

        <div className="w-full md:w-[400px] rounded-2xl overflow-hidden">
          <img 
            src="/images/kevon.png" 
            alt="Kevon Cheung" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div>
        <h2 className="text-4xl mb-12">Articles</h2>
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block no-underline group">
                <h3 className="text-2xl text-gray-900 group-hover:text-blue-600 mb-2">
                  {post.frontmatter.title}
                </h3>
                <div className="flex items-center gap-4 text-gray-600">
                  <time>{new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</time>
                  {post.frontmatter.category && (
                    <span className="tag">{post.frontmatter.category.toLowerCase()}</span>
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
    .slice(0, 5) // Only get the latest 5 posts

  return {
    props: {
      posts
    }
  }
} 
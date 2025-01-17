import Layout from '../components/Layout'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function Home({ posts, content }) {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-24">
        <div className="flex-1 space-y-6">
          <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: content.hero }} />
          
          <div className="flex gap-6">
            {content.socialLinks.map((link) => (
              <a 
                key={link.platform}
                href={link.url} 
                className="text-emerald-500 hover:text-emerald-600"
              >
                {link.platform}
              </a>
            ))}
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

      {/* Articles Section */}
      <div>
        <h2 className="text-4xl mb-12">Articles</h2>
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/${post.slug}`} className="block no-underline group">
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
  // Get home page content
  const homeContent = fs.readFileSync(path.join('content', 'home.md'), 'utf-8')
  const { data: frontmatter, content } = matter(homeContent)
  
  // Split content into sections
  const sections = content.split('---')
  const processedContent = {
    hero: marked(sections[0]),
    socialLinks: [
      { platform: 'X', url: 'https://twitter.com/MadeByKevon' },
      { platform: 'Threads', url: 'https://threads.net/@kevoncheung' },
      { platform: 'Instagram', url: 'https://instagram.com/kevoncheung' },
      { platform: 'YouTube', url: 'https://youtube.com/@MadeByKevon' }
    ]
  }

  // Get blog posts
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
    .slice(0, 5) // Only get the latest 5 posts

  return {
    props: {
      posts,
      content: processedContent
    }
  }
} 
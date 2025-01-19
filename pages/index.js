import Layout from '../components/Layout'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Home({ posts }) {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-24">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl mb-6">Hey! I'm Kevon 👋</h1>
            
            <div className="space-y-6 text-lg">
              <p>Welcome to my personal site.</p>

              <p>
                I enjoy exploring new ideas around business, education, marketing and knowledge sharing. 
                When I realized everyone has the power to share what they know, I started{' '}
                <a href="https://smallschool.io" className="link-underline">Small School</a>.
              </p>

              <p>
                I now live in Hong Kong with my wife and two daughters. 
                I like to run, write, and do silly things with my girls.
              </p>

              <p>
                Here you'll find my writing and projects. I try my best to show you what I'm learning. 
                Follow me so we can be friends:
              </p>
            </div>
          </div>

          <div className="w-full md:w-[280px] rounded-2xl overflow-hidden shrink-0">
            <img 
              src="/images/kevon.png" 
              alt="Kevon Cheung" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Articles Section */}
        <div>
          <h2>Articles</h2>
          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/${post.slug}`} className="block no-underline group">
                  <h3 className="group-hover:text-green-700 mb-2">
                    {post.frontmatter.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
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
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
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
      posts
    }
  }
} 
import { useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function Home({ posts, projects, homeContent, homeTitle }) {
  useEffect(() => {
    // Load Senja widget script
    const senjaScript = document.createElement('script')
    senjaScript.src = 'https://widget.senja.io/widget/34da712b-077a-4a62-8332-fb04f41dfe74/platform.js'
    senjaScript.async = true
    document.body.appendChild(senjaScript)

    // Remove any existing Kit script first
    const existingScript = document.querySelector('script[data-uid="e610788a6b"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Create and add the Kit script
    const kitScript = document.createElement('script')
    kitScript.src = 'https://smallschool.kit.com/e610788a6b/index.js'
    kitScript.async = true
    kitScript.setAttribute('data-uid', 'e610788a6b')
    document.getElementById('subscription-container').appendChild(kitScript)

    return () => {
      document.body.removeChild(senjaScript)
      const script = document.querySelector('script[data-uid="e610788a6b"]')
      if (script) {
        script.remove()
      }
    }
  }, [])

  return (
    <Layout title="Home">
      <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-24">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl mb-6">{homeTitle}</h1>
            
            <div 
              className="space-y-6 text-lg prose"
              dangerouslySetInnerHTML={{ __html: homeContent }}
            />
          </div>

          <div className="w-full md:w-[280px] md:ml-6 rounded-2xl overflow-hidden shrink-0">
            <img 
              src="/images/kevon-home.jpg" 
              alt="Kevon Cheung" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-[#16423c] rounded-xl -mx-0.6 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-24 2xl:-mx-32 px-6 sm:px-8 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-16 mb-24">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-white mt-0 mb-4">Subscribe to bounce ideas with me</h2>
            <p className="text-lg mb-2">You'll get my <span class="italic">latest ideas, learnings, and even frustrations</span> directly in your inbox. I love connecting over email too.</p>
            <div id="subscription-container">
              {/* Kit script will be embedded here */}
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="mb-24">
          <h2>Latest Articles</h2>
          <div className="space-y-8">
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

        {/* Projects Section */}
        <div>
          <div className="mb-24">
            <h2>Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <article key={project.title} className="group">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row gap-3 md:gap-6 no-underline">
                    <div className="w-full md:w-[284px] h-[160px] shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        width={284}
                        height={160}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 flex flex-col md:justify-center">
                      <h3 className="group-hover:text-green-700 mb-2 mt-4">
                        {project.title}
                      </h3>
                      <p className="text-gray-600">
                        {project.description}
                      </p>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* What They Say Section */}
        <div>
          <h2>What They Say</h2>
          <div 
            className="senja-embed" 
            data-id="34da712b-077a-4a62-8332-fb04f41dfe74" 
            data-mode="shadow" 
            data-lazyload="false" 
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Get home content
  const homeFile = fs.readFileSync(path.join('content', 'home.md'), 'utf-8')
  const { data: homeMatter, content: homeContent } = matter(homeFile)
  const htmlContent = marked(homeContent)

  // Get projects
  const projectsFile = fs.readFileSync(path.join('content', 'projects', '_projects.md'), 'utf-8')
  const { data: projectsData } = matter(projectsFile)
  const projects = projectsData.projects || []

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
      projects,
      homeContent: htmlContent,
      homeTitle: homeMatter.title
    }
  }
} 
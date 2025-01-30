import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Function to get all static pages from the pages directory
function getStaticPages() {
  const pagesDirectory = path.join(process.cwd(), 'pages')
  const staticPages = []

  function scanDirectory(directory) {
    const files = fs.readdirSync(directory)
    
    files.forEach(file => {
      const filePath = path.join(directory, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        // Skip api, _app, _document directories
        if (!['api', '_app', '_document'].includes(file)) {
          scanDirectory(filePath)
        }
      } else {
        // Only process .js, .jsx, .ts, .tsx files
        if (file.match(/\.(js|jsx|ts|tsx)$/)) {
          // Convert file path to route
          let route = filePath
            .replace(pagesDirectory, '')
            .replace(/\.(js|jsx|ts|tsx)$/, '')
            .replace(/\/index$/, '')
            .replace(/\[.*\]/, '*') // Replace dynamic routes with *
          
          // Skip special Next.js files and API routes
          if (!file.startsWith('_') && !file.startsWith('api') && file !== 'sitemap.xml.js') {
            staticPages.push(route || '/')
          }
        }
      }
    })
  }

  scanDirectory(pagesDirectory)
  return staticPages
}

function getPagePriority(path) {
  if (path === '/') return 1
  if (['/about', '/now'].includes(path)) return 0.8
  if (path === '/articles') return 0.7
  return 0.5
}

function getChangeFreq(path) {
  if (path === '/') return 'yearly'
  if (['/about', '/now'].includes(path)) return 'monthly'
  if (path === '/articles') return 'weekly'
  return 'monthly'
}

function generateSiteMap(posts, staticPages) {
  const baseUrl = 'https://kevoncheung.com'
  const currentDate = new Date().toISOString()
  
  // Combine static pages and dynamic post pages
  const allUrls = [
    ...staticPages.map(page => {
      const url = `${baseUrl}${page}`
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${getChangeFreq(page)}</changefreq>
    <priority>${getPagePriority(page)}</priority>
  </url>`
    }),
    ...posts.map(({ slug, date }) => {
      const url = `${baseUrl}/${slug}`
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${date || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    })
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.join('\n')}
</urlset>`
}

export async function getStaticProps() {
  // Get static pages
  const staticPages = getStaticPages()

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
        slug: frontmatter.slug || filename.replace('.md', ''),
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null
      }
    })
    .filter(post => post.slug)

  // Generate the XML sitemap
  const sitemap = generateSiteMap(posts, staticPages)

  return {
    props: {
      sitemap
    }
  }
}

export default function Sitemap({ sitemap }) {
  // Hack to return XML content in static HTML
  return (
    <div 
      dangerouslySetInnerHTML={{ 
        __html: `<xml>${sitemap}</xml>`
      }} 
    />
  )
} 
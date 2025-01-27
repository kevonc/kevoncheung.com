import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const EXTERNAL_DATA_URL = process.env.SITE_URL || 'https://kevoncheung.com'

function generateSiteMap(posts, topics) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add the static pages -->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/about</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/now</loc>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/articles</loc>
       <changefreq>daily</changefreq>
       <priority>0.8</priority>
     </url>
     
     <!-- Add all article pages -->
     ${posts
       .map(({ slug, date }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
           <lastmod>${date ? new Date(date).toISOString() : new Date().toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.7</priority>
       </url>
     `
       })
       .join('')}

     <!-- Add all topic pages -->
     ${topics
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/topic/${slug}`}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.6</priority>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

export async function getStaticProps() {
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
        date: frontmatter.date ? frontmatter.date.toString() : null
      }
    })
    .filter(post => post.slug)

  // Get topics
  const topicsFile = fs.readFileSync(path.join('content', 'articles', '_topics.md'), 'utf-8')
  const { data: topicsData } = matter(topicsFile)
  const topics = topicsData.topics || []

  // Generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts, topics)

  return {
    props: {
      sitemap
    }
  }
}

export default function SiteMap({ sitemap }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: sitemap }} />
  )
} 
import Layout from '../components/Layout'
import Appearances from '../components/Appearances'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function About({ content, frontmatter, introHtml }) {
  return (
    <Layout title={frontmatter.page_title}>
      <div className="max-w-3xl mx-auto">
        <header className="articles-hero">
          <h1>{frontmatter.h1_title}</h1>
          <p
            className="articles-intro"
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />
        </header>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <Appearances appearances={frontmatter.appearances} />
        
        <div className="prose prose-lg max-w-none mt-16">
          <h2>📩 Contact</h2>
          <p>If you want to reach out to me, you can write to k@kevoncheung.com.</p>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const markdownWithMeta = fs.readFileSync(path.join('content', 'about.md'), 'utf-8')
  const { data: frontmatter, content } = matter(markdownWithMeta)
  const htmlContent = marked(content)
  const introHtml = marked.parseInline(frontmatter.intro)

  return {
    props: {
      frontmatter,
      content: htmlContent,
      introHtml,
    }
  }
} 
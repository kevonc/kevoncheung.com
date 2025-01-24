import Layout from '../components/Layout'
import Appearances from '../components/Appearances'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function About({ content, frontmatter }) {
  return (
    <Layout title="About">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center mb-16">{frontmatter.title}</h1>

        <div className="space-y-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <Appearances appearances={frontmatter.appearances} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const markdownWithMeta = fs.readFileSync(path.join('content', 'about.md'), 'utf-8')
  const { data: frontmatter, content } = matter(markdownWithMeta)
  const htmlContent = marked(content)

  return {
    props: {
      frontmatter,
      content: htmlContent
    }
  }
} 
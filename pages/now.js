import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Layout from '../components/Layout'

export default function Now({ content, frontmatter }) {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export async function getStaticProps() {
  const markdownWithMeta = fs.readFileSync(path.join('content', 'now.md'), 'utf-8')
  const { data: frontmatter, content } = matter(markdownWithMeta)
  const htmlContent = marked(content)

  return {
    props: {
      frontmatter,
      content: htmlContent,
    },
  }
} 
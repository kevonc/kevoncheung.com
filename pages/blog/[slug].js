import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Image from 'next/image'
import Layout from '../../components/Layout'

// Configure marked to handle images
marked.use({
  renderer: {
    image(href, title, text) {
      return `<div class="relative w-full aspect-[16/9] my-8">
        <img src="${href}" alt="${text}" class="rounded-lg" />
      </div>`
    }
  }
})

export default function BlogPost({ content, frontmatter }) {
  return (
    <Layout>
      <article className="prose prose-lg max-w-none">
        <h1>{frontmatter.title}</h1>
        <div className="flex gap-4 text-gray-600 text-sm mb-8">
          <time>{frontmatter.date}</time>
          {frontmatter.category && (
            <span className="bg-gray-100 px-2 py-1 rounded">{frontmatter.category}</span>
          )}
        </div>
        {frontmatter.image && (
          <div className="relative w-full aspect-[16/9] my-8">
            <img 
              src={frontmatter.image} 
              alt={frontmatter.title}
              className="rounded-lg"
            />
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content', 'essays'))
  
  const paths = files
    .filter(filename => filename !== '_categories.md')
    .map(filename => ({
      params: {
        slug: filename.replace('.md', '')
      }
    }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('content', 'essays', `${slug}.md`),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)
  const htmlContent = marked(content)

  return {
    props: {
      frontmatter: {
        ...frontmatter,
        date: frontmatter.date.toString()
      },
      content: htmlContent,
      slug
    }
  }
} 
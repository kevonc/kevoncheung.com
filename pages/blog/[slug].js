import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Layout from '../../components/Layout'
import Link from 'next/link'

marked.use({
  renderer: {
    image(href, title, text) {
      return `<div class="my-8">
        <img src="${href}" alt="${text}" class="rounded-lg" />
      </div>`
    }
  }
})

export default function BlogPost({ content, frontmatter }) {
  return (
    <Layout>
      <article className="prose prose-lg max-w-none">
        <header className="mb-12">
          <h1 className="mb-3">{frontmatter.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <time>{new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</time>
            {frontmatter.category && (
              <>
                <span>•</span>
                <Link 
                  href={`/blog/category/${frontmatter.category.toLowerCase().replace(' ', '-')}`}
                  className="tag hover:bg-gray-200"
                >
                  {frontmatter.category.toLowerCase()}
                </Link>
              </>
            )}
          </div>
        </header>
        
        <div 
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose prose-lg prose-gray max-w-none"
        />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content', 'essays'))
  
  const paths = files
    .filter(filename => filename !== '_categories.md')
    .map(filename => {
      const markdownWithMeta = fs.readFileSync(
        path.join('content', 'essays', filename),
        'utf-8'
      )
      const { data: frontmatter } = matter(markdownWithMeta)
      return {
        params: {
          slug: frontmatter.slug || filename.replace('.md', '')
        }
      }
    })
    .filter(path => path.params.slug)

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const files = fs.readdirSync(path.join('content', 'essays'))
  const file = files.find(filename => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content', 'essays', filename),
      'utf-8'
    )
    const { data: frontmatter } = matter(markdownWithMeta)
    return frontmatter.slug === slug
  })

  if (!file) {
    return {
      notFound: true
    }
  }

  const markdownWithMeta = fs.readFileSync(
    path.join('content', 'essays', file),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)
  const htmlContent = marked(content)

  return {
    props: {
      frontmatter: {
        ...frontmatter,
        date: frontmatter.date ? frontmatter.date.toString() : ''
      },
      content: htmlContent,
      slug
    }
  }
} 
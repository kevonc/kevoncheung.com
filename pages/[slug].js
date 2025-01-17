import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Post({ content, frontmatter }) {
  return (
    <Layout>
      <article>
        <header className="mb-16">
          <h1 className="font-semibold">{frontmatter.title}</h1>
          <div className="flex gap-4 text-gray-600 text-sm">
            <time>{new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</time>
            {frontmatter.category && (
              <Link href={`/blog/category/${frontmatter.category.toLowerCase()}`} className="tag hover:bg-gray-200">
                {frontmatter.category.toLowerCase()}
              </Link>
            )}
          </div>
        </header>

        <div 
          className="prose"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content', 'articles'))

  const paths = files
    .filter(filename => filename !== '_categories.md')
    .map(filename => {
      const markdownWithMeta = fs.readFileSync(
        path.join('content', 'articles', filename),
        'utf-8'
      )

      const { data: frontmatter } = matter(markdownWithMeta)
      const slug = frontmatter.slug || filename.replace('.md', '')

      return {
        params: {
          slug
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
  // Check if this is a special route that should be handled by other pages
  if (['blog', 'about', 'now'].includes(slug)) {
    return {
      notFound: true
    }
  }

  const files = fs.readdirSync(path.join('content', 'articles'))
  const file = files.find(filename => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content', 'articles', filename),
      'utf-8'
    )
    const { data: frontmatter } = matter(markdownWithMeta)
    return frontmatter.slug === slug || filename.replace('.md', '') === slug
  })

  if (!file) {
    return {
      notFound: true
    }
  }

  const markdownWithMeta = fs.readFileSync(
    path.join('content', 'articles', file),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter: {
        ...frontmatter,
        date: frontmatter.date ? frontmatter.date.toString() : ''
      },
      content: marked(content)
    }
  }
} 
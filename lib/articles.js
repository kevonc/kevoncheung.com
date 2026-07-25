import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { normalizeTopicSlug } from './topic-utils'

const articlesDirectory = path.join(process.cwd(), 'content', 'articles')

export function getTopics() {
  const source = fs.readFileSync(path.join(articlesDirectory, '_topics.md'), 'utf-8')
  const { data } = matter(source)

  return data.topics || []
}

export function getPosts(topicSlug) {
  return fs
    .readdirSync(articlesDirectory)
    .filter((filename) => filename.endsWith('.md') && !filename.startsWith('_'))
    .map((filename) => {
      const source = fs.readFileSync(path.join(articlesDirectory, filename), 'utf-8')
      const { data: frontmatter } = matter(source)

      return {
        frontmatter: {
          ...frontmatter,
          date: frontmatter.date ? frontmatter.date.toString() : '',
        },
        slug: frontmatter.slug || filename.replace(/\.md$/, ''),
        filename,
      }
    })
    .filter((post) => {
      if (!post.slug) return false
      if (!topicSlug) return true

      return normalizeTopicSlug(post.frontmatter.topic) === topicSlug
    })
    .sort((a, b) => {
      if (!a.frontmatter.date) return 1
      if (!b.frontmatter.date) return -1
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    })
}

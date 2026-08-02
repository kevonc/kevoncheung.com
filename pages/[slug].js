import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getPosts, getTopics } from '../lib/articles'
import { normalizeTopicSlug } from '../lib/topic-utils'

export default function Post({ content, frontmatter, relatedPosts, topicTitle }) {
  const topicSlug = normalizeTopicSlug(frontmatter.topic)
  return (
    <Layout 
      title={frontmatter.title}
      metaImage={frontmatter.meta_image}
      metaDescription={frontmatter.meta_description}
      articlePanel={{
        title: topicTitle || frontmatter.topic,
        topicSlug,
        posts: relatedPosts,
        activeSlug: frontmatter.slug,
      }}
    >
      <div className="max-w-2xl mx-auto">
        <article>
          <header className="mb-10">
            <h1>{frontmatter.title}</h1>
            <div className="flex items-center gap-2 text-gray-600 text-base">
              <time>{new Date(frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</time>
              {frontmatter.topic && (
                <>
                  <span className="text-gray-400 mx-2">·</span>
                  <Link 
                    href={`/topic/${topicSlug}`}
                    className="hover:text-gray-900"
                  >
                    {topicTitle || frontmatter.topic}
                  </Link>
                </>
              )}
            </div>
          </header>

          <div 
            className="prose mb-16"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-8 flex justify-center">
            <iframe 
              src="https://kevoncheung.substack.com/embed" 
              width="480" 
              height="320" 
              style={{border: '1px solid #EEE', background: 'white'}} 
              frameBorder="0" 
              scrolling="no"
            />
          </div>
        </article>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getPosts().map((post) => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  // Check if this is a special route that should be handled by other pages
  if (['about', 'now'].includes(slug)) {
    return {
      notFound: true
    }
  }

  const post = getPosts().find((candidate) => candidate.slug === slug)

  if (!post) {
    return {
      notFound: true
    }
  }

  const markdownWithMeta = fs.readFileSync(
    path.join('content', 'articles', post.filename),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)
  const metaImage = typeof frontmatter.meta_image === 'string' && frontmatter.meta_image.trim()
    ? frontmatter.meta_image
    : `/og-meta-images/${slug}.png`
  const htmlContent = marked(content)
  const topicSlug = normalizeTopicSlug(frontmatter.topic)
  const topic = getTopics().find((candidate) => candidate.slug === topicSlug)

  return {
    props: {
      frontmatter: {
        ...frontmatter,
        meta_image: metaImage,
        date: frontmatter.date ? frontmatter.date.toString() : '',
        slug,
      },
      content: htmlContent,
      relatedPosts: getPosts(topicSlug),
      topicTitle: topic?.title || frontmatter.topic || 'Articles',
    }
  }
} 
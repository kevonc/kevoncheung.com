import { existsSync } from 'fs'
import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { createHash } from 'crypto'
import matter from 'gray-matter'
import { ImageResponse } from 'next/og.js'
import React from 'react'

const SITE_URL = process.env.SITE_URL || 'https://kevoncheung.com'
const WIDTH = 1200
const HEIGHT = 630
const MAX_TITLE_CHARACTERS = 71
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles')
const PUBLIC_DIR = path.join(process.cwd(), 'public')
const TEMPLATE_PATH = path.join(PUBLIC_DIR, 'og-meta-image-template.png')
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'og-meta-images')
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json')

function sha256(input) {
  return createHash('sha256').update(input).digest('hex')
}

async function readManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST_PATH, 'utf-8'))
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {}
    }

    throw error
  }
}

async function writeManifest(manifest) {
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`)
}

function getPostImageHash({ post, templateHash, scriptHash }) {
  return sha256(JSON.stringify({
    slug: post.slug,
    title: post.title,
    contentHash: post.contentHash,
    templateHash,
    scriptHash,
  }))
}

function truncateTitle(title) {
  if (title.length <= MAX_TITLE_CHARACTERS) {
    return title
  }

  return `${title.slice(0, MAX_TITLE_CHARACTERS - 1).trimEnd()}…`
}

function estimateLineCount(title) {
  // The 62px fallback threshold is tuned for a 620px title column.
  return Math.ceil(title.length / 17)
}

async function loadKumbhSansSemiBold() {
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@600'
  const cssResponse = await fetch(cssUrl, {
    headers: {
      // next/og cannot parse woff2, so ask Google Fonts for the woff variant.
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:2.0) Gecko/20100101 Firefox/4.0',
    },
  })

  if (!cssResponse.ok) {
    throw new Error(`Failed to load Kumbh Sans CSS: ${cssResponse.status} ${cssResponse.statusText}`)
  }

  const css = await cssResponse.text()
  const fontUrl = css.match(/url\(([^)]+)\)/)?.[1]

  if (!fontUrl) {
    throw new Error('Could not find Kumbh Sans font URL in Google Fonts CSS.')
  }

  const fontResponse = await fetch(fontUrl)

  if (!fontResponse.ok) {
    throw new Error(`Failed to load Kumbh Sans font: ${fontResponse.status} ${fontResponse.statusText}`)
  }

  return fontResponse.arrayBuffer()
}

async function imageResponseToBuffer(imageResponse) {
  const arrayBuffer = await imageResponse.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

async function generateOgImage({ title, slug, templateDataUrl, fontData }) {
  const displayTitle = truncateTitle(title)
  const fontSize = estimateLineCount(displayTitle) > 3 ? 52 : 62

  const response = new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
        },
      },
      React.createElement('img', {
        src: templateDataUrl,
        alt: '',
        width: WIDTH,
        height: HEIGHT,
        style: {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        },
      }),
      React.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            left: 84,
            top: 80,
            width: 620,
            color: '#1A1A1A',
            fontFamily: 'Kumbh Sans',
            fontSize,
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            display: 'flex',
          },
        },
        displayTitle,
      ),
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Kumbh Sans',
          data: fontData,
          weight: 600,
          style: 'normal',
        },
      ],
    },
  )

  const outputPath = path.join(OUTPUT_DIR, `${slug}.png`)
  await writeFile(outputPath, await imageResponseToBuffer(response))
}

async function getPostsForGeneratedImages() {
  const filenames = await readdir(ARTICLES_DIR)
  const posts = []

  for (const filename of filenames) {
    if (!filename.endsWith('.md') || filename.startsWith('_')) {
      continue
    }

    const markdown = await readFile(path.join(ARTICLES_DIR, filename), 'utf-8')
    const { data } = matter(markdown)
    const slug = data.slug || filename.replace(/\.md$/, '')

    if (!slug || !data.title) {
      continue
    }

    posts.push({
      slug: String(slug),
      title: String(data.title),
      contentHash: sha256(markdown),
    })
  }

  return posts
}

async function main() {
  if (!existsSync(TEMPLATE_PATH)) {
    throw new Error(`Missing OG template image at ${TEMPLATE_PATH}`)
  }

  await mkdir(OUTPUT_DIR, { recursive: true })

  const posts = await getPostsForGeneratedImages()
  const manifest = await readManifest()
  const templateBuffer = await readFile(TEMPLATE_PATH)
  const templateHash = sha256(templateBuffer)
  const scriptHash = sha256(await readFile(new URL(import.meta.url)))
  const nextManifest = {}
  const postsToGenerate = posts.filter(post => {
    const hash = getPostImageHash({ post, templateHash, scriptHash })
    const outputPath = path.join(OUTPUT_DIR, `${post.slug}.png`)

    nextManifest[post.slug] = hash

    return manifest[post.slug] !== hash || !existsSync(outputPath)
  })

  if (postsToGenerate.length === 0) {
    await writeManifest(nextManifest)
    console.log('OG images are up to date.')
    return
  }

  const templateDataUrl = `data:image/png;base64,${templateBuffer.toString('base64')}`
  const fontData = await loadKumbhSansSemiBold()

  for (const post of postsToGenerate) {
    await generateOgImage({
      ...post,
      templateDataUrl,
      fontData,
    })

    console.log(`Generated ${SITE_URL}/og-meta-images/${post.slug}.png`)
  }

  await writeManifest(nextManifest)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})

import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx', 'md'],
  // Enable static exports
  output: 'export',
  // Configure hostname for sitemap
  env: {
    SITE_URL: 'https://kevoncheung.com',
  }
}

export default withMDX(nextConfig) 
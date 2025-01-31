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
  },
  reactStrictMode: true,
  // Note: redirects don't work with output: 'export', 
  // you'll need to handle these in your hosting platform
}

export default withMDX(nextConfig) 
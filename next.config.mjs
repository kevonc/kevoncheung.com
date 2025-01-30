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
  // PostCSS and Tailwind config paths
  postcssConfigPath: './postcss.config.cjs',
  tailwindConfigPath: './tailwind.config.cjs',
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/:slug',
        permanent: true
      }
    ]
  }
}

export default withMDX(nextConfig) 
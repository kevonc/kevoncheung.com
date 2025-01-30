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
  // Handle XML content type
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
    ]
  },
  // Ensure sitemap.xml is generated as .xml file
  async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap,
      '/sitemap.xml': { page: '/sitemap.xml' },
    }
  },
}

export default withMDX(nextConfig) 
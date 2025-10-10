import Head from 'next/head'
import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'

export default function Explore({ data }) {
  return (
    <>
      <Head>
        <title>{data.title} | Explore</title>
        <meta name="description" content={data.subtitle} />
        <meta property="og:title" content={`${data.title} | Explore`} />
        <meta property="og:description" content={data.subtitle} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${data.title} | Explore`} />
        <meta name="twitter:description" content={data.subtitle} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-4 px-4">
        <div className="max-w-2xl w-full">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src={data.profileImage} 
                alt={data.title}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1 font-heading">
              {data.title}
            </h1>
            <p className="text-sm text-gray-500 font-body">
              {data.subtitle}
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            {data.links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="block"
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
              >
                <div className="bg-white border-2 border-green-700 rounded-lg px-6 py-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-lg font-medium text-green-700 font-body">
                      {link.title}
                    </div>
                    {link.subtitle && (
                      <div className="text-sm text-gray-500 font-body mt-1">
                        {link.subtitle}
                      </div>
                    )}
                  </div>
                  {link.image && (
                    <img 
                      src={link.image} 
                      alt={link.title}
                      className="w-12 h-12 rounded object-cover ml-4"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Footer Message */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 font-body">
              It'll be awesome to connect, <Link href="https://www.instagram.com/kevon/" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-600 underline">so say hi!</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'explore.json')
  const fileContents = await fs.readFile(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  return {
    props: {
      data,
    },
  }
}


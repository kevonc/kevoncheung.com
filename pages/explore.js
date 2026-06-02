import Head from 'next/head'
import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import { useState, useEffect } from 'react'

// Function to parse text with **highlight** syntax
function parseHighlightedText(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const highlightedText = part.slice(2, -2)
      return (
        <span key={index} className="font-semibold text-green-900 bg-green-100 px-1 rounded">
          {highlightedText}
        </span>
      )
    }
    return part
  })
}

const boardingSchoolWhatsAppUrl = 'https://api.whatsapp.com/send/?phone=85260557094&text=Hi+Kevon%2C+I+want+to+explore+sending+my+kids+to+U.S.+top+boarding+schools.&type=phone_number&app_absent=0'

export default function Explore({ data }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Head>
        <title>Explore with Kevon</title>
        <meta name="description" content={data.subtitle} />
        <meta property="og:title" content={`${data.title} | Explore`} />
        <meta property="og:description" content={data.subtitle} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${data.title} | Explore`} />
        <meta name="twitter:description" content={data.subtitle} />
      </Head>

      <div className="min-h-screen bg-[#f6f2eb] text-green-950">
        <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 py-8 sm:px-6">
          <main className="flex flex-1 flex-col justify-center">
            {/* Profile Section */}
            <section
              className="mb-10 text-center"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'scale(1)' : 'scale(0.96)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
              }}
            >
              <div className="mb-5">
                <img
                  src={data.profileImage}
                  alt={data.title}
                  className="mx-auto h-36 w-36 rounded-full border-4 border-white object-cover shadow-xl shadow-green-950/15 sm:h-40 sm:w-40"
                />
              </div>
              <h1 className="mb-2 text-3xl font-bold leading-tight text-green-950">
                {data.title}
              </h1>
              <p className="mx-auto mb-0 max-w-md text-base leading-7 text-green-950/65">
                {data.subtitle}
              </p>
            </section>

            {/* Experience Links */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-green-800">
                  Things I do
                </div>
                <div className="h-px flex-1 bg-green-950/10 ml-4"></div>
              </div>
              <div className="space-y-3">
                {data.links.map((link, index) => (
                  <div
                    key={index}
                    style={{
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.6s ease-out ${0.25 + index * 0.1}s, transform 0.6s ease-out ${0.25 + index * 0.1}s`
                    }}
                  >
                    <div className="flex items-center gap-4 rounded-2xl border border-green-950/10 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-green-700/40 hover:shadow-lg hover:shadow-green-950/10 sm:p-5">
                      <div className="min-w-0 flex-1">
                        {link.label && (
                          <a
                            href={link.labelURL}
                            target={link.labelURL?.startsWith('http') ? '_blank' : '_self'}
                            rel={link.labelURL?.startsWith('http') ? 'noopener noreferrer' : ''}
                            className="mb-2 inline-flex rounded-full border border-green-700/30 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-green-700 no-underline transition-colors hover:border-green-700 hover:bg-green-700 hover:text-white"
                          >
                            {link.label}
                          </a>
                        )}
                        <Link
                          href={link.url}
                          className="group block no-underline"
                          target={link.url.startsWith('http') ? '_blank' : '_self'}
                          rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                        >
                          <h2 className="mb-1 mt-0 text-lg font-bold leading-snug text-green-950 group-hover:text-green-700 sm:text-xl">
                            {link.title}
                          </h2>
                          {link.subtitle && (
                            <p className="mb-0 text-sm leading-6 text-green-950/60">
                              {parseHighlightedText(link.subtitle)}
                            </p>
                          )}
                        </Link>
                      </div>
                      {index === 0 ? (
                        <div className="flex flex-shrink-0 flex-col items-center gap-3">
                          <a
                            href={boardingSchoolWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 no-underline transition-colors hover:bg-green-100"
                            aria-label="Message Kevon on WhatsApp"
                          >
                            <img src="/images/social/whatsapp.png" alt="" className="h-7 w-7" />
                          </a>
                          <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                              <img src="/images/social/wechat.png" alt="" className="h-7 w-7" />
                            </div>
                            <div className="mt-1 text-[10px] font-semibold leading-none text-green-950/60">
                              kevonc
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={link.url}
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-lg font-semibold text-green-700 no-underline transition-colors hover:bg-green-950 hover:text-white"
                          target={link.url.startsWith('http') ? '_blank' : '_self'}
                          rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                          aria-label={`Open ${link.title}`}
                        >
                          &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Footer Message */}
          <footer
            className="mt-10 text-center"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease-out 0.6s'
            }}
          >
            <p className="mb-4 text-sm text-green-950/55 font-body">
              Say hi to connect!
            </p>
            {/* Social Links */}
            <div className="flex justify-center gap-4 pb-4">
              <a href="https://kevoncheung.substack.com/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/images/social/substack.svg" alt="Substack" width="24" height="24" />
              </a>
              <a href="https://www.youtube.com/@MeetKevon" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/images/social/youtube.svg" alt="YouTube" width="24" height="24" />
              </a>
              <a href="https://www.instagram.com/kevon/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/images/social/instagram.svg" alt="Instagram" width="24" height="24" />
              </a>
              <a href="https://x.com/MeetKevon" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/images/social/x.svg" alt="X" width="24" height="24" />
              </a>
              <a href="https://www.linkedin.com/in/kevoncheung/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                <img src="/images/social/linkedin.svg" alt="LinkedIn" width="24" height="24" />
              </a>
            </div>
          </footer>
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


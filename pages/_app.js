import '../styles/globals.css'
import { Archivo } from 'next/font/google'
import localFont from 'next/font/local'
import { useEffect } from 'react'
import GoogleAnalytics from '../components/GoogleAnalytics'

const archivo = Archivo({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
})

const googleSans = localFont({
  src: [
    {
      path: '../node_modules/@fontsource-variable/google-sans/files/google-sans-latin-standard-normal.woff2',
      weight: '400 700',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource-variable/google-sans/files/google-sans-latin-standard-italic.woff2',
      weight: '400 700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-google-sans',
})

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Make all article content links open in new tab
    const articleLinks = document.querySelectorAll('.prose a');
    articleLinks.forEach(link => {
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }, []); // Run once on mount

  return (
    <>
      <GoogleAnalytics />
      <div className={`${archivo.variable} ${googleSans.variable} ${googleSans.className}`}>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp 
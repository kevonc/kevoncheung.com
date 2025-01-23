import '../styles/globals.css'
import { Archivo, Schibsted_Grotesk } from 'next/font/google'
import { useEffect } from 'react'

const archivo = Archivo({ 
  subsets: ['latin'],
  display: 'swap',
})

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap',
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
    <main className={`${archivo.className} ${schibsted.className}`}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp 
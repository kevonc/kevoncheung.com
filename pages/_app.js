import '../styles/globals.css'
import { Archivo, Schibsted_Grotesk } from 'next/font/google'

const archivo = Archivo({ 
  subsets: ['latin'],
  display: 'swap',
})

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap',
})

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${archivo.className} ${schibsted.className}`}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp 
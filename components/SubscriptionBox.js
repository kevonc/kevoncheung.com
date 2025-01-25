import { useEffect } from 'react'

export default function SubscriptionBox() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://smallschool.kit.com/fca4203871/index.js'
    script.async = true
    script.setAttribute('data-uid', 'fca4203871')
    document.body.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[data-uid="fca4203871"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  return <div id="fca4203871" className="my-16" />
} 
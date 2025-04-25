import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Client-side only Instagram component
const InstagramEmbed = dynamic(() => import('../components/InstagramEmbed'), {
  ssr: false
})

export default function LinkInBio() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const floatVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <>
      <Head>
        <title>Kevon Cheung | Link in Bio</title>
        <meta name="description" content="Connect with Kevon Cheung and explore his work on personal branding, building in public, and creating a business around yourself." />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content="Kevon Cheung | Link in Bio" />
        <meta property="og:description" content="Connect with Kevon Cheung and explore his work on personal branding, building in public, and creating a business around yourself." />
        <meta property="og:image" content="https://kevoncheung.com/images/meta-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kevon Cheung" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MeetKevon" />
        <meta name="twitter:title" content="Kevon Cheung | Link in Bio" />
        <meta name="twitter:description" content="Connect with Kevon Cheung and explore his work on personal branding, building in public, and creating a business around yourself." />
        <meta name="twitter:image" content="https://kevoncheung.com/images/meta-image.png" />
      </Head>
      
      {/* Social Media Scripts */}
      <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <motion.section 
          className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-6 relative overflow-hidden"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Background animated elements */}
          <motion.div 
            className="absolute top-5 left-10 w-20 h-20 rounded-full bg-green-100 opacity-30"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-blue-100 opacity-30"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-yellow-100 opacity-30"
            animate={{
              x: [0, 15, 0],
              y: [0, 15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="relative mb-8"
            variants={itemVariants}
          >
            <motion.div 
              className="absolute -z-10 w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg opacity-70 blur-md"
              animate={{
                rotate: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut"
              }}
            />
            <div className="relative">
              <motion.img 
                src="/images/linkinbio-kevon.png" 
                alt="Kevon Cheung" 
                className="w-80 h-auto relative z-10"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-0 transform -translate-x-1/2 w-80 bg-[#16423c] rounded-full z-20"
                style={{ height: "4px" }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
              />
            </div>
            <motion.div 
              className="absolute -bottom-4 -right-4 -z-10 w-32 h-32 bg-yellow-100 rounded-full opacity-60 blur-sm"
              animate={{
                rotate: [0, 3, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-[#16423c]"
            variants={itemVariants}
          >
            Hey, I'm Kevon 🥦
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-16"
            variants={itemVariants}
          >
            I help you market yourself by spilling untold stories.
          </motion.p>
          
          {/* Bouncing arrow at the bottom */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#16423c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.section>

        {/* Section 2 - Personal Brand */}
        <motion.section 
          className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-[#f8f4e9] to-[#f0e9d6]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#16423c]/5"
              animate={{
                y: [0, 15, 0],
                x: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-yellow-400/5"
              animate={{
                y: [0, -20, 0],
                x: [0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto relative">
              {/* New layout with background-removed image */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Left side - Image with floating elements */}
                <motion.div
                  className="lg:w-1/2 relative order-2 lg:order-1"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="relative">
                    {/* Floating circles behind image */}
                    <motion.div 
                      className="absolute top-1/4 -left-10 w-32 h-32 rounded-full bg-yellow-400/20 z-0"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="absolute bottom-10 -right-5 w-24 h-24 rounded-full bg-[#16423c]/10 z-0"
                      animate={{
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 6,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                    
                    {/* Main image with floating animation */}
                    <motion.div
                      className="relative z-10"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut"
                      }}
                      whileHover={{ 
                        scale: 1.03,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <img 
                        src="/images/linkinbio-findjoyinchaos-bgremoved.png" 
                        alt="Find Joy in Chaos Book" 
                        className="w-full h-auto"
                      />
                      
                      {/* Subtle shadow beneath the floating image */}
                      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-black/10 blur-md rounded-full z-0" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right side - Content */}
                <motion.div
                  className="lg:w-1/2 order-1 lg:order-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Heading with creative styling */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#16423c] inline-block relative">
                    You're doing amazing work but ...
                      <motion.div 
                        className="absolute -bottom-3 left-0 h-1 bg-yellow-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      />
                    </h2>
                  </motion.div>

                  {/* Main text */}
                  <motion.p 
                    className="text-xl text-gray-700 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    the world doesn't see it. Well, because you've been in private mode. You haven't allowed anyone to see you.
                  </motion.p>

                  <motion.p 
                    className="text-xl text-gray-700 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    It's time to craft a brand that's unique to you.
                  </motion.p>
                  
                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative z-10"
                    >
                      <Link 
                        href="https://findjoyinchaos.com?ref=linkinbio-page"
                        className="inline-block bg-[#16423c] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0f2e2a] transition-all hover:shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Build yourself a brand
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3 - Show Your Work - Redesigned */}
        <motion.section 
          className="py-24 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/linkinbio-showyourwork.jpg" 
              alt="Show Your Work" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
          </div>
          
          <div className="container mx-auto px-6 relative z-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-8 text-white"
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                You have a coffee in ...
              </motion.h2>
              
              <motion.div 
                className="w-24 h-1 bg-yellow-400 mx-auto mb-12"
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              
              <motion.p 
                className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Your hand walking down the street. There're so many stories and thoughts going on in your head, but sadly, they always just stay in your head.
              </motion.p>

              <motion.p 
                className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                It's time to extract them and share them publicly.
              </motion.p>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-16"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="https://publiclab.co/build-in-public?ref=linkinbio-page"
                    className="inline-block bg-[#16423c] text-white px-10 py-5 rounded-lg text-lg font-medium hover:bg-[#0f2e2a] transition-all hover:shadow-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Build and share in public
                  </Link>
                </motion.div>
              </motion.div>
              
            </div>
          </div>
        </motion.section>

        {/* Section 4 - Business Around You - Redesigned with full-width layout */}
        <motion.section 
          className="py-0 relative overflow-hidden min-h-screen flex items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Full-width background image with overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#16423c]/90 to-transparent z-10" />
            <img 
              src="/images/linkinbio-bizofyou.jpg" 
              alt="Business Around You" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-20">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-end">
              <div className="max-w-2xl lg:ml-auto">
                <motion.h2 
                    className="text-4xl md:text-5xl font-bold mb-8 text-white"
                    initial={{ y: -30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Oh sweet, you realized ...
                </motion.h2>

                <motion.div 
                  className="w-24 h-1 bg-yellow-400 mb-12"
                  initial={{ width: 0 }}
                  whileInView={{ width: "6rem" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                
                <motion.p 
                  className="text-xl md:text-2xl text-white mb-12"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  That with a brand and a voice, you can do so so so much. You can help and influence a lot of people.
                </motion.p>

                <motion.p 
                  className="text-xl md:text-2xl text-white mb-12"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  It's time to build a profitable business on what you know.
                </motion.p>
                
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mb-16"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href="https://publiclab.co?ref=linkinbio-page"
                      className="inline-block bg-white text-[#16423c] px-10 py-5 rounded-lg text-lg font-medium hover:bg-[#0f2e2a] transition-all hover:shadow-xl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Build a business around YOU
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-yellow-400 opacity-20"
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/6 w-16 h-16 rounded-full bg-green-300 opacity-20"
            animate={{
              y: [0, -10, 0],
              x: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
          />
        </motion.section>

        {/* How I can help you Section */}
        <motion.section 
          className="py-20 px-6 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center text-[#16423c]"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How I can help you
            </motion.h2>
            
            <motion.ul
              className="space-y-6 text-lg text-gray-700"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <li className="flex items-start">
                <span className="mr-3 text-2xl leading-none">•</span>
                <span>
                  You can <Link href="/hire-me" className="text-[#16423c] font-medium underline hover:text-[#0f2e2a]" target="_blank" rel="noopener noreferrer">hire me</Link> to be the fraction head of marketing for your personal brand (for entrepreneurs and CEOs)
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl leading-none">•</span>
                <span>
                  You can <Link href="https://join.publiclab.co/book-a-call/" className="text-[#16423c] font-medium underline hover:text-[#0f2e2a]" target="_blank" rel="noopener noreferrer">book a 1-1 call</Link> with me
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl leading-none">•</span>
                <span>
                  You can <Link href="https://publiclab.co/products" className="text-[#16423c] font-medium underline hover:text-[#0f2e2a]" target="_blank" rel="noopener noreferrer">check out</Link> the self-guided products I've created
                </span>
              </li>
            </motion.ul>
          </div>
        </motion.section>

        {/* Social Media Section */}
        <motion.section 
          className="py-20 px-6 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center text-[#16423c]"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Let's say hi 
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Substack Post */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
                    <img src="/images/social/substack.svg" alt="Substack" className="w-full h-full mt-4" />
                  </div>
                  <h3 className="text-xl font-bold">I'm most active on Substack now</h3>
                </div>
                <div className="min-h-[400px] flex flex-col items-center justify-center border border-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full px-4">
                    <img src="/images/substack.png" alt="Substack Profile" className="w-full h-auto rounded-lg" />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <a 
                    href="https://kevoncheung.substack.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#16423c] font-medium hover:underline"
                  >
                    Say hi on Substack
                  </a>
                </div>
              </motion.div>
              
              {/* Instagram Post */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
                    <img src="/images/social/instagram.svg" alt="Instagram" className="w-full h-full mt-4" />
                  </div>
                  <h3 className="text-xl font-bold">Latest from Instagram</h3>
                </div>
                <div className="min-h-[400px] flex flex-col border border-gray-200 rounded-lg overflow-hidden">
                  <InstagramEmbed />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Thank you message */}
        <div className="py-8 px-6 text-center">
          <p className="text-gray-600">Thanks for being here — Kevon</p>
        </div>
      </div>
    </>
  )
} 
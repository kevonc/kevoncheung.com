import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LinkInBio() {
  const [xPost, setXPost] = useState(null)
  const [instagramPost, setInstagramPost] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Fetch X and Instagram posts
    async function fetchSocialPosts() {
      try {
        const xResponse = await fetch('/api/get-latest-x-post');
        const xData = await xResponse.json();
        setXPost(xData);

        const igResponse = await fetch('/api/get-latest-instagram-post');
        const igData = await igResponse.json();
        setInstagramPost(igData);
      } catch (error) {
        console.error('Error fetching social posts:', error);
      }
    }
    fetchSocialPosts();
    
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
            Hey, I'm Kevon 👋
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-16"
            variants={itemVariants}
          >
            This is a tagline for first impression. Write something here
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

        {/* Introduction Section */}
        <motion.section 
          className="py-16 px-6 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              You're intrigued enough to click and see this page - thank you! But always get to know the person if you're going to read a lot from him.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="https://kevoncheung.com?ref=linkinbio-page"
                className="bg-[#16423c] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#0f2e2a] transition-all transform hover:shadow-lg"
              >
                Get to really know me
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 2 - Personal Brand - Creative Redesign with BG Removed Image */}
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
          
          <div className="max-w-6xl mx-auto relative">
            {/* Heading with creative styling */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-[#16423c] inline-block relative">
                  Magnetic Personal Brand
                  <motion.div 
                    className="absolute -bottom-3 left-0 h-1 bg-yellow-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </h2>
              </motion.div>
            </div>
            
            {/* New layout with background-removed image */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side - Image with floating elements */}
              <motion.div
                className="lg:w-1/2 relative"
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
                      className="max-w-full h-auto mx-auto"
                    />
                    
                    {/* Subtle shadow beneath the floating image */}
                    <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-black/10 blur-md rounded-full z-0" />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Right side - Content */}
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Main text */}
                <motion.p 
                  className="text-xl text-gray-700 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  If you're doing great work but feel like the world doesn't have a way to see it, you need a magnetic personal brand. I started from zero and I wrote down the initial steps in this book to help you.
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
                    >
                      Build yourself a brand
                    </Link>
                  </motion.div>
                  <div className="absolute -bottom-2 -right-2 w-full h-full bg-yellow-400 rounded-lg opacity-50 z-0" />
                </motion.div>
              </motion.div>
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
                Show Your Work
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
                You're intrigued enough to click and see this page - thank you! But always get to know the person if you're going to read a lot from him.
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
                    href="https://smallschool.is/build-in-public?ref=linkinbio-page"
                    className="inline-block bg-[#16423c] text-white px-10 py-5 rounded-lg text-lg font-medium hover:bg-[#0f2e2a] transition-all hover:shadow-xl border-2 border-transparent hover:border-yellow-400"
                  >
                    Build things in public
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Animated arrow */}
              <motion.div 
                className="opacity-70 mx-auto"
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
            <div className="max-w-2xl ml-8 md:ml-16 lg:ml-24">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  Your Knowledge,<br />Your Business
                </h2>
                <div className="w-24 h-1 bg-yellow-400 mb-8" />
                <p className="text-xl text-white/90 mb-10 max-w-xl">
                  Finally, you want to build a business around what you know. If you feel overwhelmed, don't worry. It is about finding the right next thing to work on, step by step.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link 
                    href="https://smallschool.is?ref=linkinbio-page"
                    className="inline-block bg-white text-[#16423c] px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all hover:shadow-lg"
                  >
                    Build a business around YOU
                  </Link>
                </motion.div>
              </motion.div>
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
              Latest Updates
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* X Post Placeholder */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-4">
                  <img src="/images/social/x.svg" alt="X" className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-bold">Latest from X</h3>
                </div>
                <div className="min-h-[200px] flex flex-col border border-gray-200 rounded-lg p-4">
                  {xPost ? (
                    <>
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={xPost.author.profile_image_url} 
                            alt={xPost.author.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold">{xPost.author.name}</p>
                          <p className="text-gray-500 text-sm">@{xPost.author.username}</p>
                        </div>
                      </div>
                      <p className="mb-4">{xPost.text}</p>
                      <div className="mt-auto flex text-gray-500 text-sm">
                        <span className="mr-4">{xPost.public_metrics.like_count} likes</span>
                        <span>{xPost.public_metrics.retweet_count} retweets</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">Loading latest X post...</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <a 
                    href="https://x.com/MeetKevon" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#16423c] font-medium hover:underline"
                  >
                    Follow me on X
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
                <div className="flex items-center mb-4">
                  <img src="/images/social/instagram.svg" alt="Instagram" className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-bold">Latest from Instagram</h3>
                </div>
                <div className="min-h-[200px] flex flex-col border border-gray-200 rounded-lg overflow-hidden">
                  {instagramPost ? (
                    <>
                      <div className="w-full aspect-square bg-gray-100">
                        <img 
                          src={instagramPost.media_url} 
                          alt="Instagram post" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <p className="font-bold mr-1">@{instagramPost.username}</p>
                          <p className="text-gray-700 truncate">{instagramPost.caption}</p>
                        </div>
                        <div className="flex text-gray-500 text-sm">
                          <span className="mr-4">{instagramPost.likes_count} likes</span>
                          <span>{instagramPost.comments_count} comments</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full p-4">
                      <p className="text-gray-500">Loading latest Instagram post...</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <a 
                    href="https://www.instagram.com/kevon/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#16423c] font-medium hover:underline"
                  >
                    Follow me on Instagram
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Social links - keeping minimal social links at bottom */}
        <div className="py-8 px-6 text-center">
          <div className="social-links flex justify-center gap-4">
            <motion.a 
              href="https://x.com/MeetKevon" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/images/social/x.svg" alt="X" width="24" height="24" />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/kevon/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/images/social/instagram.svg" alt="Instagram" width="24" height="24" />
            </motion.a>
          </div>
        </div>
      </div>
    </>
  )
} 
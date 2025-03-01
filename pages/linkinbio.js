import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
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
    <Layout 
      title="Kevon Cheung | Link in Bio"
      metaDescription="Connect with Kevon Cheung and explore his work on personal branding, building in public, and creating a business around yourself."
      robotsDirective="index, follow"
    >
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <motion.section 
          className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Background animated elements */}
          <motion.div 
            className="absolute top-20 left-10 w-20 h-20 rounded-full bg-green-100 opacity-30"
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
            className="relative w-48 h-48 mb-8 overflow-hidden rounded-full border-4 border-[#16423c] shadow-xl"
            variants={itemVariants}
          >
            <img 
              src="/images/linkinbio-kevon.jpg" 
              alt="Kevon Cheung" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-[#16423c]"
            variants={itemVariants}
          >
            Hey, I'm Kevon 👋
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-8"
            variants={itemVariants}
          >
            You're intrigued enough to click and see this page - thank you! But always get to know the person if you're going to read a lot from him.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link 
              href="https://kevoncheung.com?ref=linkinbio-page"
              className="bg-[#16423c] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#0f2e2a] transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Get to really know me
            </Link>
          </motion.div>
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#16423c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.section>

        {/* Section 2 - Personal Brand */}
        <motion.section 
          className="py-20 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <motion.div 
                className="md:w-1/2 relative"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  className="absolute -top-4 -left-4 w-full h-full bg-[#16423c]/10 rounded-lg"
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                <motion.img 
                  src="/images/projects/find-joy-in-chaos.png" 
                  alt="Find Joy in Chaos Book" 
                  className="w-full h-auto rounded-lg shadow-xl relative z-10"
                  whileHover={{ 
                    rotate: 2,
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-[#16423c]">Magnetic Personal Brand</h2>
                <p className="text-lg text-gray-700 mb-8">
                  If you're doing great work but feel like the world doesn't have a way to see it, you need a magnetic personal brand. I started from zero and I wrote down the initial steps in this book to help you.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="https://findjoyinchaos.com?ref=linkinbio-page"
                    className="inline-block bg-[#16423c] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0f2e2a] transition-all hover:shadow-lg"
                  >
                    Build yourself a brand
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Section 3 - Build in Public */}
        <motion.section 
          className="py-20 px-6 bg-gray-50 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-10 right-10 w-32 h-32 rounded-full bg-green-100 opacity-20"
            variants={floatVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
          <motion.div 
            className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-blue-100 opacity-20"
            variants={floatVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <motion.div 
                className="md:w-1/2 relative"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  className="absolute -top-4 -right-4 w-full h-full bg-[#16423c]/10 rounded-lg"
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 3 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                <motion.img 
                  src="/images/projects/small-school.png" 
                  alt="Build in Public Guide" 
                  className="w-full h-auto rounded-lg shadow-xl relative z-10"
                  whileHover={{ 
                    rotate: -2,
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-[#16423c]">Show Your Work</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Then you have to regularly show up to market yourself. The best way is to show your work. Why? Because it is the easiest and most impactful stories you can tell. People love them.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="https://smallschool.is/build-in-public?ref=linkinbio-page"
                    className="inline-block bg-[#16423c] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0f2e2a] transition-all hover:shadow-lg"
                  >
                    Build things in public
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Section 4 - Business Around You */}
        <motion.section 
          className="py-20 px-6 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-1/3 left-10 w-20 h-20 rounded-full bg-yellow-100 opacity-20"
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
            className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full bg-green-100 opacity-20"
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
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <motion.div 
                className="md:w-1/2 relative"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  className="absolute -top-4 -left-4 w-full h-full bg-[#16423c]/10 rounded-lg"
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                <motion.img 
                  src="/images/projects/small-school.png" 
                  alt="Small School" 
                  className="w-full h-auto rounded-lg shadow-xl relative z-10"
                  whileHover={{ 
                    rotate: 2,
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-[#16423c]">Your Knowledge, Your Business</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Finally, you want to build a business around what you know. If you feel overwhelmed, don't worry. It is about finding the right next thing to work on, step by step.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="https://smallschool.is?ref=linkinbio-page"
                    className="inline-block bg-[#16423c] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0f2e2a] transition-all hover:shadow-lg"
                  >
                    Build a business around YOU
                  </Link>
                </motion.div>
              </motion.div>
            </div>
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

        {/* Footer */}
        <footer className="py-10 px-6 text-center">
          <div className="social-links flex justify-center gap-4 mb-6">
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
              href="https://www.linkedin.com/in/kevoncheung/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/images/social/linkedin.svg" alt="LinkedIn" width="24" height="24" />
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
            <motion.a 
              href="https://www.threads.net/@kevon" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/images/social/threads.svg" alt="Threads" width="24" height="24" />
            </motion.a>
            <motion.a 
              href="https://www.youtube.com/@MeetKevon" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/images/social/youtube.svg" alt="YouTube" width="24" height="24" />
            </motion.a>
          </div>
          <p className="text-gray-600">© {new Date().getFullYear()} Kevon Cheung. All rights reserved.</p>
        </footer>
      </div>
    </Layout>
  )
} 
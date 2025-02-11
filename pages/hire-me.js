import { useEffect } from 'react'
import Layout from '../components/Layout'

export default function HirePage() {

  useEffect(() => {
    // Load Senja widget script
    const senjaScript = document.createElement('script')
    senjaScript.src = 'https://widget.senja.io/widget/34da712b-077a-4a62-8332-fb04f41dfe74/platform.js'
    senjaScript.async = true
    document.body.appendChild(senjaScript)

    return () => {
      document.body.removeChild(senjaScript)
      const script = document.querySelector('script[data-uid="e610788a6b"]')
      if (script) {
        script.remove()
      }
    }
  }, [])

  return (
    <Layout 
      title="Hire Me"
      metaDescription="Looking for opportunities to collaborate with talented teams in education, knowledge-sharing, and creation. Let's work together!"
    >
      <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-24">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl mb-6">You want a personal brand, but you don't have the time—or the know-how.</h1>
            
            <div className="space-y-6 text-lg mb-10">
              <p>You're a CEO or entrepreneur, amazing at what you do. You want to share your ideas, help more people, and build up your influence.</p>
              <p>But the reality is that trust requires content, and content requires time. And between running a business and living your life, that's the one thing you don't have.</p>
              <p>That's where I come in. <span className="font-bold">I'll be your marketing right-hand</span>, making it easy to build a personal brand — <span className="font-bold">with minimal effort on your part and maximum impact you'll wake up excited for.</span></p>
            </div>
          </div>

          <div className="w-full md:w-[320px] md:ml-6 rounded-2xl overflow-hidden shrink-0">
            <img 
              src="/images/kevon-hire-me.jpg" 
              alt="Kevon Cheung" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between mb-24">
            <h2 className="text-4xl text-center w-full">A Fraction Head of Marketing for Your Personal Brand</h2>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>How I can help you</h2>
          <p>Many people will tell you how to build a personal brand. Me? I've actually done it. I started from scratch, attracted a loyal audience, and taught thousands — by being myself, not by chasing trends.</p>
          <ol>
            <li>I wrote the <a href="https://smallschool.is/build-in-public">Build in Public guide</a> that has been read by 50,000 entrepreneurs</li>
            <li>I wrote and self-published <a href="https://findjoyinchaos.com/">Find Joy in Chaos</a> with 4.9/5 rating</li>
            <li>I created and taught 500+ students personally with <a href="https://smallschool.is/build-in-public-mastery">Build in Public Mastery</a></li>

          </ol>
          <p>I'm not a fan of those personal brands that throw out authoritative posts just to squeeze cash from their followers. I show up for purpose, genuine influence, and building something that truly resonates.</p>
          <p>And what sets me apart? I bring a unique blend of skills: marketing (built my own brand — telling relatable stories), operations (former COO — creating well-oiled systems), and tech (ex-software engineer — leveraging AI to do more & do it better).</p>
          <p>But I'm not for every entrepreneur or CEO, and that's okay. I'm sharing this so you can decide if I'm the right person to connect you to the world.</p>

          <h2>How you can work with me</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Full-Time Option */}
            <div className="border border-[#16423c]/20 rounded-xl p-8 flex flex-col">
              <div className="text-4xl font-bold mb-2">FULL-TIME</div>
              <p className="text-gray-600 mb-8">Fully committed to your brand</p>

              <p className="text-[#16423c]">We'll strategize the best marketing plans to execute, for example:</p>
              
              <div className="space-y-4 flex-grow">
                <div className="flex items-start gap-2">
                  <img 
                    src="/images/leaf-icon.png" 
                    alt="Leaf icon" 
                    className="w-[15px] h-[15px] text-[#16423c] mt-1 shrink-0 leaf-icon"
                  />
                  <span>Interviewing you to create content that reflects your philosophies</span>
                </div>
                <div className="flex items-start gap-2">
                  <img 
                    src="/images/leaf-icon.png" 
                    alt="Leaf icon" 
                    className="w-[15px] h-[15px] text-[#16423c] mt-1 shrink-0 leaf-icon"
                  />
                  <span>Finding and collaborating with the right partners to elevate your brand</span>
                </div>
                <div className="flex items-start gap-2">
                  <img 
                    src="/images/leaf-icon.png" 
                    alt="Leaf icon" 
                    className="w-[15px] h-[15px] text-[#16423c] mt-1 shrink-0 leaf-icon"
                  />
                  <span>Validating and shaping your full suite of offerings</span>
                </div>
                <div className="flex items-start gap-2">
                  <img 
                    src="/images/leaf-icon.png" 
                    alt="Leaf icon" 
                    className="w-[15px] h-[15px] text-[#16423c] mt-1 shrink-0 leaf-icon"
                  />
                  <span>Creating a guide, book or course to share your methodology</span>
                </div>
                <div className="flex items-start gap-2">
                  <img 
                    src="/images/leaf-icon.png" 
                    alt="Leaf icon" 
                    className="w-[15px] h-[15px] text-[#16423c] mt-1 shrink-0 leaf-icon"
                  />
                  <span>A lot more as I'm part of your team!</span>
                </div>
              </div>

              <a href="https://tally.so/r/nWK4VN">
                <button href="https://tally.so/r/nWK4VN" className="mt-8 w-full bg-[#16423c] text-white rounded-lg py-3 px-6 font-semibold hover:bg-[#16423c]/90 transition-colors">
                  Get In Touch
                </button>
              </a>
            </div>

            {/* Fractional Option */}
            <div className="border border-[#16423c]/20 rounded-xl p-8 flex flex-col">
              <div className="text-4xl font-bold mb-2">FRACTIONAL</div>
              <p className="text-gray-600 mb-8">Starts at $4,000 per month</p>

              <p className="text-[#16423c]">We'll craft a fractional plan with the highest ROI for you, for example:</p>
              
              <div className="space-y-4 flex-grow">
                <div className="flex items-start gap-2">
                  <img 
                    src="/images/leaf-icon.png" 
                    alt="Leaf icon" 
                    className="w-[15px] h-[15px] text-[#16423c] mt-1 shrink-0 leaf-icon"
                  />
                  <span>Creating and executing your content and build-in-public strategy on social media and email</span>
                </div>
                <div className="flex items-start gap-2">
                  <img 
                    src="/images/leaf-icon.png" 
                    alt="Leaf icon" 
                    className="w-[15px] h-[15px] text-[#16423c] mt-1 shrink-0 leaf-icon"
                  />
                  <span>Generating momentum for your next product launch</span>
                </div>
                <div className="flex items-start gap-2">
                  <img 
                    src="/images/leaf-icon.png" 
                    alt="Leaf icon" 
                    className="w-[15px] h-[15px] text-[#16423c] mt-1 shrink-0 leaf-icon"
                  />
                  <span>Building your signature lead magnet optimized for opt-in conversions</span>
                </div>
                <div className="flex items-start gap-2">
                  <img 
                    src="/images/leaf-icon.png" 
                    alt="Leaf icon" 
                    className="w-[15px] h-[15px] text-[#16423c] mt-1 shrink-0 leaf-icon"
                  />
                  <span>I only take on a max of 2 roles at a time, hence there is a starting rate</span>
                </div>
              </div>

              <a href="https://tally.so/r/nWK4VN">
                <button className="mt-8 w-full bg-white text-[#16423c] border-2 border-[#16423c] rounded-lg py-3 px-6 font-semibold hover:bg-[#16423c]/5 transition-colors">
                  Get In Touch
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between mt-24 mb-24">
            <h2 className="text-4xl text-center w-full">I'm here to help you build a powerful personal brand to fuel recruitment, fundraising, new projects, and many more. You'll grow in a way that your competitors can't touch.</h2>
        </div>

        {/* What They Say Section */}
        <div>
          <h2>What They Say</h2>
          <div 
            className="senja-embed" 
            data-id="34da712b-077a-4a62-8332-fb04f41dfe74" 
            data-mode="shadow" 
            data-lazyload="false" 
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </Layout>
  )
} 
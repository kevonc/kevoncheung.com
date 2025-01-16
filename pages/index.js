import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-gray-900">Hey! I'm Kevon 👋</h1>
          <p className="text-xl text-gray-600">Welcome to my personal site.</p>
          
          <p className="text-gray-800">
            I enjoy exploring new ideas around business, education, marketing and knowledge sharing. 
            When I realized everyone has the power to share what they know, I started{' '}
            <a href="https://smallschool.io" className="text-emerald-500 hover:text-emerald-600">
              Small School
            </a>.
          </p>

          <p className="text-gray-800">
            I now live in Hong Kong with my wife and two daughters. I like to run, write, 
            and do silly things with my girls.
          </p>

          <p className="text-gray-800">
            Here you'll find my writing and projects. I try my best to show you what I'm learning. 
            Follow me so we can be friends:
          </p>

          <div className="flex gap-6">
            <a href="https://twitter.com/MadeByKevon" className="text-emerald-500 hover:text-emerald-600">X</a>
            <a href="https://threads.net/@kevoncheung" className="text-emerald-500 hover:text-emerald-600">Threads</a>
            <a href="https://instagram.com/kevoncheung" className="text-emerald-500 hover:text-emerald-600">Instagram</a>
            <a href="https://youtube.com/@MadeByKevon" className="text-emerald-500 hover:text-emerald-600">YouTube</a>
          </div>
        </div>

        <div className="w-full md:w-[400px] rounded-2xl overflow-hidden">
          <img 
            src="/images/kevon.png" 
            alt="Kevon Cheung" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Layout>
  )
} 
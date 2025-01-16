import Layout from '../components/Layout'
import Appearances from '../components/Appearances'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function About({ appearances }) {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center mb-16">About</h1>

        <div className="space-y-12">
          <section>
            <p className="text-gray-800 text-lg">
              I'm the founder of{' '}
              <a href="https://smallschool.io" className="link-underline">
                Small School
              </a>
              , helping people productize their knowledge into digital products.
            </p>
          </section>

          <section>
            <p className="text-gray-800 text-lg">
              Previously, I was the CEO at{' '}
              <a href="#" className="link-underline">First Code Academy</a>
              , where we taught kids to code across Asia. Before that, I was a software engineer at{' '}
              <a href="#" className="link-underline">Oursky</a>
              , building mobile apps for startups and enterprises.
            </p>
          </section>

          <section>
            <p className="text-gray-800 text-lg">
              My professional career started in software engineering. I graduated from{' '}
              <a href="#" className="link-underline">The University of Hong Kong</a>
              {' '}with a Computer Science degree. I've always been passionate about education and 
              entrepreneurship, which led me to start teaching coding and eventually building 
              education businesses.
            </p>
          </section>

          <section>
            <p className="text-gray-800 text-lg">
              More info about my work can be found in my{' '}
              <a href="#" className="link-underline">LinkedIn</a>.
            </p>
          </section>

          <Appearances appearances={appearances} />

          <section className="pt-8">
            <h2 className="text-2xl mb-4">📺</h2>
            <p className="text-gray-800 text-lg">
              <a href="#" className="link-underline">Ted Lasso</a>,{' '}
              <a href="#" className="link-underline">The Morning Show</a>,{' '}
              <a href="#" className="link-underline">Succession</a>,{' '}
              <a href="#" className="link-underline">The Bear</a>,{' '}
              <a href="#" className="link-underline">Modern Family</a>,{' '}
              <a href="#" className="link-underline">The Office</a>.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-2xl mb-4">📚</h2>
            <ul className="space-y-4">
              <li>
                <a href="#" className="link-underline">
                  Anything You Want
                </a>{' '}
                by Derek Sivers
              </li>
              <li>
                <a href="#" className="link-underline">
                  Company of One
                </a>{' '}
                by Paul Jarvis
              </li>
              <li>
                <a href="#" className="link-underline">
                  Show Your Work
                </a>{' '}
                by Austin Kleon
              </li>
              <li>
                <a href="#" className="link-underline">
                  The Almanack of Naval Ravikant
                </a>{' '}
                by Eric Jorgenson
              </li>
              <li>
                <a href="#" className="link-underline">
                  The Psychology of Money
                </a>{' '}
                by Morgan Housel
              </li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const appearancesFile = fs.readFileSync(path.join('content', 'appearances', '_appearances.md'), 'utf-8')
  const { data } = matter(appearancesFile)
  
  return {
    props: {
      appearances: data.appearances || []
    }
  }
} 
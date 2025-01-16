import Layout from '../components/Layout'

export default function Now() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-gray-900">What I'm doing now</h1>
        
        <p className="text-gray-600 mb-16">
          Here you'll find out what I'm actively thinking about and working on. If you feel 
          connected to something, feel free to reach out! This page was last updated on October 14, 2024.
        </p>

        <div className="space-y-16 text-left">
          <section>
            <h2 className="text-gray-900">Being a present dad</h2>
            <p className="text-gray-800">
              I now have two daughters and I'm happy to say that my wife's and my life evolve around them. 
              I'm a believer that <strong>0-6 years old is the most precious period</strong> because we get 
              to help them develop the most, so we do everything we can to spend as much time with them.
            </p>
            
            <p className="text-gray-800">
              Some things that we prioritize: <strong>happiness, value, politeness, perspectives, and 
              problem-solving skills</strong>. I have a special project in mind that I'd love to work on 
              with my wife and daughters. You can read more in the last point on this page.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900">Collaborating with more people</h2>
            <p className="text-gray-800">
              I've been running a one-man online education business since 2021. It was the dream business 
              for a new dad during a global pandemic. But things have changed.
            </p>
            
            <p className="text-gray-800">
              "Working" is dynamic these days. You don't have to just do one thing. I'd love opportunities 
              to challenge myself to go beyond what I'm capable of. I <strong>crave learning and collaborating 
              with crazy talented people</strong>. At this point, I'm exploring companies or projects that I 
              can make a meaningful contribution to.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900">Exploring the next phase of digital learning</h2>
            <p className="text-gray-800">
              Cohort-based courses were hot during the pandemic in 2021-2022. What's next? How can we 
              <strong>level up both online and in-person education?</strong> The hybrid learning model. 
              These are the questions and answers I'd love to find out.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900">I want to write more books (small books!)</h2>
            <p className="text-gray-800">
              I self-published a book in 2022. I still think <strong>books are the best way to share ideas</strong> because 
              they are not expensive like courses.
            </p>
            
            <p className="text-gray-800">
              I want to publish more books. Nothing crazy, just useful, honest, and small ones to help others.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900">Worldschooling (Summer version)</h2>
            <p className="text-gray-800">
              I love the concept of worldschooling — <strong>using the world as your classroom</strong> — but I don't 
              think we want to dive into it 100%. We still want to be in one place and attend a school.
            </p>
            
            <p className="text-gray-800">
              BUT, I'm super keen on <strong>exploring a Summer version!</strong> I'd love my family to take 2-4 weeks 
              every Summer to set and accomplish a mission in different parts of the world. It can be living on a farm, 
              cycling through cities, exploring a country we've never heard of and talking to locals, etc.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900">Picking up golf</h2>
            <p className="text-gray-800">
              I've always loved sports that require a <strong>high level of concentration</strong> — beerpong (laugh!) 
              darts, and archery. Now that the kids are no longer newborns, I think it is time for me to work on a 
              new sport craft.
            </p>
            
            <p className="text-gray-800">
              I took golf lessons when I was 20 but never really played much ever since. It is time to pick it up again.
            </p>
          </section>
        </div>

        <p className="text-gray-600 mt-16 pt-8 border-t">
          <em>This page is inspired by <a href="https://sive.rs/now">Derek Sivers</a> and{' '}
          <a href="https://joelgascoigne.com/now">Joel Gascoigne</a>. See theirs!</em>
        </p>
      </div>
    </Layout>
  )
} 
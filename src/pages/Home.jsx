import PageCard from '../components/PageCard.jsx'
import './Home.css'

const pages = [
  {
    id: 1,
    title: 'Page One',
    description: 'Coming soon',
    path: '/page-one',
  },
  {
    id: 2,
    title: 'Page Two',
    description: 'Coming soon',
    path: '/page-two',
  },
  {
    id: 3,
    title: 'Page Three',
    description: 'Coming soon',
    path: '/page-three',
  },
  {
    id: 4,
    title: 'Page Four',
    description: 'Coming soon',
    path: '/page-four',
  },
  {
    id: 5,
    title: 'Page Five',
    description: 'Coming soon',
    path: '/page-five',
  },
  {
    id: 6,
    title: 'Page Six',
    description: 'Coming soon',
    path: '/page-six',
  },
]

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Explainers</h1>
        <p>Choose an interactive page to explore</p>
      </header>
      <main className="home-gallery">
        {pages.map((page) => (
          <PageCard key={page.id} {...page} />
        ))}
      </main>
    </div>
  )
}

export default Home

import { useNavigate } from 'react-router-dom'
import './PageCard.css'

function PageCard({ title, description, path }) {
  const navigate = useNavigate()

  return (
    <div className="card" onClick={() => navigate(path)}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
      <button className="card-button" onClick={(e) => { e.stopPropagation(); navigate(path) }}>
        View
      </button>
    </div>
  )
}

export default PageCard

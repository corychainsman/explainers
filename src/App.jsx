import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SolarSystem from './pages/SolarSystem.jsx'
import './App.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solar-system" element={<SolarSystem />} />
      </Routes>
    </HashRouter>
  )
}

export default App

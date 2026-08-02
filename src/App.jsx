import { Navigate, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import About from './pages/About'
import Events from './pages/Events'
import Map from './pages/Map'
import Council from './pages/Council'

function App() {
  return (
    <>
      <Routes>
        {/* Default route redirects to /about */}
        <Route path="/" element={<Navigate to="/about" replace />} />

        {/* Direct page routes */}
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/map" element={<Map />} />
        <Route path="/council" element={<Council />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App

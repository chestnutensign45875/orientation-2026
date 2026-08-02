import { Navigate, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import SwipeContainer from './components/SwipeContainer'
import ComingSoon from './pages/ComingSoon'
import About from './pages/About'
import Events from './pages/Events'
import Map from './pages/Map'

const pages = [
  { path: '/about', label: 'About', Component: About },
  { path: '/events', label: 'Events', Component: Events },
  { path: '/map', label: 'Map', Component: Map },
]

/**
 * App shell — routing only.
 */
function App() {
  return (
    <Routes>
      {/* Temporary landing page — swap with Navigate to="/about" when ready */}
      <Route path="/" element={<ComingSoon />} />

      {/* Swipe shell containing About (default), Events, and Map */}
      <Route path="/about" element={<SwipeContainer pages={pages} />} />
      <Route path="/events" element={<SwipeContainer pages={pages} />} />
      <Route path="/map" element={<SwipeContainer pages={pages} />} />

      {/* Fallback to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

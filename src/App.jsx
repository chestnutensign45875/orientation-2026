import { Navigate, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import SwipeContainer from './components/SwipeContainer'
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
    <>
      <Routes>
        {/* Root route / defaults directly to the About page swipe shell */}
        <Route path="/" element={<Navigate to="/about" replace />} />

        {/* Swipe container routes */}
        <Route path="/about" element={<SwipeContainer pages={pages} />} />
        <Route path="/events" element={<SwipeContainer pages={pages} />} />
        <Route path="/map" element={<SwipeContainer pages={pages} />} />

        {/* Fallback unknown paths to /about */}
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App

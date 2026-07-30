import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ComingSoon from './pages/ComingSoon'
import About from './pages/About'
import Events from './pages/Events'
import Map from './pages/Map'

/**
 * App shell — routing only.
 *
 * Launch checklist when the real site is ready:
 * 1. Build out About / Events / Map (and add a Home page if needed).
 * 2. Point `/` at that Home (or About) inside the Layout routes below.
 * 3. Delete `pages/ComingSoon.jsx` + `pages/ComingSoon.css`.
 */
function App() {
  return (
    <Routes>
      {/* Temporary public landing — swap this route when launching */}
      <Route path="/" element={<ComingSoon />} />

      {/* Real site pages (nav + footer via Layout) */}
      <Route element={<Layout />}>
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/map" element={<Map />} />
      </Route>

      {/* Unknown paths fall back to the landing page for now */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

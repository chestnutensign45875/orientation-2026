import { Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import SwipeShell from './components/SwipeShell'

/**
 * The real orientation experience. About is the default page at `/`.
 * `ComingSoon` is kept in the project so it can be restored if needed.
 */
function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<SwipeShell />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App

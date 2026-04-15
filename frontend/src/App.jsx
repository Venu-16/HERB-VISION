import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Upload from './pages/Upload'
import Metrics from './pages/Metrics'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth', {
          credentials: 'include',
        })
        const data = await response.json()
        if (response.ok && data.authenticated) {
          setUser(data.user)
        }
      } catch (error) {
        console.error('Auth check failed', error)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
    setUser(null)
  }

  if (loading) {
    return <div className="app">Loading…</div>
  }

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <div>
            <Link to="/" className="brand">
              HERB VISION
            </Link>
            <p className="tagline">Medicinal plant recognition with historic and latest model metrics</p>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            {user && <Link to="/upload">Upload</Link>}
            {user && <Link to="/metrics">Metrics</Link>}
            {user ? (
              <button className="link-button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register onRegister={setUser} />} />
          <Route path="/upload" element={<Upload user={user} />} />
          <Route path="/metrics" element={<Metrics user={user} />} />
        </Routes>
        <footer className="app-footer">
          <div>HERB VISION © 2026</div>
          <div>Built for herbal plant classification and model evaluation</div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App

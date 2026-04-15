import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Upload from './pages/Upload'
import Metrics from './pages/Metrics'
import { Leaf } from 'lucide-react'

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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Leaf className="h-8 w-8 text-primary" />
                <Link to="/" className="text-2xl font-bold text-primary">
                  HERB VISION
                </Link>
              </div>
              <nav className="flex items-center space-x-4">
                <NavLink to="/">Home</NavLink>
                {user && <NavLink to="/upload">Upload</NavLink>}
                {user && <NavLink to="/metrics">Metrics</NavLink>}
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                  </>
                )}
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/register" element={<Register onRegister={setUser} />} />
            <Route path="/upload" element={<Upload user={user} />} />
            <Route path="/metrics" element={<Metrics user={user} />} />
          </Routes>
        </main>

        <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>HERB VISION © 2026</div>
              <div>Built for herbal plant classification and model evaluation</div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

function NavLink({ to, children }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-full transition-all duration-300 ${
        isActive
          ? 'bg-primary text-white shadow-md'
          : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
      }`}
    >
      {children}
    </Link>
  )
}

export default App

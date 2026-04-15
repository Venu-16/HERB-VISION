import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Upload from './pages/Upload'
import Metrics from './pages/Metrics'
import Navbar from './components/Navbar'

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
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(46,125,50,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(102,187,106,0.12),transparent_28%),#F1F8E9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(46,125,50,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(102,187,106,0.12),transparent_28%),#F1F8E9] py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <Navbar user={user} onLogout={handleLogout} />
          <main className="mx-auto mt-8 max-w-[1200px] min-h-[calc(100vh-220px)]">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/login" element={<Login onLogin={setUser} />} />
              <Route path="/register" element={<Register onRegister={setUser} />} />
              <Route path="/upload" element={<Upload user={user} />} />
              <Route path="/metrics" element={<Metrics user={user} />} />
            </Routes>
          </main>

          <footer className="mx-auto mt-12 max-w-[1200px] rounded-[32px] bg-white/90 border border-white/80 shadow-xl p-6 text-sm text-gray-600">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>HERB VISION © 2026</div>
              <div>Built for herbal plant classification and model evaluation</div>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

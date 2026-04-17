import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Login failed')
      } else {
        onLogin(data.user)
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-3xl bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20">
            <LogIn className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-gray-600 mt-2">Sign in to your HERB VISION account</p>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-3xl text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-3xl text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-3xl p-4">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full justify-center bg-primary text-white shadow-lg hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="text-black">Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 text-black" />
                  <span className="text-black">Sign in</span>
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login

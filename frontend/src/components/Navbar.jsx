import { Link, useLocation } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export default function Navbar({ user, onLogout }) {
  const location = useLocation()
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/upload', label: 'Upload' },
    { to: '/metrics', label: 'Metrics' },
  ]

  return (
    <header className="mx-auto max-w-[1200px] rounded-[32px] bg-white/90 border border-white/80 shadow-xl p-5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/20">
            <Leaf className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">HERB VISION</p>
            <p className="text-sm text-gray-500">AI medicinal plant classification</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-primary border border-primary/20 hover:bg-primary/5 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

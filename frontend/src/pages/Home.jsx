import { Link } from 'react-router-dom'
import { Upload, BarChart3, ArrowRight, Leaf } from 'lucide-react'

function Home({ user }) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Discover the Power of
              <span className="text-primary block">Medicinal Plants</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Advanced AI-powered plant recognition with detailed medicinal information.
              Upload images and get instant classification with historical model metrics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/upload"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                  <span>Try Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <Leaf className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Plant Recognition</h3>
                <p className="text-gray-600">Upload any medicinal plant image and get detailed analysis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 gap-8">
        {user ? (
          <>
            <FeatureCard
              icon={<Upload className="h-8 w-8" />}
              title="Upload & Classify"
              description="Upload plant images and get instant AI-powered classification with confidence scores."
              link="/upload"
              color="from-primary to-secondary"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Model Metrics"
              description="Compare performance metrics between previous and latest model versions."
              link="/metrics"
              color="from-secondary to-primary"
            />
          </>
        ) : (
          <>
            <FeatureCard
              icon={<Upload className="h-8 w-8" />}
              title="Login to Upload"
              description="Sign in to start uploading plant images and get detailed classifications."
              link="/login"
              color="from-primary to-secondary"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Register to Access"
              description="Create an account to explore model metrics and performance analytics."
              link="/register"
              color="from-secondary to-primary"
            />
          </>
        )}
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, link, color }) {
  return (
    <Link
      to={link}
      className={`bg-gradient-to-br ${color} text-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
          {icon}
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-white/90 leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center text-white font-semibold">
        <span>Learn more</span>
        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}

export default Home

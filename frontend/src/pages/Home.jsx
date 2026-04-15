import { Link } from 'react-router-dom'
import { Upload, BarChart3, ArrowRight, Leaf } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

function Home({ user }) {
  return (
    <div className="space-y-10">
      <Card className="overflow-hidden bg-gradient-to-br from-[#ECF7E9] via-white to-[#F1F8E9]">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Medicinal plant intelligence</p>
              <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                Discover the Power of
                <span className="text-primary block">Medicinal Plants</span>
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
                Transform plant imagery into instant classification, medicinal insight, and performance analytics with a polished AI workflow.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button as={Link} to={user ? '/upload' : '/login'} className="w-full sm:w-auto">
                Try Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link to="/metrics" className="inline-flex items-center justify-center rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition">
                View Metrics
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-green-100 bg-white p-8 shadow-xl">
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-[28px] bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
              <Leaf className="h-16 w-16 text-primary" />
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-slate-900">Plant Recognition</h3>
                <p className="mt-2 text-slate-600">Upload an image and get instant medicinal plant classification powered by AI.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
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
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, link, color }) {
  return (
    <Link
      to={link}
      className={`group rounded-[32px] bg-gradient-to-br ${color} p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/20 text-white transition-colors duration-300 group-hover:bg-white/30">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-white/90 leading-relaxed">{description}</p>
      <div className="mt-6 flex items-center gap-2 text-white font-semibold">
        <span>Learn more</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export default Home

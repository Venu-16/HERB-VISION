import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, BarChart3 } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const initialMetrics = [
  {
    name: 'Previous model version',
    version: 'v1.2',
    accuracy: 88.4,
    precision: 85.2,
    recall: 87.1,
    f1: 86.1,
    note: 'Earlier model trained on legacy dataset',
  },
  {
    name: 'Latest model version',
    version: 'v2.0',
    accuracy: 93.7,
    precision: 92.5,
    recall: 94.1,
    f1: 93.3,
    note: 'Improved preprocessing and medicinal plant labels',
  },
]

function Metrics({ user }) {
  const [metrics, setMetrics] = useState(initialMetrics)
  const [metricForm, setMetricForm] = useState({
    name: '',
    version: '',
    accuracy: '',
    precision: '',
    recall: '',
    f1: '',
    note: '',
  })

  const addMetric = (event) => {
    event.preventDefault()
    setMetrics([
      {
        ...metricForm,
        accuracy: parseFloat(metricForm.accuracy),
        precision: parseFloat(metricForm.precision),
        recall: parseFloat(metricForm.recall),
        f1: parseFloat(metricForm.f1),
      },
      ...metrics,
    ])
    setMetricForm({
      name: '',
      version: '',
      accuracy: '',
      precision: '',
      recall: '',
      f1: '',
      note: '',
    })
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Card className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Model Metrics</h1>
          <p className="text-gray-600 mb-8">Please login or register to view and add model metrics.</p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button as="a" href="/login" className="w-full sm:w-auto" variant="secondary">
              Login
            </Button>
            <Button as="a" href="/register" className="w-full sm:w-auto">
              Register
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const chartData = metrics.map((metric) => ({
    version: metric.version,
    accuracy: metric.accuracy,
    precision: metric.precision,
    recall: metric.recall,
    f1: metric.f1,
  }))

  return (
    <div className="space-y-10">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Model Performance Metrics</h1>
        <p className="text-lg text-slate-600">Track and compare the performance of different model versions.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-slate-900">Metrics Comparison</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, '']} labelFormatter={(label) => `Version ${label}`} />
              <Legend />
              <Bar dataKey="accuracy" fill="#2E7D32" name="Accuracy" />
              <Bar dataKey="precision" fill="#66BB6A" name="Precision" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="h-6 w-6 text-secondary" />
            <h2 className="text-xl font-bold text-slate-900">Performance Trends</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis domain={[80, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, '']} labelFormatter={(label) => `Version ${label}`} />
              <Legend />
              <Line type="monotone" dataKey="recall" stroke="#2E7D32" strokeWidth={3} name="Recall" dot={{ fill: '#2E7D32', strokeWidth: 2, r: 6 }} />
              <Line type="monotone" dataKey="f1" stroke="#66BB6A" strokeWidth={3} name="F1 Score" dot={{ fill: '#66BB6A', strokeWidth: 2, r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Metrics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th className="py-3 px-4">Model</th>
                <th className="py-3 px-4">Version</th>
                <th className="py-3 px-4 text-center">Accuracy</th>
                <th className="py-3 px-4 text-center">Precision</th>
                <th className="py-3 px-4 text-center">Recall</th>
                <th className="py-3 px-4 text-center">F1 Score</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, index) => (
                <tr key={index} className="bg-slate-50 rounded-[28px] border border-transparent hover:border-slate-200">
                  <td className="py-4 px-4 font-medium text-slate-900">{metric.name}</td>
                  <td className="py-4 px-4 text-slate-700">{metric.version}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-semibold text-green-800">{metric.accuracy}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-800">{metric.precision}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="rounded-full bg-purple-100 px-2 py-1 text-sm font-semibold text-purple-800">{metric.recall}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="rounded-full bg-orange-100 px-2 py-1 text-sm font-semibold text-orange-800">{metric.f1}%</span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{metric.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Add New Metric</h2>
            <p className="text-sm text-slate-600 mt-2">Submit your latest model performance metrics for trend comparison.</p>
          </div>
          <Button type="submit" form="metric-form" variant="primary" className="w-full lg:w-auto justify-center bg-primary text-black shadow-lg hover:bg-primary/90">
            <span className='text-black font-semibold'>Add Metric</span>
          </Button>
        </div>

        <form id="metric-form" onSubmit={addMetric} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Model Name</label>
            <input
              type="text"
              value={metricForm.name}
              onChange={(e) => setMetricForm({ ...metricForm, name: e.target.value })}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Version</label>
            <input
              type="text"
              value={metricForm.version}
              onChange={(e) => setMetricForm({ ...metricForm, version: e.target.value })}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Accuracy (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={metricForm.accuracy}
              onChange={(e) => setMetricForm({ ...metricForm, accuracy: e.target.value })}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Precision (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={metricForm.precision}
              onChange={(e) => setMetricForm({ ...metricForm, precision: e.target.value })}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Recall (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={metricForm.recall}
              onChange={(e) => setMetricForm({ ...metricForm, recall: e.target.value })}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">F1 Score (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={metricForm.f1}
              onChange={(e) => setMetricForm({ ...metricForm, f1: e.target.value })}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
            <textarea
              value={metricForm.note}
              onChange={(e) => setMetricForm({ ...metricForm, note: e.target.value })}
              rows={3}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Metrics

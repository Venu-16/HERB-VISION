import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, BarChart3 } from 'lucide-react'

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
    setMetrics([{
      ...metricForm,
      accuracy: parseFloat(metricForm.accuracy),
      precision: parseFloat(metricForm.precision),
      recall: parseFloat(metricForm.recall),
      f1: parseFloat(metricForm.f1),
    }, ...metrics])
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
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Model Metrics</h1>
        <p className="text-xl text-gray-600 mb-8">Please login or register to view and add model metrics.</p>
        <div className="space-x-4">
          <a href="/login" className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
            Login
          </a>
          <a href="/register" className="bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary/90 transition-colors">
            Register
          </a>
        </div>
      </div>
    )
  }

  const chartData = metrics.map(metric => ({
    version: metric.version,
    accuracy: metric.accuracy,
    precision: metric.precision,
    recall: metric.recall,
    f1: metric.f1,
  }))

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Model Performance Metrics</h1>
        <p className="text-xl text-gray-600">Track and compare the performance of different model versions</p>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Metrics Comparison</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${value}%`, '']}
                labelFormatter={(label) => `Version ${label}`}
              />
              <Legend />
              <Bar dataKey="accuracy" fill="#2E7D32" name="Accuracy" />
              <Bar dataKey="precision" fill="#66BB6A" name="Precision" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="h-6 w-6 text-secondary" />
            <h2 className="text-xl font-bold text-gray-900">Performance Trends</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="version" />
              <YAxis domain={[80, 100]} />
              <Tooltip
                formatter={(value) => [`${value}%`, '']}
                labelFormatter={(label) => `Version ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="recall"
                stroke="#2E7D32"
                strokeWidth={3}
                name="Recall"
                dot={{ fill: '#2E7D32', strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="f1"
                stroke="#66BB6A"
                strokeWidth={3}
                name="F1 Score"
                dot={{ fill: '#66BB6A', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Metrics</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Model</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Version</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Accuracy</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Precision</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Recall</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">F1 Score</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Notes</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{metric.name}</td>
                  <td className="py-4 px-4 text-gray-700">{metric.version}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      {metric.accuracy}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                      {metric.precision}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                      {metric.recall}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
                      {metric.f1}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{metric.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Metric Form */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Metric</h2>
        <form onSubmit={addMetric} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model Name</label>
            <input
              type="text"
              value={metricForm.name}
              onChange={(e) => setMetricForm({ ...metricForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
            <input
              type="text"
              value={metricForm.version}
              onChange={(e) => setMetricForm({ ...metricForm, version: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Accuracy (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={metricForm.accuracy}
              onChange={(e) => setMetricForm({ ...metricForm, accuracy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precision (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={metricForm.precision}
              onChange={(e) => setMetricForm({ ...metricForm, precision: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recall (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={metricForm.recall}
              onChange={(e) => setMetricForm({ ...metricForm, recall: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">F1 Score (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={metricForm.f1}
              onChange={(e) => setMetricForm({ ...metricForm, f1: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={metricForm.note}
              onChange={(e) => setMetricForm({ ...metricForm, note: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Add Metric
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Metrics

import { useState } from 'react'

const initialMetrics = [
  {
    name: 'Previous model version',
    version: 'v1.2',
    accuracy: '88.4%',
    precision: '85.2%',
    recall: '87.1%',
    f1: '86.1%',
    note: 'Earlier model trained on legacy dataset',
  },
  {
    name: 'Latest model version',
    version: 'v2.0',
    accuracy: '93.7%',
    precision: '92.5%',
    recall: '94.1%',
    f1: '93.3%',
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
    setMetrics([metricForm, ...metrics])
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
      <main className="page-card">
        <h1>Model Metrics</h1>
        <p>Please login or register to view and add model metrics.</p>
      </main>
    )
  }

  return (
    <main className="page-card">
      <h1>Model Metrics</h1>
      <p>Track the performance of each model version and add your latest metrics here.</p>
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <article key={index} className="metric-card">
            <div className="metric-label">
              <strong>{metric.name}</strong>
              <span>{metric.version}</span>
            </div>
            <div className="metric-values">
              <div>Accuracy: {metric.accuracy}</div>
              <div>Precision: {metric.precision}</div>
              <div>Recall: {metric.recall}</div>
              <div>F1 score: {metric.f1}</div>
            </div>
            <p className="metric-note">{metric.note}</p>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Metrics

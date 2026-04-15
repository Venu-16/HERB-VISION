import { useState } from 'react'

function Upload({ user }) {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const uploadImage = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Upload failed')
        setResult(null)
      } else {
        setResult(data)
        setError(null)
      }
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  if (!user) {
    return (
      <main className="page-card">
        <h1>Upload</h1>
        <p>Please login or register to upload plant images.</p>
      </main>
    )
  }

  return (
    <main className="page-card">
      <h1>Upload Plant Image</h1>
      <div className="upload-box">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button onClick={uploadImage} disabled={!file}>
          Upload and classify
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {result && (
        <section className="result-card">
          <h2>Prediction</h2>
          {result.predictions ? (
            <div>
              <p>
                <strong>Main plant:</strong> {result.main_prediction?.plant}
              </p>
              <p>
                <strong>Description:</strong> {result.main_prediction?.description}
              </p>
              <p>
                <strong>Uses:</strong> {result.main_prediction?.uses}
              </p>
              {result.main_prediction?.gemini_details && (
                <div className="gemini-card">
                  <h3>Medicinal plant details</h3>
                  <p>{result.main_prediction.gemini_details}</p>
                </div>
              )}
              <ul>
                {result.predictions.map((prediction, index) => (
                  <li key={index}>
                    {prediction.plant} — {prediction.confidence}%
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>{result.prediction}</p>
          )}
        </section>
      )}
    </main>
  )
}

export default Upload

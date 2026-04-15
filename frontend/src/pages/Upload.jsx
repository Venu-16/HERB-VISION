import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload as UploadIcon, Loader2, CheckCircle, XCircle } from 'lucide-react'

function Upload({ user }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0]
    setFile(selectedFile)
    setError(null)
    setResult(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(selectedFile)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  })

  const uploadImage = async () => {
    if (!file) return
    setLoading(true)
    setError(null)

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
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Plant Image</h1>
        <p className="text-xl text-gray-600 mb-8">Please login or register to upload plant images.</p>
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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Plant Image</h1>
        <p className="text-xl text-gray-600">Upload an image of a medicinal plant to get AI-powered classification</p>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <UploadIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        {isDragActive ? (
          <p className="text-lg text-primary font-semibold">Drop the image here...</p>
        ) : (
          <div>
            <p className="text-lg text-gray-600 mb-2">Drag & drop an image here, or click to select</p>
            <p className="text-sm text-gray-500">Supports JPG, PNG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Preview</h3>
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-64 rounded-xl shadow-md"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={uploadImage}
              disabled={loading}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <UploadIcon className="h-5 w-5" />
                  <span>Classify Plant</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <XCircle className="h-6 w-6 text-red-500" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">Classification Results</h2>
          </div>

          {result.predictions ? (
            <div className="space-y-6">
              {/* Main Prediction */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {result.main_prediction?.plant}
                </h3>
                <p className="text-gray-700 mb-4">{result.main_prediction?.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Medicinal Uses</h4>
                    <p className="text-gray-600">{result.main_prediction?.uses}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Confidence</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                          style={{ width: `${result.main_prediction?.confidence || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {result.main_prediction?.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gemini Details */}
              {result.main_prediction?.gemini_details && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Additional Information</h4>
                  <p className="text-blue-800 leading-relaxed">{result.main_prediction.gemini_details}</p>
                </div>
              )}

              {/* All Predictions */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">All Predictions</h4>
                <div className="space-y-3">
                  {result.predictions.map((prediction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{prediction.plant}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                            style={{ width: `${prediction.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-12 text-right">
                          {prediction.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">{result.prediction}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Upload

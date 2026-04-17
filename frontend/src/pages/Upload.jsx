import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload as UploadIcon, Loader2, CheckCircle, XCircle } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

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

    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(selectedFile)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: false,
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
      <div className="min-h-[70vh] flex items-center justify-center">
        <Card className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Upload Plant Image</h1>
          <p className="text-gray-600 mb-8">Please login or register to upload plant images.</p>
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

  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Upload Plant Image</h1>
        <p className="text-lg text-slate-600">Upload an image of a medicinal plant to get AI-powered classification.</p>
      </div>

      <Card>
        <div
          {...getRootProps()}
          className={`group cursor-pointer rounded-[28px] border-2 border-dashed p-12 text-center transition-all duration-300 ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <UploadIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-lg font-semibold text-primary">Drop your image here</p>
          ) : (
            <>
              <p className="text-lg font-semibold text-slate-900 mb-2">Drag & drop an image here, or click to select</p>
              <p className="text-sm text-slate-500">Supports JPG, PNG, GIF up to 10MB</p>
            </>
          )}
        </div>

        {preview && (
          <Card className="mt-8 bg-slate-50">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Image Preview</h2>
            <div className="flex justify-center">
              <img src={preview} alt="Preview" className="max-h-72 w-auto rounded-3xl object-contain shadow-lg" />
            </div>
            <div className="mt-6 flex justify-center">
              <Button onClick={uploadImage} disabled={loading} variant="primary" className="w-full justify-center bg-primary text-white shadow-lg hover:bg-primary/90">
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-black" />
                    <span className="text-black">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-5 w-5 text-black" />
                    <span className="text-black">Classify Plant</span>
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {error && (
          <Card className="mt-8 border-red-200 bg-red-50 text-red-700">
            <div className="flex items-center gap-3">
              <XCircle className="h-6 w-6" />
              <p>{error}</p>
            </div>
          </Card>
        )}

        {result && (
          <Card className="mt-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-bold text-slate-900">Classification Results</h2>
            </div>

            {result.predictions ? (
              <div className="space-y-6">
                <div className="rounded-[28px] bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{result.main_prediction?.plant}</h3>
                  <p className="text-slate-700 mb-4">{result.main_prediction?.description}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Medicinal Uses</h4>
                      <p className="text-slate-600">{result.main_prediction?.uses}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Confidence</h4>
                      <div className="flex items-center gap-3">
                        <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${result.main_prediction?.confidence || 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{result.main_prediction?.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {result.main_prediction?.gemini_details && (
                  <Card className="border-blue-200 bg-blue-50 text-blue-900">
                    <h4 className="font-semibold text-lg mb-2">Additional Information</h4>
                    <p className="leading-relaxed">{result.main_prediction.gemini_details}</p>
                  </Card>
                )}

                <Card className="bg-slate-50">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">All Predictions</h4>
                  <div className="space-y-3">
                    {result.predictions.map((prediction, index) => (
                      <div key={index} className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
                        <span className="font-medium text-slate-900">{prediction.plant}</span>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${prediction.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-700">{prediction.confidence}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <p className="text-slate-600">{result.prediction}</p>
            )}
          </Card>
        )}
      </Card>
    </div>
  )
}

export default Upload

import { Link } from 'react-router-dom'

function Home({ user }) {
  return (
    <main className="page-card">
      <h1>Welcome to HERB VISION</h1>
      <p>
        {user
          ? 'Use the Upload and Metrics pages to classify plants and track model performance.'
          : 'Login or register to start using the upload and metrics pages.'}
      </p>
      <div className="page-actions">
        {user ? (
          <>
            <Link className="action-card" to="/upload">
              <h2>Upload</h2>
              <p>Upload a plant image and get classification results.</p>
            </Link>
            <Link className="action-card" to="/metrics">
              <h2>Metrics</h2>
              <p>View model performance and add new metric entries.</p>
            </Link>
          </>
        ) : (
          <>
            <Link className="action-card" to="/login">
              <h2>Login</h2>
              <p>Sign in to your account and start uploading images.</p>
            </Link>
            <Link className="action-card" to="/register">
              <h2>Register</h2>
              <p>Create an account to save your access to the tool.</p>
            </Link>
          </>
        )}
      </div>
    </main>
  )
}

export default Home

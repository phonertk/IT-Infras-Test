import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchFromBackend = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/`)
      const data = await response.json()
      setMessage(JSON.stringify(data, null, 2))
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Frontend</h1>
      <button onClick={fetchFromBackend} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch from Backend'}
      </button>
      {message && <pre>{message}</pre>}
    </div>
  )
}

export default App
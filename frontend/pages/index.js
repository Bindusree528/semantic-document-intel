import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    try {
      const response = await axios.post('http://localhost:8000/auth/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('username', username)
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid credentials. Use admin/admin123')
    }
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>🔐 Semantic Document Intelligence</h1>
        <p style={styles.subtitle}>Advanced AI-Powered Document Analysis System</p>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="admin"
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="admin123"
              required
            />
          </div>
          
          {error && <p style={styles.error}>{error}</p>}
          
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={styles.hint}>
          <p><strong>Default Credentials:</strong></p>
          <p>Username: <code>admin</code></p>
          <p>Password: <code>admin123</code></p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  loginBox: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px',
    fontSize: '24px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#555',
    fontWeight: '600',
    fontSize: '14px'
  },
  input: {
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'border-color 0.3s'
  },
  button: {
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
    fontSize: '14px'
  },
  hint: {
    marginTop: '30px',
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#555'
  }
}

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [dept, setDept] = useState('Engineering')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
    }
  }, [])

  const upload = async () => {
    if (!file) return alert('Please choose a file')
    setLoading(true)
    setResult(null)
    
    const fd = new FormData()
    fd.append('file', file)
    fd.append('department', dept)
    fd.append('uploaded_by', localStorage.getItem('username') || 'admin')
    
    try {
      const res = await axios.post('http://localhost:8000/documents/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(res.data)
    } catch (e) {
      alert('Upload failed: ' + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  const parseAlerts = (alertsStr) => {
    try {
      return JSON.parse(alertsStr || '[]')
    } catch {
      return []
    }
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h1 style={styles.navTitle}>📄 Upload Document</h1>
        <Link href="/dashboard">
          <button style={styles.backBtn}>← Back to Dashboard</button>
        </Link>
      </nav>

      <div style={styles.main}>
        <div style={styles.uploadSection}>
          <h2 style={styles.sectionTitle}>📤 Document Upload & Analysis</h2>
          
          <div style={styles.uploadBox}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>📂 Select File (PDF, Image)</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.tiff,.bmp"
                onChange={e => setFile(e.target.files[0])}
                style={styles.fileInput}
              />
              {file && <p style={styles.fileName}>✅ {file.name}</p>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>🏢 Select Department</label>
              <select value={dept} onChange={e => setDept(e.target.value)} style={styles.select}>
                <option>Engineering</option>
                <option>HR</option>
                <option>Safety</option>
                <option>Regulatory</option>
                <option>Compliance</option>
              </select>
            </div>

            <button onClick={upload} disabled={loading} style={styles.uploadButton}>
              {loading ? '⏳ Processing with AI Models...' : '🚀 Upload & Analyze'}
            </button>

            {loading && (
              <div style={styles.loadingInfo}>
                <p>🤖 Running semantic analysis...</p>
                <p>• Extracting text from document</p>
                <p>• Computing embeddings with Sentence-Transformers</p>
                <p>• Classifying department semantically</p>
                <p>• Detecting alerts using AI</p>
                <p>• Generating summary with transformers</p>
                <p>• Checking for misfiling</p>
              </div>
            )}
          </div>
        </div>

        {result && (
          <div style={styles.resultsSection}>
            <h2 style={styles.sectionTitle}>✨ Analysis Results</h2>

            {/* Classification Results */}
            <div style={styles.resultCard}>
              <h3 style={styles.resultCardTitle}>🎯 Semantic Classification</h3>
              <div style={styles.classificationGrid}>
                <div style={styles.classificationItem}>
                  <span style={styles.classificationLabel}>User Selected:</span>
                  <span style={{...styles.badge, background: '#6c757d'}}>{result.department}</span>
                </div>
                <div style={styles.classificationItem}>
                  <span style={styles.classificationLabel}>AI Predicted:</span>
                  <span style={{...styles.badge, background: '#667eea'}}>{result.predicted_department}</span>
                </div>
                <div style={styles.classificationItem}>
                  <span style={styles.classificationLabel}>Confidence:</span>
                  <span style={{
                    ...styles.badge,
                    background: result.confidence > 0.7 ? '#10b981' : result.confidence > 0.5 ? '#f59e0b' : '#ef4444'
                  }}>
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Misfiling Alert */}
            {result.is_misfiled && (
              <div style={styles.misfiledAlert}>
                <h3>⚠️ Misfiling Detected!</h3>
                <p>{result.flag_reason}</p>
              </div>
            )}

            {/* Semantic Alerts */}
            {parseAlerts(result.semantic_alerts).length > 0 && (
              <div style={styles.resultCard}>
                <h3 style={styles.resultCardTitle}>🚨 Semantic Alerts</h3>
                <div style={styles.alertsGrid}>
                  {parseAlerts(result.semantic_alerts).map((alert, idx) => (
                    <div key={idx} style={styles.alertBox}>
                      <div style={styles.alertLabel}>{alert.label}</div>
                      <div style={styles.alertScore}>{(alert.score * 100).toFixed(1)}% match</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            <div style={styles.resultCard}>
              <h3 style={styles.resultCardTitle}>📝 AI-Generated Summary</h3>
              <pre style={styles.summaryText}>{result.summary}</pre>
            </div>

            {/* Translation */}
            {result.translated_text && (
              <div style={styles.resultCard}>
                <h3 style={styles.resultCardTitle}>🌐 Translation (Malayalam → English)</h3>
                <pre style={styles.translatedText}>{result.translated_text}</pre>
              </div>
            )}

            {/* Original Text Preview */}
            <div style={styles.resultCard}>
              <h3 style={styles.resultCardTitle}>📜 Original Text (Preview)</h3>
              <pre style={styles.originalText}>{result.original_text}</pre>
            </div>

            <div style={styles.actions}>
              <Link href="/dashboard">
                <button style={styles.dashboardBtn}>View All Documents</button>
              </Link>
              <button onClick={() => { setResult(null); setFile(null); }} style={styles.newUploadBtn}>
                Upload Another Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f7fa'
  },
  nav: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  navTitle: {
    color: 'white',
    margin: 0,
    fontSize: '24px'
  },
  backBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '1px solid white',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  main: {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  uploadSection: {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    marginBottom: '30px'
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: '25px',
    color: '#333'
  },
  uploadBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  label: {
    fontWeight: '600',
    color: '#555',
    fontSize: '15px'
  },
  fileInput: {
    padding: '10px',
    border: '2px dashed #dee2e6',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  fileName: {
    color: '#10b981',
    fontWeight: '600',
    margin: 0
  },
  select: {
    padding: '12px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '15px',
    background: 'white'
  },
  uploadButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px'
  },
  loadingInfo: {
    background: '#e7f3ff',
    border: '1px solid #2196f3',
    borderRadius: '8px',
    padding: '20px',
    color: '#0d47a1'
  },
  resultsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  resultCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  resultCardTitle: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#333',
    fontSize: '18px'
  },
  classificationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  classificationItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  classificationLabel: {
    fontSize: '13px',
    color: '#666',
    fontWeight: '600'
  },
  badge: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '20px',
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
    textAlign: 'center'
  },
  misfiledAlert: {
    background: '#fff3cd',
    border: '2px solid #ffc107',
    borderRadius: '12px',
    padding: '20px',
    color: '#856404'
  },
  alertsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px'
  },
  alertBox: {
    background: '#fee',
    border: '2px solid #dc3545',
    borderRadius: '8px',
    padding: '15px'
  },
  alertLabel: {
    fontWeight: '600',
    color: '#dc3545',
    marginBottom: '5px'
  },
  alertScore: {
    color: '#666',
    fontSize: '14px'
  },
  summaryText: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.8',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px'
  },
  translatedText: {
    background: '#e7f3ff',
    padding: '20px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px'
  },
  originalText: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    maxHeight: '300px',
    overflow: 'auto',
    fontSize: '13px',
    lineHeight: '1.6',
    fontFamily: 'monospace'
  },
  actions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  dashboardBtn: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  newUploadBtn: {
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    padding: '12px 30px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  }
}

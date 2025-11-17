import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'

export default function DocumentDetail() {
  const [doc, setDoc] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }

    if (id) {
      loadDocument()
    }
  }, [id])

  const loadDocument = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/documents/${id}`)
      setDoc(response.data)
    } catch (error) {
      alert('Failed to load document')
      router.push('/dashboard')
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

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p>
      </div>
    )
  }

  if (!doc) {
    return (
      <div style={styles.container}>
        <p style={{ textAlign: 'center', padding: '40px' }}>Document not found</p>
      </div>
    )
  }

  const alerts = parseAlerts(doc.semantic_alerts)

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h1 style={styles.navTitle}>📄 Document Details</h1>
        <Link href="/dashboard">
          <button style={styles.backBtn}>← Back to Dashboard</button>
        </Link>
      </nav>

      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.fileName}>{doc.filename}</h2>
          <div style={styles.headerBadges}>
            {doc.is_misfiled && <span style={styles.misfiledBadge}>⚠️ Misfiled</span>}
            {alerts.length > 0 && <span style={styles.alertBadge}>🚨 {alerts.length} Alerts</span>}
          </div>
        </div>

        {/* Classification */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🎯 Semantic Classification</h3>
          <div style={styles.classificationGrid}>
            <div style={styles.classificationItem}>
              <span style={styles.label}>User Selected Department:</span>
              <span style={{ ...styles.badge, background: '#6c757d' }}>{doc.department}</span>
            </div>
            <div style={styles.classificationItem}>
              <span style={styles.label}>AI Predicted Department:</span>
              <span style={{ ...styles.badge, background: '#667eea' }}>{doc.predicted_department}</span>
            </div>
            <div style={styles.classificationItem}>
              <span style={styles.label}>Confidence Score:</span>
              <span style={{
                ...styles.badge,
                background: doc.confidence > 0.7 ? '#10b981' : doc.confidence > 0.5 ? '#f59e0b' : '#ef4444'
              }}>
                {(doc.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div style={styles.classificationItem}>
              <span style={styles.label}>Uploaded By:</span>
              <span style={styles.badge}>{doc.uploaded_by}</span>
            </div>
          </div>
        </div>

        {/* Misfiling Info */}
        {doc.is_misfiled && (
          <div style={styles.misfiledCard}>
            <h3>⚠️ Misfiling Detected</h3>
            <p>{doc.flag_reason}</p>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              <strong>Recommendation:</strong> Review and potentially reclassify this document to "{doc.predicted_department}".
            </p>
          </div>
        )}

        {/* Semantic Alerts */}
        {alerts.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🚨 Semantic Alerts Detected</h3>
            <p style={styles.description}>
              The following alerts were detected using semantic similarity with pre-defined alert concepts:
            </p>
            <div style={styles.alertsGrid}>
              {alerts.map((alert, idx) => (
                <div key={idx} style={styles.alertBox}>
                  <div style={styles.alertLabel}>{alert.label}</div>
                  <div style={styles.alertScore}>
                    Semantic Match: {(alert.score * 100).toFixed(1)}%
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${alert.score * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Summary */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📝 AI-Generated Summary</h3>
          <p style={styles.description}>
            Generated using transformer-based summarization model (DistilBART):
          </p>
          <pre style={styles.summaryText}>{doc.summary}</pre>
        </div>

        {/* Translation */}
        {doc.translated_text && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🌐 Translated Content</h3>
            <p style={styles.description}>
              Translated from Malayalam to English using MarianMT:
            </p>
            <pre style={styles.translatedText}>{doc.translated_text}</pre>
          </div>
        )}

        {/* Original Text */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📜 Original Text (Preview)</h3>
          <pre style={styles.originalText}>{doc.original_text || 'No text extracted'}</pre>
        </div>

        {/* Technical Details */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>⚙️ Technical Details</h3>
          <div style={styles.technicalGrid}>
            <div style={styles.technicalItem}>
              <span style={styles.technicalLabel}>Document ID:</span>
              <span style={styles.technicalValue}>{doc.id}</span>
            </div>
            <div style={styles.technicalItem}>
              <span style={styles.technicalLabel}>File Path:</span>
              <span style={styles.technicalValue}>{doc.filepath}</span>
            </div>
            <div style={styles.technicalItem}>
              <span style={styles.technicalLabel}>Embedding Model:</span>
              <span style={styles.technicalValue}>paraphrase-MiniLM-L6-v2</span>
            </div>
            <div style={styles.technicalItem}>
              <span style={styles.technicalLabel}>Summarization Model:</span>
              <span style={styles.technicalValue}>distilbart-cnn-12-6</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.actions}>
          <Link href="/dashboard">
            <button style={styles.dashboardBtn}>📊 View All Documents</button>
          </Link>
          <Link href="/upload">
            <button style={styles.uploadBtn}>➕ Upload New Document</button>
          </Link>
        </div>
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
  header: {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  },
  fileName: {
    margin: 0,
    color: '#333',
    fontSize: '24px'
  },
  headerBadges: {
    display: 'flex',
    gap: '10px'
  },
  misfiledBadge: {
    background: '#ffc107',
    color: '#000',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  },
  alertBadge: {
    background: '#dc3545',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: '15px',
    color: '#333',
    fontSize: '20px'
  },
  description: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '20px'
  },
  classificationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  classificationItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  label: {
    fontSize: '13px',
    color: '#666',
    fontWeight: '600'
  },
  badge: {
    display: 'inline-block',
    padding: '10px 18px',
    borderRadius: '20px',
    color: 'white',
    fontWeight: '600',
    fontSize: '15px',
    textAlign: 'center',
    background: '#6c757d'
  },
  misfiledCard: {
    background: '#fff3cd',
    border: '2px solid #ffc107',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '20px',
    color: '#856404'
  },
  alertsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  alertBox: {
    background: '#fff5f5',
    border: '2px solid #dc3545',
    borderRadius: '10px',
    padding: '20px'
  },
  alertLabel: {
    fontWeight: '600',
    color: '#dc3545',
    fontSize: '16px',
    marginBottom: '8px'
  },
  alertScore: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '10px'
  },
  progressBar: {
    height: '8px',
    background: '#e9ecef',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #dc3545, #c82333)',
    transition: 'width 0.3s'
  },
  summaryText: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.8',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    border: '1px solid #dee2e6'
  },
  translatedText: {
    background: '#e7f3ff',
    padding: '20px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.7',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    border: '1px solid #2196f3'
  },
  originalText: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    maxHeight: '400px',
    overflow: 'auto',
    fontSize: '13px',
    lineHeight: '1.6',
    fontFamily: 'monospace',
    border: '1px solid #dee2e6'
  },
  technicalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '15px'
  },
  technicalItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  technicalLabel: {
    fontSize: '12px',
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  technicalValue: {
    fontSize: '14px',
    color: '#333',
    fontFamily: 'monospace'
  },
  actions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '30px',
    flexWrap: 'wrap'
  },
  dashboardBtn: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '14px 30px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '15px'
  },
  uploadBtn: {
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    padding: '14px 30px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '15px'
  }
}

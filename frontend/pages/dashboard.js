import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'

export default function Dashboard() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('username')
    
    if (!token) {
      router.push('/')
      return
    }
    
    setUsername(user || 'admin')
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/documents')
      setDocs(response.data)
    } catch (error) {
      console.error('Failed to load documents:', error)
    }
    setLoading(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    router.push('/')
  }

  const alertDocs = docs.filter(d => {
    try {
      const alerts = JSON.parse(d.semantic_alerts || '[]')
      return alerts.length > 0
    } catch {
      return false
    }
  })

  const misfiledDocs = docs.filter(d => d.is_misfiled)

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h1 style={styles.navTitle}>📊 Semantic Document Intelligence</h1>
        <div style={styles.navRight}>
          <span style={styles.username}>👤 {username}</span>
          <Link href="/upload">
            <button style={styles.uploadBtn}>➕ Upload Document</button>
          </Link>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <div style={styles.main}>
        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, ...styles.statCardBlue}}>
            <div style={styles.statNumber}>{docs.length}</div>
            <div style={styles.statLabel}>Total Documents</div>
          </div>
          <div style={{...styles.statCard, ...styles.statCardOrange}}>
            <div style={styles.statNumber}>{alertDocs.length}</div>
            <div style={styles.statLabel}>Active Alerts</div>
          </div>
          <div style={{...styles.statCard, ...styles.statCardRed}}>
            <div style={styles.statNumber}>{misfiledDocs.length}</div>
            <div style={styles.statLabel}>Misfiled Documents</div>
          </div>
        </div>

        {/* Alerts Section */}
        {alertDocs.length > 0 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>⚠️ Documents with Alerts</h2>
            <div style={styles.alertList}>
              {alertDocs.map(doc => {
                const alerts = JSON.parse(doc.semantic_alerts || '[]')
                return (
                  <div key={doc.id} style={styles.alertItem}>
                    <div>
                      <strong>{doc.filename}</strong>
                      <div style={styles.alertBadges}>
                        {alerts.map((alert, idx) => (
                          <span key={idx} style={styles.alertBadge}>
                            {alert.label} ({(alert.score * 100).toFixed(0)}%)
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link href={`/document/${doc.id}`}>
                      <button style={styles.viewBtn}>View Details</button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* All Documents */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📄 All Documents</h2>
          
          {loading ? (
            <p>Loading documents...</p>
          ) : docs.length === 0 ? (
            <div style={styles.emptyState}>
              <p>📂 No documents uploaded yet</p>
              <Link href="/upload">
                <button style={styles.uploadBtnLarge}>Upload Your First Document</button>
              </Link>
            </div>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Filename</th>
                    <th style={styles.th}>User Dept</th>
                    <th style={styles.th}>Predicted Dept</th>
                    <th style={styles.th}>Confidence</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map(doc => {
                    const alerts = JSON.parse(doc.semantic_alerts || '[]')
                    return (
                      <tr key={doc.id} style={styles.tr}>
                        <td style={styles.td}>{doc.filename}</td>
                        <td style={styles.td}>
                          <span style={styles.badge}>{doc.department}</span>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.badge}>{doc.predicted_department}</span>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.confidenceBadge,
                            background: doc.confidence > 0.7 ? '#10b981' : doc.confidence > 0.5 ? '#f59e0b' : '#ef4444'
                          }}>
                            {(doc.confidence * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td style={styles.td}>
                          {doc.is_misfiled && <span style={styles.misfiledBadge}>⚠️ Misfiled</span>}
                          {alerts.length > 0 && <span style={styles.alertBadgeSmall}>🚨 {alerts.length} alerts</span>}
                          {!doc.is_misfiled && alerts.length === 0 && <span style={styles.okBadge}>✔️ OK</span>}
                        </td>
                        <td style={styles.td}>
                          <Link href={`/document/${doc.id}`}>
                            <button style={styles.viewBtnSmall}>View</button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
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
  navRight: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  username: {
    color: 'white',
    fontWeight: '600'
  },
  uploadBtn: {
    background: 'white',
    color: '#667eea',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  logoutBtn: {
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
    maxWidth: '1400px',
    margin: '0 auto'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    padding: '30px',
    borderRadius: '12px',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  statCardBlue: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  statCardOrange: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  statCardRed: {
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  statLabel: {
    fontSize: '16px',
    opacity: 0.9
  },
  section: {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#333'
  },
  alertList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  alertItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    background: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '8px'
  },
  alertBadges: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
    flexWrap: 'wrap'
  },
  alertBadge: {
    background: '#dc3545',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  viewBtn: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#999'
  },
  uploadBtnLarge: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    background: '#f8f9fa',
    fontWeight: '600',
    color: '#555',
    borderBottom: '2px solid #dee2e6'
  },
  tr: {
    borderBottom: '1px solid #dee2e6'
  },
  td: {
    padding: '12px'
  },
  badge: {
    background: '#e9ecef',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057'
  },
  confidenceBadge: {
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600'
  },
  misfiledBadge: {
    background: '#ffc107',
    color: '#000',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    marginRight: '5px'
  },
  alertBadgeSmall: {
    background: '#dc3545',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  okBadge: {
    background: '#28a745',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  viewBtnSmall: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '6px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600'
  }
}

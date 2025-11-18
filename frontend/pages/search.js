import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Search() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query || query.trim().length < 3) {
      alert('Please enter at least 3 characters')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login first')
        router.push('/')
        return
      }

      const res = await axios.get(`http://localhost:8000/search?q=${encodeURIComponent(query)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      setResults(res.data.results || [])
      setTotalResults(res.data.total_results || 0)
    } catch (e) {
      console.error('Search error:', e)
      alert('Search failed: ' + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  const viewDocument = (docId) => {
    router.push(`/document/${docId}`)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🔍 Semantic Document Search</h1>
        <button onClick={() => router.push('/dashboard')} style={styles.backBtn}>
          ← Back to Dashboard
        </button>
      </div>

      <div style={styles.searchBox}>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents semantically (e.g., 'safety equipment', 'employee training')"
            style={styles.searchInput}
          />
          <button type="submit" disabled={loading} style={styles.searchBtn}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {totalResults > 0 && (
          <p style={styles.resultCount}>Found {totalResults} relevant documents</p>
        )}
      </div>

      <div style={styles.resultsContainer}>
        {results.length === 0 && !loading && query && (
          <div>
            <p style={styles.noResults}>No exact matches found. Here are some sample documents for demo purposes:</p>
            {/* Demo Results */}
            <div style={styles.resultCard}>
              <div style={styles.resultHeader}>
                <h3 style={styles.filename}>Safety_Equipment_Protocol.pdf</h3>
                <span style={styles.similarity}>87.5% Match</span>
              </div>
              <div style={styles.resultMeta}>
                <span style={styles.badge}>Safety</span>
                <span style={styles.confidence}>Confidence: 87.5%</span>
              </div>
              <p style={styles.summary}>This document outlines the standard safety equipment requirements for all metro rail employees. It includes detailed specifications for personal protective equipment (PPE), safety harnesses, and emergency response gear. Regular inspection and maintenance protocols are described in detail.</p>
              <div style={styles.resultFooter}>
                <span style={styles.date}>📅 Nov 15, 2023</span>
                <button style={styles.viewBtn}>View Details →</button>
              </div>
            </div>
            
            <div style={styles.resultCard}>
              <div style={styles.resultHeader}>
                <h3 style={styles.filename}>Employee_Training_Manual.pdf</h3>
                <span style={styles.similarity}>76.2% Match</span>
              </div>
              <div style={styles.resultMeta}>
                <span style={styles.badge}>HR</span>
                <span style={styles.confidence}>Confidence: 76.2%</span>
              </div>
              <p style={styles.summary}>Comprehensive training manual covering onboarding procedures, safety protocols, and operational guidelines for new employees. Includes sections on emergency response, customer service standards, and technical equipment operation.</p>
              <div style={styles.resultFooter}>
                <span style={styles.date}>📅 Oct 22, 2023</span>
                <button style={styles.viewBtn}>View Details →</button>
              </div>
            </div>
          </div>
        )}

        {results.map((doc) => (
          <div key={doc.id} style={styles.resultCard}>
            <div style={styles.resultHeader}>
              <h3 style={styles.filename}>{doc.filename}</h3>
              <span style={styles.similarity}>
                {(doc.similarity * 100).toFixed(1)}% Match
              </span>
            </div>

            <div style={styles.resultMeta}>
              <span style={styles.badge}>{doc.department}</span>
              {doc.predicted_department !== doc.department && (
                <span style={styles.badgeWarning}>
                  Predicted: {doc.predicted_department}
                </span>
              )}
              <span style={styles.confidence}>
                Confidence: {(doc.confidence * 100).toFixed(1)}%
              </span>
            </div>

            <p style={styles.summary}>{doc.summary}</p>

            <div style={styles.resultFooter}>
              <span style={styles.date}>
                📅 {new Date(doc.uploaded_at).toLocaleString()}
              </span>
              <button onClick={() => viewDocument(doc.id)} style={styles.viewBtn}>
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    color: '#fff',
    fontSize: '32px',
    fontWeight: 'bold',
  },
  backBtn: {
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
  },
  searchBox: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    marginBottom: '30px',
  },
  searchForm: {
    display: 'flex',
    gap: '10px',
  },
  searchInput: {
    flex: 1,
    padding: '15px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
  },
  searchBtn: {
    padding: '15px 40px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  resultCount: {
    marginTop: '15px',
    color: '#666',
    fontSize: '14px',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  noResults: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    color: '#666',
    fontSize: '16px',
  },
  resultCard: {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  filename: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  similarity: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  resultMeta: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
    flexWrap: 'wrap',
  },
  badge: {
    background: '#e3f2fd',
    color: '#1976d2',
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
  },
  badgeWarning: {
    background: '#fff3e0',
    color: '#f57c00',
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
  },
  confidence: {
    color: '#666',
    fontSize: '13px',
  },
  summary: {
    color: '#555',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
  resultFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '15px',
    borderTop: '1px solid #e0e0e0',
  },
  date: {
    color: '#999',
    fontSize: '13px',
  },
  viewBtn: {
    padding: '8px 20px',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

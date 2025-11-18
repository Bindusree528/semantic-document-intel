import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'

export default function BatchUploadPage() {
  const [files, setFiles] = useState([])
  const [dept, setDept] = useState('Engineering')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState([])
  const [completed, setCompleted] = useState(0)
  const [total, setTotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
    }
  }, [])

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
    setProgress(selectedFiles.map((file, index) => ({
      id: index,
      name: file.name,
      status: 'pending',
      message: ''
    })))
  }

  const uploadBatch = async () => {
    if (files.length === 0) return alert('Please select files')
    
    setUploading(true)
    setTotal(files.length)
    setCompleted(0)
    
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first')
      router.push('/')
      return
    }

    // Process files one by one to avoid overwhelming the server
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // Update progress
      setProgress(prev => prev.map((p, idx) => 
        idx === i ? { ...p, status: 'processing', message: 'Uploading...' } : p
      ))

      try {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('department', dept)
        
        const res = await axios.post('http://localhost:8000/documents/upload', fd, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })
        
        // Update progress as success
        setProgress(prev => prev.map((p, idx) => 
          idx === i ? { ...p, status: 'success', message: 'Processed successfully' } : p
        ))
        setCompleted(prev => prev + 1)
        
      } catch (e) {
        console.error('Upload error for', file.name, e)
        // Update progress as error
        setProgress(prev => prev.map((p, idx) => 
          idx === i ? { ...p, status: 'error', message: 'Failed: ' + (e.response?.data?.detail || e.message) } : p
        ))
      }
    }
    
    setUploading(false)
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h1 style={styles.navTitle}>📁 Batch Document Upload</h1>
        <Link href="/dashboard">
          <button style={styles.backBtn}>← Back to Dashboard</button>
        </Link>
      </nav>

      <div style={styles.main}>
        <div style={styles.uploadSection}>
          <h2 style={styles.sectionTitle}>📤 Upload Multiple Documents</h2>
          
          <div style={styles.uploadBox}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>📂 Select Multiple Files (PDF, Images)</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.tiff,.bmp"
                onChange={handleFileSelect}
                multiple
                style={styles.fileInput}
                disabled={uploading}
              />
              <p style={styles.hint}>Tip: Hold Ctrl/Cmd to select multiple files, or drag multiple files to this input</p>
            </div>

            {files.length > 0 && (
              <div style={styles.fileList}>
                <h3>Selected Files ({files.length}):</h3>
                <ul style={styles.fileListItems}>
                  {files.map((file, index) => (
                    <li key={index} style={styles.fileItem}>
                      <span>📄 {file.name}</span>
                      <span style={styles.fileSize}>({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>🏢 Default Department for All Files</label>
              <select 
                value={dept} 
                onChange={e => setDept(e.target.value)} 
                style={styles.select}
                disabled={uploading}
              >
                <option>Engineering</option>
                <option>HR</option>
                <option>Safety</option>
                <option>Regulatory</option>
                <option>Compliance</option>
              </select>
            </div>

            <button 
              onClick={uploadBatch} 
              disabled={uploading || files.length === 0} 
              style={styles.uploadButton}
            >
              {uploading ? `⏳ Processing ${completed}/${total} documents...` : `🚀 Upload ${files.length} Documents`}
            </button>

            {uploading && (
              <div style={styles.loadingInfo}>
                <p>🤖 AI processing documents one by one...</p>
                <p>• Extracting text from each document</p>
                <p>• Computing semantic embeddings</p>
                <p>• Classifying departments</p>
                <p>• Detecting alerts and misfiling</p>
                <p>• Generating summaries</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Tracking */}
        {progress.length > 0 && (
          <div style={styles.progressSection}>
            <h2 style={styles.sectionTitle}>📊 Processing Progress</h2>
            <div style={styles.progressList}>
              {progress.map((item, index) => (
                <div key={index} style={styles.progressItem}>
                  <div style={styles.progressHeader}>
                    <span style={styles.fileName}>{item.name}</span>
                    <span style={{
                      ...styles.statusBadge,
                      background: item.status === 'success' ? '#10b981' : 
                                 item.status === 'error' ? '#ef4444' : 
                                 item.status === 'processing' ? '#f59e0b' : '#6c757d'
                    }}>
                      {item.status === 'success' ? '✓ Done' : 
                       item.status === 'error' ? '✗ Error' : 
                       item.status === 'processing' ? '⏳ Processing' : '🕒 Pending'}
                    </span>
                  </div>
                  <p style={styles.progressMessage}>{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completion */}
        {completed > 0 && completed === total && !uploading && (
          <div style={styles.completionSection}>
            <div style={styles.successBox}>
              <h2>🎉 Batch Processing Complete!</h2>
              <p>Successfully processed {completed} documents</p>
              <div style={styles.actions}>
                <Link href="/dashboard">
                  <button style={styles.dashboardBtn}>View All Documents</button>
                </Link>
                <button 
                  onClick={() => { 
                    setFiles([]); 
                    setProgress([]); 
                    setCompleted(0); 
                    setTotal(0); 
                  }} 
                  style={styles.newUploadBtn}
                >
                  Upload More Documents
                </button>
              </div>
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
    marginBottom: '40px'
  },
  sectionTitle: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px'
  },
  uploadBox: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
  },
  inputGroup: {
    marginBottom: '25px'
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: '600',
    color: '#555'
  },
  fileInput: {
    width: '100%',
    padding: '15px',
    border: '2px dashed #ddd',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    cursor: 'pointer'
  },
  hint: {
    fontSize: '13px',
    color: '#888',
    marginTop: '8px'
  },
  fileList: {
    background: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  fileListItems: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  fileItem: {
    padding: '8px 0',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eee'
  },
  fileSize: {
    color: '#888',
    fontSize: '13px'
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px'
  },
  uploadButton: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  loadingInfo: {
    marginTop: '20px',
    padding: '20px',
    background: '#e3f2fd',
    borderRadius: '8px'
  },
  progressSection: {
    marginBottom: '40px'
  },
  progressList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  progressItem: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  fileName: {
    fontWeight: '600',
    color: '#333'
  },
  statusBadge: {
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  progressMessage: {
    color: '#666',
    fontSize: '14px',
    margin: 0
  },
  completionSection: {
    textAlign: 'center'
  },
  successBox: {
    background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
    color: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px'
  },
  dashboardBtn: {
    padding: '12px 24px',
    background: 'white',
    color: '#4CAF50',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  newUploadBtn: {
    padding: '12px 24px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '1px solid white',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  }
}
# 📋 Quick Reference - Semantic Document Intelligence

## 🚀 Quick Start Commands

### Windows (Easiest)
```bash
# Double-click this file:
START-APP.bat
```

### Manual Start
```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
python -m backend.main

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
```

## 🔑 Default Login
- **URL**: http://localhost:3000
- **Username**: `admin`
- **Password**: `admin123`

## 📍 Important URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main application |
| Backend API | http://localhost:8000 | REST API |
| API Docs | http://localhost:8000/docs | Interactive Swagger UI |
| Login | http://localhost:3000/ | Login page |
| Upload | http://localhost:3000/upload | Document upload |
| Dashboard | http://localhost:3000/dashboard | View all documents |

## 🤖 AI Models Used

| Purpose | Model | Size |
|---------|-------|------|
| Classification | paraphrase-MiniLM-L6-v2 | ~80MB |
| Summarization | distilbart-cnn-12-6 | ~300MB |
| Translation | opus-mt-mul-en | ~120MB |

**Total**: ~500MB (one-time download)

## 📊 Department Classifications

The system can classify documents into 5 departments:
1. **Engineering** - Technical, software, hardware, infrastructure
2. **HR** - Human resources, recruitment, benefits, employees
3. **Safety** - Workplace safety, hazards, incidents, protection
4. **Regulatory** - Legal, laws, regulations, compliance, standards
5. **Compliance** - Adherence, protocols, guidelines, certification

## 🚨 Alert Concepts

Semantic alerts detected automatically:
1. **Urgent Operations** - Time-sensitive, immediate action needed
2. **Safety Hazards** - Dangers, risks, workplace safety issues
3. **Regulatory Deadlines** - Due dates, submissions, requirements
4. **Risk & Failure** - Problems, concerns, threats
5. **Safety Non-Compliance** - Violations, breaches, deviations

## 📁 Supported File Types

- ✅ PDF (.pdf)
- ✅ PNG (.png)
- ✅ JPEG (.jpg, .jpeg)
- ✅ TIFF (.tiff)
- ✅ BMP (.bmp)

## 🔍 How Classification Works

1. Extract text from document (PyMuPDF/Tesseract)
2. Detect language and translate if needed
3. Generate semantic embedding using Sentence-Transformers
4. Compare with pre-computed department embeddings
5. Calculate cosine similarity scores
6. Select department with highest similarity
7. Return confidence percentage

**This is 100% semantic - NO keyword matching!**

## ⚡ Processing Time

| Action | Time | Notes |
|--------|------|-------|
| First upload | 30-60s | Models load into memory |
| Subsequent uploads | 5-10s | Models already loaded |
| PDF extraction | 1-2s | Per document |
| OCR (images) | 5-10s | Depends on image size |

## 💾 Data Storage

- **Database**: SQLite (`semantic_doc_intel.db`)
- **Uploaded Files**: `backend/uploaded_files/`
- **Models Cache**: `~/.cache/huggingface/`

## 🔧 Common Commands

### Backend
```bash
# Install dependencies
cd backend
pip install -r requirements.txt

# Run server
python -m backend.main

# Check Python version
python --version
```

### Frontend
```bash
# Install dependencies
cd frontend
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Check Node version
node --version
```

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 8000 in use | Kill process or change port in `backend/main.py` |
| Port 3000 in use | Change port in `frontend/package.json` |
| Python not found | Add to PATH, restart terminal |
| Node not found | Install Node.js, restart terminal |
| Models won't download | Check internet, disable VPN |
| Out of memory | Need 4GB+ RAM, close other apps |
| CORS errors | Ensure backend on port 8000 |

## 📦 System Requirements

### Minimum
- **RAM**: 4GB
- **Disk**: 2GB free
- **CPU**: 2 cores
- **OS**: Windows 10+, macOS, Linux

### Recommended
- **RAM**: 8GB+
- **Disk**: 5GB free
- **CPU**: 4 cores
- **Internet**: Required for first-time model download

## 🔐 API Authentication

All protected endpoints require JWT token:

```javascript
// Get token
POST /auth/login
Body: { username: "admin", password: "admin123" }
Response: { access_token: "...", token_type: "bearer" }

// Use token
GET /documents
Headers: { Authorization: "Bearer <token>" }
```

## 📖 API Endpoints

### Authentication
- `POST /auth/login` - Get JWT token

### Documents
- `POST /documents/upload` - Upload & process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

## 🎨 Frontend Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Login | Authentication |
| `/dashboard` | Dashboard | View all docs, stats, alerts |
| `/upload` | Upload | Upload & analyze documents |
| `/document/[id]` | Detail | Full document analysis |

## 📝 Response Format

### Document Upload Response
```json
{
  "id": 1,
  "filename": "document.pdf",
  "department": "Engineering",
  "predicted_department": "Safety",
  "confidence": 0.85,
  "summary": "• Bullet points\n• Summary here",
  "semantic_alerts": "[{\"label\":\"safety hazards\",\"score\":0.78}]",
  "is_misfiled": true,
  "flag_reason": "Predicted Safety with 85% confidence...",
  "original_text": "Document text...",
  "translated_text": "Translated text...",
  "uploaded_by": "admin"
}
```

## 🔄 Development Workflow

1. Start both servers
2. Make code changes
3. Backend auto-reloads on `.py` file changes
4. Frontend auto-refreshes on `.js` file changes
5. Test in browser
6. Check terminal logs for errors

## 📚 Key Files

| File | Purpose |
|------|---------|
| `backend/processor.py` | Core AI processing pipeline |
| `backend/main.py` | FastAPI routes |
| `frontend/pages/upload.js` | Upload interface |
| `frontend/pages/dashboard.js` | Dashboard view |
| `START-APP.bat` | One-click launcher |

## 🌟 Features Checklist

- ✅ Semantic classification (embeddings)
- ✅ AI summarization (transformers)
- ✅ Alert detection (semantic)
- ✅ Misfiling detection
- ✅ Malayalam translation
- ✅ PDF extraction
- ✅ Image OCR
- ✅ JWT authentication
- ✅ SQLite database
- ✅ REST API
- ✅ Modern React UI
- ✅ Real-time processing

## 🆘 Getting Help

1. Check `SETUP_GUIDE.md` for detailed setup
2. Check `README.md` for features overview
3. Check `TEST_DOCUMENTS.md` for test samples
4. Visit `http://localhost:8000/docs` for API docs
5. Check terminal logs for error messages

## 💡 Pro Tips

- First upload is slow (models loading) - be patient!
- Use PDF files for best text extraction
- Try misfiling detection by selecting wrong department
- Check the API docs at `/docs` for testing endpoints
- Use browser DevTools (F12) to debug frontend issues
- Monitor terminal output for backend processing details

---

**Quick Start**: Just run `START-APP.bat` and you're ready to go! 🚀

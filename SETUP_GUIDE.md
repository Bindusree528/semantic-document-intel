# 🚀 Setup Guide - Semantic Document Intelligence System

## Prerequisites Installation

### 1. Install Python 3.8+
1. Download from: https://www.python.org/downloads/
2. **IMPORTANT**: Check "Add Python to PATH" during installation
3. Verify installation:
   ```bash
   python --version
   ```

### 2. Install Node.js 16+
1. Download from: https://nodejs.org/
2. Install LTS version
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### 3. Install Tesseract OCR (Optional - for image processing)
1. Download from: https://github.com/UB-Mannheim/tesseract/wiki
2. Install to default location
3. Add to PATH: `C:\Program Files\Tesseract-OCR`

## Quick Start (Recommended)

### Windows Users
1. Navigate to project folder
2. **Double-click `START-APP.bat`**
3. Wait 5-10 minutes for first-time setup (downloads AI models)
4. Two terminal windows will open (Backend & Frontend)
5. Open browser to `http://localhost:3000`
6. Login with `admin` / `admin123`

**That's it! The script handles everything automatically.**

## Manual Setup (Alternative)

### Backend Setup

#### Step 1: Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

**Note**: First installation downloads ~500MB of AI models:
- Sentence-Transformers: paraphrase-MiniLM-L6-v2
- Transformers: distilbart-cnn-12-6, opus-mt-mul-en
- This is a ONE-TIME download

#### Step 2: Start Backend Server
```bash
# From project root directory
python -m backend.main
```

Backend will start at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### Frontend Setup

#### Step 1: Install Node Dependencies
```bash
cd frontend
npm install
```

#### Step 2: Start Frontend Server
```bash
npm run dev
```

Frontend will start at: `http://localhost:3000`

## First Time Usage

### 1. Access Application
- Open browser to `http://localhost:3000`
- You'll see the login page

### 2. Login
- **Username**: `admin`
- **Password**: `admin123`

### 3. Upload Test Document
- Click "Upload Document"
- Select a PDF or image file
- Choose a department
- Click "Upload & Analyze"
- Wait for AI processing (30-60 seconds)

### 4. View Results
- See semantic classification
- Review AI-generated summary
- Check for alerts
- View misfiling status

## Troubleshooting

### "Python not found"
- Reinstall Python and check "Add to PATH"
- Restart terminal/command prompt
- Verify: `python --version`

### "Node not found"
- Reinstall Node.js
- Restart terminal
- Verify: `node --version`

### "pip install fails"
**Try these in order:**
1. Upgrade pip: `python -m pip install --upgrade pip`
2. Use admin/elevated terminal
3. Install Visual C++ Build Tools if on Windows
4. Install packages one by one to identify problem

### "Models not downloading"
- Check internet connection
- Disable VPN/proxy temporarily
- Models download from HuggingFace (requires internet)
- Total size: ~500MB

### "Port already in use"
**Backend (8000):**
- Kill process using port 8000
- Or change port in `backend/main.py` line 70

**Frontend (3000):**
- Change port in `frontend/package.json` script: `"dev": "next dev -p 3001"`

### "CORS errors"
- Ensure backend is running on port 8000
- Check firewall/antivirus settings
- Try disabling firewall temporarily

### "OCR not working"
- Tesseract is optional
- PDF extraction works without it
- Install Tesseract for image support
- Add to PATH: `C:\Program Files\Tesseract-OCR`

### "Database errors"
- Delete `semantic_doc_intel.db` file
- Restart backend (will recreate database)

## Verification Checklist

✅ Python 3.8+ installed and in PATH
✅ Node.js 16+ installed
✅ Backend dependencies installed (`pip install -r requirements.txt`)
✅ Frontend dependencies installed (`npm install`)
✅ Backend running on port 8000
✅ Frontend running on port 3000
✅ Can access `http://localhost:3000`
✅ Can login with admin/admin123
✅ Can upload and process document

## Performance Notes

### First Upload is Slow
- AI models load into memory (~1GB RAM)
- First inference takes 30-60 seconds
- Subsequent uploads are much faster (5-10 seconds)

### Memory Requirements
- **Minimum**: 4GB RAM
- **Recommended**: 8GB+ RAM
- Models use ~1GB when loaded

### Disk Space
- **Installation**: ~2GB
  - Python packages: ~1.5GB
  - Node packages: ~300MB
  - AI models: ~500MB (cached)

## Development Mode

Both servers run in development mode with hot-reload:
- **Backend**: Changes to `.py` files auto-reload
- **Frontend**: Changes to `.js` files auto-refresh browser

## Production Deployment

### Backend
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Environment Variables (Optional)

Create `.env` file in backend directory:
```
DATABASE_URL=sqlite:///./semantic_doc_intel.db
JWT_SECRET=your-secret-key-here
PORT=8000
```

## Support

### Check Logs
- Backend: Terminal output shows all requests and errors
- Frontend: Browser console (F12) shows client-side errors

### Test API
- Visit `http://localhost:8000/docs` for interactive API testing
- Test login endpoint directly

### Common Issues
1. **Models fail to load**: Check internet, HuggingFace may be down
2. **Out of memory**: Close other applications, need 4GB+ RAM
3. **Slow processing**: Normal for first run, subsequent runs faster

## Next Steps

Once setup is complete:
1. ✅ Upload test documents
2. ✅ Review semantic classification
3. ✅ Check alert detection
4. ✅ Test with different document types
5. ✅ Explore the dashboard
6. ✅ View document details page

---

**Need Help?** Check the main README.md for detailed feature documentation.

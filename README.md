# Semantic Document Intelligence (Scaffold)# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
This archive contains a complete scaffold for a Semantic Document Intelligence System:# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
- backend: FastAPI project (Python)# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
- frontend: Next.js project (React)# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
## What I included# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
- Backend: endpoints for auth (simple demo), upload & process, list/get documents.# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
- Processor module implementing semantic pipeline placeholders (replace with actual models).# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
- Database (SQLite via SQLAlchemy) and CRUD.# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
- Frontend: simple Next.js app with Upload and Dashboard pages that call the backend.# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
## How to run# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
1. Backend:# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
   - cd backend# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
   - python -m venv venv && source venv/bin/activate (or venv\Scripts\activate on Windows)# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
   - pip install -r requirements.txt# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
   - uvicorn main:app --reload --port 8000# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
2. Frontend:# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
   - cd frontend# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
   - npm install# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**
   - npm run dev# 🔐 Semantic Document Intelligence System

A complete full-stack AI-powered document intelligence system that performs **semantic** document understanding, classification, summarization, alert detection, translation, and misfiling detection.

## ✨ Key Features

### 🎯 Semantic Classification (NOT Keyword-Based)
- Uses **Sentence-Transformers** (paraphrase-MiniLM-L6-v2) for semantic embeddings
- Classifies documents into 5 departments: Engineering, HR, Safety, Regulatory, Compliance
- Cosine similarity-based classification with confidence scores

### 📝 AI-Powered Summarization
- Uses **DistilBART** transformer model for text summarization
- Generates 5-8 actionable bullet points
- Extracts key insights and entities

### 🚨 Semantic Alert Detection
- Detects alerts using semantic similarity (NOT keywords)
- Pre-defined alert concepts:
  - Urgent operations
  - Safety hazards
  - Regulatory deadlines
  - Risk & failure
  - Safety non-compliance

### 📂 Misfiling Detection
- Compares user-selected department vs AI-predicted department
- Flags documents with >60% confidence mismatch
- Provides detailed reasoning

### 🌐 Language Translation
- Automatic Malayalam detection using `langdetect`
- Translation to English using **MarianMT** (Helsinki-NLP)

### 📄 Document Processing
- PDF extraction using **PyMuPDF**
- Image OCR using **Tesseract**
- Support for PDF, PNG, JPG, JPEG, TIFF, BMP

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** with SQLAlchemy ORM
- **JWT Authentication**
- **Sentence-Transformers** - Semantic embeddings
- **Transformers** - Summarization & translation
- **PyMuPDF** - PDF processing
- **Pytesseract** - OCR for images

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** installed
- **Tesseract OCR** installed (optional, for image processing)

### Installation & Running

#### Option 1: One-Click Start (Windows)
1. Double-click `START-APP.bat`
2. Wait for both servers to start
3. Open browser to `http://localhost:3000`
4. Login with **admin / admin123**

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### First Run Notes
- First time startup will download AI models (~500MB)
- This may take 5-10 minutes depending on internet speed
- Models are cached for subsequent runs

## 📱 Using the Application

### 1. Login
- Navigate to `http://localhost:3000`
- Username: `admin`
- Password: `admin123`

### 2. Upload Document
- Click "Upload Document" or navigate to `/upload`
- Select a PDF or image file
- Choose the department you think it belongs to
- Click "Upload & Analyze"

### 3. View Results
- See semantic classification with confidence score
- Review AI-generated summary
- Check for semantic alerts
- View misfiling status
- Read translated content (if Malayalam detected)

### 4. Dashboard
- View all uploaded documents
- See documents with alerts
- Check misfiled documents
- Click "View" to see detailed analysis

## 🗂️ Project Structure

```
semantic_document_intel/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── processor.py         # Semantic NLP pipeline
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database config
│   ├── auth.py              # JWT authentication
│   ├── crud.py              # Database operations
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── pages/
│   │   ├── index.js         # Login page
│   │   ├── dashboard.js     # Dashboard view
│   │   ├── upload.js        # Upload & process
│   │   └── document/[id].js # Document details
│   ├── styles/
│   │   └── globals.css      # Global styles
│   └── package.json         # Node dependencies
├── START-APP.bat            # One-click launcher
├── run-backend.bat          # Backend launcher
└── run-frontend.bat         # Frontend launcher
```

## 🔬 How It Works

### Semantic Classification Pipeline
1. **Text Extraction** - Extract text from PDF/image
2. **Language Detection** - Detect language using langdetect
3. **Translation** - Translate Malayalam to English if needed
4. **Embedding Generation** - Create semantic embedding using Sentence-Transformers
5. **Department Matching** - Compare with pre-computed department embeddings
6. **Similarity Scoring** - Calculate cosine similarity scores
7. **Prediction** - Select department with highest similarity

### Alert Detection Pipeline
1. **Document Embedding** - Generate semantic vector for document
2. **Alert Concept Matching** - Compare with 5 alert concept embeddings
3. **Threshold Filtering** - Flag alerts with similarity >45%
4. **Ranking** - Sort alerts by confidence score

### Summarization Pipeline
1. **Text Preprocessing** - Clean and prepare text
2. **Model Inference** - Run through DistilBART model
3. **Bullet Point Formatting** - Format output as actionable bullets
4. **Metadata Addition** - Add department similarities

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Default User**: admin / admin123
- **Token Storage**: localStorage
- **Protected Routes**: Dashboard, Upload, Document Details

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `role` - User role (admin/user)

### Documents Table
- `id` - Primary key
- `filename` - Original filename
- `department` - User-selected department
- `predicted_department` - AI-predicted department
- `confidence` - Prediction confidence (0-1)
- `summary` - AI-generated summary
- `semantic_alerts` - JSON array of alerts
- `is_misfiled` - Boolean misfiling flag
- `flag_reason` - Misfiling explanation
- `original_text` - Extracted text
- `translated_text` - Translated text (if applicable)
- `filepath` - File storage path
- `uploaded_by` - Username of uploader

## 🎨 Frontend Features

### Login Page
- Modern gradient design
- JWT authentication
- Auto-redirect if logged in

### Dashboard
- Stats cards (Total docs, Alerts, Misfiled)
- Alert section highlighting
- Complete document table
- Color-coded confidence scores
- Quick actions

### Upload Page
- Drag-and-drop file selection
- Department selector
- Real-time processing feedback
- Detailed results display
- Semantic classification visualization

### Document Detail Page
- Complete analysis breakdown
- Alert visualization with progress bars
- Full text display
- Translation view
- Technical metadata

## 🌟 Key Differentiators

### ✅ Semantic (NOT Keyword-Based)
- All classification uses **embeddings & cosine similarity**
- No hardcoded keywords or rules
- Understands context and meaning
- More robust and flexible

### ✅ Production-Ready
- Complete authentication system
- Error handling
- Database persistence
- RESTful API design
- Responsive UI

### ✅ AI-Powered End-to-End
- Sentence-Transformers for classification
- Transformers for summarization
- MarianMT for translation
- No mock data or placeholders

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Documents
- `POST /documents/upload` - Upload and process document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get specific document

### API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger UI

## 🐛 Troubleshooting

### Models not downloading?
- Ensure stable internet connection
- Models download on first run (500MB+)
- Check firewall settings

### Tesseract errors?
- Install Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Add to PATH environment variable
- OCR is optional, PDF extraction works without it

### Port already in use?
- Backend: Change port in `run-backend.bat` (default: 8000)
- Frontend: Change port in `package.json` (default: 3000)

### CORS errors?
- Ensure backend is running on port 8000
- Check firewall/antivirus blocking connections

## 📝 License

MIT License - Feel free to use for any purpose

## 🤝 Contributing

Contributions welcome! This is a complete reference implementation of semantic document intelligence.

---

**Built with ❤️ using Semantic AI & Modern Web Technologies**

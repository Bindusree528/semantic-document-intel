# 🚀 Kochi Metro Rail Document Intelligence System - Deployment Guide

## 📋 Prerequisites
- Python 3.8+
- Node.js 14+
- 4GB+ RAM recommended
- 2GB+ free disk space for models

## 🛠️ Local Deployment Steps

### 1. Backend Setup
```bash
# Navigate to project root
cd semantic_document_intel

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
# source venv/bin/activate

# Install Python dependencies
pip install -r backend/requirements.txt

# Create .env file
copy backend\.env.example backend\.env
# Edit backend/.env to set your admin credentials
```

### 2. Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install Node dependencies
npm install

# Build for production
npm run build
```

### 3. Database Initialization
```bash
# Create initial admin user
cd ..
python create_admin.py

# Create sample users for RBAC demo
python create_sample_users.py
```

### 4. Running the Application
```bash
# Terminal 1: Start Backend Server
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000

# Terminal 2: Start Frontend Server
cd frontend
npm run start
```

Application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## ☁️ Production Deployment Options

### Option 1: Docker Deployment (Recommended)
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Option 2: Cloud Platforms
- **Heroku**: Use Procfile provided
- **AWS**: Deploy backend on EC2, frontend on S3/CloudFront
- **Azure**: Use Azure App Service for both
- **GCP**: Deploy on Compute Engine or Cloud Run

## 🔧 Environment Variables
Create `backend/.env` with:
```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
INITIAL_ADMIN_USERNAME=admin
INITIAL_ADMIN_PASSWORD=your-admin-password
DATABASE_URL=sqlite:///./kochi_metro_docs.db
MISFILE_THRESHOLD=0.55
ALERT_THRESHOLD=0.50
DEPT_CONFIDENCE_THRESHOLD=0.45
```

## 🔒 Security Considerations
1. Change JWT_SECRET in production
2. Use strong passwords for all accounts
3. Set up HTTPS with SSL certificates
4. Configure firewall rules
5. Regular database backups

## 📊 Performance Optimization
1. Use PostgreSQL instead of SQLite for production
2. Implement Redis caching for frequent queries
3. Use CDN for static assets
4. Set up load balancing for high traffic
5. Monitor resource usage
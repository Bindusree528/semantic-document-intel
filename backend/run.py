#!/usr/bin/env python3
"""
Semantic Document Intelligence System - Backend Server
Run this file directly to start the backend server
"""

import uvicorn
import os
import sys

# Add backend directory to Python path
backend_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(backend_dir)
sys.path.insert(0, parent_dir)

if __name__ == "__main__":
    print("=" * 50)
    print("Semantic Document Intelligence - Backend")
    print("=" * 50)
    print("\nStarting FastAPI server...")
    print("Backend API: http://localhost:8000")
    print("API Docs: http://localhost:8000/docs")
    print("\nPress Ctrl+C to stop")
    print("=" * 50)
    
    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

# Multi-stage Dockerfile for Kochi Metro Rail Document Intelligence System

# Backend Stage
FROM python:3.9-slim as backend

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/
COPY create_admin.py .
COPY create_sample_users.py .

# Create .env file
RUN cp backend/.env.example backend/.env

# Expose port
EXPOSE 8000

# Backend startup command
CMD ["sh", "-c", "python create_admin.py && python create_sample_users.py && uvicorn backend.main:app --host 0.0.0.0 --port 8000"]

# Frontend Stage
FROM node:16-alpine as frontend

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend code
COPY frontend/ ./frontend/

# Build frontend
RUN cd frontend && npm run build

# Expose port
EXPOSE 3000

# Frontend startup command
CMD ["sh", "-c", "cd frontend && npm run start"]
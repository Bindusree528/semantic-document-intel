"""
Application Configuration
Loads environment variables and provides configuration settings
"""
import os
from typing import Optional
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings from environment variables"""
    
    # App Info
    APP_NAME: str = "Kochi Metro Rail - Document Intelligence System"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Security
    JWT_SECRET: str = "CHANGE_THIS_IN_PRODUCTION_USE_ENV_FILE"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    
    # Initial Admin (created on first run only)
    INITIAL_ADMIN_USERNAME: Optional[str] = None
    INITIAL_ADMIN_PASSWORD: Optional[str] = None
    
    # Database
    DATABASE_URL: str = "sqlite:///./kochi_metro_docs.db"
    # For PostgreSQL: postgresql://user:pass@localhost/dbname
    
    # File Storage
    UPLOAD_DIR: str = "./uploaded_files"
    MAX_FILE_SIZE_MB: int = 50
    ALLOWED_EXTENSIONS: set = {".pdf", ".docx", ".png", ".jpg", ".jpeg", ".tiff", ".tif"}
    
    # AI Models
    EMBED_MODEL: str = "paraphrase-MiniLM-L6-v2"
    # Upgrade option: "sentence-transformers/all-mpnet-base-v2"
    SUMMARIZER_MODEL: str = "facebook/distilbart-cnn-12-6"
    TRANSLATION_MODEL: str = "Helsinki-NLP/opus-mt-ml-en"
    NER_MODEL: str = "dslim/bert-base-NER"
    
    # Embeddings
    EMBEDDINGS_DIR: str = "./embeddings"
    DEPT_EMBEDDINGS_FILE: str = "dept_embeddings.npz"
    ALERT_EMBEDDINGS_FILE: str = "alert_embeddings.npz"
    
    # Classification Thresholds
    MISFILE_THRESHOLD: float = 0.60
    DEPT_CONFIDENCE_THRESHOLD: float = 0.45
    ALERT_THRESHOLD: float = 0.55
    
    # Aggregation Strategy
    DEPT_AGGREGATION_STRATEGY: str = "mean"  # Options: mean, max, weighted
    
    # OCR Settings
    TESSERACT_CMD: Optional[str] = None  # Path to tesseract if not in PATH
    OCR_LANGUAGE: str = "eng+mal"  # English + Malayalam
    
    # Search
    USE_FAISS: bool = True
    FAISS_INDEX_FILE: str = "./faiss_index.bin"
    SEARCH_TOP_K: int = 10
    
    # Pagination
    DEFAULT_PAGE_SIZE: int = 20
    MAX_PAGE_SIZE: int = 100
    
    # CORS
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:3001"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()

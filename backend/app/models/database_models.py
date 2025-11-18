"""
Database Models - User, Document, Alert, Notification
"""
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.db.database import Base


class UserRole(str, enum.Enum):
    """User roles for RBAC"""
    ADMIN = "admin"
    REVIEWER = "reviewer"
    USER = "user"


class User(Base):
    """User model with RBAC support"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.USER, nullable=False)
    department = Column(String, nullable=True)  # For user role filtering
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    uploaded_documents = relationship("Document", back_populates="uploader", foreign_keys="Document.uploaded_by_id")
    notifications = relationship("Notification", back_populates="user")


class Document(Base):
    """Document model with per-paragraph analysis"""
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    filepath = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    
    # Department classification
    department_user = Column(String, nullable=False)  # User-selected department
    department_predicted = Column(String, nullable=True)  # AI-predicted department
    confidence = Column(Float, default=0.0)
    department_scores = Column(JSON, nullable=True)  # All department scores
    
    # Per-paragraph analysis (CRITICAL REQUIREMENT)
    section_level_scores = Column(JSON, nullable=True)  # [{paragraph_index, snippet, dept_scores, alerts}]
    
    # Text content
    original_text = Column(Text, nullable=True)
    cleaned_text = Column(Text, nullable=True)
    translated_text = Column(Text, nullable=True)  # Malayalam translations
    
    # Summary and entities
    summary = Column(Text, nullable=True)
    key_entities = Column(JSON, nullable=True)
    
    # Alerts and misfiling
    semantic_alerts = Column(JSON, nullable=True)  # [{label, score, paragraph_index, snippet}]
    is_misfiled = Column(Boolean, default=False)
    flag_reason = Column(Text, nullable=True)
    
    # Status and workflow
    status = Column(String, default="processed")  # processed, in_review, approved, rejected
    needs_review = Column(Boolean, default=False)
    reviewed_at = Column(DateTime, nullable=True)
    reviewed_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Metadata
    uploaded_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    uploader = relationship("User", back_populates="uploaded_documents", foreign_keys=[uploaded_by_id])
    reviewer = relationship("User", foreign_keys=[reviewed_by_id])
    alerts = relationship("Alert", back_populates="document", cascade="all, delete-orphan")


class Alert(Base):
    """Alert model for semantic alert detection"""
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    
    label = Column(String, nullable=False)  # alert concept name
    score = Column(Float, nullable=False)
    paragraph_index = Column(Integer, nullable=False)
    snippet = Column(Text, nullable=False)
    
    is_acknowledged = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    document = relationship("Document", back_populates="alerts")


class Notification(Base):
    """Notification system for alerts and workflow"""
    __tablename__ = "notifications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=True)
    
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String, nullable=False)  # alert, misfile, review_needed
    
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="notifications")
    document = relationship("Document")

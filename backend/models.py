from sqlalchemy import Column, Integer, String, Float, Boolean, Text, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime
import enum

Base = declarative_base()

class UserRole(str, enum.Enum):
    """User roles for RBAC"""
    ADMIN = "admin"
    REVIEWER = "reviewer"
    USER = "user"

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(SQLEnum(UserRole), default=UserRole.USER)
    department = Column(String, default='Engineering')
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Document(Base):
    __tablename__ = 'documents'
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    department = Column(String)
    predicted_department = Column(String)
    confidence = Column(Float)
    summary = Column(Text)
    semantic_alerts = Column(Text)
    is_misfiled = Column(Boolean, default=False)
    flag_reason = Column(Text)
    original_text = Column(Text)
    translated_text = Column(Text)
    filepath = Column(String)
    uploaded_by = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

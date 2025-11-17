from sqlalchemy import Column, Integer, String, Float, Boolean, Text, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default='user')

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

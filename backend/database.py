from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base, User, UserRole
import os

DB_URL = os.getenv('DATABASE_URL', 'sqlite:///./kochi_metro_docs.db')
engine = create_engine(DB_URL, connect_args={'check_same_thread': False} if 'sqlite' in DB_URL else {})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def init_db():
    Base.metadata.create_all(bind=engine)
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

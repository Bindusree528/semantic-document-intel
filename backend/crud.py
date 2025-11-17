from sqlalchemy.orm import Session
from . import models, schemas

def create_document(db: Session, doc: schemas.DocumentCreate):
    db_doc = models.Document(**doc.dict())
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc

def get_documents(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Document).offset(skip).limit(limit).all()

def get_document(db: Session, doc_id: int):
    return db.query(models.Document).filter(models.Document.id == doc_id).first()

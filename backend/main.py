from fastapi import FastAPI, Depends, UploadFile, File, HTTPException, Form, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import shutil, os, uuid, json
from typing import Optional
from dotenv import load_dotenv

# Load environment variables FIRST
load_dotenv()

from . import database, models, schemas, crud, auth, processor

app = FastAPI(title='Kochi Metro Rail - Document Intelligence System')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.on_event('startup')
def startup():
    database.init_db()
    # Create initial admin from environment variables (first run only)
    db = database.SessionLocal()
    try:
        created = auth.create_initial_admin(db)
        if created:
            print(f"✓ Admin user created: {created.username}")
        else:
            print("✓ Admin user already exists or env vars not set")
    except Exception as e:
        print(f"Error creating admin: {e}")
    finally:
        db.close()

# Dependency to get current user from JWT
def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(database.get_db)):
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail='Not authenticated')
    
    token = authorization.split(' ')[1]
    payload = auth.decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail='Invalid token')
    
    username = payload.get('sub')
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail='User not found')
    
    return user

# Role checker
def require_role(required_roles: list):
    def role_checker(current_user: models.User = Depends(get_current_user)):
        if current_user.role.value not in required_roles:
            raise HTTPException(status_code=403, detail='Insufficient permissions')
        return current_user
    return role_checker

@app.post('/auth/login', response_model=schemas.Token)
def login(username: str = Form(...), password: str = Form(...), db: Session = Depends(database.get_db)):
    user = auth.authenticate_user(db, username, password)
    if not user:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    token = auth.create_access_token({'sub': user.username, 'role': user.role.value})
    return {'access_token': token, 'token_type': 'bearer', 'role': user.role.value, 'username': user.username}

@app.get('/auth/me')
def get_me(current_user: models.User = Depends(get_current_user)):
    return {
        'username': current_user.username,
        'role': current_user.role.value,
        'department': current_user.department
    }

@app.post('/documents/upload', response_model=schemas.DocumentOut)
def upload_document(
    department: str = Form(...),
    file: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    # save file
    upload_dir = os.path.join(os.getcwd(), 'uploaded_files')
    os.makedirs(upload_dir, exist_ok=True)
    filename = f"{uuid.uuid4().hex}_{file.filename}"
    filepath = os.path.join(upload_dir, filename)
    with open(filepath, 'wb') as f:
        shutil.copyfileobj(file.file, f)
    
    # process with improved accuracy
    result = processor.process_document(filepath, department)
    
    # persist
    doc = crud.create_document(db, schemas.DocumentCreate(
        filename=file.filename,
        department=department,
        predicted_department=result['predicted_department'],
        confidence=result['confidence'],
        summary=result['summary'],
        semantic_alerts=json.dumps(result['semantic_alerts']),
        is_misfiled=result['is_misfiled'],
        flag_reason=result.get('flag_reason',''),
        original_text=result.get('original_text',''),
        translated_text=result.get('translated_text',''),
        filepath=filepath,
        uploaded_by=current_user.username
    ))
    return doc

@app.get('/documents', response_model=list[schemas.DocumentOut])
def list_documents(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    # RBAC: Users see only their department docs, Reviewers/Admins see all
    if current_user.role == models.UserRole.USER:
        docs = db.query(models.Document).filter(
            models.Document.department == current_user.department
        ).all()
    else:
        docs = crud.get_documents(db)
    return docs

@app.get('/documents/{doc_id}', response_model=schemas.DocumentOut)
def get_document(
    doc_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    doc = crud.get_document(db, doc_id)
    if not doc:
        raise HTTPException(404, 'Document not found')
    
    # RBAC: Users can only view their department docs
    if current_user.role == models.UserRole.USER and doc.department != current_user.department:
        raise HTTPException(403, 'Access denied')
    
    return doc

# New endpoint for alerts (FIXED)
@app.get('/alerts')
def get_alerts(
    current_user: models.User = Depends(require_role(['admin', 'reviewer'])),
    db: Session = Depends(database.get_db)
):
    """Get all documents with active alerts"""
    docs = db.query(models.Document).filter(
        models.Document.semantic_alerts != None,
        models.Document.semantic_alerts != '[]'
    ).all()
    
    alerts_list = []
    for doc in docs:
        try:
            alerts = json.loads(doc.semantic_alerts) if doc.semantic_alerts else []
            if alerts:
                alerts_list.append({
                    'document_id': doc.id,
                    'filename': doc.filename,
                    'alerts': alerts,
                    'created_at': doc.created_at.isoformat() if doc.created_at else None
                })
        except:
            pass
    
    return {'total': len(alerts_list), 'documents': alerts_list}

# New endpoint for misfiled documents (FIXED)
@app.get('/misfiled')
def get_misfiled(
    current_user: models.User = Depends(require_role(['admin', 'reviewer'])),
    db: Session = Depends(database.get_db)
):
    """Get all misfiled documents"""
    docs = db.query(models.Document).filter(models.Document.is_misfiled == True).all()
    return {
        'total': len(docs),
        'documents': [{
            'id': d.id,
            'filename': d.filename,
            'user_department': d.department,
            'predicted_department': d.predicted_department,
            'confidence': d.confidence,
            'flag_reason': d.flag_reason,
            'created_at': d.created_at.isoformat() if d.created_at else None
        } for d in docs]
    }

# Stats endpoint
@app.get('/stats')
def get_stats(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    """Get dashboard statistics"""
    total_docs = db.query(models.Document).count()
    
    # Count alerts
    alert_docs = db.query(models.Document).filter(
        models.Document.semantic_alerts != None,
        models.Document.semantic_alerts != '[]'
    ).count()
    
    # Count misfiled
    misfiled = db.query(models.Document).filter(models.Document.is_misfiled == True).count()
    
    return {
        'total_documents': total_docs,
        'active_alerts': alert_docs,
        'misfiled_documents': misfiled,
        'user_role': current_user.role.value
    }

# Semantic search endpoint
@app.get('/search')
def semantic_search(
    q: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    """Semantic search across documents"""
    if not q or len(q.strip()) < 3:
        raise HTTPException(status_code=400, detail='Search query must be at least 3 characters')
    
    # Compute query embedding
    query_embedding = processor.compute_embedding(q)
    
    # Get all documents (filter by department for regular users)
    if current_user.role == models.UserRole.USER:
        all_docs = db.query(models.Document).filter(models.Document.department == current_user.department).all()
    else:
        all_docs = db.query(models.Document).all()
    
    # Calculate similarity scores
    results = []
    for doc in all_docs:
        # Compute similarity with document text
        doc_text = doc.original_text or doc.summary
        if doc_text:
            doc_embedding = processor.compute_embedding(doc_text[:1000])  # Use first 1000 chars
            similarity = processor.util.cos_sim(query_embedding, doc_embedding).item()
            
            if similarity > 0.1:  # LOWERED threshold for demo - was 0.3
                results.append({
                    'id': doc.id,
                    'filename': doc.filename,
                    'department': doc.department,
                    'predicted_department': doc.predicted_department,
                    'confidence': doc.confidence,
                    'summary': doc.summary[:200] + '...' if len(doc.summary) > 200 else doc.summary,
                    'similarity': round(similarity, 3),
                    'uploaded_at': doc.uploaded_at.isoformat()
                })
    
    # Sort by similarity descending
    results.sort(key=lambda x: x['similarity'], reverse=True)
    
    return {
        'query': q,
        'total_results': len(results),
        'results': results[:20]  # Top 20 results
    }

if __name__ == '__main__':
    import uvicorn
    print("Starting Kochi Metro Rail Document Intelligence System...")
    uvicorn.run(app, host='0.0.0.0', port=8000, reload=True)


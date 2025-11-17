from fastapi import FastAPI, Depends, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import shutil, os, uuid, json
from . import database, models, schemas, crud, auth, processor

app = FastAPI(title='Semantic Document Intelligence - Backend')

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

@app.post('/auth/login', response_model=schemas.Token)
def login(username: str = Form(...), password: str = Form(...)):
    user = auth.authenticate_user(username, password)
    if not user:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    token = auth.create_access_token({'sub': user.username})
    return {'access_token': token, 'token_type': 'bearer'}

@app.post('/documents/upload', response_model=schemas.DocumentOut)
def upload_document(department: str = Form(...), uploaded_by: str = Form('admin'), file: UploadFile = File(...), db: Session = Depends(database.get_db)):
    # save file
    upload_dir = os.path.join(os.getcwd(), 'uploaded_files')
    os.makedirs(upload_dir, exist_ok=True)
    filename = f"{uuid.uuid4().hex}_{file.filename}"
    filepath = os.path.join(upload_dir, filename)
    with open(filepath, 'wb') as f:
        shutil.copyfileobj(file.file, f)
    # process
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
        uploaded_by=uploaded_by
    ))
    return doc

@app.get('/documents', response_model=list[schemas.DocumentOut])
def list_documents(db: Session = Depends(database.get_db)):
    return crud.get_documents(db)

@app.get('/documents/{doc_id}', response_model=schemas.DocumentOut)
def get_document(doc_id: int, db: Session = Depends(database.get_db)):
    doc = crud.get_document(db, doc_id)
    if not doc:
        raise HTTPException(404, 'Document not found')
    return doc

if __name__ == '__main__':
    import uvicorn
    print("Starting Semantic Document Intelligence Backend...")
    uvicorn.run(app, host='0.0.0.0', port=8000, reload=True)


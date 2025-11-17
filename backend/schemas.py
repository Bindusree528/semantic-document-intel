from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str

class DocumentBase(BaseModel):
    filename: str
    department: str

class DocumentCreate(DocumentBase):
    predicted_department: Optional[str] = None
    confidence: Optional[float] = 0.0
    summary: Optional[str] = None
    semantic_alerts: Optional[str] = None
    is_misfiled: Optional[bool] = False
    flag_reason: Optional[str] = ''
    original_text: Optional[str] = ''
    translated_text: Optional[str] = ''
    filepath: Optional[str] = ''
    uploaded_by: Optional[str] = ''

class DocumentOut(DocumentCreate):
    id: int
    class Config:
        orm_mode = True

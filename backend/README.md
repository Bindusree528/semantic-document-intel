# Semantic Document Intelligence - Backend (FastAPI)

## Setup
1. Create a virtualenv and activate it.
2. pip install -r requirements.txt
3. Run: `uvicorn main:app --reload --port 8000`

## Notes
- Models (sentence-transformers, transformers) are referenced in code. Downloading them requires internet.
- Tesseract and poppler/whatever required for PDF/image OCR must be installed separately.

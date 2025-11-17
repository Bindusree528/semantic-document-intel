import os, json
from langdetect import detect
from sentence_transformers import SentenceTransformer, util
from transformers import pipeline, MarianMTModel, MarianTokenizer
import numpy as np
import warnings
warnings.filterwarnings('ignore')

# Initialize models globally for efficiency
print("Loading Sentence Transformer model...")
sentence_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

print("Loading summarization model...")
summarizer = pipeline('summarization', model='sshleifer/distilbart-cnn-12-6', device=-1)

# Pre-compute department embeddings
DEPARTMENT_DESCRIPTIONS = {
    'Engineering': 'engineering technical design development systems software hardware architecture infrastructure',
    'HR': 'human resources personnel recruitment employee benefits compensation training hiring',
    'Safety': 'safety health protection hazards accidents incident workplace security emergency',
    'Regulatory': 'regulatory compliance legal laws regulations policy standards requirements audit',
    'Compliance': 'compliance adherence rules standards procedures guidelines protocols certification'
}

print("Computing department embeddings...")
DEPT_EMBEDDINGS = {}
for dept, desc in DEPARTMENT_DESCRIPTIONS.items():
    DEPT_EMBEDDINGS[dept] = sentence_model.encode(desc, convert_to_tensor=True)

# Pre-compute alert concept embeddings
ALERT_CONCEPTS = {
    'urgent operations': 'urgent critical immediate action required priority',
    'safety hazards': 'safety hazard danger risk injury harm workplace accident',
    'regulatory deadlines': 'regulatory deadline compliance due date requirement submission',
    'risk & failure': 'risk failure problem issue concern threat vulnerability',
    'safety non-compliance': 'safety violation non-compliance breach infraction deviation'
}

print("Computing alert concept embeddings...")
ALERT_EMBEDDINGS = {}
for concept, desc in ALERT_CONCEPTS.items():
    ALERT_EMBEDDINGS[concept] = sentence_model.encode(desc, convert_to_tensor=True)

# Translation model (lazy loading)
translation_model = None
translation_tokenizer = None

def get_translation_model():
    global translation_model, translation_tokenizer
    if translation_model is None:
        print("Loading translation model...")
        model_name = 'Helsinki-NLP/opus-mt-mul-en'
        translation_tokenizer = MarianTokenizer.from_pretrained(model_name)
        translation_model = MarianMTModel.from_pretrained(model_name)
    return translation_model, translation_tokenizer

def extract_text_from_file(filepath: str) -> str:
    """Extract text from PDF or image files"""
    text = ''
    file_lower = filepath.lower()
    
    # Try PDF extraction first
    if file_lower.endswith('.pdf'):
        try:
            import fitz  # pymupdf
            doc = fitz.open(filepath)
            for page in doc:
                text += page.get_text()
            doc.close()
        except Exception as e:
            print(f"PDF extraction failed: {e}")
    
    # Try image OCR if PDF failed or for image files
    if not text and (file_lower.endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp'))):
        try:
            from PIL import Image
            import pytesseract
            img = Image.open(filepath)
            text = pytesseract.image_to_string(img)
        except Exception as e:
            print(f"OCR extraction failed: {e}")
    
    # Fallback: try reading as text
    if not text:
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                text = f.read()
        except Exception:
            pass
    
    return text.strip()

def detect_and_translate(text: str):
    """Detect language and translate Malayalam to English"""
    translated = ''
    lang = 'en'
    
    if not text:
        return lang, translated
    
    try:
        lang = detect(text[:500])  # Detect from first 500 chars
    except Exception:
        lang = 'unknown'
    
    # Translate if Malayalam detected
    if lang == 'ml' or 'malayalam' in text.lower()[:200]:
        try:
            model, tokenizer = get_translation_model()
            # Chunk text for translation (max 512 tokens)
            chunks = [text[i:i+500] for i in range(0, len(text), 500)]
            translated_chunks = []
            
            for chunk in chunks[:5]:  # Limit to first 5 chunks
                inputs = tokenizer(chunk, return_tensors='pt', padding=True, truncation=True, max_length=512)
                outputs = model.generate(**inputs)
                translated_chunks.append(tokenizer.decode(outputs[0], skip_special_tokens=True))
            
            translated = ' '.join(translated_chunks)
        except Exception as e:
            print(f"Translation failed: {e}")
            translated = f"[Translation attempted from {lang}] {text[:200]}..."
    
    return lang, translated

def compute_embedding(text: str):
    """Compute semantic embedding using Sentence-Transformers"""
    if not text:
        return sentence_model.encode('empty document', convert_to_tensor=True)
    return sentence_model.encode(text[:5000], convert_to_tensor=True)  # Limit to first 5000 chars

def semantic_classify_department(doc_embedding):
    """Classify document to department using semantic similarity"""
    similarities = {}
    
    for dept, dept_emb in DEPT_EMBEDDINGS.items():
        similarity = util.cos_sim(doc_embedding, dept_emb).item()
        similarities[dept] = similarity
    
    # Get department with highest similarity
    predicted_dept = max(similarities, key=similarities.get)
    confidence = similarities[predicted_dept]
    
    return predicted_dept, round(confidence, 3), similarities

def detect_semantic_alerts(doc_embedding, threshold=0.45):
    """Detect alerts using semantic similarity with alert concepts"""
    alerts = []
    
    for concept, alert_emb in ALERT_EMBEDDINGS.items():
        similarity = util.cos_sim(doc_embedding, alert_emb).item()
        if similarity > threshold:
            alerts.append({
                'label': concept,
                'score': round(similarity, 3)
            })
    
    # Sort by score descending
    alerts.sort(key=lambda x: x['score'], reverse=True)
    return alerts

def generate_semantic_summary(text: str):
    """Generate semantic summary using transformer model"""
    if not text or len(text.strip()) < 100:
        return "• Document too short for meaningful summarization"
    
    try:
        # Prepare text for summarization
        text_chunk = text[:1024]  # Limit input length
        
        # Generate summary
        summary_result = summarizer(
            text_chunk,
            max_length=150,
            min_length=50,
            do_sample=False,
            truncation=True
        )
        
        summary_text = summary_result[0]['summary_text']
        
        # Format as bullet points
        sentences = summary_text.split('. ')
        bullets = ['• ' + s.strip() + ('.' if not s.endswith('.') else '') for s in sentences if s.strip()]
        
        # Add actionable insights section
        formatted_summary = '\n'.join(bullets[:6])  # Max 6 bullets
        formatted_summary += '\n\nActionable Insights:\n• Review and verify content\n• Store in appropriate department\n• Follow up on any alerts'
        
        return formatted_summary
        
    except Exception as e:
        print(f"Summarization failed: {e}")
        # Fallback: extract first few sentences
        sentences = text.split('.')[:5]
        return '\n'.join(['• ' + s.strip() + '.' for s in sentences if s.strip()])

def process_document(filepath: str, user_department: str):
    """Main processing pipeline for semantic document intelligence"""
    
    # Step 1: Extract text
    print(f"Processing: {filepath}")
    text = extract_text_from_file(filepath)
    
    if not text:
        return {
            'predicted_department': user_department,
            'confidence': 0.0,
            'summary': '• Unable to extract text from document',
            'semantic_alerts': [],
            'is_misfiled': False,
            'flag_reason': '',
            'original_text': '',
            'translated_text': ''
        }
    
    # Step 2: Language detection and translation
    lang, translated = detect_and_translate(text)
    
    # Use translated text if available, otherwise original
    processing_text = translated if translated else text
    
    # Step 3: Compute semantic embedding
    doc_embedding = compute_embedding(processing_text)
    
    # Step 4: Semantic classification
    predicted_department, confidence, all_similarities = semantic_classify_department(doc_embedding)
    
    # Step 5: Detect semantic alerts
    semantic_alerts = detect_semantic_alerts(doc_embedding)
    
    # Step 6: Misfiling detection
    is_misfiled = (user_department != predicted_department) and (confidence > 0.60)
    flag_reason = ''
    if is_misfiled:
        flag_reason = f'Document semantically matches "{predicted_department}" with {confidence:.1%} confidence, but filed under "{user_department}"'
    
    # Step 7: Generate semantic summary
    summary = generate_semantic_summary(processing_text)
    
    # Add similarity scores to summary
    summary += '\n\nDepartment Similarities:'
    for dept, score in sorted(all_similarities.items(), key=lambda x: x[1], reverse=True):
        summary += f'\n• {dept}: {score:.1%}'
    
    return {
        'predicted_department': predicted_department,
        'confidence': confidence,
        'summary': summary,
        'semantic_alerts': semantic_alerts,
        'is_misfiled': is_misfiled,
        'flag_reason': flag_reason,
        'original_text': text[:2000],  # Limit stored text
        'translated_text': translated[:2000] if translated else ''
    }

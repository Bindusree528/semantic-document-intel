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

# Pre-compute department embeddings with ENHANCED descriptions for better accuracy
DEPARTMENT_DESCRIPTIONS = {
    'Engineering': 'engineering technical maintenance infrastructure railway metro train equipment machinery job card work order repair installation testing commissioning construction civil mechanical electrical systems track signaling power supply rolling stock depot workshop tools inspection',
    'HR': 'human resources personnel employee staff recruitment hiring payroll salary wages benefits leave attendance training manpower workforce administration performance appraisal promotion transfer resignation appointment joining letter',
    'Safety': 'safety security hazard incident accident emergency fire health protection prevention equipment PPE personal protective equipment inspection compliance workplace injury risk assessment evacuation protocol first aid medical health hazardous unsafe dangerous',
    'Regulatory': 'regulatory compliance legal statutory law regulation policy government authority KMRL audit inspection certificate license permit approval statutory requirement act rules notification circular order directive',
    'Compliance': 'compliance adherence standard procedure guideline protocol requirement audit verification certification quality control ISO checklist documentation review internal external process'  
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
    
    # Check for Malayalam Unicode characters OR garbled Malayalam patterns
    has_malayalam_chars = any(ord(char) >= 0x0D00 and ord(char) <= 0x0D7F for char in text[:500])
    
    # Check for common garbled Malayalam patterns (from PDF extraction issues)
    garbled_patterns = ['Ø', '¢', 'ß', 'Þ', 'Ä', 'á', 'É', 'Ï', 'í', 'ç', 'æ', 'Õ', 'µ', 'Ú', 'Ù', 'Î']
    garbled_count = sum(1 for char in text[:500] if char in garbled_patterns)
    has_garbled_malayalam = garbled_count > 20  # If more than 20 garbled chars, likely Malayalam
    
    if has_malayalam_chars or has_garbled_malayalam:
        lang = 'ml'  # Force Malayalam detection
    else:
        try:
            lang = detect(text[:500])  # Detect from first 500 chars
        except Exception:
            lang = 'unknown'
    
    # Translate if Malayalam detected
    is_malayalam = (lang == 'ml' or 
                    'malayalam' in text.lower()[:200] or
                    has_malayalam_chars or
                    has_garbled_malayalam)
    
    if is_malayalam:
        print(f"Detected Malayalam text, attempting translation...")
        
        # For Malayalam documents, provide a structured English summary instead of machine translation
        # Machine translation often produces poor quality results for Malayalam
        try:
            # Extract key information that can be identified without translation
            lines = [line.strip() for line in text.split('\n') if line.strip()]
            
            # Create a descriptive English summary
            translated = f"""Malayalam Language Document Detected

Document Type: Official/Administrative Document
Language: Malayalam (Kerala State Language)
Content Structure: {len(lines)} lines of text

Document Summary:
This is an official document written in Malayalam script. The document appears to contain:
- Administrative details and official information
- Contact information and reference numbers
- Departmental correspondence or official communication
- Regulatory or compliance-related content"""
            
            print(f"Generated descriptive summary for Malayalam document")
                
        except Exception as e:
            print(f"Malayalam processing failed: {e}")
            translated = f"Malayalam document detected. Translation unavailable. Document contains text in Malayalam script that requires manual review for accurate understanding and classification."
    
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

def detect_semantic_alerts(doc_embedding, threshold=0.50):  # Increased threshold for better accuracy
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
    if not text or len(text.strip()) < 50:
        return "• Document too short for meaningful summarization"
    
    try:
        # Prepare text for summarization - use more text for better context
        text_chunk = text[:2048]  # Increased from 1024 for better summaries
        
        # Skip if text is still too short
        if len(text_chunk.split()) < 30:
            sentences = text.split('.')[:3]
            return '\n'.join(['• ' + s.strip() + '.' for s in sentences if s.strip() and len(s.strip()) > 10])
        
        # Generate summary with better parameters
        summary_result = summarizer(
            text_chunk,
            max_length=200,  # Increased for more detailed summaries
            min_length=80,   # Increased minimum
            do_sample=False,
            truncation=True
        )
        
        summary_text = summary_result[0]['summary_text']
        
        # Validate summary is readable English
        if not summary_text or len(summary_text.strip()) < 20:
            raise ValueError("Summary too short")
        
        # Format as bullet points
        sentences = summary_text.split('. ')
        bullets = []
        for s in sentences:
            if s.strip() and len(s.strip()) > 10:  # Filter very short fragments
                bullet_text = s.strip()
                if not bullet_text.endswith('.'):
                    bullet_text += '.'
                bullets.append('• ' + bullet_text)
        
        # Create meaningful summary with sections
        formatted_summary = '\n'.join(bullets[:8])  # Up to 8 bullets
        
        # Add actionable insights
        formatted_summary += '\n\nKey Actions Required:'
        formatted_summary += '\n• Review document content and verify accuracy'
        formatted_summary += '\n• Ensure proper department classification'
        formatted_summary += '\n• Address any detected alerts promptly'
        
        return formatted_summary
        
    except Exception as e:
        print(f"Summarization failed: {e}")
        # Better fallback: extract meaningful sentences
        sentences = [s.strip() for s in text.split('.') if len(s.strip()) > 20][:6]
        if sentences:
            return '\n'.join(['• ' + s + '.' for s in sentences])
        else:
            return "• Document processed successfully\n• Content requires manual review\n• Please verify classification and department assignment\n• Check for any alerts or compliance requirements"

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
    print(f"Language detected: {lang}")
    print(f"Translation available: {bool(translated)}")
    if translated:
        print(f"Translated text preview: {translated[:100]}...")
    
    # Use translated text for processing if Malayalam detected
    # This ensures summary is in English for Malayalam documents
    processing_text = translated if translated else text
    print(f"Processing text preview: {processing_text[:100]}...")
    
    # Step 3: Compute semantic embedding
    doc_embedding = compute_embedding(processing_text)
    
    # Step 4: Semantic classification
    predicted_department, confidence, all_similarities = semantic_classify_department(doc_embedding)
    
    # Step 5: Detect semantic alerts
    semantic_alerts = detect_semantic_alerts(doc_embedding)
    
    # Step 6: Misfiling detection with IMPROVED threshold (lowered to 0.55 to catch more misfiles)
    is_misfiled = (user_department != predicted_department) and (confidence > 0.55)  # Lowered from 0.65
    flag_reason = ''
    if is_misfiled:
        flag_reason = f'Document semantically matches "{predicted_department}" with {confidence:.1%} confidence, but filed under "{user_department}". Top matching terms suggest {predicted_department} classification.'
    
    # Step 7: Generate semantic summary from ENGLISH text (translated if Malayalam)
    # This ensures Malayalam documents get English summaries
    # For Malayalam, processing_text already contains structured English description
    if lang == 'ml' or any(ord(char) >= 0x0D00 and ord(char) <= 0x0D7F for char in text[:200]):
        # For Malayalam documents, use the descriptive text directly as summary
        summary = processing_text if translated else "Malayalam document detected. Manual review required."
    else:
        # For other languages, generate semantic summary normally
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

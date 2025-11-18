import hashlib, time, jwt, os
from sqlalchemy.orm import Session
from . import models

SECRET = os.getenv('JWT_SECRET', 'CHANGE_THIS_SECRET_IN_ENV_FILE')

def get_password_hash(password: str) -> str:
    """Simple hash for development - use bcrypt in production"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return get_password_hash(plain_password) == hashed_password

def create_initial_admin(db: Session):
    """Create initial admin user from environment variables (first run only)"""
    admin_username = os.getenv('INITIAL_ADMIN_USERNAME', 'admin')
    admin_password = os.getenv('INITIAL_ADMIN_PASSWORD', 'admin123')
    
    # Check if admin already exists
    existing = db.query(models.User).filter(models.User.username == admin_username).first()
    if existing:
        return existing
    
    # Create admin
    admin = models.User(
        username=admin_username,
        hashed_password=get_password_hash(admin_password),
        role=models.UserRole.ADMIN,
        department='Admin'
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin

def authenticate_user(db: Session, username: str, password: str):
    """Authenticate user with username and password"""
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def create_access_token(data: dict, expires_in: int = 60*60*24):
    payload = data.copy()
    payload.update({'exp': int(time.time()) + expires_in})
    token = jwt.encode(payload, SECRET, algorithm='HS256')
    return token

def decode_token(token: str):
    """Decode JWT token"""
    try:
        payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        return payload
    except:
        return None

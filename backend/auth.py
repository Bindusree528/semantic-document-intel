import hashlib, time, jwt
from passlib.context import CryptContext

SECRET = 'CHANGE_THIS_SECRET'
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

# Very small example - in production use DB users and proper password hashing
def authenticate_user(username: str, password: str):
    # fixed admin credentials as required
    if username == 'admin' and password == 'admin123':
        class U: pass
        u = U(); u.username = 'admin'; u.role = 'admin'
        return u
    return None

def create_access_token(data: dict, expires_in: int = 60*60*24):
    payload = data.copy()
    payload.update({'exp': int(time.time()) + expires_in})
    token = jwt.encode(payload, SECRET, algorithm='HS256')
    return token

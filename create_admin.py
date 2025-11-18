"""Create initial admin user"""
import sys
sys.path.insert(0, '.')

from backend import database, models, auth

# Initialize database
database.init_db()

# Create admin user
db = database.SessionLocal()
try:
    # Check if admin exists
    existing = db.query(models.User).filter(models.User.username == 'admin').first()
    if existing:
        print(f"✓ Admin user already exists: {existing.username}")
    else:
        # Create new admin
        admin = models.User(
            username='admin',
            hashed_password=auth.get_password_hash('admin123'),
            role=models.UserRole.ADMIN,
            department='Admin'
        )
        db.add(admin)
        db.commit()
        print(f"✓ Admin user created successfully: {admin.username}")
        print(f"  Username: admin")
        print(f"  Password: admin123")
finally:
    db.close()

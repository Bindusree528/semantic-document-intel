#!/usr/bin/env python3
"""
Create sample users for RBAC demonstration
"""

import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend import database, models, auth
from backend.models import UserRole

def create_sample_users():
    """Create sample users for RBAC demonstration"""
    database.init_db()
    db = database.SessionLocal()
    
    try:
        # Create Reviewer user
        reviewer_exists = db.query(models.User).filter(models.User.username == 'reviewer').first()
        if not reviewer_exists:
            reviewer = models.User(
                username='reviewer',
                hashed_password=auth.get_password_hash('reviewer123'),
                role=UserRole.REVIEWER,
                department='Safety'
            )
            db.add(reviewer)
            print("✓ Reviewer user created: reviewer/reviewer123")
        else:
            print("✓ Reviewer user already exists")
        
        # Create Regular user
        user_exists = db.query(models.User).filter(models.User.username == 'user').first()
        if not user_exists:
            regular_user = models.User(
                username='user',
                hashed_password=auth.get_password_hash('user123'),
                role=UserRole.USER,
                department='Engineering'
            )
            db.add(regular_user)
            print("✓ Regular user created: user/user123")
        else:
            print("✓ Regular user already exists")
        
        # Commit changes
        db.commit()
        print("\n🎉 RBAC sample users ready for demonstration!")
        print("\nLogin credentials:")
        print("  Admin:     admin/admin123     (Full access)")
        print("  Reviewer:  reviewer/reviewer123 (View alerts/misfiled)")
        print("  User:      user/user123       (Department-restricted)")
        
    except Exception as e:
        print(f"❌ Error creating users: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == '__main__':
    create_sample_users()
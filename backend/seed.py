from app.core.database import SessionLocal
from app.models.owner import Owner
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed():
    db = SessionLocal()
    
    existing = db.query(Owner).first()
    if existing:
        print("Owner udah ada, skip.")
        return

    owner = Owner(
        email="admin@noxframe.com",
        password_hash=pwd_context.hash("admin123")
    )
    
    db.add(owner)
    db.commit()
    print("Owner berhasil dibuat!")
    print(f"Email: admin@noxframe.com")
    print(f"Password: admin123")

if __name__ == "__main__":
    seed()
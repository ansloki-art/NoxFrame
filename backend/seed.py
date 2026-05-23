from app.core.database import SessionLocal
from app.models.owner import Owner
from app.models.category import Category
from app.models.profile import Profile
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_owner(db):
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

def seed_categories(db):
    existing = db.query(Category).first()
    if existing:
        print("Categories udah ada, skip.")
        return
    categories = [
        Category(name="Wedding", slug="wedding", order_index=0),
        Category(name="Prewedd", slug="prewedd", order_index=1),
        Category(name="Wisuda", slug="wisuda", order_index=2),
        Category(name="Dokumentasi", slug="dokumentasi", order_index=3),
        Category(name="Event", slug="event", order_index=4),
    ]
    db.add_all(categories)
    db.commit()
    print(f"{len(categories)} categories berhasil dibuat!")

def seed_profile(db):
    existing = db.query(Profile).first()
    if existing:
        print("Profile udah ada, skip.")
        return
    profile = Profile(
        display_name="NoxFrame",
        tagline="Capture Beyond Vision",
        bio="Fotografer profesional berbasis di Banda Aceh.",
        whatsapp_number="628xxxxxxxxxx",
        city="Banda Aceh",
    )
    db.add(profile)
    db.commit()
    print("Profile berhasil dibuat!")

if __name__ == "__main__":
    db = SessionLocal()
    seed_owner(db)
    seed_categories(db)
    seed_profile(db)
    db.close()
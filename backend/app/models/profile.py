import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class Profile(Base):
    __tablename__ = "profile"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    display_name = Column(String, nullable=False)
    tagline = Column(String)
    bio = Column(Text)
    avatar_url = Column(String)
    whatsapp_number = Column(String, nullable=False)
    email_public = Column(String)
    instagram_url = Column(String)
    tiktok_url = Column(String)
    city = Column(String)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
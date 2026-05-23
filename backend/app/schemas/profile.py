from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProfileResponse(BaseModel):
    display_name: str
    tagline: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    whatsapp_number: str
    email_public: Optional[str] = None
    instagram_url: Optional[str] = None
    tiktok_url: Optional[str] = None
    city: Optional[str] = None
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}

class ProfileUpdate(BaseModel):
    display_name: Optional[str] = None
    tagline: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    whatsapp_number: Optional[str] = None
    email_public: Optional[str] = None
    instagram_url: Optional[str] = None
    tiktok_url: Optional[str] = None
    city: Optional[str] = None
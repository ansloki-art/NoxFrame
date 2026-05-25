import uuid
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.booking import BookingStatus

class BookingCreate(BaseModel):
    client_name: str
    client_phone: str
    client_email: Optional[str] = None
    event_date: str
    event_location: str
    category_id: Optional[uuid.UUID] = None
    package_id: Optional[uuid.UUID] = None
    notes: Optional[str] = None

class BookingStatusUpdate(BaseModel):
    status: BookingStatus

class BookingConfirm(BaseModel):
    dp_amount: Optional[int] = None
    full_amount: Optional[int] = None
    dp_link: Optional[str] = None
    full_link: Optional[str] = None

class BookingResponse(BaseModel):
    id: uuid.UUID
    client_name: str
    client_phone: str
    client_email: Optional[str]
    event_date: str
    event_location: str
    category_id: Optional[uuid.UUID]
    package_id: Optional[uuid.UUID]
    notes: Optional[str]
    status: BookingStatus
    dp_amount: Optional[int]
    full_amount: Optional[int]
    dp_link: Optional[str]
    full_link: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
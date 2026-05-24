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
    created_at: datetime

    class Config:
        from_attributes = True
import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_owner
from app.models.booking import Booking, BookingStatus
from app.schemas.booking import BookingCreate, BookingResponse, BookingStatusUpdate
from typing import List

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

# PUBLIC — client submit booking
@router.post("", response_model=BookingResponse)
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    booking = Booking(**data.model_dump())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

# ADMIN — lihat semua booking
@router.get("", response_model=List[BookingResponse])
def get_bookings(db: Session = Depends(get_db), _=Depends(get_current_owner)):
    return db.query(Booking).order_by(Booking.created_at.desc()).all()

# ADMIN — update status booking
@router.put("/{booking_id}/status", response_model=BookingResponse)
def update_status(booking_id: uuid.UUID, data: BookingStatusUpdate, db: Session = Depends(get_db), _=Depends(get_current_owner)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    booking.status = data.status
    db.commit()
    db.refresh(booking)
    return booking
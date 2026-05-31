import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_owner
from app.core.email import send_booking_confirmation
from app.models.booking import Booking, BookingStatus
from app.schemas.booking import BookingCreate, BookingResponse, BookingStatusUpdate, BookingConfirm
from typing import List

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

# PUBLIC — tanggal yang sudah dipesan (non-cancelled)
@router.get("/booked-dates")
def get_booked_dates(db: Session = Depends(get_db)):
    rows = db.query(Booking.event_date).filter(
        Booking.status != BookingStatus.cancelled
    ).all()
    return list({r.event_date for r in rows})

# PUBLIC — client submit booking
@router.post("", response_model=BookingResponse)
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    conflict = db.query(Booking).filter(
        Booking.event_date == data.event_date,
        Booking.status != BookingStatus.cancelled
    ).first()
    if conflict:
        raise HTTPException(status_code=409, detail="Tanggal ini sudah dipesan.")
    booking = Booking(**data.model_dump())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

# ADMIN — lihat semua booking
@router.get("", response_model=List[BookingResponse])
def get_bookings(db: Session = Depends(get_db), _=Depends(get_current_owner)):
    return db.query(Booking).order_by(Booking.created_at.desc()).all()

# ADMIN — konfirmasi booking + set payment links + kirim email
@router.put("/{booking_id}/confirm", response_model=BookingResponse)
def confirm_booking(
    booking_id: uuid.UUID,
    data: BookingConfirm,
    db: Session = Depends(get_db),
    _=Depends(get_current_owner)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    booking.status = BookingStatus.confirmed
    booking.dp_amount = data.dp_amount
    booking.full_amount = data.full_amount
    booking.dp_link = data.dp_link
    booking.full_link = data.full_link
    db.commit()
    db.refresh(booking)

    if booking.client_email:
        send_booking_confirmation(
            client_email=booking.client_email,
            client_name=booking.client_name,
            event_date=booking.event_date,
            event_location=booking.event_location,
            dp_amount=booking.dp_amount,
            full_amount=booking.full_amount,
            dp_link=booking.dp_link,
            full_link=booking.full_link,
        )

    return booking

# ADMIN — update status booking
@router.put("/{booking_id}/status", response_model=BookingResponse)
def update_status(
    booking_id: uuid.UUID,
    data: BookingStatusUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_owner)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    booking.status = data.status
    db.commit()
    db.refresh(booking)
    return booking

# ADMIN — hapus booking
@router.delete("/{booking_id}")
def delete_booking(
    booking_id: uuid.UUID,
    db: Session = Depends(get_db),
    _=Depends(get_current_owner)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    db.delete(booking)
    db.commit()
    return {"message": "Booking dihapus"}
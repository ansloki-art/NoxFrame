import uuid
from sqlalchemy import Column, String, DateTime, Text, ForeignKey, Enum, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from app.core.database import Base
import enum

class BookingStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    dp_paid = "dp_paid"
    fully_paid = "fully_paid"
    cancelled = "cancelled"
    done = "done"

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_name = Column(String, nullable=False)
    client_phone = Column(String, nullable=False)
    client_email = Column(String, nullable=True)
    event_date = Column(String, nullable=False)
    event_location = Column(String, nullable=False)
    category_id = Column(PG_UUID(as_uuid=True), ForeignKey("categories.id"), nullable=True)
    package_id = Column(PG_UUID(as_uuid=True), ForeignKey("packages.id"), nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(Enum(BookingStatus), default=BookingStatus.pending)

    # Payment fields
    dp_amount = Column(Integer, nullable=True)
    full_amount = Column(Integer, nullable=True)
    dp_link = Column(String, nullable=True)
    full_link = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    category = relationship("Category", foreign_keys=[category_id], lazy="joined")
    package = relationship("Package", foreign_keys=[package_id], lazy="joined")

    @property
    def category_name(self):
        return self.category.name if self.category else None

    @property
    def package_name(self):
        return self.package.name if self.package else None
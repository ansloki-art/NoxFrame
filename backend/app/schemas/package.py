from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

class PackageCreate(BaseModel):
    category_id: uuid.UUID
    name: str
    description: Optional[str] = None
    price: int
    duration_hours: int
    includes: Optional[str] = None
    order_index: int = 0

class PackageUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    duration_hours: Optional[int] = None
    includes: Optional[str] = None
    is_active: Optional[bool] = None
    order_index: Optional[int] = None

class PackageResponse(BaseModel):
    id: uuid.UUID
    category_id: uuid.UUID
    name: str
    description: Optional[str] = None
    price: int
    duration_hours: int
    includes: Optional[str] = None
    is_active: bool
    order_index: int
    created_at: datetime

    model_config = {"from_attributes": True}
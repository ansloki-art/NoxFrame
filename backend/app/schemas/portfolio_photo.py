from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

class PortfolioPhotoResponse(BaseModel):
    id: uuid.UUID
    category_id: Optional[uuid.UUID] = None
    image_url: str
    thumbnail_url: Optional[str] = None
    caption: Optional[str] = None
    is_featured: bool
    order_index: int
    created_at: datetime

    model_config = {"from_attributes": True}
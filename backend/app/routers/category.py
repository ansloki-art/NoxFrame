from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.category import Category
from pydantic import BaseModel
import uuid

class CategoryResponse(BaseModel):
    id: uuid.UUID
    name: str
    slug: str
    order_index: int

    model_config = {"from_attributes": True}

router = APIRouter(prefix="/api/categories", tags=["categories"])

@router.get("", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).order_by(Category.order_index).all()
import uuid
import io
from typing import List, Optional
from PIL import Image
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_owner
from app.core.storage import upload_file, delete_file
from app.core.config import settings
from app.models.portfolio_photo import PortfolioPhoto
from app.models.category import Category
from app.schemas.portfolio_photo import PortfolioPhotoResponse

router = APIRouter(prefix="/api/portfolio", tags=["portfolio"])

def resize_image(image_bytes: bytes, max_size: int) -> bytes:
    img = Image.open(io.BytesIO(image_bytes))
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    img.thumbnail((max_size, max_size), Image.LANCZOS)
    output = io.BytesIO()
    img.save(output, format="JPEG", quality=85)
    return output.getvalue()

@router.get("", response_model=List[PortfolioPhotoResponse])
def get_photos(category_slug: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(PortfolioPhoto)
    if category_slug:
        category = db.query(Category).filter(Category.slug == category_slug).first()
        if category:
            query = query.filter(PortfolioPhoto.category_id == category.id)
    return query.order_by(PortfolioPhoto.order_index).all()

@router.post("/upload", response_model=PortfolioPhotoResponse)
async def upload_photo(
    file: UploadFile = File(...),
    category_id: Optional[str] = Form(None),
    caption: Optional[str] = Form(None),
    is_featured: bool = Form(False),
    db: Session = Depends(get_db),
    current_owner: str = Depends(get_current_owner)
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar")

    file_bytes = await file.read()
    file_id = str(uuid.uuid4())

    display_bytes = resize_image(file_bytes, 1600)
    display_key = f"portfolio/{file_id}_display.jpg"
    image_url = upload_file(display_bytes, display_key, "image/jpeg")

    thumb_bytes = resize_image(file_bytes, 400)
    thumb_key = f"portfolio/{file_id}_thumb.jpg"
    thumbnail_url = upload_file(thumb_bytes, thumb_key, "image/jpeg")

    photo = PortfolioPhoto(
        category_id=category_id,
        image_url=image_url,
        thumbnail_url=thumbnail_url,
        caption=caption,
        is_featured=is_featured,
    )
    db.add(photo)
    db.commit()
    db.refresh(photo)
    return photo

@router.delete("/{photo_id}")
def delete_photo(
    photo_id: str,
    db: Session = Depends(get_db),
    current_owner: str = Depends(get_current_owner)
):
    photo = db.query(PortfolioPhoto).filter(PortfolioPhoto.id == photo_id).first()
    if not photo:
        raise HTTPException(status_code=404, detail="Foto tidak ditemukan")
    try:
        delete_file(photo.image_url.replace(settings.R2_PUBLIC_URL + "/", ""))
        delete_file(photo.thumbnail_url.replace(settings.R2_PUBLIC_URL + "/", ""))
    except Exception:
        pass
    db.delete(photo)
    db.commit()
    return {"message": "Foto berhasil dihapus"}
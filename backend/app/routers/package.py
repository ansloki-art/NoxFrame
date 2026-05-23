from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_owner
from app.models.package import Package
from app.schemas.package import PackageCreate, PackageUpdate, PackageResponse

router = APIRouter(prefix="/api/packages", tags=["packages"])

@router.get("", response_model=List[PackageResponse])
def get_packages(db: Session = Depends(get_db)):
    return db.query(Package).filter(Package.is_active == True).order_by(Package.order_index).all()

@router.post("", response_model=PackageResponse)
def create_package(
    data: PackageCreate,
    db: Session = Depends(get_db),
    current_owner: str = Depends(get_current_owner)
):
    package = Package(**data.model_dump())
    db.add(package)
    db.commit()
    db.refresh(package)
    return package

@router.put("/{package_id}", response_model=PackageResponse)
def update_package(
    package_id: str,
    data: PackageUpdate,
    db: Session = Depends(get_db),
    current_owner: str = Depends(get_current_owner)
):
    package = db.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package tidak ditemukan")
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(package, field, value)
    db.commit()
    db.refresh(package)
    return package

@router.delete("/{package_id}")
def delete_package(
    package_id: str,
    db: Session = Depends(get_db),
    current_owner: str = Depends(get_current_owner)
):
    package = db.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package tidak ditemukan")
    package.is_active = False
    db.commit()
    return {"message": "Package berhasil dihapus"}
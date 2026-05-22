from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, create_access_token, get_current_owner
from app.models.owner import Owner
from app.schemas.auth import LoginRequest, TokenResponse, OwnerResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    owner = db.query(Owner).filter(Owner.email == request.email).first()

    if not owner or not verify_password(request.password, owner.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email atau password salah"
        )

    token = create_access_token(data={"sub": owner.email})
    return TokenResponse(access_token=token)

@router.get("/me", response_model=OwnerResponse)
def get_me(
    current_owner: str = Depends(get_current_owner),
    db: Session = Depends(get_db)
):
    owner = db.query(Owner).filter(Owner.email == current_owner).first()
    return owner
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import User
from ..schemas.schemas import RegisterIn, LoginIn
from ..core.security import hash_password, verify_password, create_access_token
from ..utils.responses import ok, err

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register(body: RegisterIn, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == body.email).first():
        return err("EMAIL_EXISTS", "An account with this email already exists", 409)
    user = User(
        email=body.email,
        hashed_password=hash_password(body.password),
        full_name=body.full_name,
        role=body.role,
        organisation=body.organisation,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return ok({"id": user.id, "email": user.email, "role": user.role})


@router.post("/login")
def login(body: LoginIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.hashed_password):
        return err("INVALID_CREDENTIALS", "Incorrect email or password", 401)
    token = create_access_token(str(user.id), user.role)
    return ok({"access_token": token, "token_type": "bearer", "role": user.role, "name": user.full_name})

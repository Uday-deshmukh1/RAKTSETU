from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from ..models.models import Drive, Registration, User
from ..schemas.schemas import DriveCreate
from ..core.deps import get_current_user, require_role
from ..services.qr import new_share_token, share_url, qr_base64
from ..services.audit import log_action
from ..utils.responses import ok, err

router = APIRouter(prefix="/drives", tags=["drives"])


@router.get("")
def list_drives(
    city: Optional[str] = None,
    date: Optional[datetime] = None,
    seats: Optional[int] = Query(None, ge=0),
    db: Session = Depends(get_db),
):
    q = db.query(Drive, func.count(Registration.id).label("reg_count"))\
        .outerjoin(Registration, Registration.drive_id == Drive.id)\
        .filter(Drive.status == "active")
    if city:
        q = q.filter(Drive.city.ilike(f"%{city}%"))
    if date:
        q = q.filter(func.date(Drive.date) == date.date())
    rows = q.group_by(Drive.id).order_by(Drive.date.asc()).all()
    result = []
    for drive, reg_count in rows:
        if seats is not None and (drive.target_count - reg_count) < seats:
            continue
        result.append({
            "id": drive.id,
            "name": drive.name,
            "date": drive.date.isoformat(),
            "venue": drive.venue,
            "city": drive.city,
            "target_count": drive.target_count,
            "screening_info_link": drive.screening_info_link,
            "share_token": drive.share_token,
            "status": drive.status,
            "registration_count": reg_count,
            "seats_left": max(drive.target_count - reg_count, 0),
        })
    return ok(result)


@router.post("")
def create_drive(
    body: DriveCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(require_role("organiser")),
):
    drive = Drive(
        owner_id=int(user["user_id"]),
        name=body.name,
        date=body.date,
        venue=body.venue,
        city=body.city,
        target_count=body.target_count,
        screening_info_link=body.screening_info_link,
        share_token=new_share_token(),
    )
    db.add(drive)
    db.commit()
    db.refresh(drive)
    log_action(
        db, "drive.created", "drive", drive.id, drive.id,
        actor_id=int(user["user_id"]), actor_role=user["role"], detail=drive.name,
    )
    url = share_url(drive.share_token)
    return ok({
        "id": drive.id,
        "name": drive.name,
        "share_url": url,
        "qr_code_base64": qr_base64(url),
    }, 201)


@router.get("/{drive_id}")
def drive_detail(drive_id: int, db: Session = Depends(get_db)):
    drive = db.get(Drive, drive_id)
    if not drive:
        return err("NOT_FOUND", "Drive not found", 404)
    reg_count = db.query(func.count(Registration.id)).filter(Registration.drive_id == drive_id).scalar() or 0
    url = share_url(drive.share_token)
    return ok({
        "id": drive.id,
        "name": drive.name,
        "date": drive.date.isoformat(),
        "venue": drive.venue,
        "city": drive.city,
        "target_count": drive.target_count,
        "screening_info_link": drive.screening_info_link,
        "status": drive.status,
        "registration_count": reg_count,
        "share_url": url,
        "qr_code_base64": qr_base64(url),
    })

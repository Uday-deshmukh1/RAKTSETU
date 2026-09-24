from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from ..models.models import Drive, Registration, CheckIn, AuditLog
from ..schemas.schemas import AuditOut
from ..core.deps import get_current_user
from ..utils.responses import ok, err

router = APIRouter(prefix="/drives", tags=["dashboard"])


@router.get("/{drive_id}/dashboard")
def dashboard(
    drive_id: int,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    drive = db.get(Drive, drive_id)
    if not drive:
        return err("NOT_FOUND", "Drive not found", 404)

    total = db.query(func.count(Registration.id)).filter(Registration.drive_id == drive_id).scalar() or 0
    confirmed = db.query(func.count(Registration.id)).filter(
        Registration.drive_id == drive_id, Registration.confirmation_status == "confirmed"
    ).scalar() or 0
    pending = db.query(func.count(Registration.id)).filter(
        Registration.drive_id == drive_id, Registration.confirmation_status == "pending"
    ).scalar() or 0
    actual = db.query(func.count(CheckIn.id)).filter(CheckIn.drive_id == drive_id).scalar() or 0

    predicted = None
    try:
        from ..services.prediction import drive_predicted_attendance
        predicted = drive_predicted_attendance(db, drive_id)
    except Exception:
        predicted = float(confirmed)

    audits = (
        db.query(AuditLog)
        .filter(AuditLog.drive_id == drive_id)
        .order_by(AuditLog.created_at.desc())
        .limit(50)
        .all()
    )

    return ok({
        "drive": {
            "id": drive.id,
            "name": drive.name,
            "date": drive.date.isoformat(),
            "venue": drive.venue,
            "city": drive.city,
            "target_count": drive.target_count,
            "status": drive.status,
        },
        "stats": {
            "total_registrations": total,
            "confirmed_participants": confirmed,
            "pending_confirmations": pending,
            "predicted_attendance": predicted,
            "actual_attendance": actual,
            "target_count": drive.target_count,
        },
        "audit_log": [
            {
                "id": a.id,
                "action": a.action,
                "entity_type": a.entity_type,
                "entity_id": a.entity_id,
                "actor_role": a.actor_role,
                "detail": a.detail,
                "created_at": a.created_at.isoformat(),
            }
            for a in audits
        ],
    })

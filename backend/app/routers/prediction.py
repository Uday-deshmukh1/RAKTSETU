from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import Registration, Drive, Donor
from ..core.deps import get_current_user
from ..services.prediction import update_registration_probability, prediction_interval
from ..utils.responses import ok, err

router = APIRouter(tags=["prediction"])


@router.get("/drives/{drive_id}/prediction")
def drive_prediction(
    drive_id: int,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    drive = db.get(Drive, drive_id)
    if not drive:
        return err("NOT_FOUND", "Drive not found", 404)
    regs = db.query(Registration).filter(Registration.drive_id == drive_id).all()
    per_reg = []
    total = 0.0
    for reg in regs:
        p = update_registration_probability(db, reg.id)
        db.refresh(reg)
        total += p
        per_reg.append({
            "registration_id": reg.id,
            "donor_id": reg.donor_id,
            "probability": p,
            "confirmation_status": reg.confirmation_status,
        })
    return ok({
        "drive_id": drive_id,
        "predicted_attendance": round(total, 2),
        "target_count": drive.target_count,
        "breakdown": per_reg,
    })


@router.get("/registrations/{registration_id}/prediction")
def registration_prediction(
    registration_id: int,
    confidence: float = Query(0.9, gt=0, lt=1),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    reg = db.get(Registration, registration_id)
    if not reg:
        return err("NOT_FOUND", "Registration not found", 404)
    update_registration_probability(db, reg.id)
    db.refresh(reg)
    interval = prediction_interval(reg, confidence)
    return ok({
        "registration_id": reg.id,
        "confirmation_status": reg.confirmation_status,
        "last_response": reg.last_response,
        **interval,
    })

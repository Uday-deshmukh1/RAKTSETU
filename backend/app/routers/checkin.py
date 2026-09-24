from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import Drive, Registration, CheckIn, Donor
from ..schemas.schemas import CheckInIn
from ..core.deps import get_current_user
from ..services.audit import log_action
from ..utils.responses import ok, err

router = APIRouter(prefix="/checkin", tags=["checkin"])


@router.post("/{donor_id}")
def check_in(
    donor_id: int,
    body: CheckInIn,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    drive = db.get(Drive, body.drive_id)
    if not drive:
        return err("NOT_FOUND", "Drive not found", 404)

    reg = db.query(Registration).filter(
        Registration.drive_id == body.drive_id,
        Registration.donor_id == donor_id,
    ).first()
    if not reg:
        return err("NOT_REGISTERED", "Donor is not registered for this drive", 404)

    donor = db.get(Donor, donor_id)
    if donor and not donor.consent_current_drive:
        return err("CONSENT_REQUIRED", "Donor has withdrawn consent for this drive", 403)

    existing = db.query(CheckIn).filter(CheckIn.registration_id == reg.id).first()
    if existing:
        return err("ALREADY_CHECKED_IN", "Donor already checked in", 409)

    checkin = CheckIn(
        registration_id=reg.id,
        drive_id=body.drive_id,
        donor_id=donor_id,
        checked_in_by=int(user["user_id"]),
    )
    db.add(checkin)
    db.commit()
    db.refresh(checkin)
    log_action(
        db, "donor.checked_in", "checkin", checkin.id, body.drive_id,
        actor_id=int(user["user_id"]), actor_role=user["role"],
        detail=f"Donor {donor_id} checked in",
    )
    return ok({
        "checkin_id": checkin.id,
        "donor_id": donor_id,
        "drive_id": body.drive_id,
        "checked_in_at": checkin.checked_in_at.isoformat(),
    }, 201)

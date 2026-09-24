from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import Drive, Donor, Registration
from ..schemas.schemas import DonorRegisterIn, ConsentPatch, SignalIn
from ..services.audit import log_action
from ..utils.responses import ok, err

router = APIRouter(tags=["donors"])


@router.post("/drives/{drive_id}/register")
def register_donor(drive_id: int, body: DonorRegisterIn, db: Session = Depends(get_db)):
    drive = db.get(Drive, drive_id)
    if not drive:
        return err("NOT_FOUND", "Drive not found", 404)
    if drive.status != "active":
        return err("DRIVE_CLOSED", "This drive is not open for registration", 400)

    donor = db.query(Donor).filter(Donor.phone == body.phone).first()
    if not donor:
        donor = Donor(
            full_name=body.full_name,
            phone=body.phone,
            email=body.email,
            preferred_language=body.preferred_language,
            consent_current_drive=body.consent_current_drive,
            consent_future_drives=body.consent_future_drives,
        )
        db.add(donor)
        db.flush()
    else:
        donor.full_name = body.full_name
        if body.email:
            donor.email = body.email
        donor.preferred_language = body.preferred_language
        if not donor.consent_future_drives and body.consent_future_drives:
            donor.consent_future_drives = True

    existing = db.query(Registration).filter(
        Registration.drive_id == drive_id, Registration.donor_id == donor.id
    ).first()
    if existing:
        return err("ALREADY_REGISTERED", "This donor is already registered for this drive", 409)

    if not body.consent_current_drive:
        return err("CONSENT_REQUIRED", "Consent for communication about this drive is required to register", 422)

    reg = Registration(
        drive_id=drive_id,
        donor_id=donor.id,
        confirmation_status="pending",
        communication_stage="registered",
    )
    db.add(reg)
    db.commit()
    db.refresh(reg)
    log_action(
        db, "donor.registered", "registration", reg.id, drive_id,
        detail=f"{body.full_name} registered",
    )
    return ok({"registration_id": reg.id, "donor_id": donor.id, "confirmation_status": reg.confirmation_status}, 201)


@router.patch("/donors/{donor_id}/consent")
def update_consent(donor_id: int, body: ConsentPatch, db: Session = Depends(get_db)):
    donor = db.get(Donor, donor_id)
    if not donor:
        return err("NOT_FOUND", "Donor not found", 404)
    changed = []
    if body.consent_current_drive is not None:
        donor.consent_current_drive = body.consent_current_drive
        changed.append(f"current_drive={body.consent_current_drive}")
    if body.consent_future_drives is not None:
        donor.consent_future_drives = body.consent_future_drives
        changed.append(f"future_drives={body.consent_future_drives}")
    if not changed:
        return err("NO_CHANGES", "Nothing to update", 400)
    db.commit()
    log_action(
        db, "consent.updated", "donor", donor_id,
        actor_role="donor", detail=", ".join(changed),
    )
    return ok({
        "donor_id": donor.id,
        "consent_current_drive": donor.consent_current_drive,
        "consent_future_drives": donor.consent_future_drives,
        "withdrawn_future": not donor.consent_future_drives,
    })


@router.post("/donors/{donor_id}/signals")
def log_signal(donor_id: int, body: SignalIn, db: Session = Depends(get_db)):
    donor = db.get(Donor, donor_id)
    if not donor:
        return err("NOT_FOUND", "Donor not found", 404)

    reg = (
        db.query(Registration)
        .join(Drive, Drive.id == Registration.drive_id)
        .filter(Registration.donor_id == donor_id, Drive.status == "active")
        .order_by(Registration.created_at.desc())
        .first()
    )
    if not reg:
        return err("NO_ACTIVE_REGISTRATION", "Donor has no active drive registration", 404)

    from ..models.models import Signal

    signal = Signal(
        registration_id=reg.id,
        drive_id=reg.drive_id,
        donor_id=donor_id,
        signal_type=body.signal_type,
        channel=body.channel,
        payload=body.payload,
    )
    db.add(signal)

    reg.last_response = body.signal_type
    if body.signal_type == "confirm":
        reg.confirmation_status = "confirmed"
        reg.communication_stage = "confirmed"
    elif body.signal_type == "reply":
        reg.communication_stage = "nudged"
    elif body.signal_type == "ignore":
        reg.communication_stage = "reminded"
    elif body.signal_type == "remind":
        reg.communication_stage = "reminded"

    db.commit()
    db.refresh(signal)

    try:
        from ..services.prediction import update_registration_probability
        update_registration_probability(db, reg.id)
    except Exception:
        pass

    return ok({
        "signal_id": signal.id,
        "registration_id": reg.id,
        "confirmation_status": reg.confirmation_status,
        "communication_stage": reg.communication_stage,
    }, 201)

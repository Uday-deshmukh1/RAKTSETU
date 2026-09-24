from datetime import datetime, timezone
from typing import Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import Registration, Donor, Drive, ReminderLog
from ..core.deps import get_current_user
from ..services.prediction import update_registration_probability
from ..utils.responses import ok, err

router = APIRouter(prefix="/reminders", tags=["reminders"])

ARMS = ["gentle", "urgent", "social_proof", "gratitude"]


class ReminderNextIn(BaseModel):
    drive_id: int
    channel: str = "sms"


def pick_arm(reg: Registration, prob: float) -> str:
    if reg.confirmation_status == "confirmed":
        return "gratitude"
    if prob >= 0.7:
        return "social_proof"
    if prob >= 0.4:
        return "gentle"
    return "urgent"


def generate_text(arm: str, donor: Donor, drive: Drive, language: str, hours_left: int) -> str:
    name = donor.full_name.split()[0]
    templates = {
        "en": {
            "gentle": f"Hi {name}, a gentle reminder: {drive.name} is on {drive.date.strftime('%d %b')}. Your donation can save lives. Reply YES to confirm.",
            "urgent": f"{name}, we still need you at {drive.name} ({drive.date.strftime('%d %b')}). Only a few hours left to confirm — reply YES.",
            "social_proof": f"Many donors like you have already confirmed for {drive.name} on {drive.date.strftime('%d %b')}. Join them — reply YES.",
            "gratitude": f"Thank you for confirming, {name}! See you at {drive.name}, {drive.venue}.",
        },
        "hi": {
            "gentle": f"नमस्ते {name}, {drive.name} {drive.date.strftime('%d %b')} को है। कृपया पुष्टि करें — हाँ लिखें।",
            "urgent": f"{name}, {drive.name} में आपकी ज़रूरत है। कुछ ही घंटे बाकी हैं — हाँ लिखें।",
            "social_proof": f"कई दाताओं ने {drive.name} के लिए पुष्टि कर दी है। आप भी जुड़ें — हाँ लिखें।",
            "gratitude": f"धन्यवाद {name}! {drive.name} पर मिलते हैं।",
        },
        "mr": {
            "gentle": f"नमस्कार {name}, {drive.name} दिनांक {drive.date.strftime('%d %b')} रोजी आहे. कृपया निश्चित करा — हो लिहा.",
            "urgent": f"{name}, {drive.name} साठी तुमची गरज आहे. थोडीच वेळ उरली आहे — हो लिहा.",
            "social_proof": f"अनेक दात्यांनी {drive.name} साठी निश्चित केले आहे. तुम्हीही सहभागी व्हा — हो लिहा.",
            "gratitude": f"धन्यवाद {name}! {drive.name} ला भेटूया.",
        },
    }
    lang_templates = templates.get(language, templates["en"])
    return lang_templates.get(arm, lang_templates["gentle"])


@router.post("/next")
def next_reminder(
    body: ReminderNextIn,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    drive = db.get(Drive, body.drive_id)
    if not drive:
        return err("NOT_FOUND", "Drive not found", 404)

    reg = (
        db.query(Registration)
        .join(Donor, Donor.id == Registration.donor_id)
        .filter(
            Registration.drive_id == body.drive_id,
            Registration.confirmation_status == "pending",
            Donor.consent_current_drive.is_(True),
        )
        .order_by(Registration.attendance_probability.asc().nullsfirst())
        .first()
    )
    if not reg:
        return err("NO_PENDING", "No pending registrants need a reminder", 404)

    donor = db.get(Donor, reg.donor_id)
    if not donor or not donor.consent_current_drive:
        return err("CONSENT_REQUIRED", "Donor has withdrawn consent for this drive", 403)

    prob = update_registration_probability(db, reg.id)
    db.refresh(reg)
    hours_left = max(int((drive.date - datetime.now(timezone.utc)).total_seconds() // 3600), 0)
    arm = pick_arm(reg, prob)
    text = generate_text(arm, donor, drive, donor.preferred_language, hours_left)

    log = ReminderLog(
        registration_id=reg.id,
        arm=arm,
        message_text=text,
        language=donor.preferred_language,
        channel=body.channel,
    )
    db.add(log)
    reg.communication_stage = "reminded"
    reg.last_response = "remind"
    db.commit()

    return ok({
        "registration_id": reg.id,
        "donor_id": donor.id,
        "arm": arm,
        "language": donor.preferred_language,
        "channel": body.channel,
        "message": text,
        "probability": prob,
        "hours_until_event": hours_left,
    })

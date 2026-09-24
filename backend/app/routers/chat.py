from typing import Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database import get_db
from ..core.deps import get_current_user
from ..config import get_settings
from ..utils.responses import ok, err

router = APIRouter(prefix="/chat", tags=["chat"])
settings = get_settings()

INTENTS = {
    "eligibility": ["eligible", "eligibility", "can i donate", "am i allowed", "medical", "disease", "haemoglobin", "hemoglobin", "weight", "age limit"],
    "drive_info": ["where", "venue", "address", "time", "date", "when", "location"],
    "registration_help": ["register", "signup", "sign up", "how to join", "link"],
    "consent": ["consent", "unsubscribe", "stop messages", "opt out", "withdraw", "privacy"],
    "prediction_status": ["will i get reminder", "prediction", "probability", "score"],
}

REFUSAL = (
    "I can't help with medical eligibility or screening — that's decided by "
    "authorised medical professionals at the camp. Please check the official "
    "screening information link on the drive page, or ask the on-site medical team."
)


class ChatIn(BaseModel):
    message: str
    drive_id: Optional[int] = None
    language: str = "en"


def classify_intent(text: str) -> str:
    low = text.lower()
    for intent, keywords in INTENTS.items():
        if any(k in low for k in keywords):
            return intent
    return "general"


def rag_answer(intent: str, text: str, drive_id: Optional[int], db: Session) -> str:
    if intent == "eligibility":
        return REFUSAL
    if intent == "consent":
        return (
            "You control your consent. Reply STOP or use the consent setting in your "
            "profile to withdraw consent for future drives at any time — it takes effect "
            "immediately for future communication."
        )
    if intent == "drive_info" and drive_id:
        from ..models.models import Drive
        drive = db.get(Drive, drive_id)
        if drive:
            return (
                f"{drive.name} is on {drive.date.strftime('%d %b %Y %I:%M %p')} at "
                f"{drive.venue}, {drive.city}. Screening info: {drive.screening_info_link or 'ask the organiser'}"
            )
    if intent == "registration_help":
        return "Open the drive share link or scan the drive QR code, fill the short form, and you'll get an instant confirmation."
    if intent == "prediction_status":
        return "We use your confirmation and reminder responses to estimate turnout — no scores are shown to donors. Just reply YES to confirm and help the organiser plan."
    return (
        "I can help with drive details, registration, reminders, and consent. "
        "For medical eligibility, please refer to the official screening information or camp medical staff."
    )


@router.post("")
def chat(
    body: ChatIn,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    if not body.message.strip():
        return err("EMPTY_MESSAGE", "Message cannot be empty", 400)
    intent = classify_intent(body.message)
    answer = rag_answer(intent, body.message, body.drive_id, db)
    return ok({"intent": intent, "answer": answer, "routed_to_human": intent == "eligibility"})

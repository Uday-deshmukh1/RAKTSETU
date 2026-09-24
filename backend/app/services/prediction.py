from decimal import Decimal
from sqlalchemy.orm import Session
from scipy.stats import beta
from ..models.models import Registration, Signal, CheckIn

PRIORS = {"alpha": 2.0, "beta": 2.0}

SIGNAL_WEIGHTS = {
    "confirm": (3.0, 0.5),
    "reply": (1.5, 1.0),
    "open": (1.0, 1.0),
    "remind": (0.5, 1.5),
    "ignore": (0.2, 2.0),
}


def update_registration_probability(db: Session, registration_id: int) -> float:
    reg = db.get(Registration, registration_id)
    if not reg:
        raise ValueError("registration not found")

    signals = db.query(Signal).filter(Signal.registration_id == registration_id).all()
    alpha = PRIORS["alpha"]
    beta_a = PRIORS["beta"]
    for s in signals:
        a, b = SIGNAL_WEIGHTS.get(s.signal_type, (0.5, 1.0))
        alpha += a
        beta_a += b

    if reg.confirmation_status == "confirmed":
        alpha += 4.0
    elif reg.confirmation_status == "declined":
        beta_a += 4.0

    checked = db.query(CheckIn).filter(CheckIn.registration_id == registration_id).first()
    if checked:
        alpha += 10.0

    prob = alpha / (alpha + beta_a)
    reg.attendance_probability = Decimal(str(round(prob, 4)))
    from datetime import datetime, timezone
    reg.attendance_probability_updated_at = datetime.now(timezone.utc)
    db.commit()
    return prob


def prediction_interval(reg: Registration, confidence: float = 0.9) -> dict:
    alpha = PRIORS["alpha"]
    beta_a = PRIORS["beta"]
    if reg.attendance_probability is not None:
        p = float(reg.attendance_probability)
        alpha = max(p * 20, 0.1)
        beta_a = max((1 - p) * 20, 0.1)
    lower = beta.ppf((1 - confidence) / 2, alpha, beta_a)
    upper = beta.ppf(1 - (1 - confidence) / 2, alpha, beta_a)
    mean = alpha / (alpha + beta_a)
    return {"probability": round(mean, 4), "lower": round(lower, 4), "upper": round(upper, 4), "confidence": confidence}


def drive_predicted_attendance(db: Session, drive_id: int) -> float:
    regs = db.query(Registration).filter(Registration.drive_id == drive_id).all()
    total = 0.0
    for reg in regs:
        if reg.attendance_probability is None:
            update_registration_probability(db, reg.id)
            db.refresh(reg)
        total += float(reg.attendance_probability or 0)
    return round(total, 2)

from sqlalchemy.orm import Session
from ..models.models import AuditLog


def log_action(
    db: Session,
    action: str,
    entity_type: str,
    entity_id: int | None = None,
    drive_id: int | None = None,
    actor_id: int | None = None,
    actor_role: str | None = None,
    detail: str | None = None,
):
    entry = AuditLog(
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        drive_id=drive_id,
        actor_id=actor_id,
        actor_role=actor_role,
        detail=detail,
    )
    db.add(entry)
    db.commit()
    return entry

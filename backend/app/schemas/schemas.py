from datetime import datetime
from typing import Optional, List, Any
from pydantic import BaseModel, EmailStr, Field


class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    full_name: str
    role: str = Field(default="volunteer", pattern="^(organiser|volunteer)$")
    organisation: Optional[str] = None


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class DriveCreate(BaseModel):
    name: str
    date: datetime
    venue: str
    city: str
    target_count: int = Field(default=0, ge=0)
    screening_info_link: Optional[str] = None


class DriveOut(BaseModel):
    id: int
    name: str
    date: datetime
    venue: str
    city: str
    target_count: int
    screening_info_link: Optional[str]
    share_token: str
    status: str
    registration_count: int = 0

    class Config:
        from_attributes = True


class DonorRegisterIn(BaseModel):
    full_name: str
    phone: str
    email: Optional[EmailStr] = None
    preferred_language: str = "en"
    consent_current_drive: bool = True
    consent_future_drives: bool = True


class ConsentPatch(BaseModel):
    consent_current_drive: Optional[bool] = None
    consent_future_drives: Optional[bool] = None


class SignalIn(BaseModel):
    signal_type: str = Field(pattern="^(confirm|open|reply|ignore|remind)$")
    channel: str = Field(default="sms", pattern="^(sms|whatsapp|email|call)$")
    payload: Optional[str] = None


class CheckInIn(BaseModel):
    drive_id: int


class DashboardStats(BaseModel):
    total_registrations: int
    confirmed_participants: int
    pending_confirmations: int
    predicted_attendance: Optional[float]
    actual_attendance: int
    target_count: int


class AuditOut(BaseModel):
    id: int
    action: str
    entity_type: str
    entity_id: Optional[int]
    actor_role: Optional[str]
    detail: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

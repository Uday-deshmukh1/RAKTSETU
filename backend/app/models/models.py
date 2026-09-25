from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime, Text, ForeignKey,
    Numeric, UniqueConstraint, func,
)
from sqlalchemy.orm import relationship
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, default="volunteer")  # organiser | volunteer
    organisation = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    drives = relationship("Drive", back_populates="owner")


class Drive(Base):
    __tablename__ = "drives"

    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    date = Column(DateTime(timezone=True), nullable=False)
    venue = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False, index=True)
    target_count = Column(Integer, nullable=False, default=0)
    screening_info_link = Column(Text, nullable=True)
    share_token = Column(String(64), unique=True, nullable=False, index=True)
    status = Column(String(20), nullable=False, default="active")  # active | completed | cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="drives")
    registrations = relationship("Registration", back_populates="drive")
    signals = relationship("Signal", back_populates="drive")
    checkins = relationship("CheckIn", back_populates="drive")


class Donor(Base):
    __tablename__ = "donors"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False, index=True)
    email = Column(String(255), nullable=True, index=True)
    preferred_language = Column(String(20), nullable=False, default="en")
    consent_current_drive = Column(Boolean, nullable=False, default=True)
    consent_future_drives = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    registrations = relationship("Registration", back_populates="donor")
    signals = relationship("Signal", back_populates="donor")


class Registration(Base):
    __tablename__ = "registrations"
    __table_args__ = (UniqueConstraint("drive_id", "donor_id", name="uq_drive_donor"),)

    id = Column(Integer, primary_key=True)
    drive_id = Column(Integer, ForeignKey("drives.id"), nullable=False)
    donor_id = Column(Integer, ForeignKey("donors.id"), nullable=False)
    confirmation_status = Column(String(20), nullable=False, default="pending")  # pending | confirmed | declined
    communication_stage = Column(String(20), nullable=False, default="registered")
    last_response = Column(String(40), nullable=True)
    attendance_probability = Column(Numeric(5, 4), nullable=True)
    attendance_probability_updated_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    drive = relationship("Drive", back_populates="registrations")
    donor = relationship("Donor", back_populates="registrations")
    signals = relationship("Signal", back_populates="registration", foreign_keys="[Signal.registration_id]")
    checkin = relationship("CheckIn", back_populates="registration", uselist=False)


class Signal(Base):
    __tablename__ = "signals"

    id = Column(Integer, primary_key=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"), nullable=False)
    drive_id = Column(Integer, ForeignKey("drives.id"), nullable=False)
    donor_id = Column(Integer, ForeignKey("donors.id"), nullable=False)
    signal_type = Column(String(40), nullable=False)  # confirm | open | reply | ignore | remind
    channel = Column(String(20), nullable=False, default="sms")  # sms | whatsapp | email | call
    payload = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)

    registration = relationship("Registration", back_populates="signals", foreign_keys=[registration_id])
    drive = relationship("Drive", back_populates="signals")
    donor = relationship("Donor", back_populates="signals")


class CheckIn(Base):
    __tablename__ = "checkins"
    __table_args__ = (UniqueConstraint("registration_id", name="uq_checkin_registration"),)

    id = Column(Integer, primary_key=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"), nullable=False, unique=True)
    drive_id = Column(Integer, ForeignKey("drives.id"), nullable=False)
    donor_id = Column(Integer, ForeignKey("donors.id"), nullable=False)
    checked_in_at = Column(DateTime(timezone=True), server_default=func.now())
    checked_in_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    drive = relationship("Drive", back_populates="checkins")
    registration = relationship("Registration", back_populates="checkin")


class ReminderLog(Base):
    __tablename__ = "reminder_logs"

    id = Column(Integer, primary_key=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"), nullable=False)
    arm = Column(String(40), nullable=False)  # bandit arm chosen
    message_text = Column(Text, nullable=False)
    language = Column(String(20), nullable=False, default="en")
    channel = Column(String(20), nullable=False, default="sms")
    sent_at = Column(DateTime(timezone=True), server_default=func.now())


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True)
    actor_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    actor_role = Column(String(20), nullable=True)
    action = Column(String(80), nullable=False)
    entity_type = Column(String(40), nullable=False)
    entity_id = Column(Integer, nullable=True)
    drive_id = Column(Integer, ForeignKey("drives.id"), nullable=True)
    detail = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)

from fastapi import Depends, Header, HTTPException
from typing import Optional
from .security import decode_token


def get_current_user(authorization: Optional[str] = Header(None)) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="NOT_AUTHENTICATED")
    token = authorization.split(" ", 1)[1]
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="INVALID_TOKEN")
    return {"user_id": payload.get("sub"), "role": payload.get("role")}


def require_role(*roles: str):
    def checker(user: dict = Depends(get_current_user)) -> dict:
        if user.get("role") not in roles:
            raise HTTPException(status_code=403, detail="FORBIDDEN")
        return user

    return checker

import secrets
import qrcode
import io
import base64
from ..config import get_settings

settings = get_settings()


def new_share_token() -> str:
    return secrets.token_urlsafe(16)


def share_url(token: str) -> str:
    return f"{settings.frontend_url}/register/{token}"


def qr_base64(url: str) -> str:
    img = qrcode.make(url)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("ascii")

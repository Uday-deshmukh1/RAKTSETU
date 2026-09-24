from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .database import Base, engine
from .utils.responses import err
from .routers import auth, drives, donors, checkin, dashboard, prediction, reminders, chat

settings = get_settings()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="RaktSetu API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.cors_origins.split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = "/api/v1"
app.include_router(auth.router, prefix=api)
app.include_router(drives.router, prefix=api)
app.include_router(donors.router, prefix=api)
app.include_router(checkin.router, prefix=api)
app.include_router(dashboard.router, prefix=api)
app.include_router(prediction.router, prefix=api)
app.include_router(reminders.router, prefix=api)
app.include_router(chat.router, prefix=api)


@app.get("/health")
def health():
    return {"success": True, "data": {"status": "ok", "service": "raktsetu"}, "error": None}


@app.exception_handler(Exception)
async def global_handler(request: Request, exc: Exception):
    return err("INTERNAL_ERROR", str(exc), 500)

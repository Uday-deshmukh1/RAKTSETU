# RaktSetu

**Intelligent Blood Donation Mobilisation & Turnout Platform**
HACKRONYX 2.0 · Final Round · Team Vortex

Web app: organiser dashboard + donor registration + QR check-in + AI turnout prediction.

## Folder structure

```
RAKTSETU/
├── README.md
├── .gitignore
├── frontend/          # React (Vite) + Tailwind — Devanshu
│   └── (src, public, package.json …)
└── backend/           # FastAPI — Uday + Ayush
    ├── routes.md      # API contract — edit FIRST before code
    ├── requirements.txt
    ├── .env.example
    └── app/
        ├── main.py        # FastAPI entry + CORS
        ├── config.py
        ├── database.py
        ├── core/          # auth, JWT, roles
        ├── models/        # SQLAlchemy tables
        ├── schemas/       # Pydantic request/response
        ├── routers/       # one file per module
        │   ├── auth.py
        │   ├── drives.py
        │   ├── donors.py
        │   ├── checkin.py
        │   ├── dashboard.py
        │   ├── prediction.py   # Ayush
        │   ├── reminders.py    # Ayush
        │   └── chat.py         # Ayush
        ├── services/      # audit, QR, Bayesian prediction
        └── utils/         # response envelope
```

## Run backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

## Run frontend (when scaffolded)

```bash
cd frontend
npm install
npm run dev
```

## Team

| Person | Scope |
|--------|--------|
| Devanshu | Frontend |
| Uday | Backend, DB, auth, QR, deploy |
| Ayush | Prediction, reminders, chatbot |

## Product boundary

Mobilisation only — no medical eligibility, screening, diagnosis, inventory, or medical records.

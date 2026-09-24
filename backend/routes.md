# RaktSetu API Contract

Base URL: `/api/v1`

**Edit this file first on any route change, then update code. Never the reverse.**

## Response envelope (all routes)

```json
{ "success": true, "data": {}, "error": null }
```

```json
{ "success": false, "data": null, "error": { "code": "CONSENT_REQUIRED", "message": "..." } }
```

## Routes

| Method | Route | Purpose | Owner |
|--------|-------|---------|-------|
| POST | `/auth/register` | Create organiser/volunteer account | Uday |
| POST | `/auth/login` | Get JWT token | Uday |
| GET | `/drives` | Search/browse (city, date, seats) | Uday |
| POST | `/drives` | Organiser creates a drive | Uday |
| GET | `/drives/{id}` | Drive detail + shareable reg link + QR payload | Uday |
| POST | `/drives/{id}/register` | Donor registers + consent flags | Uday |
| PATCH | `/donors/{id}/consent` | Update or withdraw consent | Uday |
| POST | `/donors/{id}/signals` | Log live signal (confirm/open/reply/ignore) | Uday → Ayush updater |
| GET | `/drives/{id}/prediction` | Bayesian turnout probability + CI | Ayush |
| POST | `/reminders/next` | Bandit arm + LLM nudge text | Ayush |
| POST | `/checkin/{donor_id}` | QR scan → actual attendance | Uday |
| GET | `/drives/{id}/dashboard` | Predicted vs actual + audit log | Uday (calls Ayush prediction) |
| POST | `/chat` | Intent → refuse-and-route or RAG answer | Ayush |

## Consent fields (PS: two separate consents)

- `consent_current_drive` — comms for this drive only
- `consent_future_drives` — comms for future drives
- PATCH withdraw takes effect immediately for future communication

## Reminder/personalisation fields on registration

- `preferred_language`
- `communication_stage` (enum: `registered` | `reminded` | `confirmed` | `nudged`)
- `confirmation_status` (enum: `pending` | `confirmed` | `declined`)
- `last_response` (signal type or null)
- event datetime → time remaining computed server-side

## Product boundary

No medical eligibility, clinical screening, diagnosis, blood collection, inventory, or medical records in this API. Only store/link official screening information URL provided by organiser.

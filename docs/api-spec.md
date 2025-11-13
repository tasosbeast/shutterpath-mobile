# API Specification (MVP)

Base URL: `https://api.shutterpath.app/v1` (Vercel Functions).  
Responses are JSON. Errors share shape:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Prompt not available today"
  }
}
```

Supported `code` values: `BAD_REQUEST`, `UNAUTHORIZED`, `NOT_FOUND`, `RATE_LIMITED`, `INTERNAL_ERROR`.

## Auth

### POST `/auth/signup`
- Body: `{ "email": string, "password": string, "username": string }`
- Returns: `{ "user": { id, email, username }, "token": "jwt" }`

### POST `/auth/login`
- Body: `{ "email": string, "password": string }`
- Returns same shape as signup.

### GET `/me`
- Header: `Authorization: Bearer <token>`
- Returns profile basics plus `streak_days`.

## Daily Prompt

### GET `/prompts/today`
- Auth required.
- Response:
```json
{
  "prompt": {
    "id": "uuid",
    "title": "Leading Lines Hunt",
    "description": "Find repeating lines at eye level...",
    "constraints": ["50mm", "f/4", "10 min"],
    "micro_lesson": "Use grid lines to balance edges.",
    "reference_image_url": "https://..."
  }
}
```

### POST `/prompts/:id/save`
- Action: save/unsave prompt.
- Body: `{ "saved": true }`
- Response: `{ "saved": true }`

## Daily Challenge

### GET `/challenges/today`
- Returns challenge aligned with prompt date.
```json
{
  "challenge": {
    "id": "uuid",
    "title": "Lunch Break Leading Lines",
    "description": "Shoot within a 15-minute walk.",
    "focus_points": ["Lower angle", "Watch horizon"],
    "difficulty": "medium"
  }
}
```

### POST `/challenges/:id/save`
- Same contract as prompt save.

### POST `/challenges/:id/complete`
- Body: `{ "notes": "Tried subway escalator shot" }`
- Response: `{ "completed_at": "2025-11-13T12:00:00Z", "streak_days": 4 }`

## AI Critique

### POST `/critique`
- Auth required; 1 request per user every 24h.
- Multipart body: `image` (jpg/png, <5 MB).
- Response:
```json
{
  "critique": {
    "strengths": ["Framing keeps subject centered", "..."],
    "improvements": ["Bright edge pulls focus", "..."],
    "tip": "Reframe two steps left to separate subject."
  }
}
```
- Error `RATE_LIMITED` when user has already consumed daily critique.

## Profile & Progress

### GET `/profile`
Returns:
```json
{
  "user": { "id": "uuid", "username": "tasos_photo", "avatar_url": null },
  "saved_prompts": [{ "id": "uuid", "title": "...", "available_from": "2025-11-13" }],
  "saved_challenges": [{ "id": "uuid", "title": "...", "difficulty": "medium" }],
  "streak": { "current": 5, "longest": 12, "last_activity_date": "2025-11-13" }
}
```

## Analytics

### POST `/events`
- Body: `{ "event_type": "prompt_view", "entity_type": "prompt", "entity_id": "uuid", "metadata": { ... } }`
- Response: `{ "status": "recorded" }`
- Used sparingly for MVP KPIs.

## Status Codes
- `200/201` success.
- `202` accepted (events).
- `400/401/404/422/429/500` map to error codes above.

## Security Notes
- All protected routes validate Supabase JWT.
- File uploads stream to Supabase Storage; Vercel only proxies.
- Rate limiting stored in `photo_critiques` by `requested_at`.

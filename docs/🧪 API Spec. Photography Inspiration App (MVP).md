
# 1.1.7 API Spec — Photography Inspiration App (MVP)

Βασισμένο σε: Scope, User Stories, Data Models.  
Στόχος: **λίγα, καθαρά endpoints** για τα 3 core features + profile + analytics.

- Τύπος: REST-ish JSON API
    
- Auth: JWT (ή Supabase/Firebase auth token στο `Authorization: Bearer <token>`)
    
- Base URL (example): `https://api.photo-coach.app/v1`
    

---

## 0. Conventions

- Όλα τα responses είναι JSON.
    
- Protected endpoints απαιτούν header:
    
    - `Authorization: Bearer <token>`
        
- Αν κάτι πάει στραβά:
    
    ```json
    {
      "error": {
        "code": "BAD_REQUEST",
        "message": "Invalid payload"
      }
    }
    ```
    

Κωδικοί λαθών (ενδεικτικά):

- `UNAUTHORIZED`
    
- `NOT_FOUND`
    
- `VALIDATION_ERROR`
    
- `RATE_LIMITED`
    
- `INTERNAL_ERROR`
    

---

## 1. Auth & User

### 1.1 POST `/auth/signup`

**Purpose:** Δημιουργία λογαριασμού (email + password).

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "strongpassword",
  "username": "tasos_photo"
}
```

**Response 201:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "tasos_photo"
  },
  "token": "jwt-token-here"
}
```

---

### 1.2 POST `/auth/login`

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**Response 200:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "tasos_photo"
  },
  "token": "jwt-token-here"
}
```

---

### 1.3 GET `/me` _(protected)_

**Purpose:** Φόρτωμα βασικού profile.

**Response 200:**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "tasos_photo",
  "avatar_url": null,
  "created_at": "2025-11-13T21:00:00Z"
}
```

---

## 2. Daily Prompts (Inspiration Feed)

### 2.1 GET `/prompts/today` _(protected)_

**Purpose:** Daily inspiration prompt για σήμερα (US-01, US-02, US-03).

**Response 200:**

```json
{
  "prompt": {
    "id": "uuid",
    "title": "Leading Lines in the City",
    "description": "Look for natural lines that guide the viewer’s eye...",
    "reference_image_url": "https://cdn.app/prompt-1.jpg",
    "available_from": "2025-11-13"
  }
}
```

(Frontend στέλνει και analytics event `prompt_view` — βλ. Section 7.)

---

### 2.2 GET `/prompts` _(protected, optional pagination)_

**Query params (optional):**

- `cursor` ή `page`
    
- `limit`
    
- `from_date`, `to_date`
    

**Response 200:**

```json
{
  "items": [
    {
      "id": "uuid",
      "title": "Leading Lines in the City",
      "description": "short text...",
      "reference_image_url": "https://...",
      "available_from": "2025-11-13"
    }
  ],
  "next_cursor": null
}
```

---

### 2.3 POST `/prompts/:id/save` _(protected)_

**Purpose:** Save prompt (UserSavedPrompt).

**Response 200:**

```json
{ "status": "saved" }
```

---

### 2.4 DELETE `/prompts/:id/save` _(protected)_

**Response 200:**

```json
{ "status": "unsaved" }
```

---

## 3. Daily Challenges

### 3.1 GET `/challenges/today` _(protected)_

**Purpose:** Daily challenge + bullets (US-05).

**Response 200:**

```json
{
  "challenge": {
    "id": "uuid",
    "title": "Shoot Only in Black & White",
    "description": "Focus on contrast and shape...",
    "focus_points": [
      "Turn your camera to monochrome mode",
      "Look for strong contrast",
      "Avoid cluttered backgrounds"
    ],
    "difficulty": "easy",
    "available_from": "2025-11-13"
  }
}
```

---

### 3.2 POST `/challenges/:id/complete` _(protected)_

**Purpose:** Ο χρήστης μαρκάρει challenge ως completed (US-06 → ChallengeCompletion).

**Request body (optional):**

```json
{
  "source": "daily"
}
```

**Response 200:**

```json
{
  "status": "completed",
  "completion": {
    "id": "uuid",
    "completed_at": "2025-11-13T21:00:00Z"
  }
}
```

---

### 3.3 POST `/challenges/:id/save` _(protected)_

**Purpose:** Save challenge (US-07 → UserSavedChallenge).

**Response:**

```json
{ "status": "saved" }
```

---

### 3.4 DELETE `/challenges/:id/save` _(protected)_

```json
{ "status": "unsaved" }
```

---

## 4. AI Critique

### 4.1 POST `/critique` _(protected)_

**Purpose:** Ο χρήστης ανεβάζει μία φωτογραφία για feedback (US-08, US-09, US-10).

**Request:** `multipart/form-data`

- `image`: file (jpg/png)
    
- optional: `metadata` (json string) — exif info, camera, lens (future use)
    

**Response 201:**

```json
{
  "critique": {
    "id": "uuid",
    "image_url": "https://storage.app/user-123/critique-1.jpg",
    "strengths": [
      "Strong use of leading lines.",
      "Pleasant natural light.",
      "Good subject isolation."
    ],
    "improvements": [
      "Watch out for distractions in the background.",
      "The horizon is slightly tilted.",
      "The subject could be closer to the rule of thirds."
    ],
    "tip": "Next time, try moving two steps closer and slightly tilting your camera to straighten the horizon.",
    "created_at": "2025-11-13T21:00:00Z"
  },
  "rate_limit": {
    "allowed": true,
    "next_allowed_at": "2025-11-14T21:00:00Z"
  }
}
```

**Rate limiting error 429:**

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "You can request one critique every 24 hours in the MVP."
  }
}
```

---

### 4.2 GET `/critique/history` _(protected, optional for MVP)_

Για να βλέπει ο χρήστης παλιά critiques (όχι απαραίτητο στο πρώτο build, αλλά καλό να υπάρχει στο spec).

**Response 200:**

```json
{
  "items": [
    {
      "id": "uuid",
      "image_url": "https://...",
      "created_at": "2025-11-10T21:00:00Z"
    }
  ]
}
```

---

## 5. User Profile & Streaks

### 5.1 GET `/profile` _(protected)_

**Purpose:** Ό,τι χρειάζεται το profile screen (US-11, US-12, US-13).

**Response 200:**

```json
{
  "user": {
    "id": "uuid",
    "username": "tasos_photo",
    "avatar_url": null,
    "created_at": "2025-10-01T20:00:00Z"
  },
  "saved_prompts": [
    {
      "id": "uuid",
      "title": "Leading Lines in the City",
      "available_from": "2025-11-13"
    }
  ],
  "saved_challenges": [
    {
      "id": "uuid",
      "title": "Shoot Only in Black & White",
      "available_from": "2025-11-12"
    }
  ],
  "streak": {
    "current_streak_days": 5,
    "longest_streak_days": 12,
    "last_activity_date": "2025-11-13"
  }
}
```

---

## 6. Lightweight Content Management (admin – future)

Δεν είναι αναγκαίο για MVP αν τα εισάγεις χειροκίνητα στη DB, αλλά το βάζουμε σαν **concept**.

- `POST /admin/prompts`
    
- `POST /admin/challenges`
    

Only accessible by `role = 'admin'`.  
Μπορεί να μείνει **out-of-scope για το πρώτο build** και να υλοποιηθεί ως simple SQL imports / seed scripts.

---

## 7. Analytics Events

Σύμφωνα με τα User Stories (US-14, US-15, US-16), το MVP θέλει 3 βασικά events:

- `prompt_view`
    
- `challenge_complete`
    
- `critique_used`
    

Σε Supabase/Firebase μπορεί να είναι:

- είτε direct write σε `AnalyticsEvent` table,
    
- είτε απλό call σε custom endpoint.
    

### 7.1 POST `/events` _(protected)_

**Purpose:** Generic tracking endpoint.

**Request body:**

```json
{
  "event_type": "prompt_view",
  "entity_type": "prompt",
  "entity_id": "prompt-uuid",
  "metadata": {
    "screen": "daily_prompt",
    "app_version": "1.0.0"
  }
}
```

**Response 202:**

```json
{ "status": "recorded" }
```

> Σημείωση: Αν βάλεις Firebase Analytics, αυτό το endpoint μπορεί να είναι μόνο “λογικό” κομμάτι του spec, όχι actual route.

---

## 8. Error & Status Examples (Quick Reference)

- **401 UNAUTHORIZED** → missing/invalid token
    
- **404 NOT_FOUND** → prompt/challenge not found ή inactive
    
- **422 VALIDATION_ERROR** → λάθος payload (missing fields)
    
- **500 INTERNAL_ERROR** → generic “κάτι έσπασε, φτιάξ’ το Τάσο”
    

---

## 9. Mapping σε User Stories & WBS

- **Auth + /me + /profile** → WBS 6, User Stories US-11/12/13
    
- **/prompts & /challenges** → WBS 3 & 4, US-01..07
    
- **/critique** → WBS 5, US-08..10
    
- **/events** → WBS 7, US-14..16
    

Έτσι κλείνει “καθαρά” το 1.1.7 API Spec για το MVP.

---


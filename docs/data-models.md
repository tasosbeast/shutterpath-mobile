# Data Models

All tables live in Supabase/Postgres. UUIDs are generated server-side. Timestamps are ISO strings (`timestamp with time zone`).

## 1. `users`
| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | Primary key from Supabase auth |
| `email` | text | Unique |
| `username` | text | Display name |
| `avatar_url` | text | Optional |
| `plan` | text | `'free'` or `'pro'` placeholder |
| `streak_days` | integer | Derived daily; cache for fast reads |
| `last_activity_date` | date | For streak logic |
| `created_at` / `updated_at` | timestamp | Defaults from Supabase |

## 2. `prompts`
| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | PK |
| `title` | text | 60 char max |
| `description` | text | 2–3 sentences |
| `constraints` | jsonb | Array of strings |
| `micro_lesson` | text | Short paragraph |
| `reference_image_url` | text | Supabase Storage pointer |
| `available_from` | date | Unlock date |
| `available_to` | date | Optional |
| `is_active` | boolean | Defaults true |
| `created_at` / `updated_at` | timestamp | — |

## 3. `challenges`
| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | PK |
| `title` | text | Mirrors prompt theme |
| `description` | text | Optional |
| `focus_points` | jsonb | Array of 2–3 strings |
| `difficulty` | text | `'easy'`, `'medium'`, `'hard'` |
| `available_from` | date | Align with daily cadence |
| `is_active` | boolean | — |
| `created_at` / `updated_at` | timestamp | — |

## 4. `user_saved_prompts`
| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | PK |
| `user_id` | uuid | FK → users.id |
| `prompt_id` | uuid | FK → prompts.id |
| `saved_at` | timestamp | Default now |

Unique constraint on (`user_id`, `prompt_id`).

## 5. `user_saved_challenges`
Same structure as `user_saved_prompts` but referencing `challenge_id`.

## 6. `challenge_completions`
| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | PK |
| `user_id` | uuid | FK |
| `challenge_id` | uuid | FK |
| `completed_at` | timestamp | For streaks |
| `notes` | text | Optional user reflection |

## 7. `photo_critiques`
| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | PK |
| `user_id` | uuid | FK |
| `image_url` | text | Supabase Storage |
| `strengths` | jsonb | Exactly 3 strings |
| `improvements` | jsonb | Exactly 3 strings |
| `tip` | text | Single string |
| `requested_at` | timestamp | Rate limit anchor |

Unique partial index: one row per user per 24h.

## 8. `analytics_events`
| Field | Type | Notes |
| --- | --- | --- |
| `id` | uuid | PK |
| `user_id` | uuid | Nullable for anonymous |
| `event_type` | text | `prompt_view`, `challenge_complete`, `critique_used` |
| `entity_type` | text | Optional |
| `entity_id` | uuid | Optional |
| `metadata` | jsonb | e.g., `screen`, `app_version` |
| `created_at` | timestamp | Default now |

## Relationships Snapshot
- `users` 1→N `user_saved_*`, `challenge_completions`, `photo_critiques`, `analytics_events`.
- `prompts` 1→N `user_saved_prompts`.
- `challenges` 1→N `user_saved_challenges` and `challenge_completions`.
- `photo_critiques` referenced in analytics.

## Computed Views
- `daily_prompt_view`: selects latest `prompts` where `available_from = current_date`.
- `daily_challenge_view`: same pattern for `challenges`.
- `streak_view`: aggregates `challenge_completions` by date to confirm streaks before updating `users.streak_days`.

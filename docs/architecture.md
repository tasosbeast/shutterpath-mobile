# Architecture Overview

## System Diagram
- **React Native / Expo app** (TypeScript) handles UI, local state, and Supabase auth token storage.
- **Supabase** provides Auth, Postgres, and Storage. SQL policies enforce per-user access to saved items and critiques.
- **Vercel Functions** power `/critique` (and can proxy other REST endpoints) using Supabase client + OpenAI SDK.
- **OpenAI Vision** (or equivalent) generates critique bullets; responses normalized before returning.

## Frontend Structure
```
frontend/
  src/
    screens/ (DailyPrompt, Challenge, Critique, Profile)
    components/ (Cards, Buttons, EmptyStates)
    hooks/ (usePrompt, useChallenge)
    lib/ (api client, supabase wrapper)
```
- Navigation: stack + tab (Home, Challenge, Critique, Profile).
- API layer: `lib/api.ts` exposes typed functions mirroring `api-spec.md`.
- Local cache: AsyncStorage for last prompt/challenge to support offline read.

## Backend Structure
```
backend/
  functions/
    prompts-today.ts
    challenges-today.ts
    critique.ts
    profile.ts
    events.ts
  lib/
    supabase.ts
    responses.ts
    rate-limit.ts
```
- Each handler validates JWT via Supabase service key.
- Shared helpers for error formatting and schema validation (Zod).
- Critique function uploads file to Storage, calls OpenAI, enforces 24h limit, and persists summary in `photo_critiques`.

## Data Flow (Example: Critique)
1. App selects photo → uploads via `/critique`.
2. Function verifies user + rate limit, stores image, calls OpenAI with structured prompt.
3. Response normalized to `{ strengths[3], improvements[3], tip }`, stored, returned.
4. Event recorded with `/events`.

## Environment & Tooling
- `.env` keys: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`.
- Expo Config Plugins for image picker permissions.
- Linting: ESLint + Prettier; format hooks before commit.
- Testing: Jest for utility functions; integration tests for functions via `vitest` (mock Supabase).

## Observability
- Console logs minimized; use Vercel log drains.
- Basic monitoring through Supabase dashboard metrics (auth errors, DB latency).

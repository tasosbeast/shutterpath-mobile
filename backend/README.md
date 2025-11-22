# ShutterPath Backend API

Complete backend infrastructure for ShutterPath photography app.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (keep secret!)
- `OPENAI_API_KEY` - OpenAI API key for critique feature

### 3. Run Database Migrations

1. Go to your Supabase project SQL Editor
2. Run the migrations in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_views.sql`

### 4. Deploy to Vercel

```bash
npm run deploy
```

Or for local development:

```bash
npm run dev
```

## 📁 Project Structure

```
backend/
├── api/
│   ├── auth/
│   │   ├── signup.ts          # POST /api/auth/signup
│   │   └── login.ts           # POST /api/auth/login
│   ├── prompts/
│   │   ├── today.ts           # GET /api/prompts/today
│   │   └── [id]/save.ts       # POST /api/prompts/:id/save
│   ├── challenges/
│   │   ├── today.ts           # GET /api/challenges/today
│   │   └── [id]/
│   │       ├── save.ts        # POST /api/challenges/:id/save
│   │       └── complete.ts    # POST /api/challenges/:id/complete
│   ├── me.ts                  # GET /api/me
│   ├── profile.ts             # GET /api/profile
│   ├── critique.ts            # POST /api/critique
│   └── events.ts              # POST /api/events
├── lib/
│   ├── supabase.ts            # Supabase admin client
│   ├── auth.ts                # JWT validation middleware
│   ├── responses.ts           # Standardized API responses
│   └── rate-limit.ts          # Rate limiting utilities
└── supabase/
    └── migrations/            # Database schema migrations
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Sign in existing user
- `GET /api/me` - Get current user profile

### Daily Content

- `GET /api/prompts/today` - Get today's photography prompt
- `GET /api/challenges/today` - Get today's challenge

### User Actions

- `POST /api/prompts/:id/save` - Save/unsave a prompt
- `POST /api/challenges/:id/save` - Save/unsave a challenge
- `POST /api/challenges/:id/complete` - Mark challenge as complete

### Advanced Features

- `POST /api/critique` - Get AI critique for a photo (1 per 24h)
- `GET /api/profile` - Get full user profile with saved items
- `POST /api/events` - Record analytics event

## 🔐 Authentication

All endpoints except `/auth/signup` and `/auth/login` require authentication.

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Database Schema

8 tables + 3 views:

- `users` - User profiles
- `prompts` - Daily photography prompts
- `challenges` - Daily challenges
- `user_saved_prompts` - Saved prompts per user
- `user_saved_challenges` - Saved challenges per user
- `challenge_completions` - Completed challenges with streak tracking
- `photo_critiques` - AI critique history (rate limited)
- `analytics_events` - Usage analytics

Views:

- `daily_prompt_view` - Today's active prompt
- `daily_challenge_view` - Today's active challenge
- `streak_view` - User streak calculations

## 🧪 Testing

Test endpoints locally with:

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}'
```

## 📝 Notes

- OpenAI Vision API costs ~$0.01-0.03 per image
- Critique endpoint is rate-limited to 1 request per user per 24 hours
- All timestamps are in ISO 8601 format with timezone
- File uploads for critique currently accept base64 or URL

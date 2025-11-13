# ShutterPath MVP Scope

## Purpose
Deliver a lightweight daily companion for beginner and early-intermediate photographers that removes “what should I shoot?” friction and gives a single actionable improvement per day. The product combines a daily prompt, a focused challenge, and a guided AI critique so users can practice, reflect, and keep momentum without sifting through endless tutorials.

## Target Users
- Phone and entry DSLR/mirrorless shooters who want structure, not social clout.
- Pain points: idea paralysis, vague “get better” goals, and lack of kind feedback.

## Core Pillars (Build Now)
1. **Daily Prompt** – one actionable brief with clear constraints, reference image, and micro-lesson.
2. **Daily Challenge** – a gamified action step tied to the prompt with focus points and difficulty.
3. **AI Critique Lite** – upload one photo per day to receive 3 strengths, 3 improvements, and 1 tip.
4. **Progress Glance** – streak counter plus saved prompts/challenges to revisit wins.

## Out of Scope
- Social feeds, messaging, public galleries.
- Multi-photo uploads, advanced editing tools, or contest moderation.
- Payments, complex CMS, or push notification scheduling.

## Success Signals
- Prompt views and completions per active user.
- Challenge completion streaks ≥3 days.
- AI critique usage (1 per day cap) without exceeding rate limit.
- Retention across the first 7 days of install.

## Dependencies
- Expo/React Native app (frontend).
- Supabase (Auth, Postgres, Storage).
- Vercel Functions for AI critique proxy.
- OpenAI Vision (or equivalent) for critique text generation.

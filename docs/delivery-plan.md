# Delivery Plan (45-Day MVP)

## Guiding Principles
- Ship value every week; avoid parallel work on unused features.
- Keep FE/BE scope synchronized with specs.
- Content tracks (prompts/challenges) stay two sprints ahead.

## Work Breakdown Structure
1. **Foundation (Days 1–5)**
   - Repo + Expo scaffold, Supabase project, CI lint/test.
   - Implement auth screens + Supabase JWT handling.
   - Seed initial prompts/challenges via SQL scripts.

2. **Daily Loop (Days 6–18)**
   - Daily Prompt screen with save action.
   - Challenge screen with completion + streak logic.
   - Profile screen showing streak + saved items.
   - Analytics event posting for prompt view & challenge completion.

3. **AI Critique (Days 19–28)**
   - Vercel `/critique` function with rate limit + OpenAI call.
   - Frontend upload flow (ImagePicker → preview → submit).
   - Storage security policies + retention cleanup job.

4. **Polish & QA (Days 29–38)**
   - Empty/error states, loading skeletons, offline fallback for prompts.
   - Test matrix on iOS/Android simulators; fix perf issues.
   - Manual QA on daily loop and critique rate limit.

5. **Soft Launch Prep (Days 39–45)**
   - Beta build (TestFlight/Internal App Sharing).
   - Analytics dashboard checks, release notes, support docs.
   - Gather feedback from pilot users.

## Milestones
- **M1 (Day 10):** Auth + prompts list running on device.
- **M2 (Day 20):** Challenge streak working end-to-end.
- **M3 (Day 30):** AI critique returning structured feedback.
- **M4 (Day 45):** Beta build distributed with stable metrics tracking.

## Resources & Roles
- Product/design: define content calendar, UX copy.
- Frontend dev: 1 (Expo focus).
- Backend dev: 1 (Supabase/Vercel).
- Content curator: 0.25 FTE creating prompts/challenges weekly.
- QA: ad-hoc checklist before milestones.

## Acceptance Checklist
- ✅ Specs implemented (scope/data/models/api).
- ✅ Tests or manual QA notes recorded for each flow.
- ✅ Content for next 14 days loaded.
- ✅ Monitoring + runbooks documented.

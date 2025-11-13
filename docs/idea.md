# 1) One-line concept

A photographer’s companion that delivers daily shoot ideas, bite-size lessons, and gentle AI guidance—then grows into contests, image critiques, and community.

# 2) Who it’s for (start narrow)

- **Beginner → early-intermediate** photographers (phone + entry DSLR/mirrorless).
    
- Pain points: “What should I shoot today?”, “How do I learn composition fast?”, “How do I improve _this_ photo?”
    

# 3) MVP (build in 4 pillars)

**A. Inspiration feed (actionable, not endless scroll)**

- Daily prompt with constraints (e.g., “Leading lines + 50mm + f/4 + 10-minute limit”).
    
- Example photos + _why they work_ captions (micro-lessons).
    
- Save to “Shot List” with checklist.
    

**B. Skill cards (micro-lessons)**

- 60–120 second reads: rule of thirds, negative space, focal compression, histogram, shutter drag, etc.
    
- Each ends with a tiny exercise and a self-check quiz.
    

**C. Challenge mode (gamified)**

- 3 difficulty tiers; streaks, badges, XP.
    
- “Time-boxed mini-quests” designed for lunch breaks.
    

**D. AI hinting (lightweight to start)**

- User picks a photo **category** (portrait, street, landscape).
    
- App returns 2–3 improvement hints tailored to that category (e.g., “try a lower angle,” “watch your brightest edge”).
    
- No heavy image upload yet—keep it text-only suggestions or “reference overlays” to reduce complexity.
    

> Ship this first. It’s useful even without accounts or social.

# 4) Phase-2 features (after traction)

- **Photo upload + AI critique**: composition framing, exposure balance, distracting elements, subject separation; give 3 concrete edits.
    
- **Contests**: theme-based, weekly; community voting + judge’s pick; anti-spam via entry caps.
    
- **Location-aware prompts**: sunrise/sunset “golden hour”, nearby photogenic spots.
    
- **Learning paths**: portrait path, street path, landscape path; skill trees with checkpoints.
    
- **“Before/After coach”**: guide a reshoot using checklists and a compositional overlay.
    

# 5) Differentiation

- Action-first prompts (constraints + micro-lessons), not infinite mood-board.
    
- Coaching tone: “one tweak at a time,” not nitpicky roast.
    
- Tiny lessons tied to _today’s_ prompt → practice loop.
    
- Works for phone shooters; no gatekeeping.
    

# 6) Monetization (start simple)

- **Free core**: daily prompt, basic lessons, limited challenges.
    
- **Pro (€3–5/mo)**: advanced lesson packs, critique credits (AI), contest entries, location prompts, RAW workflow tips, portfolio notes.
    
- **Later**: brand challenges (ethical sponsorships), marketplace for lesson packs from creators.
    

# 7) Ethics & safety (non-negotiables)

- Transparent AI limits (“coaching, not judging”).
    
- Opt-in for public sharing/contests; clear consent for people in images.
    
- No scraping user images for model training without explicit permission.
    

# 8) Product anatomy

**User flows**

- **Daily Prompt → Shoot → Check off → Tiny quiz → XP**
    
- **Skill Card → Mini exercise → Add to Shot List**
    
- **Challenge → Timer starts → Submit outcome note/photo later**
    

**Core screens**

- Home (Today’s Prompt, weather/golden hour snippet)
    
- Learn (skill cards, paths)
    
- Challenges (timed)
    
- Shot List (todos with tags: light, lens, location)
    
- Profile (streaks, badges, saved prompts)
    

# 9) “Good AI critique”—what it should (and shouldn’t) say

- 3 bullets: **Framing**, **Light**, **Subject separation** (never 20 tips).
    
- One “do right now” tweak + one “next shoot” experiment.
    
- Example phrasing:
    
    - “Your brightest edge (sky) pulls the eye. Reframe 10° lower or add a foreground anchor.”
        
    - “Background merges with subject. Step 2m left for cleaner separation.”
        

# 10) Tech outline (lean)

**Frontend**: React Native or Expo (one codebase iOS/Android).  
**Backend**: Supabase or Firebase (auth, DB, storage—keeps ops tiny).  
**AI**: Start with prompt-engineering + rules; add image critique later with a hosted vision model.  
**Analytics**: PostHog or Amplitude (streaks, lesson completion).  
**Content**: YAML/JSON lesson packs; simple CMS (Notion → sync, or Supabase tables).

**Initial schema (sketch)**

- `users(id, plan, streak_count, xp)`
    
- `prompts(id, title, constraints[], sample_images[], skill_refs[])`
    
- `lessons(id, title, body_md, tags[], est_time_min)`
    
- `challenges(id, difficulty, timer_sec, rules[])`
    
- `user_progress(user_id, lesson_id, status, quiz_score)`
    
- `shot_list(user_id, item, due_date, tags[])`
    

# 11) 2-week sprint plan (solo-dev friendly)

**Week 1**

- Day 1–2: Wireframes for 5 screens; design tokens.
    
- Day 3–4: Implement Home + Prompt Card + streaks.
    
- Day 5–6: Learn tab with lesson reader; local cache; quiz component.
    
- Day 7: Shot List with tags and checkboxes.
    

**Week 2**

- Day 8–9: Challenges (timer + completion modal + XP).
    
- Day 10: Lightweight “AI hint”: select category → tips generator (rules + templated copy).
    
- Day 11: Basic analytics events (prompt viewed, challenge started/completed).
    
- Day 12: Paywall stub + onboarding.
    
- Day 13–14: Polish, empty states, performance pass, TestFlight/closed beta.
    

# 12) Example content to seed (you can write 20 like this)

**Prompt**: “Symmetry Hunt”  
**Constraints**: shoot straight-on, center subject, 35–50mm equiv, f/5.6–f/8, 10 minutes.  
**Micro-lesson**: Symmetry works best when edges are clean—check all four corners.  
**Try this**: Kneel to align horizon with the midpoint; use grid lines.  
**Quiz**: What breaks symmetry most often? A) Crooked edge B) Low ISO C) High shutter.

# 13) Name ideas (quick brainstorm)

- **Lightquest**, **FrameDay**, **SnapCoach**, **PhotoPrompt**, **Clickcraft**, **LensLoop**, **ShutterPath**.
    

# 14) Success metrics

- D1→D7 retention
    
- Prompts completed per user/week
    
- Lesson completion rate
    
- % users who attempt a reshoot after hints
    
- Conversion to Pro after 7 days
    

# 15) What to build first (concrete)

- Today Prompt card + Streak system
    
- 15–20 skill cards (micro-lessons)
    
- 12 challenges (4 per tier)
    
- Shot List with “Add from prompt”
    
- Simple “AI hint” via category selection
    

If you want, I can draft the first five prompts and three skill cards exactly in the tone you’ll use in-app, plus a barebones Expo project structure so you can start coding tonight.
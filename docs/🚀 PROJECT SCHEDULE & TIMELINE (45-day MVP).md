# 🚀 **PROJECT SCHEDULE & TIMELINE (45-day MVP)**

_(Με βάση τα αρχεία σου και όλο το WBS )_

Για να μη μπλέκεσαι, το timeline είναι χωρισμένο σε **6 εβδομάδες**, με καθαρά deliverables και dependencies.

---

# 🧩 **WEEK 1 — Project Setup, Branding, Documentation**

**Duration:** 7 days  
**Milestone:** _Project Foundation Completed_

### Tasks

1. Project documentation (purpose, scope, SMART, user stories)  
    → already half done thanks to τα αρχεία σου  
    → (WBS 1.1)
    
2. Trello board setup (columns by WBS)
    
3. GitHub repo + environments
    
4. Brand Kit (logo, 2 colors, 2 fonts) (WBS 2.1)
    
5. Wireframes for the 5 MVP screens (WBS 2.2)
    

### Dependencies

- Δεν απαιτεί backend.
    
- Πρέπει να γίνει πριν ξεκινήσεις development.
    

---

# 🧩 **WEEK 2 — UI + Content Skeletons + Backend Setup**

**Duration:** 7 days  
**Milestone:** _UI Ready + Backend Ready_

### Tasks

1. UI screens in Figma → implement basic mobile UI (WBS 2.2)
    
2. Build minimal component system (buttons, cards, headers)
    
3. Backend setup (Supabase/Firebase)  
    → DB models: User, Prompt, Challenge (WBS 8.1)
    
4. API routes (list prompts, list challenges, upload)
    
5. Create skeleton content:
    
    - 30 prompt titles
        
    - 30 challenge titles + bullets  
        (WBS 3.3 + 4.3)
        

### Dependencies

- Week 1 wireframes.
    
- Database must exist before AI critique.
    

---

# 🧩 **WEEK 3 — Core Features: Daily Feed + Challenges**

**Duration:** 7 days  
**Milestone:** _Daily Inspiration & Challenges fully functional_

### Tasks

**Daily Inspiration Feed (WBS 3)**

- UI implementation
    
- Swipe navigation
    
- Prompt fetch from backend
    
- Reference image support
    

**Daily Challenges (WBS 4)**

- UI + bullet list
    
- Challenge completion logic
    
- Save/unsave endpoints
    

### Dependencies

- Backend API must be ready (Week 2).
    
- Content skeletons ready.
    

---

# 🧩 **WEEK 4 — AI Critique (Core Complex Feature)**

**Duration:** 7 days  
**Milestone:** _AI Critique Functional End-to-End_

### Tasks

1. AI microservice on Vercel (WBS 5.2)
    
    - Upload endpoint
        
    - Image compression
        
    - Call to OpenAI Vision
        
    - Response formatter (3 strengths, 3 improvements, 1 tip)
        
2. Frontend:
    
    - Image upload
        
    - Loading screen
        
    - Display AI critique results
        
3. Rate limiting + small caching
    

### Dependencies

- Full backend ready (Week 2)
    
- Stable UI base (Week 3)
    

> Αυτό είναι το πιο tricky κομμάτι του MVP (σύμφωνα με το Risk Plan)  

---

# 🧩 **WEEK 5 — User Profile + Analytics + Streaks**

**Duration:** 7 days  
**Milestone:** _User System + Tracking Ready_

### Tasks

1. Profile screen (WBS 6)
    
2. Authentication (email/password)
    
3. Saved prompts + saved challenges
    
4. Streak calculation logic (server-side timestamps)
    
5. Analytics events setup (WBS 7)
    
    - prompt_view
        
    - challenge_completion
        
    - critique_used
        

### Dependencies

- All core features completed (Weeks 3–4)
    

---

# 🧩 **WEEK 6 — Testing, Fixes, Beta Deployment**

**Duration:** 7 days  
**Milestone:** _Internal Beta Release (iOS + Android)_

### Tasks

1. Full smoke testing (iOS + Android)
    
2. Bug fixes (crashes → critical → UI → content)
    
3. Upload to TestFlight
    
4. Upload to Google Play Beta
    
5. Create landing page for testers
    
6. Prepare 10 pieces of social content for onboarding
    

### Dependencies

- All previous weeks must be complete.
    

---

# 🏁 **FINAL DELIVERABLES (End of Day 45)**

- MVP Mobile App (iOS + Android)
    
- Light Branding Kit
    
- Backend + AI service
    
- 30 prompts + 30 challenges
    
- Analytics events
    
- Internal beta build
    
- Initial testers onboarded
    

Αυτά όλα συνδέονται άμεσα με τα deliverables του Scope Document σου .

---

# 🧱 **Gantt-Style Visualization (Text Version)**

`W1 |████████----------------------------| Documentation + Branding W2 |--------████████--------------------| UI + Backend + Content Skeletons W3 |----------------████████------------| Daily Feed + Challenges W4 |------------------------████████----| AI Critique System W5 |------------------------------██████| User Profile + Analytics W6 |--------------------------------████| Testing + Beta`

---

# ⭐ **KEY DEPENDENCIES (Critical Path)**

1. Documentation → 2) UI → 3) Backend → 4) Core Features → 5) AI → 6) Profile/Analytics → 7) Beta
    

Αν πέσει καθυστέρηση σε αυτά, πέφτει όλος ο χρόνος.  
Το Risk Management Plan σου ήδη το είχε προειδοποιήσει για development overload .

---

# 📌 **Milestones Summary**

|Milestone|Deadline|Description|
|---|---|---|
|M1|Day 7|Project skeleton + branding ready|
|M2|Day 14|UI + backend + content skeletons|
|M3|Day 21|Daily feed + challenges|
|M4|Day 28|AI critique E2E|
|M5|Day 35|Profile + analytics|
|M6|Day 45|Beta testers live|
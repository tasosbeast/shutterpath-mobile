# 📌 **Detailed Scope Statement – Photography Inspiration App (MVP)**

## **1. Project Scope (Τι περιλαμβάνεται στο MVP)**

Είναι η “καρδιά” του app. Μόνο τα απολύτως αναγκαία για να ξεκινήσει η εμπειρία χρήσης και να πάρεις τα πρώτα insights.

### **A. Daily Inspiration Feed (Core Feature)**

- Ένα καθημερινό φωτογραφικό prompt.
    
- Μικρή περιγραφή (συμβουλή 2–3 προτάσεων).
    
- Εικόνα αναφοράς (όχι stock-heavy, μίνιμαλ).
    
- Swipe-based navigation.
    

### **B. Daily Challenges**

- Ένα challenge την ημέρα.
    
- Περιλαμβάνει: τίτλο, οδηγία, 2–3 bullets για το τι να προσέξει ο φωτογράφος.
    
- Δεν υπάρχει ακόμα scoring, leaderboard, ή advanced gamification.
    

### **C. Basic AI Critique (Light Version)**

- Ο χρήστης ανεβάζει _1 φωτογραφία_.
    
- Το AI επιστρέφει:
    
    - 3 strengths
        
    - 3 improvement points
        
    - 1 actionable tip
        
- Δεν υπάρχει ακόμα advanced analysis (histograms, depth, composition lines).
    

### **D. User Profile**

- Username
    
- Saved prompts/challenges
    
- Streak (προαιρετικό, μικρή ένδειξη)
    

### **E. Minimal Branding & UI**

- Light brand kit (logo, χρώματα, typography).
    
- Απλό, καθαρό mobile UI (όχι full design system).
    

### **F. Analytics**

- Track:
    
    - daily prompt views
        
    - challenges completed
        
    - AI critique usage
        
- Όχι advanced metrics ή dashboards.
    

### **G. Backend (Light Version)**

- Simple database for users, prompts, challenges.
    
- Authentication (email + password, optional social later).
    
- Image upload handling για AI critique.
    

### **H. Deployment**

- Simple cloud deployment (Firebase / Supabase / Vercel).
    
- Internal beta release (TestFlight + Android Beta Store).
    

---

# ❌ **Out of Scope (Τι _ΔΕΝ_ περιλαμβάνει το MVP)**

Το κομμάτι που σώζει developers από ψυχικά τραύματα.

### **A. Social Features**

- Likes, comments, follows, feed, sharing στην κοινότητα.
    
- Community galleries.
    
- Messaging.
    

### **B. Advanced AI Tools**

- Composition grids
    
- Pose detection
    
- Style transfer
    
- AI editing
    
- Histogram analysis
    

### **C. Contests / Competitions**

- Weekly contests
    
- Votes
    
- Prizes
    
- Brand partnerships
    

### **D. Full Learning Paths**

- Course-based structure
    
- Video lessons
    
- Multi-step exercises
    

### **E. Marketplace**

- Paid packs
    
- Workshops
    
- Creator profiles
    

### **F. Full UI System**

- Design tokens
    
- Component library
    
- Complex animations
    

### **G. Web App / Desktop Version**

- Το MVP είναι _mobile only_.
    

### **H. Monetization**

- Δεν υπάρχουν πληρωμές στο MVP.
    
- Μοντέλο monetization αποφασίζεται _μετά_ το beta testing.
    

---

# 📘 **Project Deliverables (Τι πρέπει στο τέλος να παραδοθεί)**

- Mobile MVP (iOS + Android)
    
- Branding Kit (light version)
    
- Project specification document
    
- Database + API setup
    
- AI critique microservice
    
- Initial content set (30 prompts, 30 challenges)
    
- Analytics events
    
- Internal beta-ready build
    

---

# 🧱 **Constraints (Περιορισμοί)**

- 45 μέρες για την ολοκλήρωση.
    
- Μικρή ομάδα / 1 developer.
    
- Χαμηλό budget (προτιμάται Firebase/Supabase).
    
- Όχι βαριά features στο AI (για κόστος).
    

---

# 🎯 **Assumptions (Υποθέσεις που θεωρούμε αληθινές)**

- Οι φωτογράφοι θέλουν μικρή δόση καθημερινής καθοδήγησης.
    
- Το AI critique αρκεί σε basic μορφή για το MVP.
    
- Η αγορά δεν χρειάζεται social elements στο πρώτο στάδιο.
    
- Ο χρήστης δεν χρειάζεται advanced tutorials.
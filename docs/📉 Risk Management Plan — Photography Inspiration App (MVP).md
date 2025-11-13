# 📉 Risk Management Plan — Photography Inspiration App (MVP)

## 1) ⭐ **High-Level Risks (Υψηλής Προτεραιότητας)**

### **1.1 Καθυστερήσεις στο Development λόγω πολλών features σε 1 άτομο**

- **Likelihood:** High
    
- **Impact:** High
    
- **Description:** Το MVP έχει αρκετά core κομμάτια: daily prompts, challenges, AI critique, auth, backend. Για 1 developer υπάρχει ρίσκο overflow.
    
- **Mitigation:**  
    • Χωρίζεις σαφώς milestones (σύμφωνα με το WBS)  
    • Δεν ξεφεύγεις από το documented scope  
    • Κάθε feature γίνεται σε micro-sprints 2–3 ημερών
    
- **Owner:** Τάσος
    

---

### **1.2 Το AI Critique κοστίζει πολύ ή δεν δουλεύει σταθερά**

- **Likelihood:** Medium
    
- **Impact:** High
    
- **Description:** Το AI μικρο-service μπορεί να έχει κόστη ή unpredictable latency.
    
- **Mitigation:**  
    • Χρησιμοποιείς OpenAI Vision Lite outputs (3 strengths, 3 fixes, 1 tip — τίποτα άλλο)  
    • Rate limiting στο backend (1 critique per X hours)  
    • Cache responses για testing phase
    
- **Owner:** Τάσος
    

---

### **1.3 Προβλήματα με Image Uploads σε κινητό (iOS/Android)**

- **Likelihood:** Medium
    
- **Impact:** High
    
- **Description:** Τα uploads συχνά είναι η πιο ύπουλη πηγή bugs στο MVP mobile apps.
    
- **Mitigation:**  
    • Compressed uploads client-side  
    • Firebase storage rules κλειδωμένες  
    • Early testing με 3 διαφορετικά κινητά
    
- **Owner:** Τάσος
    

---

### **1.4 Έλλειψη αρκετού περιεχομένου (30 prompts + 30 challenges)**

- **Likelihood:** High
    
- **Impact:** Medium
    
- **Description:** Το MVP χρειάζεται minimum 60 κομμάτια content.
    
- **Mitigation:**  
    • Γράφεις πρώτα skeleton versions (τίτλος + bullets)  
    • Μετά κάνεις polishing  
    • Αν χρειαστείς βοήθεια: μικρό outsource pack
    
- **Owner:** Content Contributor / Τάσος
    

---

### **1.5 App Rejection από App Store / Play Store**

- **Likelihood:** Medium
    
- **Impact:** High
    
- **Description:** Συνήθως για λόγους privacy, login, ή vague AI usage.
    
- **Mitigation:**  
    • Clear Privacy Policy  
    • Minimal signup (email + pw)  
    • Ένα screen που εξηγεί ότι το AI δεν είναι medical/photo-certification tool
    
- **Owner:** Τάσος
    

---

## 2) ⚡ **Medium-Level Risks**

### **2.1 Unstable Streak Logic**

- **Likelihood:** Medium
    
- **Impact:** Medium
    
- **Description:** Αν το streak bugάρει, ο φωτογράφος νιώθει ότι τον πρόδωσαν οι θεοί του κινητού του.
    
- **Mitigation:**  
    • Server-side timestamps  
    • Clear logic: 24h window
    
- **Owner:** Τάσος
    

---

### **2.2 Poor UX (ο χρήστης δεν καταλαβαίνει τι να κάνει)**

- **Likelihood:** Medium
    
- **Impact:** Medium
    
- **Description:** Το MVP πρέπει να είναι idiot-proof. Χωρίς αυτό, το engagement πέφτει.
    
- **Mitigation:**  
    • Quick UX sanity checks σε 2–3 άτομα  
    • Clear empty states (“Δεν έχεις αποθηκευμένα prompts ακόμα”)
    
- **Owner:** Τάσος
    

---

### **2.3 App Crashes σε low-end Android συσκευές**

- **Likelihood:** Medium
    
- **Impact:** Medium
    
- **Description:** Οι Android συσκευές αγαπούν το drama.
    
- **Mitigation:**  
    • Lightweight animations  
    • Limit στο image size  
    • Testing σε ένα low-end device early
    
- **Owner:** Τάσος
    

---

### **2.4 Κακή Ποιότητα ή Ασυνεπές Περιεχόμενο**

- **Likelihood:** Medium
    
- **Impact:** Medium
    
- **Description:** Prompts ή challenges μπορεί να είναι πολύ θεωρητικά, πολύ ασαφή ή εκτός ύφους.
    
- **Mitigation:**  
    • Ένα simple style guide:  
    “Actionable, simple, 3 bullets, no jargon”
    
- **Owner:** Content Reviewer
    

---

### **2.5 Analytics Data Not Captured Correctly**

- **Likelihood:** Low
    
- **Impact:** Medium
    
- **Description:** Αν τα events δεν γραφτούν σωστά, το beta δεν δίνει insights.
    
- **Mitigation:**  
    • Testing event logs early  
    • Use Firebase DebugView
    
- **Owner:** Τάσος
    

---

## 3) 🟢 **Low-Level Risks**

### **3.1 Changes in App Requirements mid-development**

- **Likelihood:** Low
    
- **Impact:** Low
    
- **Mitigation:**  
    • Strict adherence στο Scope Statement του MVP (ήδη έτοιμο)  
    • Anything extra → parking lot για v1.1
    
- **Owner:** Τάσος
    

### **3.2 Minimal Branding όχι αρκετά cohesive**

- **Likelihood:** Low
    
- **Impact:** Low
    
- **Mitigation:**  
    • 2 fonts + 2 colors μόνο  
    • Simple, clean, photography-first
    
- **Owner:** Τάσος
    

---

# 📌 **Risk Matrix (Γρήγορη Επισκόπηση)**

|Ρίσκο|Πιθανότητα|Επίπτωση|Κατηγορία|
|---|---|---|---|
|Development overload|High|High|🔥 Critical|
|AI critique instability|Medium|High|🔥 Critical|
|Image upload issues|Medium|High|🔥 Critical|
|Content creation delay|High|Medium|⚡ Medium|
|App Store rejection|Medium|High|🔥 Critical|
|UX confusion|Medium|Medium|⚡ Medium|
|Android performance issues|Medium|Medium|⚡ Medium|
|Streak logic bugs|Medium|Medium|⚡ Medium|
|Bad content consistency|Medium|Medium|⚡ Medium|

---

# 🧭 **Mitigation Strategy in One Sentence**

Αν κρατήσεις το scope σταθερό, κάνεις micro-releases συχνά, τεστάρεις νωρίς τα uploads και το AI, και δημιουργήσεις πρώτα content-skeletons, τότε το MVP θα βγει καθαρό, γρήγορο και κυρίως… χωρίς δράματα.
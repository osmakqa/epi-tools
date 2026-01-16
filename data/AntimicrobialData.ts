import { AntimicrobialGuideEntry } from '../types';

export const ANTIMICROBIAL_DATA: AntimicrobialGuideEntry[] = [
  // --- UPPER RESPIRATORY TRACT INFECTION ---
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Pharyngitis or Tonsillitis',
    pediatric: {
      firstLine: 'Penicillin V 25–50 mg/kg/day PO divided every 6 hours for 10 days.',
      secondLine: 'Amoxicillin 50 mg/kg/day PO divided every 8–12 hours (Max: 1 g/day ) for 10 days.'
    },
    adult: {
      firstLine: 'Penicillin V 500 mg every 12 hours or 250 mg PO every 6 hours for 10 days; or Benzathine Penicillin G 1.2 MU IM as a single dose.',
      secondLine: 'Amoxicillin 500 mg PO every 12 hours for 10 days.'
    },
    remarks: 'Associated cough, colds, and oral ulcers suggest viral etiology. Co-amoxiclav is not recommended for primary cases. The goal is to eradicate GAS to prevent Acute Rheumatic Fever.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Recurrent Pharyngitis',
    pediatric: {
      firstLine: 'Penicillin V 25–50 mg/kg/day or Amoxicillin 50 mg/kg/day.',
      secondLine: 'Cefuroxime axetil 20 mg/kg/day PO divided every 12 hours or Co-amoxiclav 20–40 mg/kg/day (amoxicillin component) divided every 8 hours for 10 days.'
    },
    adult: {
      firstLine: 'Penicillin V 500 mg every 12 hours or Amoxicillin 500 mg PO every 12 hours.',
      secondLine: 'Cefuroxime axetil 500 mg–1 g/day PO every 12 hours or Co-amoxiclav 500/125 mg PO every 12 hours for 10 days.'
    },
    remarks: 'Hard to distinguish true infection from carriage. Bacteria may internalize in epithelial cells, contributing to persistence.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Peritonsillar Abscess (Quinsy)',
    pediatric: {
      firstLine: 'Ampicillin-sulbactam 100 mg/kg/day IV/IM divided every 6 hours; step down to Co-amoxiclav 40 mg/kg/day PO divided every 8 hours for 10 days.',
      secondLine: 'Ceftriaxone 50–75 mg/kg IV every 12–24 hours PLUS Metronidazole 30 mg/kg/day IV every 6 hours.'
    },
    adult: {
      firstLine: 'Ampicillin-sulbactam 6–12 g/day IV/IM divided every 6 hours; step down to Co-amoxiclav 750 mg–1.5 g/day PO divided every 8 hours for 10 days.',
      secondLine: 'Ceftriaxone 2 g IV every 24 hours PLUS Metronidazole 500 mg IV/PO every 6–8 hours.'
    },
    remarks: 'Surgical drainage is mandatory. Avoid macrolides because Fusobacterium is typically resistant.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Deep Neck / Retropharyngeal Abscess',
    pediatric: {
      firstLine: 'Ampicillin-sulbactam 100 mg/kg/day IV/IM; or Cefuroxime 100–150 mg/kg/day IV divided every 8 hours PLUS Metronidazole 30 mg/kg/day IV divided every 6 hours.',
      secondLine: 'Ceftriaxone 50–75 mg/kg/day IV divided every 12–24 hours PLUS Metronidazole 30 mg/kg/day IV.'
    },
    adult: {
      firstLine: 'Ampicillin-sulbactam 6–12 g/day IV/IM; or Cefuroxime 750 mg IV every 8 hours, then step down to Cefuroxime axetil 500 mg PO bid PLUS Metronidazole 500 mg PO every 8 hours.',
      secondLine: 'Ceftriaxone 2 g IV every 24 hours PLUS Metronidazole 500 mg IV.'
    },
    remarks: 'Surgical drainage is required. Add Clindamycin or Vancomycin if MRSA is suspected (e.g., recent hospitalization).'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Diphtheria (Membranous Pharyngitis)',
    pediatric: {
      firstLine: 'Penicillin G 100,000–150,000 U/kg/day IV every 6 hours or Procaine Penicillin 25,000–50,000 U/kg IM every 12 hours; step down to Penicillin V 25–50 mg/kg/day PO every 6 hours for 14 days.'
    },
    adult: {
      firstLine: 'Penicillin G 50,000 U/kg IV every 12 hours; step down to Penicillin V 250 mg PO every 6 hours for 14 days.',
      secondLine: 'Erythromycin 500 mg every 6 hours IV for 14 days.'
    },
    remarks: 'Requires urgent DOH notification and isolation. Antibiotics primarily function to stop toxin production and spread.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Gonococcal Pharyngitis',
    pediatric: {
      firstLine: 'Ceftriaxone: <45 kg: 125 mg IM single dose; >45 kg: 250 mg IM single dose.'
    },
    adult: {
      firstLine: 'Ceftriaxone 250 mg IM as a single dose.'
    },
    remarks: 'Many oral antibiotics like Cefixime or Cefuroxime are not effective for the pharyngeal site.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Acute Epiglottitis',
    pediatric: {
      firstLine: 'Ceftriaxone 50–100 mg/kg/day IV divided every 12–24 hours for 7–10 days.',
      secondLine: 'Ampicillin-sulbactam 100 mg/kg/day IV divided every 6 hours.'
    },
    adult: {
      firstLine: 'Ceftriaxone 2 g every 24 hours IV.',
      secondLine: 'Levofloxacin 750 mg IV every 24 hours PLUS Clindamycin 600–900 mg every 6–8 hours IV.'
    },
    remarks: 'Mandatory urgent hospitalization due to high risk of airway obstruction.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Acute Bacterial Rhinosinusitis (ABRS)',
    pediatric: {
      firstLine: 'Co-amoxiclav 45–50 mg/kg/day PO every 12 hours.',
      secondLine: 'High-dose Co-amoxiclav 90 mg/kg/day PO divided every 12 hours or Cefuroxime 30 mg/kg/day.'
    },
    adult: {
      firstLine: 'Amoxicillin 1 g tid or Co-amoxiclav 875/125 mg PO every 12 hours.',
      secondLine: 'Doxycycline 100 mg bid for 5–7 days.'
    },
    remarks: 'Prescribe only if symptoms last >10 days or worsen after initial improvement ("double sickening"). Avoid Co-trimoxazole due to high resistance.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Fungal Sinusitis (Mucormycosis)',
    adult: {
      firstLine: 'Amphotericin B 1–1.5 mg/kg/day IV or Liposomal 5–10 mg/kg/day IV.',
      secondLine: 'Posaconazole 400 mg PO bid.'
    },
    remarks: 'Rapidly fatal; predominantly affects diabetics with ketoacidosis or neutropenic patients.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Otitis Externa (Acute Diffuse)',
    pediatric: {
      firstLine: 'Ofloxacin ear drops: 1–12 years (5 drops bid); >12 years (10 drops bid) for 7–10 days.'
    },
    adult: {
      firstLine: 'Ofloxacin ear drops: 10 drops daily for 7 days.'
    },
    remarks: 'Avoid submerging the head in water during treatment.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Necrotizing Otitis Externa',
    pediatric: {
      firstLine: 'Ceftazidime 100–150 mg/kg/day IV divided every 8 hours.',
      secondLine: 'Piperacillin-tazobactam 300 mg/kg/day IV divided every 8 hours.'
    },
    adult: {
      firstLine: 'Piperacillin-tazobactam 4.5 g IV every 8 hours.',
      secondLine: 'Piperacillin-tazobactam 4.5 g IV every 6 hours +/- an Aminoglycoside.'
    },
    remarks: 'Primarily caused by P. aeruginosa. Requires 4–6 weeks of therapy if bone involvement is confirmed by CT/MRI.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Acute Otitis Media (AOM)',
    pediatric: {
      firstLine: 'Amoxicillin 80–90 mg/kg/day PO divided every 12 hours.',
      secondLine: 'Clinical Failure: High-dose Co-amoxiclav 90 mg/kg/day PO divided every 12 hours.'
    },
    adult: {
      firstLine: 'Amoxicillin 1 g every 8 hours for 10 days.',
      secondLine: 'Co-amoxiclav 875/125 mg PO every 12 hours for 10 days.'
    },
    remarks: 'For children >2 years with mild symptoms, observation for 48 hours is an option before starting antibiotics.'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Acute Mastoiditis',
    pediatric: {
      firstLine: 'Ceftriaxone 100 mg/kg/day IV divided every 12 hours PLUS Oxacillin 150–200 mg/kg/day IV divided every 6 hours.'
    },
    adult: {
      firstLine: 'Ceftriaxone 2 g IV daily or Levofloxacin 750 mg IV daily.',
      secondLine: 'Vancomycin PLUS Piperacillin-tazobactam 3.375 g IV every 6 hours.'
    },
    remarks: 'Usually a complication of AOM; requires CT/MRI scan to check for intracranial extension (e.g., brain abscess).'
  },
  {
    system: 'Upper Respiratory Tract Infection',
    disease: 'Laryngitis',
    pediatric: {
      firstLine: 'No antibiotics indicated.'
    },
    adult: {
      firstLine: 'No antibiotics indicated.'
    },
    remarks: 'Over 90% of cases are viral; treatment is supportive.'
  },

  // --- LOWER RESPIRATORY TRACT INFECTION ---
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'Bronchiolitis / Wheezy Bronchitis',
    pediatric: {
      firstLine: 'Antibiotics are not indicated unless there is evidence of secondary bacterial infection.'
    },
    adult: {
      firstLine: 'Antibiotics are not indicated.'
    },
    remarks: 'The mainstay of therapy is supportive care, including hydration and supplemental oxygen. Aerosolized Ribavirin is not available in the Philippines.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'Acute Bronchitis',
    pediatric: {
      firstLine: 'Antibiotics are indicated only if there is associated sinusitis or heavy growth on throat culture for S. pneumoniae, Group A Streptococci, or H. influenzae.'
    },
    adult: {
      firstLine: 'Antibiotics are usually not indicated.'
    },
    remarks: 'Purulent sputum alone is not an indication for antibiotic therapy. Cough can be expected to last for 2 weeks.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'Pertussis (Whooping Cough)',
    pediatric: {
      firstLine: '<6m: Azithromycin 10 mg/kg/day PO for 5 days OR Erythromycin 40 mg/kg/day divided every 6 hours for 14 days.',
      secondLine: '>6m: Azithromycin 10 mg/kg PO on Day 1, then 5 mg/kg/day on Days 2–5 OR Clarithromycin 7.5 mg/kg PO every 12 hours for 7 days (Max: 1 g/day ).'
    },
    adult: {
      firstLine: 'Azithromycin 500 mg PO on Day 1, then 250 mg daily on Days 2–5 OR Erythromycin 500 mg PO qid for 14 days OR Co-trimoxazole 160/800 mg PO bid for 14 days.'
    },
    remarks: 'Treatment aims to eradicate nasopharyngeal carriage. Prophylaxis is recommended for household contacts using similar regimens.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'Acute Bacterial Exacerbation of Chronic Bronchitis (ABECB)',
    adult: {
      firstLine: 'Mild/Moderate: Amoxicillin 500 mg tid OR Doxycycline 100 mg PO bid OR Cefuroxime 500 mg PO bid for 5–10 days.',
      secondLine: 'Severe: Co-amoxiclav 875/125 mg bid OR Azithromycin 500 mg daily for 3 days OR Clarithromycin 500 mg PO bid OR Levofloxacin 500 mg PO daily.'
    },
    remarks: 'Antibiotics are indicated if the patient has increased dyspnea, sputum volume, and sputum purulence. Usually occurs in smokers with COPD.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'Community-Acquired Pneumonia (CAP) - Neonates',
    pediatric: {
      firstLine: 'Ampicillin 100–200 mg/kg/day IV divided every 6 hours OR Penicillin G 100,000–250,000 U/kg/day IV divided every 4–6 hours.',
      secondLine: 'Severe Infections: Add Amikacin 15 mg/kg/day IV OR Gentamicin 5 mg/kg/day IV.'
    },
    remarks: 'Immunize against Pneumococcus and Hib starting at 6 weeks of age.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'CAP - Infants and Children (PCAP A/B - Non-severe)',
    pediatric: {
      firstLine: 'Complete Hib Vax: Amoxicillin 80–90 mg/kg/day PO divided every 12 hours for 5 days.',
      secondLine: 'Incomplete Hib Vax: Co-amoxiclav 80–90 mg/kg/day PO divided every 12 hours (14:1 preparation) OR Cefuroxime 20–30 mg/kg/day PO divided every 12 hours.'
    },
    remarks: 'Oral Amoxicillin and IV Penicillin have equal efficacy if feeding is tolerated. Use "High Dose" Co-amoxiclav preparations (14:1).'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'CAP - Infants and Children (PCAP C - Severe)',
    pediatric: {
      firstLine: 'Complete Hib Vax: Penicillin G 200,000 U/kg/day IV divided every 6 hours OR Ampicillin 200 mg/kg/day IV divided every 6 hours.',
      secondLine: 'Incomplete Hib Vax: Ampicillin-sulbactam 100 mg/kg/day IV divided every 6 hours OR Cefuroxime 100 mg/kg/day IV divided every 8 hours OR Ceftriaxone 100 mg/kg/day IV divided every 12 hours.'
    },
    remarks: 'Switch from IV to oral therapy once the patient is responding, feeding well, and free of complications.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'CAP - Adults (Low Risk)',
    adult: {
      firstLine: 'No co-morbids: Amoxicillin 1 g PO tid OR Azithromycin 500 mg PO daily OR Clarithromycin 500 mg PO bid.',
      secondLine: 'With co-morbids: Co-amoxiclav 1 g PO bid OR Cefuroxime axetil 500 mg PO bid ± a macrolide.'
    },
    remarks: 'Duration for S. pneumoniae is 5–7 days (3–5 days if using Azithromycin). Fluoroquinolones are not recommended as first-line for low-risk CAP.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'CAP - Adults (Moderate Risk)',
    adult: {
      firstLine: 'Ampicillin-sulbactam 1.5 g IV every 6 hours OR Cefuroxime 1.5 g IV every 8 hours OR Ceftriaxone 2 g IV every 24 hours PLUS Azithromycin 500 mg PO daily OR Clarithromycin 500 mg PO bid OR Levofloxacin 750 mg PO daily.'
    },
    remarks: 'Monotherapy with Fluoroquinolones is not recommended due to increasing GNB resistance.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'CAP - Adults (High Risk)',
    adult: {
      firstLine: 'No Pseudomonas risk: (Ceftriaxone 2 g IV every 24 hours OR Ertapenem 1 g IV every 24 hours) PLUS (Azithromycin 500 mg IV daily OR Levofloxacin 750 mg IV daily).',
      secondLine: 'With Pseudomonas risk: (Piperacillin-tazobactam 4.5 g IV every 6 hours OR Cefepime 2 g IV every 8–12 hours OR Meropenem 1 g IV every 8 hours) PLUS Azithromycin 500 mg IV daily.'
    },
    remarks: 'If MRSA is suspected, add Vancomycin (25–30 mg/kg loading dose, then 15–20 mg/kg IV every 8–12 hours).'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'Acute Empyema and Lung Abscess',
    pediatric: {
      firstLine: 'Clindamycin 25–40 mg/kg/day IV divided every 6–8 hours PLUS Ceftriaxone 50–100 mg/kg/day IV every 24 hours.'
    },
    adult: {
      firstLine: '(Clindamycin 600 mg IV every 8 hours OR Ampicillin-sulbactam 3 g IV every 6 hours) PLUS (Ceftriaxone 2 g IV every 24 hours for GNB coverage).'
    },
    remarks: 'Lung abscess treatment usually lasts 4–6 weeks. Empyema requires systemic antibiotics and drainage.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'Hospital-Acquired Pneumonia (HAP) / Ventilator-Associated Pneumonia (VAP)',
    adult: {
      firstLine: 'No mortality risk/No MRSA: Piperacillin-tazobactam 4.5 g IV every 6 hours OR Cefepime 2 g IV every 8 hours OR Meropenem 1 g IV every 8 hours.',
      secondLine: 'High mortality risk or MRSA: Above regimen PLUS Vancomycin 15–20 mg/kg IV every 8–12 hours OR Linezolid 600 mg IV every 12 hours.'
    },
    remarks: 'Standard duration is 7 days. De-escalate therapy based on culture and susceptibility results.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'Influenza',
    pediatric: {
      firstLine: 'Oseltamivir: <15 kg (30 mg bid); >15–23 kg (45 mg bid); >23–40 kg (60 mg bid); >40 kg (75 mg bid) for 5 days.'
    },
    adult: {
      firstLine: 'Oseltamivir 75 mg PO bid for 5 days.'
    },
    remarks: 'Most effective when started early. Annual vaccination is the primary prevention.'
  },
  {
    system: 'Lower Respiratory Tract Infection',
    disease: 'Allergic Bronchopulmonary Aspergillosis',
    adult: {
      firstLine: 'Itraconazole 200 mg PO bid for 16 weeks or longer.'
    },
    remarks: 'Characterized by wheezing and pulmonary infiltrates. Corticosteroids are used for acute attacks.'
  },

  // --- OCULAR INFECTIONS ---
  {
    system: 'Ocular Infections',
    disease: 'Blepharitis',
    pediatric: {
      firstLine: 'Topical antibiotic ointment is usually of no benefit.'
    },
    adult: {
      firstLine: 'Topical antibiotics for symptoms. If associated with acne rosacea: Doxycycline 100 mg PO bid x 2 weeks, then once daily.'
    },
    remarks: 'Treatment requires long-term commitment to lid hygiene using warm compresses and lid washing with a baby shampoo/water mixture.'
  },
  {
    system: 'Ocular Infections',
    disease: 'Hordeolum (Stye)',
    pediatric: {
      firstLine: 'Cloxacillin 100–150 mg/kg PO divided every 6 hours.'
    },
    adult: {
      firstLine: 'For MSSA: Cloxacillin 250–500 mg PO every 6 hours. For CA-MRSA: Co-trimoxazole 160/800 mg (2 tabs) PO bid. For HA-MRSA: Linezolid 600 mg PO bid.'
    },
    remarks: 'External hordeolum generally requires no antibiotics, only warm compresses. Internal hordeolum may require incision and drainage if an abscess points.'
  },
  {
    system: 'Ocular Infections',
    disease: 'Orbital Cellulitis',
    pediatric: {
      firstLine: 'Vancomycin 45–60 mg/kg/day IV divided every 6 hours PLUS Ceftriaxone 100 mg/kg/day IV in 1–2 doses (Max: 4 g/day ).'
    },
    adult: {
      firstLine: 'If MRSA not suspected: Piperacillin-tazobactam 4.5 g IV every 8 hours OR Ciprofloxacin 400 mg IV every 8–12 hours PLUS Clindamycin 600 mg IV every 8 hours. If MRSA suspected: Vancomycin 1 g IV every 12 hours PLUS Ceftriaxone 1 g IV every 12 hours.'
    },
    remarks: 'This is a life-threatening emergency with a risk of cavernous sinus thrombosis. Surgical debridement is needed if medical management fails within 24–36 hours.'
  },
  {
    system: 'Ocular Infections',
    disease: 'Dacryocystitis (Lacrimal Sac)',
    pediatric: {
      firstLine: 'Vancomycin 40 mg/kg/day IV divided every 6 hours PLUS Ceftazidime 100 mg/kg/day IV divided every 8 hours.'
    },
    adult: {
      firstLine: 'Mild infection: Cephalexin 500 mg PO qid OR Co-amoxiclav 875 mg PO bid OR Co-trimoxazole 160/800 mg (2 tabs) PO bid. Severe (with orbital cellulitis): Vancomycin 15–20 mg/kg/day IV every 8–12 hours PLUS Ceftriaxone 2 g IV every 24 hours.'
    },
    remarks: 'Adjust therapy based on Gram stain and cultures of the aspirate.'
  },
  {
    system: 'Ocular Infections',
    disease: 'Conjunctivitis of the Newborn',
    pediatric: {
      firstLine: 'Gonococcal: Ceftriaxone 25–50 mg/kg IV x 1 dose (Max: 125 mg).',
      secondLine: 'Chlamydia: Erythromycin 12.5 mg/kg PO every 6 hours x 14 days OR Azithromycin 20 mg/kg PO daily x 3 days. Herpes/HSV: Aciclovir 60 mg/kg/day IV divided every 8 hours x 14 days.'
    },
    remarks: 'Neonatal gonococcal conjunctivitis requires irrigation with saline to remove discharge and treatment of the mother and partner.'
  },
  {
    system: 'Ocular Infections',
    disease: 'Bacterial (Non-gonococcal) Conjunctivitis',
    pediatric: {
      firstLine: 'Levofloxacin OR Tobramycin OR Erythromycin OR Fusidic acid eye drops: 1 drop tid–qid for 5–7 days.'
    },
    adult: {
      firstLine: 'Levofloxacin OR Tobramycin OR Erythromycin OR Fusidic acid eye drops: 1 drop tid–qid for 5–7 days.'
    },
    remarks: 'Ointments are preferred for children as they stay on the eye longer, though they blur vision. Fluoroquinolones are preferred for contact lens wearers.'
  },
  {
    system: 'Ocular Infections',
    disease: 'Gonococcal Conjunctivitis',
    adult: {
      firstLine: 'Ceftriaxone 1 g IV/IM x 1 dose PLUS Azithromycin 1 g PO x 1 dose.'
    },
    remarks: 'This can progress to corneal perforation; immediate ophthalmology consult is mandatory.'
  },
  {
    system: 'Ocular Infections',
    disease: 'Keratitis (Corneal Infection)',
    pediatric: {
      firstLine: 'Bacterial: Levofloxacin 0.5% eye drops. If contact lens related: Ciprofloxacin 0.3% OR Tobramycin 0.3% drops: 1 drop every hour for 24–72 hours, then taper.',
      secondLine: 'Viral/Herpes: Ganciclovir 0.15% OR Aciclovir 3% ointment 5x/day until healed, then tid x 7 days.'
    },
    adult: {
      firstLine: 'Bacterial: Levofloxacin 0.5% eye drops. If contact lens related: Ciprofloxacin 0.3% OR Tobramycin 0.3% drops: 1 drop every hour for 24–72 hours, then taper.',
      secondLine: 'Viral/Herpes: Ganciclovir 0.15% OR Aciclovir 3% ointment 5x/day until healed, then tid x 7 days.'
    },
    remarks: 'Bacterial keratitis is sight-threatening; NEVER patch the eye and do not use topical steroids in isolation.'
  },
  {
    system: 'Ocular Infections',
    disease: 'Endophthalmitis',
    adult: {
      firstLine: 'Intravitreal administration of antimicrobials is essential; systemic therapy (e.g., Fluconazole 400–800 mg daily for Candida) may be used as an adjunct.'
    },
    remarks: 'Immediate referral to a vitreo-retinal surgeon is required for potential emergency vitrectomy.'
  },
  {
    system: 'Ocular Infections',
    disease: 'Retinitis',
    adult: {
      firstLine: 'HSV/VZV: Aciclovir 10–12 mg/kg IV every 8 hours x 7–10 days, followed by oral therapy (Aciclovir 800 mg 5x/day OR Valaciclovir 1 g tid) for at least 6 weeks.'
    },
    remarks: 'Acute Retinal Necrosis frequently results in retinal detachment and requires aggressive IV therapy. Watch for Immune Reconstitution Inflammatory Syndrome (IRIS) in HIV patients on ART.'
  },

  // --- GASTROINTESTINAL & INTRA-ABDOMINAL ---
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Acute Diarrhea and Gastroenteritis - Suspected Dysentery (Children)',
    pediatric: {
      firstLine: 'Ciprofloxacin 30 mg/kg/day PO divided into 2 doses for 3 days.'
    },
    remarks: 'The mainstay of treatment is fluids, zinc supplements, and food.'
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Suspected Cholera (Children)',
    pediatric: {
      firstLine: 'Erythromycin 250 mg PO qid for 3 days OR Tetracycline 250 mg PO qid for 3 days.'
    },
    remarks: 'Antibiotics are given to children with severe dehydration living in areas with reported cholera cases.'
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Suspected Antibiotic-Associated Colitis (Children)',
    pediatric: {
      firstLine: 'Metronidazole 30 mg/kg/day IV or PO divided into 4 doses for 10–14 days OR Vancomycin 40 mg/kg/day PO divided into 4 doses for severe disease.'
    },
    remarks: 'Mild disease does not warrant antibiotic treatment as symptoms usually resolve after discontinuing the precipitating antibiotic. Oral vancomycin is not available locally.'
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Suspected Nontyphoidal Salmonella (Severe Diarrhea)',
    pediatric: {
      firstLine: 'Infants (<6 months), malnourished, or immunocompromised children: Ciprofloxacin 30 mg/kg/day IV divided into 2 doses for 10–14 days OR Azithromycin 6 mg/kg/day PO for 5 days OR Ceftriaxone 75–100 mg/kg/day IV for 14 days.'
    }
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Other Specific Pathogens (Children)',
    pediatric: {
      firstLine: 'Campylobacter: Azithromycin 10 mg/kg/day PO for 3 days OR Erythromycin 40 mg/kg/day PO divided into 4 doses for 5 days. Entamoeba histolytica: Metronidazole 35–50 mg/kg/day PO divided into 3 doses for 7–10 days.',
      secondLine: 'Giardia: Metronidazole 15 mg/kg/day PO divided into 3 doses for 5–7 days. Cyclospora: Co-trimoxazole 10/50 mg/kg/day PO divided into 2 doses for 7–10 days.'
    }
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Gastroenteritis (Infectious Diarrhea) in Adults - Severe Diarrhea (Empiric)',
    adult: {
      firstLine: 'Ciprofloxacin 500 mg PO q12h OR Levofloxacin 500 mg PO q24h for 3–5 days OR Azithromycin 500 mg PO q24h for 3 days.'
    },
    remarks: 'Patient Population: Adult (≥6 unformed stools/day).'
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Specific Therapy (Adults)',
    adult: {
      firstLine: 'Entamoeba histolytica: Metronidazole 500–750 mg PO tid for 7–10 days OR Tinidazole 2 g PO daily for 3 days. Vibrio cholerae: Doxycycline 300 mg PO single dose OR Tetracycline 500 mg qid for 3 days.',
      secondLine: 'Shigella: Ciprofloxacin 500 mg PO bid for 3 days.'
    }
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Primary Spontaneous Bacterial Peritonitis (SBP) - Pediatric',
    pediatric: {
      firstLine: 'S. pneumoniae: Cefotaxime 200 mg/kg/day IV divided into 4 or 6 doses OR Ceftriaxone 100 mg/kg/day IV divided into 1–2 doses.',
      secondLine: 'Gram-negative bacilli: Cefotaxime 200 mg/kg/day IV OR Ceftriaxone 100 mg/kg/day IV ± Gentamicin 3–7.5 mg/kg/day IV OR Piperacillin-tazobactam 300 mg/kg/day IV.'
    }
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Primary Spontaneous Bacterial Peritonitis (SBP) - Adult',
    adult: {
      firstLine: 'Cefotaxime 2 g IV q8h OR Ampicillin-sulbactam 3 g IV q6h OR Piperacillin-tazobactam 4.5 g IV q6h OR Ceftriaxone 2 g IV q24h OR Ertapenem 1 g IV q24h.',
      secondLine: '2nd line (for ESBL): Meropenem 1 g IV q8h.'
    },
    remarks: 'Characterized by cirrhosis and ≥250 neutrophils/μL of ascitic fluid. Ceftriaxone may cause bile sludge in jaundiced/cirrhotic patients.'
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'SBP Prophylaxis (Cirrhosis with Variceal Bleeding)',
    adult: {
      firstLine: 'Norfloxacin 400 mg PO q12h for 7 days OR Ceftriaxone 1 g IV daily for 7 days.'
    }
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Secondary Peritonitis',
    pediatric: {
      firstLine: '(Metronidazole 22.5–40 mg/kg/day IV divided into 3 doses PLUS Cefotaxime 200 mg/kg/day IV divided into 4–6 doses) OR Piperacillin-tazobactam 300 mg/kg/day IV OR Meropenem 30–60 mg/kg/day IV.'
    },
    remarks: 'Usually polymicrobial. May require immediate surgery to control the source of contamination.'
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'CAPD-Associated Peritonitis - Pediatric',
    pediatric: {
      firstLine: 'Vancomycin 45–60 mg/kg/day IV or intraperitoneal (IP) in 3–4 doses PLUS Gentamicin 3–7.5 mg/kg/day IV divided into 3 doses.'
    }
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'CAPD-Associated Peritonitis - Adult',
    adult: {
      firstLine: 'Vancomycin added to dialysis fluid PLUS one of the following: Cefepime 2 g IV q8–12h, Ceftazidime 3 g loading dose IP then 1–2 g IP q24h, Meropenem 1 g IV q8h, or Amikacin 15–20 mg/kg IV q24h.'
    },
    remarks: 'Effluent WBC count >100/mm³ with ≥50% polymorphonuclear leukocytes suggests diagnosis.'
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Liver Abscess - Pediatric',
    pediatric: {
      firstLine: 'Ampicillin-sulbactam 100–200 mg/kg/day IV divided into 4 doses (Max 8 g) OR Piperacillin-tazobactam 300 mg/kg/day IV OR [Ceftriaxone 100 mg/kg/day IV PLUS Metronidazole 30–50 mg/kg/day IV for 2–3 weeks, then shift to oral to complete 4–6 weeks].'
    }
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Liver Abscess - Adult',
    adult: {
      firstLine: 'Metronidazole 500 mg PO q6–8h PLUS (Ceftriaxone 1–2 g IV daily OR Piperacillin-tazobactam 4.5 g IV q4–6h OR Ciprofloxacin 750 mg PO OR Ertapenem 1 g IV q24h).'
    },
    remarks: 'For amebic abscess, Metronidazole 750 mg IV/PO tid for 10 days is used.'
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Gallbladder Infection (Children)',
    pediatric: {
      firstLine: 'Piperacillin-tazobactam 300 mg/kg/day IV OR Ampicillin-sulbactam 100–200 mg/kg/day OR Cefotaxime 200 mg/kg/day ± Gentamicin 3.75 mg/kg/day IV.'
    }
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Acute Cholecystitis (Adults)',
    adult: {
      firstLine: 'Mild-to-moderate: Cefazolin 1–2 g IV q8h OR Cefuroxime 1.5 g IV q8h OR Ceftriaxone 1–2 g IV q12–24h.',
      secondLine: 'Severe/Elderly/Immunocompromised: Piperacillin-tazobactam 4.5 g IV q6h.'
    }
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Extra-biliary Infections (Perforated Appendicitis)',
    adult: {
      firstLine: '1st line: Cefoxitin 2 g IV q6h OR Ertapenem 1 g IV q24h.',
      secondLine: '2nd line: Metronidazole 500 mg IV PLUS Cefazolin 1–2 g IV.'
    },
    remarks: 'Therapy for established infection should be limited to 4–7 days unless source control is difficult.'
  },
  {
    system: 'Gastrointestinal & Intra-abdominal',
    disease: 'Acute Pancreatitis (Infected Necrosis)',
    adult: {
      firstLine: 'Piperacillin-tazobactam 4.5 g IV q4–6h OR Meropenem 1 g IV q8h OR (Ciprofloxacin 400 mg IV q12h PLUS Metronidazole 500 mg IV q8–12h).'
    },
    remarks: 'Prophylactic antibiotics are not advised; they should be used when clinical factors point to infected pancreatic necrosis.'
  },

  // --- BLOOD-BORNE & SYSTEMIC ---
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Neonatal Sepsis (Asymptomatic or Potentially Septic)',
    pediatric: {
      firstLine: 'Ampicillin 25–50 mg/kg IV/IM (interval varies from q12h to q6h based on gestational and postnatal age) PLUS Gentamicin 4–5 mg/kg IV/IM (interval q24h to q48h) OR Amikacin 15–18 mg/kg IV/IM.'
    },
    remarks: 'Therapy may be discontinued if blood cultures are negative after 48–72 hours and the infant remains asymptomatic. A negative CRP at 72 hours supports the decision to stop antibiotics.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Neonatal Sepsis (Proven or Symptomatic)',
    pediatric: {
      firstLine: '(Cefotaxime 50 mg/kg IV/IM q6–12h OR Ceftriaxone 50 mg/kg IV/IM q24h) PLUS (Gentamicin OR Amikacin). Add Oxacillin (25–50 mg/kg q6–12h) OR Vancomycin (10 mg/kg/dose for bacteremia) if skin/soft tissue infections are present.'
    },
    remarks: 'Avoid Ceftriaxone in jaundiced neonates due to the risk of kernicterus. Ceftriaxone must not be given with intravenous calcium. Use Ceftazidime (2nd line) if Pseudomonas is suspected.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Sepsis in Immunocompetent Children (No focus)',
    pediatric: {
      firstLine: 'Ceftriaxone 100 mg/kg/day IV/IM div q12–24h (Max: 2–4 g/day ) OR Cefotaxime 200–225 mg/kg/day IV/IM div q4–6h (Max: 8–12 g/day ) WITH OR WITHOUT Oxacillin 150–200 mg/kg/day (Max: 4–12 g) OR Vancomycin 40–60 mg/kg/day (for MRSA).'
    },
    remarks: 'Check immunization status against Pneumococcus and H. influenzae type b. Provide S. aureus coverage if there is concomitant trauma or skin infection.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Healthcare-Associated Sepsis (Pediatric)',
    pediatric: {
      firstLine: 'Ceftazidime 150–200 mg/kg/day IV/IM div q8h OR Cefepime 100–150 mg/kg/day IV/IM div q8h OR Piperacillin-tazobactam 300 mg/kg/day div q6–8h OR Meropenem 60–120 mg/kg/day div q8h WITH OR WITHOUT Amikacin 15–22.5 mg/kg/day WITH OR WITHOUT Vancomycin 40–60 mg/kg/day.'
    },
    remarks: 'Add an Aminoglycoside for severe infections with Pseudomonas or suspected resistance. Add Vancomycin if the patient had previous surgery or instrumentation.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Severe Sepsis and Septic Shock (Pediatric)',
    pediatric: {
      firstLine: 'Infant (0–28 days): Ampicillin 50 mg/kg IV PLUS Cefotaxime 50 mg/kg IV PLUS Gentamicin 2.5 mg/kg IV (initial dose).',
      secondLine: 'Child (>28 days): Cefotaxime 100 mg/kg IV initial dose (Max: 2 g) OR Ceftriaxone 75 mg/kg IV initial dose (Max: 2 g). Add Vancomycin 15 mg/kg IV (initial dose) if MRSA is suspected.'
    },
    remarks: 'Administer the first dose within the 1st hour of presentation. Stabilization of airway, breathing, and rapid fluid resuscitation are mandatory.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Febrile Neutropenia (Pediatric)',
    pediatric: {
      firstLine: 'Cefepime 150 mg/kg/day IV/IM div q8h OR Piperacillin-tazobactam 300 mg/kg/day IV div q6h OR Meropenem 60–120 mg/kg/day IV div q8h. Add Vancomycin (40–60 mg/kg/day) for suspected catheter infections or hemodynamic instability.'
    },
    remarks: 'Continue treatment until the patient is afebrile and ANC >500 cells/μL. Consider empiric antifungal therapy if fever persists after 4–7 days of broad-spectrum antibacterials.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Sepsis in Adults (Source Unclear)',
    adult: {
      firstLine: '1st line: Piperacillin-tazobactam 4.5 g IV q6–8h PLUS Vancomycin 25–30 mg/kg loading dose, then 1 g IV q8h.',
      secondLine: '2nd line: Meropenem 1 g IV q8h PLUS Vancomycin (same dose).'
    },
    remarks: 'Initiate antibiotics within the 1st hour of recognition. Target a Mean Arterial Pressure (MAP) of >65 mmHg in patients on vasopressors.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Sepsis in Adults (Specific Sources)',
    adult: {
      firstLine: 'Intra-abdominal Source: 1st line: Piperacillin-tazobactam 4.5 g IV q6–8h. 2nd line: Ceftriaxone 2 g IV q12h PLUS Metronidazole 1 g loading dose then 500 mg q6h.',
      secondLine: 'Urinary Source: 1st line: Piperacillin-tazobactam 4.5 g IV q6–8h. 2nd line: Ceftriaxone 1 g IV q24h OR Ertapenem 1 g IV q24h. IV Drug Use Source: Vancomycin (25–30 mg/kg loading dose) PLUS Piperacillin-tazobactam 4.5 g IV q6–8h.'
    },
    remarks: 'Use Ertapenem if there is a risk for ESBL-producing organisms.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Staphylococcal Toxic Shock Syndrome (TSS)',
    pediatric: {
      firstLine: 'Oxacillin 150–200 mg/kg/day div q4–6h OR Cefazolin 75–100 mg/kg/day div q8h OR Vancomycin (for MRSA) 40–60 mg/kg/day PLUS Clindamycin 30–40 mg/kg/day div q6–8h PLUS IVIG 150–400 mg/kg x 5 days.'
    },
    adult: {
      firstLine: 'Vancomycin 25–30 mg/kg loading dose then 1 g IV q8h PLUS Clindamycin 900 mg IV q8h PLUS IVIG 1 g/kg (Day 1) then 500 mg/kg daily for 2–3 days.'
    },
    remarks: 'TSS requires immediate aggressive fluid management and potentially surgical debridement. Clindamycin is added to inhibit toxin production.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Streptococcal Toxic Shock Syndrome (TSS)',
    pediatric: {
      firstLine: 'Penicillin G 200,000–300,000 U/kg/day IV div q4–6h OR Ceftriaxone 100 mg/kg/day PLUS Clindamycin 30–40 mg/kg/day PLUS IVIG 1 g/kg (Day 1) then 500 mg/kg (Days 2–3).'
    },
    adult: {
      firstLine: '1st line: Penicillin G 24 MU daily IV div q4–6h PLUS Clindamycin 900 mg IV q8h. 2nd line: Ceftriaxone 2 g IV q24h PLUS Clindamycin 900 mg IV q8h PLUS IVIG.'
    },
    remarks: 'IVIG may be considered if the patient is refractory to therapy or has an undrainable focus.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Febrile Neutropenia (Adult)',
    adult: {
      firstLine: 'Low Risk: Ciprofloxacin 750 mg PO bid OR Levofloxacin 750 mg PO daily PLUS Co-amoxiclav 625 mg tid.',
      secondLine: 'High Risk: Monotherapy with Cefepime 2 g IV q8h OR Meropenem 1–2 g IV q8h OR Piperacillin-tazobactam 4.5 g IV q6h.'
    },
    remarks: 'High-risk factors include profound neutropenia (<100 cells/μL) and anticipated fever >7 days. Continue treatment until the patient is afebrile and ANC >500 cells/μL.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Typhoid Fever',
    pediatric: {
      firstLine: 'Uncomplicated: 1st line: Amoxicillin 75–100 mg/kg/day div q8h OR Chloramphenicol 50–75 mg/kg/day div q6h OR Co-trimoxazole 8 mg/kg/day (TMP component) for 14 days. 2nd line (MDRTF): Cefixime 15–20 mg/kg/day OR Azithromycin 10–20 mg/kg/day OR Ciprofloxacin 30 mg/kg/day.',
      secondLine: 'Severe/Complicated: Ceftriaxone 75 mg/kg/day for 10–14 days.'
    },
    adult: {
      firstLine: 'Uncomplicated: 1st line: Amoxicillin 1 g q6h OR Co-trimoxazole 160/800 mg PO q12h OR Chloramphenicol 1 g PO q6h for 14 days OR Ciprofloxacin 500 mg PO q12h x 7–10 days.',
      secondLine: 'Severe/Complicated: Ceftriaxone 1–2 g IV for 10–14 days.'
    },
    remarks: 'Chloramphenicol is associated with serious blood dyscrasias like aplastic anemia. MDRTF (Multi-drug resistant typhoid fever) should be suspected if there is no response after 5–7 days of first-line treatment.'
  },
  {
    system: 'Blood-Borne & Systemic',
    disease: 'Leptospirosis',
    pediatric: {
      firstLine: 'Mild: 1st line: Amoxicillin 30–50 mg/kg/day (div q8h) OR Doxycycline 2 mg/kg bid x 7 days. 2nd line: Azithromycin 10 mg/kg (Day 1) then 5 mg/kg (Days 2–3).',
      secondLine: 'Moderate to Severe: 1st line: Penicillin G 250,000–400,000 U/kg/day IV div q4–6h x 7 days. 2nd line: Cefotaxime 100–150 mg/kg/day div q6–8h OR Ceftriaxone 80–100 mg/kg/day div q24h x 7 days.'
    },
    adult: {
      firstLine: 'Mild: 1st line: Amoxicillin 30–50 mg/kg/day (div q8h) OR Doxycycline 2 mg/kg bid x 7 days. 2nd line: Azithromycin 10 mg/kg (Day 1) then 5 mg/kg (Days 2–3).',
      secondLine: 'Moderate to Severe: 1st line: Penicillin G 250,000–400,000 U/kg/day IV div q4–6h x 7 days. 2nd line: Cefotaxime 100–150 mg/kg/day div q6–8h OR Ceftriaxone 80–100 mg/kg/day div q24h x 7 days.'
    },
    remarks: 'Doxycycline precautions: avoid in children <8 years and during pregnancy. Pre-exposure prophylaxis: Doxycycline 4 mg/kg (Max: 200 mg) single dose for high-risk exposure.'
  },

  // --- CARDIOVASCULAR ---
  {
    system: 'Cardiovascular Infections',
    disease: 'Native Valve Infective Endocarditis (Empiric Therapy)',
    pediatric: {
      firstLine: 'Community-acquired: Ampicillin-sulbactam 200–300 mg/kg/day IV divided into 4–6 doses (Max: 12 g/day ) PLUS Gentamicin 3–6 mg/kg/day IV/IM divided every 8 hours.',
      secondLine: 'Healthcare-associated: Vancomycin 60 mg/kg/day IV divided every 6 hours (Max: 2 g/day ) PLUS Gentamicin 3–6 mg/kg/day IV every 8 hours PLUS either Cefepime 100–150 mg/kg/day divided every 8–12 hours (Max: 6 g/day ) OR Ceftazidime 100–150 mg/kg/day IV divided every 8 hours (Max: 2–4 g/day ).'
    },
    adult: {
      firstLine: 'Community-acquired: Ampicillin-sulbactam 3 g IV every 6 hours PLUS Gentamicin 1 mg/kg IV every 8 hours.',
      secondLine: 'Healthcare-associated: Vancomycin 15–20 mg/kg IV every 8–12 hours PLUS Gentamicin 1 mg/kg IV every 8 hours PLUS either Cefepime 2 g IV every 8 hours OR Ceftazidime 2 g IV every 8 hours.'
    },
    remarks: 'Obtain at least 3 sets of blood cultures and conduct a transthoracic echocardiogram (TTE) in all suspected cases. Once the pathogen is identified, therapy must be adapted to the susceptibility pattern.'
  },
  {
    system: 'Cardiovascular Infections',
    disease: 'Pathogen-Specific Infective Endocarditis (Native Valve)',
    pediatric: {
      firstLine: 'S. viridans/S. bovis: Penicillin G 200,000–300,000 U/kg/day IV divided every 4 hours (Max: 12–24 MU/day) OR Ceftriaxone 100 mg/kg/day IV/IM divided every 12 hours x 4 weeks.',
      secondLine: 'S. aureus (MSSA): Oxacillin 200 mg/kg/day IV divided 4–6 doses x 6 weeks. S. aureus (MRSA): Vancomycin 60 mg/kg/day IV divided every 6 hours (Max: 2 g/day ).'
    },
    adult: {
      firstLine: 'S. viridans/S. bovis: Penicillin G 12–18 MU/day IV divided every 4 hours x 4 weeks OR Ceftriaxone 2 g IV every 24 hours x 4 weeks.',
      secondLine: 'S. aureus (MSSA): Oxacillin 2 g IV every 4 hours x 4–6 weeks OR Cefazolin 2 g IV every 8 hours x 6 weeks. S. aureus (MRSA): Vancomycin 15–20 mg/kg IV every 8–12 hours x 6 weeks.'
    },
    remarks: 'For S. bovis, clinicians should suspect occult bowel pathology (e.g., tumor). Vancomycin therapy must target a trough concentration of 15–20 mcg/mL.'
  },
  {
    system: 'Cardiovascular Infections',
    disease: 'Prosthetic Valve Infective Endocarditis (Empiric Therapy)',
    pediatric: {
      firstLine: 'Vancomycin 40–60 mg/kg/day divided every 6–8 hours PLUS Gentamicin 3–6 mg/kg/day IV divided every 8 hours PLUS Rifampin 20 mg/kg/day IV/PO divided into 3 doses x 6 weeks (Max: 900 mg/day).'
    },
    adult: {
      firstLine: 'Vancomycin 15–20 mg/kg IV every 8–12 hours PLUS Gentamicin 1 mg/kg IV every 8 hours PLUS Rifampin 600 mg PO every 24 hours x 6 weeks.'
    },
    remarks: 'Early surgical consultation is recommended, especially for persistent bacteremia, heart block, or fungal IE.'
  },
  {
    system: 'Cardiovascular Infections',
    disease: 'Infective Endocarditis Prophylaxis (Dental Procedures)',
    pediatric: {
      firstLine: 'Amoxicillin 50 mg/kg PO x 1 dose (30–60 min before procedure). If allergic: Cephalexin 50 mg/kg.'
    },
    adult: {
      firstLine: 'Amoxicillin 2 g PO x 1 dose (30–60 min before procedure). If allergic: Cephalexin 2 g.'
    },
    remarks: 'Prophylaxis is only reasonable for patients with highest-risk conditions (e.g., prosthetic valves, previous IE, or certain congenital heart diseases).'
  },
  {
    system: 'Cardiovascular Infections',
    disease: 'Bacterial Purulent Pericarditis',
    pediatric: {
      firstLine: 'Vancomycin 60 mg/kg/day divided every 6 hours PLUS Ceftriaxone 100 mg/kg/day IV divided every 12–24 hours (Max: 2 g every 12h).'
    },
    adult: {
      firstLine: 'Vancomycin 15–20 mg/kg IV every 8–12 hours PLUS either Ceftriaxone 2 g IV every 24 hours OR Levofloxacin 750 mg IV every 24 hours.'
    },
    remarks: 'Drainage is usually necessary. Once a pathogen is isolated, specific IV therapy should continue for 3–4 weeks.'
  },
  {
    system: 'Cardiovascular Infections',
    disease: 'Acute Rheumatic Fever (Secondary Prevention)',
    adult: {
      firstLine: 'Benzathine Penicillin G IM every 3 weeks. Weight ≤27 kg: 600,000 U IM. Weight >27 kg: 1,200,000 U IM.',
      secondLine: 'Oral Alternative: Penicillin V 250 mg PO bid.'
    },
    remarks: 'Prevention of recurrent Group A Streptococcus (GAS) pharyngitis is the most effective way to prevent severe Rheumatic Heart Disease (RHD). Duration of prophylaxis depends on the presence of carditis and residual heart disease.'
  },
  {
    system: 'Cardiovascular Infections',
    disease: 'Central Line-Associated Bloodstream Infection (CLABSI)',
    pediatric: {
      firstLine: 'Vancomycin 60 mg/kg/day divided every 6 hours PLUS Piperacillin-tazobactam 200–300 mg/kg/day IV divided every 8 hours PLUS an Aminoglycoside.'
    },
    adult: {
      firstLine: 'Non-tunneled catheter: Vancomycin 15–20 mg/kg IV every 8–12 hours.'
    },
    remarks: 'If S. aureus is identified, remove the catheter and treat for at least 2 weeks. If Candida is the cause, use Fluconazole 12 mg/kg PO/IV loading dose, then 6 mg/kg/day.'
  },

  // --- CENTRAL NERVOUS SYSTEM ---
  {
    system: 'Central Nervous System',
    disease: 'Community Acute Bacterial Meningitis (<2 months old)',
    pediatric: {
      firstLine: 'Ampicillin OR Cefotaxime IV/IM: <2 kg: 50 mg/kg q12h (0–7 days old); 50 mg/kg q8h (>7 days old). ≥2 kg: 50 mg/kg q8h (0–7 days old); 50 mg/kg q6h (>7 days old). PLUS Amikacin 15 mg/kg/day IV/IM q24h OR Gentamicin 5 mg/kg/day IV/IM q24h.'
    },
    remarks: 'Start therapy immediately after lumbar puncture (LP). Ceftriaxone may be used if Cefotaxime is unavailable, provided the neonate is not jaundiced. Dexamethasone has no role in neonatal meningitis.'
  },
  {
    system: 'Central Nervous System',
    disease: 'Community Acute Bacterial Meningitis (2 months to 5 years)',
    pediatric: {
      firstLine: 'Ceftriaxone 100 mg/kg/day IV divided every 12–24h (Max: 4 g/day ) OR Chloramphenicol 100 mg/kg/day IV divided every 8h (Max: 4 g/day ).'
    },
    remarks: 'If resistant S. pneumoniae is suspected, add Vancomycin 15–20 mg/kg IV q8–12h. Do not use Cefuroxime due to delayed sterilization and increased hearing loss risk. If Hib is suspected, give Dexamethasone 0.15 mg/kg (Max: 10 mg) q6h x 4 days.'
  },
  {
    system: 'Central Nervous System',
    disease: 'Community Acute Bacterial Meningitis (5 to 18 years)',
    pediatric: {
      firstLine: 'Ceftriaxone 100 mg/kg/day IV divided every 12h (Max: 4 g/day ) OR Chloramphenicol 100 mg/kg/day IV divided every 8h (Max: 4 g/day ).'
    },
    remarks: 'If Hib is confirmed in children <10 years, add Rifampin prophylaxis (20 mg/kg/day x 4 days) to eradicate the carrier state.'
  },
  {
    system: 'Central Nervous System',
    disease: 'Community Acute Bacterial Meningitis (18 to 50 years)',
    adult: {
      firstLine: 'Ceftriaxone 2 g IV every 12h.'
    },
    remarks: 'Start Dexamethasone before or with the first dose of antibiotics at 0.15 mg/kg q6h IV for 2–4 days.'
  },
  {
    system: 'Central Nervous System',
    disease: 'Community Acute Bacterial Meningitis (>50 years old)',
    adult: {
      firstLine: 'Ampicillin 2 g IV every 4h PLUS Ceftriaxone 2 g IV every 12h.'
    },
    remarks: 'Ampicillin is added to cover L. monocytogenes. For severe penicillin allergy, use Vancomycin 15–20 mg/kg IV q8–12h PLUS Aztreonam 2 g IV q6–8h or Ciprofloxacin 400 mg IV q12h.'
  },
  {
    system: 'Central Nervous System',
    disease: 'Meningitis with Anatomic Defects / Neurosurgical Complications',
    pediatric: {
      firstLine: 'Vancomycin 60 mg/kg/day IV divided every 6h PLUS Ceftazidime 150 mg/kg/day divided every 8h.'
    },
    adult: {
      firstLine: 'Vancomycin 15–20 mg/kg IV q8–12h PLUS Ceftazidime 2 g IV q8h.'
    },
    remarks: 'Duration is typically 3–6 weeks. Covers S. aureus, S. epidermidis, and Gram-negative bacilli including Pseudomonas.'
  },
  {
    system: 'Central Nervous System',
    disease: 'Brain Abscess (Source Specific)',
    adult: {
      firstLine: 'Dental Source: Penicillin G PLUS Ceftriaxone (Adult: Pen G 4 MU q4h + Ceftriaxone 2 g q12h). Otitis/Sinusitis Source: Ceftazidime (Adult: 2 g q8h) PLUS Metronidazole (Adult: 7.5 mg/kg q6h).',
      secondLine: 'Head Trauma Source: Vancomycin PLUS Ceftriaxone. Congenital Heart Disease Source: Ceftriaxone PLUS Metronidazole.'
    },
    remarks: 'Duration is usually 6–8 weeks. Surgical aspiration is usually required if the lesion is >2.5 cm.'
  },
  {
    system: 'Central Nervous System',
    disease: 'Spinal Abscess',
    pediatric: {
      firstLine: 'Vancomycin 60 mg/kg/day IV divided every 6h.'
    },
    adult: {
      firstLine: 'Vancomycin 15–20 mg/kg IV q8–12h.'
    },
    remarks: 'Shift to Oxacillin if methicillin-sensitive S. aureus (MSSA) is documented.'
  },
  {
    system: 'Central Nervous System',
    disease: 'Encephalitis (Herpes Simplex)',
    pediatric: {
      firstLine: 'Aciclovir: <12 years: 20 mg/kg IV over 1h every 8h.'
    },
    adult: {
      firstLine: 'Aciclovir: 10 mg/kg IV over 1h every 8h.'
    },
    remarks: 'Duration is 14–21 days. Early diagnosis is critical.'
  },
  {
    system: 'Central Nervous System',
    disease: 'Fungal Meningitis (Cryptococcal)',
    adult: {
      firstLine: 'Non-AIDS (Induction): Amphotericin B deoxycholate 0.7–1 mg/kg IV daily for ~6 weeks.',
      secondLine: 'HIV-Associated (Induction): Amphotericin B deoxycholate 0.7–1 mg/kg/day PLUS Fluconazole 800 mg/day (Adult) or 6–12 mg/kg/day (Pediatric).'
    },
    remarks: 'Ideal regimen includes Flucytosine, but it is unavailable in the Philippines. Monitor BUN, creatinine, and potassium weekly.'
  },

  // --- DENTAL & ORAL ---
  {
    system: 'Dental & Oral',
    disease: 'Buccal Cellulitis',
    pediatric: {
      firstLine: '1st line: Ceftriaxone 50 mg/kg IV every 24 hours.',
      secondLine: '2nd line: Co-amoxiclav 45 mg/kg/day (amoxicillin component) PO divided every 12 hours.'
    },
    remarks: 'This condition is usually preceded by an upper respiratory tract infection or sinusitis and manifests as marked cheek swelling with trismus. Treatment duration is typically 7 to 14 days.'
  },
  {
    system: 'Dental & Oral',
    disease: 'Herpes Simplex Virus Gingivostomatitis',
    pediatric: {
      firstLine: 'Aciclovir 15 mg/kg/day every 8 hours for 5 to 7 days.'
    },
    adult: {
      firstLine: '>12 years and Adult: Valaciclovir 2 g PO every 12 hours for 2 doses.'
    },
    remarks: 'This is a self-limiting disease, and treatment is generally not recommended for immunocompetent patients. Aspirin should be avoided to prevent Reye syndrome; use paracetamol for pain.'
  },
  {
    system: 'Dental & Oral',
    disease: 'Oral Candidiasis (Oral Thrush)',
    adult: {
      firstLine: 'Nystatin oral suspension 100,000 U/mL (4 mL qid) OR Miconazole oral gel 2% applied to the affected area qid.',
      secondLine: 'Adult Option: Fluconazole 100–200 mg PO daily.'
    },
    remarks: 'Overgrowth may be triggered by antibiotics or immunosuppression; recurrent infections can be an early sign of HIV. Fluconazole is preferred for moderate to severe disease.'
  },
  {
    system: 'Dental & Oral',
    disease: 'Odontogenic Infections (Dentoalveolar Infection or Peri-apical Abscess)',
    pediatric: {
      firstLine: '1st line: Ampicillin-sulbactam 200–400 mg/day IV divided every 6 hours (ampicillin component) OR Co-amoxiclav 45 mg/kg/day divided every 12 hours (amoxicillin component).',
      secondLine: '2nd line: Clindamycin 20–40 mg/kg/day PO divided every 8 hours.'
    },
    adult: {
      firstLine: '1st line: Ampicillin-sulbactam 3 g IV every 6 hours OR Co-amoxiclav 875/125 mg bid.',
      secondLine: '2nd line: Clindamycin 300 mg PO every 8 hours.'
    },
    remarks: 'Dental consultation is mandatory as extraction or scaling is necessary to eliminate the infected pulp. Systemic antibiotics are only needed if there is acute onset facial swelling, trismus, fever >38.3°C, or dysphagia.'
  },
  {
    system: 'Dental & Oral',
    disease: 'Acute Gingivitis',
    pediatric: {
      firstLine: 'Penicillin VK (<12 years: 50–75 mg/kg/day PO div q6–8h; ≥12 years: 250–500 mg/day PO q6–8h) PLUS Metronidazole 30 mg/kg/day PO divided every 6 hours. General: Chlorhexidine 0.12% oral rinse.'
    },
    adult: {
      firstLine: '(Penicillin VK 500 mg PO every 6 hours PLUS Metronidazole 500 mg PO every 8 hours) OR Clindamycin 300 mg PO/IV every 8 hours OR Co-amoxiclav 875/125 mg bid. General: Chlorhexidine 0.12% oral rinse.'
    },
    remarks: 'Systemic therapy is rarely required as antiseptic rinses are usually adequate.'
  },
  {
    system: 'Dental & Oral',
    disease: 'Acute Necrotizing Ulcerative Gingivitis (Trench Mouth)',
    adult: {
      firstLine: '(Penicillin VK 500 mg PO every 6 hours PLUS Metronidazole 500 mg PO every 8 hours) OR Clindamycin 300 mg PO/IV every 8 hours OR Co-amoxiclav 875/125 mg bid for 10 days.'
    },
    remarks: 'Characterized by foul breath, gingival pain, and thick ropy saliva. Therapy should be followed by localized gingival curettage by a dentist.'
  },
  {
    system: 'Dental & Oral',
    disease: 'Juvenile Periodontitis',
    pediatric: {
      firstLine: '<8 years old: Metronidazole 50 mg/kg/day PO divided every 8 hours. ≥8 years old: Doxycycline 200 mg PO.'
    },
    remarks: 'This condition involves deep gingival pocketing and bone resorption in the molar and incisor regions. Antibiotics are started only if the condition does not respond to root debridement.'
  },
  {
    system: 'Dental & Oral',
    disease: 'Periodontal Abscess',
    pediatric: {
      firstLine: '1st line: Co-amoxiclav 45 mg/kg/day divided bid (amoxicillin component).',
      secondLine: '2nd line: Clindamycin 20–40 mg/kg/day PO divided every 8 hours.'
    },
    adult: {
      firstLine: '1st line: Co-amoxiclav 875/125 mg bid.',
      secondLine: '2nd line: Clindamycin 150–300 mg PO every 8 hours.'
    },
    remarks: 'Drainage of loculated pus is essential; scaling and root planing should follow abscess resolution.'
  },
  {
    system: 'Dental & Oral',
    disease: 'Pericoronitis',
    adult: {
      firstLine: 'Penicillin VK 500 mg every 6 hours OR Amoxicillin 500 mg every 8 hours for 7 days.'
    },
    remarks: 'Blocked drainage under soft tissue overlying a crown leads to infection. Antibiotics are only necessary for systemic signs like fever.'
  },
  {
    system: 'Dental & Oral',
    disease: 'Ludwig’s Angina',
    pediatric: {
      firstLine: 'Ampicillin-sulbactam 200–400 mg/day IV div q6h OR (Penicillin G 250,000–400,000 U/kg/day IV div 4 doses PLUS Metronidazole 22.5–40 mg/kg/day IV q6–8h) OR Clindamycin 20–40 mg/kg/day IV q6–8h.'
    },
    adult: {
      firstLine: 'Ampicillin-sulbactam 3 g IV every 6 hours OR (Penicillin G 2–4 MU IV every 4–6 hours PLUS Metronidazole 500 mg IV every 6–8 hours) OR Clindamycin 600 mg IV every 6–8 hours.'
    },
    remarks: 'This is a life-threatening, aggressive cellulitis of the submandibular space. Airway management is the top priority.'
  },

  // --- SKIN & SOFT TISSUE (PEDIATRIC) ---
  {
    system: 'Skin & Soft Tissue (Pediatric)',
    disease: 'Abscess, Boils, and Furuncles',
    pediatric: {
      firstLine: '1st line (Oral): Cloxacillin 50–100 mg/kg/day divided every 6 hours (Max: 2 g/day ) OR Cephalexin 25–50 mg/kg/day divided every 6–8 hours. 1st line (Parenteral): Oxacillin 100–150 mg/kg/day IV/IM divided every 6 hours (Max: 4 g/day ) or Cefazolin 50 mg/kg/day IV/IM divided every 6–8 hours (Max: 3 g/day ).',
      secondLine: '2nd line (Suspected MRSA): Clindamycin 30–40 mg/kg/day PO divided every 6–8 hours or 25–40 mg/kg/day IV.'
    },
    remarks: 'Incision and drainage (I&D) is the mainstay of therapy, and needle aspiration is considered inadequate. Antibiotics are specifically recommended if the abscess is >5 cm, multiple lesions are present, or the patient shows signs of SIRS.'
  },
  {
    system: 'Skin & Soft Tissue (Pediatric)',
    disease: 'Impetigo and Ecthyma',
    pediatric: {
      firstLine: 'Topical (Localized): Mupirocin 2% ointment 3x/day or Fusidic acid 2% cream 2x/day for 7–12 days.',
      secondLine: 'Oral (Extensive/Bullous): Cloxacillin 50–100 mg/kg/day or Cephalexin 25–50 mg/kg/day for 7 days.'
    },
    remarks: 'Topicals are preferred for limited lesions (<5 cm), while oral antibiotics are reserved for extensive infections, systemic symptoms, or outbreaks in child care groups. Ecthyma is a deeper form of impetigo that results in "punched out" ulcers and heals with scarring.'
  },
  {
    system: 'Skin & Soft Tissue (Pediatric)',
    disease: 'Erysipelas',
    pediatric: {
      firstLine: '1st line (Oral): Penicillin V 25–50 mg/kg/day divided every 6–8 hours. 1st line (Parenteral): Penicillin G 100,000–150,000 U/kg/day IV divided every 6 hours.'
    },
    remarks: 'Erysipelas is a superficial infection characterized by a sharply demarcated, bright red, tender plaque. For infections involving the face, Vancomycin is recommended as the first line to cover for potential MRSA.'
  },
  {
    system: 'Skin & Soft Tissue (Pediatric)',
    disease: 'Cellulitis (Non-Purulent)',
    pediatric: {
      firstLine: '1st line (Oral): Cephalexin 25–50 mg/kg/day divided every 6–8 hours or Co-amoxiclav 20–40 mg/kg/day (amoxicillin component) divided every 8 hours. 1st line (Parenteral): Cefazolin 50 mg/kg/day or Ampicillin-sulbactam 100–200 mg/kg/day IV.'
    },
    remarks: 'This applies to cellulitis with intact skin and no purulent discharge. If a patient does not respond to beta-lactams, empiric coverage for CA-MRSA should be initiated.'
  },
  {
    system: 'Skin & Soft Tissue (Pediatric)',
    disease: 'Cat, Dog, or Human Bites',
    pediatric: {
      firstLine: '1st line: Co-amoxiclav (Oral) 25–45 mg/kg/day divided every 12 hours or Ampicillin-sulbactam (Parenteral) 100–200 mg/kg/day divided every 6 hours.'
    },
    remarks: 'Irrigation and debridement are the most critical steps in management. For cat bites, Pasteurella multocida is a major concern as it can cause infection within 24 hours. Always assess the need for rabies and tetanus prophylaxis.'
  },
  {
    system: 'Skin & Soft Tissue (Pediatric)',
    disease: 'Necrotizing Fasciitis / Gas Gangrene',
    pediatric: {
      firstLine: '1st line: Vancomycin 40–60 mg/kg/day IV PLUS Piperacillin-tazobactam 240–300 mg/kg/day IV divided every 6–8 hours.',
      secondLine: 'Documented GAS/Clostridial: Penicillin G 200,000–300,000 U/kg/day PLUS Clindamycin 30–40 mg/kg/day IV (to block toxin production).'
    },
    remarks: 'This is a surgical emergency requiring immediate exploration, drainage, and debridement of all non-viable tissue. Clinical signs include dusky, cyanotic skin and a rapid decrease in pain (due to nerve destruction).'
  },
  {
    system: 'Skin & Soft Tissue (Pediatric)',
    disease: 'Staphylococcal Scalded Skin Syndrome (SSSS)',
    pediatric: {
      firstLine: 'Oxacillin 100–150 mg/kg/day IV/IM for mild/moderate cases or 150–200 mg/kg/day for severe cases.'
    },
    remarks: 'This condition is caused by an exfoliative toxin produced by S. aureus that cleaves the skin layers. Vancomycin should be used if MRSA is suspected.'
  },
  {
    system: 'Skin & Soft Tissue (Pediatric)',
    disease: 'Fungal Infections (Tinea and Candidiasis)',
    pediatric: {
      firstLine: 'Tinea Corporis/Cruris: Terbinafine 1% cream applied 2x/day for 1 week. Cutaneous Candidiasis: Clotrimazole 1% or Miconazole 2% cream applied 2x/day for 3–5 days.',
      secondLine: 'Tinea Capitis: Terbinafine (Oral) weight-based: <20 kg (62.5 mg); 20–40 kg (125 mg); >40 kg (250 mg) daily for 2 weeks.'
    },
    remarks: 'Tinea capitis (ringworm of the scalp) always requires systemic therapy because topical agents do not penetrate the hair follicle.'
  },
  {
    system: 'Skin & Soft Tissue (Pediatric)',
    disease: 'Scabies and Lice',
    pediatric: {
      firstLine: 'Scabies: Permethrin 5% cream; apply to the entire skin from the chin down to the toes, leave on for 8–14 hours, and repeat in 1–2 weeks. Pubic Lice: Permethrin 1% cream rinse; wash off after 10 minutes.'
    },
    remarks: 'Treat all close contacts simultaneously and wash all linens in a hot cycle to prevent re-infection.'
  },

  // --- SKIN & SOFT TISSUE (ADULT) ---
  {
    system: 'Skin & Soft Tissue (Adult)',
    disease: 'Skin Abscess, Boils, and Furuncles',
    adult: {
      firstLine: 'Small (<2 cm): Incision and drainage (I&D) only; no antibiotics needed. Large (>2 cm) or Multiple: I&D plus Clindamycin 300–450 mg PO tid; OR Co-trimoxazole 160/800 mg 1–2 tabs PO bid; OR Doxycycline 100 mg PO q12h for 5–10 days.',
      secondLine: 'Inpatient/Severe: Clindamycin 600 mg IV q8h; OR Vancomycin 15 mg/kg q12h (target trough 10–20 μg/mL).'
    },
    remarks: 'I&D is the mainstay of therapy; needle aspiration is inadequate. For obese patients (BMI >40), use the higher dose of Clindamycin (450 mg) or 2 tabs of Co-trimoxazole to prevent treatment failure.'
  },
  {
    system: 'Skin & Soft Tissue (Adult)',
    disease: 'Acute Bacterial Skin and Skin Structure Infections (ABSSSI) / Cellulitis',
    adult: {
      firstLine: 'Outpatient: Penicillin VK 500 mg PO qid; OR Amoxicillin 500 mg PO q8h; OR Cephalexin 500 mg PO bid for 10 days.',
      secondLine: 'Inpatient: Penicillin G 1–2 MU IV q6h; OR Cefazolin 1 g IV q8h; OR Ceftriaxone 2 g IV daily.'
    },
    remarks: 'Leg elevation is necessary to reduce local edema. Note that stasis dermatitis from venous insufficiency often mimics cellulitis but does not require antibiotics.'
  },
  {
    system: 'Skin & Soft Tissue (Adult)',
    disease: 'Diabetic Foot Infections (DFI)',
    adult: {
      firstLine: 'Mild to Moderate: Clindamycin 300 mg PO/IV qid; OR Co-trimoxazole 160/800 mg 1–2 tabs PO bid for 1–2 weeks.',
      secondLine: 'Severe (MRSA/Pseudomonas suspected): Piperacillin-Tazobactam 4.5 g IV q6–8h PLUS Vancomycin 15–20 mg/kg IV q8–12h for 2–3 weeks.'
    },
    remarks: 'Requires multi-specialty collaboration. If you can "probe to the bone" with a metal instrument, the likelihood of contiguous osteomyelitis is very high.'
  },
  {
    system: 'Skin & Soft Tissue (Adult)',
    disease: 'Cat, Dog, and Human Bites',
    adult: {
      firstLine: 'Cat/Dog Bite: Co-amoxiclav 875/125 mg PO bid or 500/125 mg PO tid. Human Bite (Early): Co-amoxiclav 875/125 mg PO bid x 5 days.',
      secondLine: 'Human Bite (Infected): Ampicillin-sulbactam 1.5–3 g IV q6h; OR Piperacillin-tazobactam 4.5 g q8h.'
    },
    remarks: 'Cleaning, irrigation, and debridement are the most important steps. For human bites, clenched fist injuries are particularly high risk for deep space infections.'
  },
  {
    system: 'Skin & Soft Tissue (Adult)',
    disease: 'Necrotizing Fasciitis',
    adult: {
      firstLine: 'Type I (Mixed): Piperacillin-tazobactam 4.5 g IV q8h PLUS Vancomycin 15–20 mg/kg IV q8–12h.',
      secondLine: 'Type II (GAS/Clostridial): Penicillin G 4 MU IV q4h PLUS Clindamycin 600–900 mg IV q8h.'
    },
    remarks: 'This is a surgical emergency. Urgent surgical debridement of all non-viable tissue is the mainstay of therapy; IDSA guidelines do not recommend hyperbaric oxygen.'
  },
  {
    system: 'Skin & Soft Tissue (Adult)',
    disease: 'Herpes Zoster (Shingles)',
    adult: {
      firstLine: 'Immunocompetent: Aciclovir 800 mg PO 5x/day x 7–10 days.',
      secondLine: 'Severe/Disseminated: Aciclovir 10–12 mg/kg IV q8h for 7–14 days.'
    },
    remarks: 'Treatment must begin within 72 hours of rash onset to be effective. Adding Prednisone to Aciclovir in patients >50 years may improve quality of life during the acute phase but does not prevent post-herpetic neuralgia.'
  },
  {
    system: 'Skin & Soft Tissue (Adult)',
    disease: 'Postpartum Mastitis',
    adult: {
      firstLine: 'Outpatient: Cloxacillin 500 mg PO qid; OR Cephalexin 500 mg PO qid.',
      secondLine: 'MRSA suspected: Clindamycin 300 mg PO qid; OR Co-trimoxazole 160/800 mg 1–2 tabs PO bid.'
    },
    remarks: 'Continue breastfeeding if possible; it does not pose a risk to the infant and helps empty the breast.'
  },
  {
    system: 'Skin & Soft Tissue (Adult)',
    disease: 'Fungal Skin Infections',
    adult: {
      firstLine: 'Candidiasis: Clotrimazole 1%, Miconazole 2%, or Ketoconazole 2% cream applied bid for 3–5 days. Tinea (Corporis/Cruris/Pedis): Terbinafine 1% cream daily or bid for 1–4 weeks.'
    },
    remarks: 'Akapulco lotion (Senna alata extract) at 50% concentration has been found superior to placebo for Tinea versicolor in a meta-analysis.'
  },

  // --- SURGICAL PROPHYLAXIS ---
  {
    system: 'Surgical Prophylaxis',
    disease: 'Cardiovascular Surgery',
    adult: {
      firstLine: 'Cefazolin 2g IV (3g if weight ≥120 kg) OR Cefuroxime 1.5g IV.',
      secondLine: 'Beta-lactam Allergy: Vancomycin (1g if ≤90 kg; 1.5g if >90 kg).'
    },
    pediatric: {
      firstLine: 'Cefazolin 30 mg/kg IV OR Cefuroxime 50 mg/kg IV.'
    },
    remarks: 'Prophylaxis beyond 24 hours is not recommended. Consider intranasal Mupirocin for patients colonized with S. aureus.'
  },
  {
    system: 'Surgical Prophylaxis',
    disease: 'Gastroduodenal and Biliary Surgery',
    adult: {
      firstLine: 'Cefazolin 2g IV (3g if weight ≥120 kg) OR Cefoxitin 2g IV OR Ceftriaxone 2g IV.'
    },
    pediatric: {
      firstLine: 'Cefazolin 30 mg/kg IV OR Cefoxitin 40 mg/kg IV.'
    },
    remarks: 'No prophylaxis is needed for low-risk laparoscopic cholecystectomy. Biliary high-risk factors include age >70, diabetes, and acute cholecystitis.'
  },
  {
    system: 'Surgical Prophylaxis',
    disease: 'Colorectal Surgery',
    adult: {
      firstLine: 'Parenteral: (Cefazolin 2g IV PLUS Metronidazole 0.5g IV) OR Cefoxitin 2g IV OR Ampicillin-Sulbactam 3g IV.',
      secondLine: 'Oral: Neomycin 1g PLUS Erythromycin base 1g PO x 3 doses given the afternoon and evening before the operation.'
    },
    pediatric: {
      firstLine: 'Parenteral: Cefoxitin 40 mg/kg IV OR (Cefazolin 30 mg/kg IV PLUS Metronidazole 15 mg/kg IV).'
    },
    remarks: 'Prophylaxis includes a combination of mechanical bowel preparation, oral antibiotics, and IV antibiotics.'
  },
  {
    system: 'Surgical Prophylaxis',
    disease: 'Obstetric and Gynecologic Surgery',
    adult: {
      firstLine: 'Cefazolin 2g IV OR Cefoxitin 2g IV OR Ampicillin-sulbactam 3g IV.',
      secondLine: 'Beta-lactam Allergy: Clindamycin 900 mg IV PLUS Gentamicin 5 mg/kg IV.'
    },
    remarks: 'For Caesarean sections, the antibiotic should be administered before the skin incision. Prophylaxis is NOT recommended for uncomplicated vaginal birth.'
  },
  {
    system: 'Surgical Prophylaxis',
    disease: 'Orthopedic Surgery',
    adult: {
      firstLine: 'Cefazolin 2g IV.',
      secondLine: 'Beta-lactam Allergy: Vancomycin (1g if ≤90 kg; 1.5g if >90 kg) OR Clindamycin 900 mg IV.'
    },
    pediatric: {
      firstLine: 'Cefazolin 30 mg/kg IV.'
    },
    remarks: 'Prophylaxis should be stopped within 24 hours of surgery. It is not indicated for clean operations of hands/feet without implantation.'
  },
  {
    system: 'Surgical Prophylaxis',
    disease: 'Neurosurgery',
    adult: {
      firstLine: 'Cefazolin 2g IV (3g if weight ≥120 kg).',
      secondLine: 'Beta-lactam Allergy: Vancomycin OR Clindamycin 900 mg IV.'
    },
    pediatric: {
      firstLine: 'Cefazolin 30 mg/kg IV.'
    },
    remarks: 'Vancomycin is preferred in hospitals with a high frequency of MRSA or for colonized patients.'
  },

  // --- URINARY TRACT INFECTIONS ---
  {
    system: 'Urinary Tract Infections',
    disease: 'Pediatric Urinary Tract Infections',
    pediatric: {
      firstLine: 'Neonatal UTI (<2 months old): Cefotaxime (50 mg/kg/dose q8–12h) PLUS Amikacin (7.5–10 mg/kg/day). Acute Uncomplicated UTI (>2 months): Co-amoxiclav (20–40 mg/kg/day div q8h or 25–45 mg/kg/day div q12h) OR Cefuroxime (20–30 mg/kg/day).',
      secondLine: 'Recurrent/Complicated: Ceftriaxone (50–100 mg/kg/dose) AND/OR Amikacin (15–22.5 mg/kg/day). Perinephric Abscess: Oxacillin (100–200 mg/kg/day) PLUS Amikacin.'
    },
    remarks: 'If sepsis is suspected in neonates, treat as neonatal sepsis. Nitrofurantoin should only be used for cystitis, not pyelonephritis.'
  },
  {
    system: 'Urinary Tract Infections',
    disease: 'Adult Urinary Tract Infections',
    adult: {
      firstLine: 'Acute Uncomplicated Cystitis (AUC): Nitrofurantoin macrocrystals (100 mg qid x 5 days) OR Fosfomycin (3 g x 1 dose).',
      secondLine: 'Acute Uncomplicated Pyelonephritis: Ciprofloxacin (500 mg bid x 7–10 days) OR Levofloxacin (750 mg daily x 5 days) OR Ceftriaxone (1–2 g q24h).'
    },
    remarks: 'Empiric treatment with Amoxicillin and Co-trimoxazole is not recommended due to high prevalence of resistance. Hospitalization is required for pyelonephritis with signs of sepsis.'
  },
  {
    system: 'Urinary Tract Infections',
    disease: 'UTI in Pregnancy',
    adult: {
      firstLine: 'Acute Uncomplicated Cystitis: Cefalexin (500 mg qid) OR Cefuroxime (500 mg bid) OR Fosfomycin (3 g single dose).',
      secondLine: 'Acute Pyelonephritis in Pregnancy: Ceftriaxone (1–2 g q24h) OR Ceftazidime (2 g q8h).'
    },
    remarks: 'Use Nitrofurantoin only between the 2nd trimester and 32 weeks; Fluoroquinolones are contraindicated. Treat Asymptomatic Bacteriuria to reduce risk of low birth weight.'
  },
  {
    system: 'Urinary Tract Infections',
    disease: 'Complicated and Catheter-Associated UTI (Adults)',
    adult: {
      firstLine: 'Complicated UTI: Ciprofloxacin (500–750 mg bid) OR Levofloxacin OR Piperacillin-tazobactam (2.25–4.5 g q6–8h).',
      secondLine: 'Catheter-Associated UTI (CAUTI): Amikacin OR Ertapenem (1 g IV q24h) OR Meropenem (1 g IV q8h).'
    },
    remarks: 'Remove or replace the indwelling catheter before initiating antibiotics; pyuria alone is not an indication for treatment.'
  },
  {
    system: 'Urinary Tract Infections',
    disease: 'Bacterial Prostatitis',
    adult: {
      firstLine: 'Acute Bacterial Prostatitis: Without STD Risk: Ciprofloxacin (500 mg PO bid) OR Levofloxacin (500–750 mg daily) for 2–4 weeks. With STD Risk: Ceftriaxone (250 mg IM x 1 dose) PLUS Doxycycline (100 mg bid x 14 days).',
      secondLine: 'Chronic Bacterial Prostatitis: Ciprofloxacin (400 mg IV q12h) OR Levofloxacin (750 mg IV q24h) for 4–6 weeks.'
    }
  },
  {
    system: 'Urinary Tract Infections',
    disease: 'Candiduria',
    adult: {
      firstLine: 'Symptomatic Cystitis/Pyelonephritis: Fluconazole (200–400 mg PO daily x 2 weeks).'
    },
    remarks: 'For Fluconazole-resistant strains, use Amphotericin B deoxycholate.'
  },

  // --- NATIONAL HEALTH PROGRAMS ---
  {
    system: 'National Health Programs',
    disease: 'Filariasis (Selective Treatment)',
    adult: {
      firstLine: 'Day 1: Diethylcarbamazine (DEC) 6 mg/kg (divided into 3 doses) PLUS Albendazole 400 mg. Days 2–12: DEC 6 mg/kg (divided into 3 doses).'
    },
    remarks: 'Tablets should be taken within 2 hours after a meal. DEC is contraindicated in individuals with severe cardiac or kidney disease.'
  },
  {
    system: 'National Health Programs',
    disease: 'Leprosy',
    adult: {
      firstLine: 'Multibacillary (MB): Rifampicin 600 mg (monthly) PLUS Clofazimine 300 mg (monthly) and 50 mg (daily) PLUS Dapsone 100 mg (daily) for 12 blister packs. Paucibacillary (PB): Rifampicin 450 mg (monthly) PLUS Dapsone 100 mg (daily) for 6 blister packs.'
    },
    pediatric: {
      firstLine: 'Multibacillary (MB): Rifampicin 450 mg (monthly) PLUS Clofazimine 150 mg (monthly) and 50 mg every other day PLUS Dapsone 50 mg (daily).'
    },
    remarks: 'PB treatment must be completed within 9 months, and MB within 18 months.'
  },
  {
    system: 'National Health Programs',
    disease: 'Malaria',
    adult: {
      firstLine: 'P. falciparum/malariae: Artemether-lumefantrine (AL) 20 mg/120 mg (4 tabs at 0, 8, 24, 36, 48, and 60 hours) PLUS Primaquine 0.25 mg-base/kg (single dose on Day 1).',
      secondLine: 'P. vivax/ovale: Chloroquine 10 mg/kg (Days 1–2) then 5 mg/kg (Day 3) PLUS Primaquine 0.25 mg-base/kg (daily for 14 days). Severe Malaria: Artesunate IV or IM 2.4 mg/kg/dose (3 doses at 12-hour intervals), then shift to oral AL.'
    },
    remarks: 'Fat intake is essential to enhance Lumefantrine absorption. G6PD testing is mandatory before Primaquine administration.'
  },
  {
    system: 'National Health Programs',
    disease: 'Schistosomiasis',
    adult: {
      firstLine: 'Praziquantel 40 mg/kg/day (divided into 2–3 doses) for 1 day.'
    },
    remarks: 'The dose is increased to 60 mg/kg for neuroschistosomiasis. Take with a full stomach and follow up in one month.'
  },
  {
    system: 'National Health Programs',
    disease: 'Sexually Transmitted Infections (STIs)',
    adult: {
      firstLine: 'Urethritis/Cervicitis: Ceftriaxone 250 mg IM (1 dose) PLUS Azithromycin 1 g PO (1 dose) or Doxycycline 100 mg PO bid x 7 days. Syphilis: Benzathine Penicillin G 2.4 MU IM as a single dose.',
      secondLine: 'PID: Cefoxitin 2 g IV q6h PLUS Doxycycline 100 mg PO q12h x 14 days. Genital Herpes: Aciclovir 400 mg PO tid for 7–10 days.'
    },
    remarks: 'For syphilis, patients allergic to penicillin should be desensitized as penicillin is the preferred treatment.'
  },
  {
    system: 'National Health Programs',
    disease: 'Tuberculosis (TB)',
    adult: {
      firstLine: 'Drug-Susceptible Pulmonary TB: Intensive Phase (2 months): Rifampicin (R), Isoniazid (H), Pyrazinamide (Z), and Ethambutol (E). Continuation Phase (4 months): Rifampicin and Isoniazid.'
    },
    remarks: 'For Extra-pulmonary TB (CNS, Bones, or Joints), the continuation phase is extended to 10 months (Total 12 months). Fixed-dose combinations (FDCs) are preferred.'
  },

  // --- BONE AND JOINT INFECTIONS ---
  {
    system: 'Bone and Joint Infections (Pediatric)',
    disease: 'Osteomyelitis (Hematogenous)',
    pediatric: {
      firstLine: '1st line: Vancomycin PLUS Cefotaxime OR Ceftriaxone.',
      secondLine: '2nd line: Clindamycin IV PLUS Cefotaxime OR Ceftriaxone.'
    },
    remarks: 'Resistance of S. aureus to Oxacillin is high (57%), so empiric MRSA coverage should start immediately after collecting cultures. Avoid Ceftriaxone in jaundiced neonates due to the risk of kernicterus.'
  },
  {
    system: 'Bone and Joint Infections (Pediatric)',
    disease: 'Osteomyelitis (Contiguous Focus)',
    pediatric: {
      firstLine: '(Clindamycin OR Vancomycin) PLUS (Ceftazidime OR Cefepime).',
      secondLine: 'Culture-proven MSSA: Oxacillin or Cefazolin. Susceptible Gram-negative: Ciprofloxacin.'
    },
    remarks: 'It may be necessary to remove orthopedic hardware to achieve cure. Duration is generally 6 weeks.'
  },
  {
    system: 'Bone and Joint Infections (Pediatric)',
    disease: 'Suppurative Arthritis (Septic Arthritis)',
    pediatric: {
      firstLine: '<3 months: Refer to Hematogenous Osteomyelitis regimens. 3 months to 14 years: If Gram-stain is negative or G+ cocci: Vancomycin PLUS (Cefotaxime OR Ceftriaxone). If Gram-negative: Cefotaxime OR Ceftriaxone.'
    },
    remarks: 'Drainage of purulent joint fluid is a critical component of therapy. Total therapy duration is typically 3 to 6 weeks.'
  },
  {
    system: 'Bone and Joint Infections (Adult)',
    disease: 'Hematogenous Osteomyelitis',
    adult: {
      firstLine: 'Long Bones: If MRSA likely: Vancomycin. If GNB seen: Add Ceftazidime or Ceftriaxone or Levofloxacin.',
      secondLine: 'Vertebral: Vancomycin PLUS one of: Ceftriaxone, Ceftazidime, or Levofloxacin.'
    },
    remarks: 'Treatment duration is typically 4–6 weeks for long bones and 6–12 weeks for vertebral osteomyelitis. Antibiotics should generally not be started until an etiologic diagnosis is established unless septic.'
  },
  {
    system: 'Bone and Joint Infections (Adult)',
    disease: 'Contiguous Osteomyelitis',
    adult: {
      firstLine: 'Foot bone (puncture): Ciprofloxacin or Levofloxacin. Long bone post-fixation: Vancomycin PLUS Ceftazidime or Piperacillin-tazobactam.'
    },
    remarks: 'Osteomyelitis is highly likely if there is a positive "probe to bone" test, ESR >70, or abnormal X-ray/MRI. Removal of internal fixation hardware is necessary due to biofilm.'
  },
  {
    system: 'Bone and Joint Infections (Adult)',
    disease: 'Acute Bacterial Arthritis (Septic Arthritis)',
    adult: {
      firstLine: 'Monoarticular (STI risk): Ceftriaxone 1 g IV every 24 hours. Monoarticular (No STI risk): Gram+ cocci: Vancomycin. Gram- bacilli: Ceftazidime or Piperacillin-tazobactam.'
    },
    remarks: 'Septic Bursitis: For MSSA, Oxacillin or Cefazolin. For MRSA, Vancomycin. Daily aspiration until sterile.'
  },
  {
    system: 'Bone and Joint Infections (Adult)',
    disease: 'Prosthetic Joint Infections',
    adult: {
      firstLine: 'MSSA: DAIR + Oxacillin/Cefazolin + Rifampin. MRSA: DAIR + Vancomycin + Rifampin. P. aeruginosa: DAIR + Ceftazidime/Cefepime.'
    },
    remarks: 'Empiric therapy is not recommended; cases should be referred to a specialist. Rifampin is added to cover biofilm in staphylococcal infections.'
  }
];

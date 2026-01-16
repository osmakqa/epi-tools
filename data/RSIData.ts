
export const RSI_STEPS = [
  "Discuss airway management strategy with the team.",
  "Set up IV access, cardiac monitor, oximetry, and capnography/capnometry.",
  "Plan procedure. Assess physiologic status and airway difficulty.",
  "Prepare equipment, suction, and potential rescue devices.",
  "Preoxygenate.",
  "Consider pretreatment agents.",
  "Give sedative agent immediately followed by neuromuscular blocking agent.",
  "Intubate trachea.",
  "Confirm tube placement.",
  "Secure tube.",
  "Adjust mechanical ventilation and provide postintubation sedation."
];

export const RSI_PRETREATMENT = [
  {
    agent: "Lidocaine",
    dose: "1.5 milligrams/kg IV/topically",
    indications: "Elevated ICP, Bronchospasm, asthma",
    precautions: "Lack of evidence-based studies on effectiveness in ICP; No evidence of improved outcome and may not be better than inhaled albuterol"
  },
  {
    agent: "Fentanyl",
    dose: "3 micrograms/kg IV",
    indications: "Elevated ICP, Cardiac ischemia, Aortic dissection",
    precautions: "Respiratory depression, Hypotension, Chest wall rigidity"
  }
];

export const RSI_INDUCTION = [
  {
    agent: "Etomidate",
    dose: "0.3–0.5 milligram/kg IV",
    onset: "<1 min",
    duration: "10–20 min",
    benefits: "↓ ICP, ↓ Intraocular pressure, Neutral BP",
    caveats: "Myoclonic jerking or seizures and vomiting in awake patients; No analgesia; ↓ Cortisol"
  },
  {
    agent: "Propofol",
    dose: "0.5–1.5 milligrams/kg IV",
    onset: "20–40 s",
    duration: "8–15 min",
    benefits: "Antiemetic, Anticonvulsant, ↓ ICP",
    caveats: "Apnea, ↓ BP, No analgesia"
  },
  {
    agent: "Ketamine",
    dose: "1–2 milligrams/kg IV",
    onset: "1 min",
    duration: "10–20 min",
    benefits: "Bronchodilator, “Dissociative” amnesia, Analgesia",
    caveats: "↑ Secretions, ↑ BP, Emergence phenomenon"
  }
];

export const RSI_PARALYTICS = [
  {
    agent: "Rocuronium",
    dose: "1 milligram/kg",
    onset: "1–3 min",
    duration: "30–45 min",
    comments: "Tachycardia. Longer duration of action and onset compared to succinylcholine. Most common alternative to succinylcholine."
  },
  {
    agent: "Vecuronium",
    dose: "0.08–0.15 milligram/kg; 0.15–0.28 milligram/kg (high-dose)",
    onset: "2–4 min",
    duration: "25–40 min; 60–120 min",
    comments: "Prolonged recovery time in obese or elderly, or if there is hepatorenal dysfunction."
  },
  {
    agent: "Succinylcholine",
    dose: "1.5 milligrams/kg",
    onset: "45–60 s",
    duration: "5–9 min",
    comments: "Provides optimal intubating conditions most rapidly. There are several rare but important contraindications."
  }
];

export const SUX_SAFETY = {
  complications: [
    "Fasciculations",
    "Transient increased intragastric, intraocular, and intracranial pressure",
    "Bradycardia",
    "Masseter spasm",
    "Malignant hyperthermia",
    "Prolonged apnea with pseudocholinesterase deficiency or myasthenia gravis"
  ],
  contraindications: [
    "Preexisting hyperkalemia",
    "Burns >5 d old",
    "Denervation injury >5 d old",
    "Significant crush injuries >5 d old",
    "Severe infection >5 d old",
    "Preexisting myopathies"
  ]
};

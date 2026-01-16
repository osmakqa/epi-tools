import { Pathway } from './types';

export const PATHWAY_DATA: Pathway[] = [
  {
    id: 'acls-cardiac-arrest',
    name: 'Adult Cardiac Arrest',
    description: 'AHA 2020 Algorithm Reference',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: 'Initial Actions',
        color: 'red',
        items: [
          'Start CPR - Give oxygen - Attach monitor/defibrillator',
          'Rhythm Check: Is it Shockable (VF/pVT) or Non-Shockable (Asystole/PEA)?'
        ]
      },
      {
        title: 'Shockable Rhythm (VF/pVT)',
        color: 'red',
        items: [
          'Shock -> CPR 2 min -> IV/IO access',
          'Rhythm Check -> Shock -> CPR 2 min -> Epinephrine 1mg q3-5 min',
          'Rhythm Check -> Shock -> CPR 2 min -> Amiodarone (300mg then 150mg) or Lidocaine'
        ]
      },
      {
        title: 'Non-Shockable (Asystole/PEA)',
        color: 'amber',
        items: [
          'Epinephrine ASAP -> CPR 2 min -> IV/IO access',
          'Rhythm Check -> CPR 2 min -> Treat reversible causes'
        ]
      },
      {
        title: 'Reversible Causes (H & Ts)',
        color: 'blue',
        items: [
          'Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/Hyperkalemia, Hypothermia',
          'Tension pneumothorax, Tamponade (cardiac), Toxins, Thrombosis (pulmonary/coronary)'
        ]
      }
    ]
  },
  {
    id: 'sepsis-bundle-h1',
    name: 'Hour-1 Sepsis Bundle',
    description: 'Surviving Sepsis Campaign 2021',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: 'Immediate Actions (Start within 60m)',
        color: 'red',
        items: [
          'Measure Lactate Level: Remeasure if initial lactate > 2 mmol/L',
          'Obtain Blood Cultures: Prior to antibiotic administration',
          'Broad-Spectrum Antibiotics: Administer ASAP',
          'Fluid Resuscitation: 30 mL/kg crystalloid for hypotension or lactate ≥ 4 mmol/L',
          'Vasopressors: If hypotensive during/after fluid to maintain MAP ≥ 65 mmHg'
        ]
      }
    ]
  },
  {
    id: 'stemi-pathway',
    name: 'STEMI Management',
    description: 'Acute ST-Elevation MI Protocol',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: '1. Diagnosis & Initial Care',
        color: 'red',
        items: [
          'ECG within 10 mins of arrival',
          'Aspirin 300mg (chewed/crushed)',
          'Nitroglycerin (caution in inferior MI/RV infarct)',
          'Morphine for refractory pain',
          'Oxygen if SpO2 < 94%'
        ]
      },
      {
        title: '2. Reperfusion Strategy',
        color: 'red',
        items: [
          'Primary PCI: Goal Door-to-Balloon < 90 mins (if transfer, < 120 mins)',
          'Fibrinolytics: If PCI not available within 120 mins. Goal Door-to-Needle < 30 mins'
        ]
      },
      {
        title: '3. Adjunctive Therapy',
        color: 'blue',
        items: [
          'Loading P2Y12 Inhibitor: Clopidogrel (300/600mg) or Ticagrelor (180mg)',
          'Anticoagulation: UFH or Enoxaparin',
          'Statins: High-intensity (Atorvastatin 80mg)'
        ]
      }
    ]
  },
  {
    id: 'nstemi-ua-pathway',
    name: 'NSTEMI / UA Pathway',
    description: 'Non-ST Elevation ACS Protocol',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: 'Initial Management',
        color: 'amber',
        items: [
          'Aspirin 300mg initial dose, then 75-100mg daily',
          'Nitrates for ongoing ischemia',
          'Anticoagulation: Fondaparinux or Enoxaparin preferred over UFH',
          'Risk Stratify: Calculate GRACE or TIMI score'
        ]
      },
      {
        title: 'Invasive Strategy Timing',
        color: 'blue',
        items: [
          'Immediate (<2h): Hemodynamic instability, refractory chest pain, heart failure',
          'Early (<24h): GRACE score >140, dynamic ST/T wave changes',
          'Delayed (<72h): GRACE 109-140, DM, renal insufficiency'
        ]
      }
    ]
  },
  {
    id: 'acute-hypertension',
    name: 'Acute Hypertension',
    description: 'Emergency vs Urgency Management',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: 'Hypertensive Emergency',
        color: 'red',
        items: [
          'Defined by: BP >180/120 + Target Organ Damage (Stroke, ACS, Aortic Dissection, AKI)',
          'Goal: Reduce MAP by 20-25% in 1st hour (Exceptions: Stroke/Dissection)',
          'Agents: Labetalol (IV), Nicardipine (IV), Esmolol (IV)'
        ]
      },
      {
        title: 'Hypertensive Urgency',
        color: 'amber',
        items: [
          'Defined by: BP >180/120 WITHOUT Target Organ Damage',
          'Goal: Gradual reduction over 24-48 hours',
          'Agents: Oral Captopril, Clonidine, or Labetalol',
          'Management: Usually discharge with follow-up and oral meds'
        ]
      }
    ]
  },
  {
    id: 'pecarn-pediatric-head',
    name: 'PECARN Pediatric Head Injury',
    description: 'Imaging Reference for TBI',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: 'Age < 2 Years',
        color: 'red',
        items: [
          'High Risk (CT recommended): GCS <15, palpable skull fx, altered mental status',
          'Intermediate Risk (Obs vs CT): LOC >5s, severe mechanism, non-frontal scalp hematoma, acting "wrong"',
          'Low Risk: None of the above (CT not recommended)'
        ]
      },
      {
        title: 'Age >= 2 Years',
        color: 'red',
        items: [
          'High Risk (CT recommended): GCS <15, signs of basal skull fx, altered mental status',
          'Intermediate Risk (Obs vs CT): Any LOC, severe mechanism, severe headache, vomiting',
          'Low Risk: None of the above (CT not recommended)'
        ]
      }
    ]
  },
  {
    id: 'pediatric-pcap',
    name: 'Pediatric CAP (PCAP)',
    description: 'Severity-Based Clinical Pathway',
    steps: [
      {
        id: 'pcap-confirm',
        question: 'STEP 1: Confirm Clinical Pneumonia',
        details: [
          'Inclusion: Child 3mo – 18yr, Immunocompetent, Community-Onset.',
          'Pneumonia criteria: Cough or difficulty breathing AND one of:',
          '• Tachypnea (age-specific)',
          '• Chest retractions / indrawing',
          '• Abnormal lung sounds (crackles, ↓ breath sounds)'
        ],
        options: [
          { label: 'Pneumonia Confirmed', nextStepId: 'pcap-severity' },
          { label: 'Not Pneumonia', result: 'Pneumonia not clinical confirmed. Reassess for alternative diagnoses (Asthma, Bronchiolitis, FB Aspiration).' }
        ]
      },
      {
        id: 'pcap-severity',
        question: 'STEP 2: Classify Severity',
        details: [
          'SEVERE if ANY: Inability to feed, lethargy, convulsions, severe retractions, grunting, nasal flaring, SpO₂ < 92%, cyanosis, shock.',
          'NON-SEVERE if ALL: Alert, responsive, able to feed, no severe distress, SpO₂ ≥ 92%, no apnea.'
        ],
        options: [
          { label: 'Non-Severe (Outpatient)', result: 'PATHWAY A (Outpatient): High-dose Amoxicillin. No routine CXR or Labs. Mandatory 48-72h reassessment.' },
          { label: 'Severe (Inpatient)', result: 'PATHWAY B (Inpatient): Hospital Admission. Oxygen (SpO₂ ≥ 92%). IV Ampicillin or Pen G. CXR and CBC recommended.' }
        ]
      }
    ]
  },
  {
    id: 'heart-pathway',
    name: 'HEART Pathway (Chest Pain)',
    description: 'Risk Stratification for MACE',
    isScoringInteractive: true,
    scoringInterpretation: (s) => {
      if (s <= 3) return 'Low Risk: Discharge potential (~0.9-1.7% MACE)';
      if (s <= 6) return 'Moderate Risk: Admit for observation / serial tests';
      return 'High Risk: Early invasive strategy / Cardiology consult';
    },
    steps: [
      {
        id: 'h', question: 'History', options: [
          { label: 'Slightly suspicious', points: 0 },
          { label: 'Moderately suspicious', points: 1 },
          { label: 'Highly suspicious', points: 2 }
        ]
      },
      {
        id: 'e', question: 'ECG', options: [
          { label: 'Normal', points: 0 },
          { label: 'Non-specific repol disturbance', points: 1 },
          { label: 'Significant ST-deviation', points: 2 }
        ]
      },
      {
        id: 'a', question: 'Age', options: [
          { label: '< 45', points: 0 },
          { label: '45 - 64', points: 1 },
          { label: '>= 65', points: 2 }
        ]
      },
      {
        id: 'r', question: 'Risk Factors', options: [
          { label: 'None', points: 0 },
          { label: '1-2 Risk factors', points: 1 },
          { label: '>= 3 Risk factors or Hx CAD', points: 2 }
        ]
      },
      {
        id: 't', question: 'Troponin', options: [
          { label: '<= Normal limit', points: 0 },
          { label: '1-3x Normal limit', points: 1 },
          { label: '> 3x Normal limit', points: 2 }
        ]
      }
    ]
  },
  {
    id: 'tpa-contra',
    name: 'Contraindications to Thrombolytics',
    description: 'Checklist for Acute Ischemic Stroke',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: 'Absolute Contraindications',
        color: 'red',
        items: [
          'Prior intracranial hemorrhage',
          'Known cerebral arteriovenous malformation',
          'Known cerebral neoplasm (primary or metastatic)',
          'Ischemic stroke within 3 months',
          'Suspected aortic dissection',
          'Active bleeding or bleeding diathesis (Excludes menses)',
          'Significant trauma within past 3 months'
        ]
      },
      {
        title: 'Relative Contraindications',
        color: 'amber',
        items: [
          'Severe uncontrolled HTN (SBP >180 or DBP >110)',
          'Prolonged (>10min) CPR',
          'History of prior ischemic stroke >3 months',
          'Major surgery <3 weeks',
          'Recent internal hemorrhage (2 to 4 weeks)',
          'Noncompressible vascular punctures',
          'Pregnancy',
          'Active peptic ulcer',
          'Current use of anticoagulants'
        ]
      }
    ]
  },
  {
    id: 'canadian-head',
    name: 'Canadian CT Head Rule',
    description: 'Reference for Minor Head Injury',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: 'High Risk (Neuro intervention)',
        color: 'red',
        items: [
          'GCS < 15 at 2 hours post-injury',
          'Suspected open or depressed skull fracture',
          'Any sign of basal skull fracture (hemotympanum, panda eyes, Battle sign)',
          'Vomiting >= 2 times',
          'Age >= 65 years'
        ]
      },
      {
        title: 'Medium Risk (Brain Injury on CT)',
        color: 'amber',
        items: [
          'Amnesia before impact >= 30 minutes',
          'Dangerous mechanism (pedestrian hit by car, occupant ejected, fall >3ft or 5 stairs)'
        ]
      }
    ]
  },
  {
    id: 'nihss-protocol',
    name: 'NIH Stroke Scale (NIHSS)',
    description: 'Stroke Severity Scoring',
    isScoringInteractive: true,
    scoringInterpretation: (s) => {
      if (s === 0) return 'No stroke symptoms';
      if (s <= 4) return 'Minor Stroke';
      if (s <= 15) return 'Moderate Stroke';
      if (s <= 20) return 'Moderate-Severe Stroke';
      return 'Severe Stroke';
    },
    steps: [
      { id: '1a', question: '1a. Level of Consciousness', options: [{label:'Alert',points:0}, {label:'Drowsy',points:1}, {label:'Stuporous',points:2}, {label:'Coma',points:3}] },
      { id: '1b', question: '1b. LOC Questions', options: [{label:'Answers both correctly',points:0}, {label:'Answers one correctly',points:1}, {label:'Answers neither correctly',points:2}] },
      { id: '1c', question: '1c. LOC Commands', options: [{label:'Performs both correctly',points:0}, {label:'Performs one correctly',points:1}, {label:'Performs neither correctly',points:2}] },
      { id: '2', question: '2. Best Gaze', options: [{label:'Normal',points:0}, {label:'Partial gaze palsy',points:1}, {label:'Forced deviation',points:2}] },
      { id: '3', question: '3. Visual Fields', options: [{label:'No visual loss',points:0}, {label:'Partial hemianopia',points:1}, {label:'Complete hemianopia',points:2}, {label:'Bilateral hemianopia',points:3}] },
      { id: '4', question: '4. Facial Palsy', options: [{label:'Normal',points:0}, {label:'Minor paralysis',points:1}, {label:'Partial paralysis',points:2}, {label:'Complete paralysis',points:3}] },
      { id: '5a', question: '5a. Left Arm Motor', options: [{label:'No drift',points:0}, {label:'Drift',points:1}, {label:'Some effort vs gravity',points:2}, {label:'No effort vs gravity',points:3}, {label:'No movement',points:4}] },
      { id: '5b', question: '5b. Right Arm Motor', options: [{label:'No drift',points:0}, {label:'Drift',points:1}, {label:'Some effort vs gravity',points:2}, {label:'No effort vs gravity',points:3}, {label:'No movement',points:4}] },
      { id: '6a', question: '6a. Left Leg Motor', options: [{label:'No drift',points:0}, {label:'Drift',points:1}, {label:'Some effort vs gravity',points:2}, {label:'No effort vs gravity',points:3}, {label:'No movement',points:4}] },
      { id: '6b', question: '6b. Right Leg Motor', options: [{label:'No drift',points:0}, {label:'Drift',points:1}, {label:'Some effort vs gravity',points:2}, {label:'No effort vs gravity',points:3}, {label:'No movement',points:4}] },
      { id: '7', question: '7. Limb Ataxia', options: [{label:'Absent',points:0}, {label:'Present in one limb',points:1}, {label:'Present in two limbs',points:2}] },
      { id: '8', question: '8. Sensory', options: [{label:'Normal',points:0}, {label:'Mild-to-moderate loss',points:1}, {label:'Severe to total loss',points:2}] },
      { id: '9', question: '9. Best Language', options: [{label:'No aphasia',points:0}, {label:'Mild-to-moderate aphasia',points:1}, {label:'Severe aphasia',points:2}, {label:'Global aphasia / Mute',points:3}] },
      { id: '10', question: '10. Dysarthria', options: [{label:'Normal',points:0}, {label:'Mild-to-moderate',points:1}, {label:'Severe / Unintelligible',points:2}] },
      { id: '11', question: '11. Extinction / Inattention', options: [{label:'Normal',points:0}, {label:'Partial',points:1}, {label:'Complete',points:2}] }
    ]
  },
  {
    id: 'edacs-chest',
    name: 'EDACS (Chest Pain Score)',
    description: 'Early Discharge Assessment',
    isScoringInteractive: true,
    scoringInterpretation: (s) => {
      return s < 16 ? 'Low Risk: Eligible for early discharge if EKG/Troponins negative' : 'High Risk: Not eligible for early discharge protocol';
    },
    steps: [
      { id: 'age', question: 'Age (points assigned)', options: [{label:'18-45',points:2}, {label:'46-50',points:4}, {label:'51-55',points:6}, {label:'56-60',points:8}, {label:'61-65',points:10}, {label:'66-70',points:12}, {label:'71-75',points:14}, {label:'76-80',points:16}, {label:'Others',points:0}] },
      { id: 'sex', question: 'Female?', options: [{label:'Yes',points:0}, {label:'No (Male)',points:1}] },
      { id: 'cad', question: 'Known CAD or >= 3 Risk Factors?', options: [{label:'Yes',points:3}, {label:'No',points:0}] },
      { id: 'symp1', question: 'Diaphoresis?', options: [{label:'Yes',points:3}, {label:'No',points:0}] },
      { id: 'symp2', question: 'Pain radiation to arm/shoulder?', options: [{label:'Yes',points:5}, {label:'No',points:0}] },
      { id: 'symp3', question: 'Pain occurred with exertion?', options: [{label:'Yes',points:3}, {label:'No',points:0}] },
      { id: 'symp4', question: 'Pain relieved by nitrates?', options: [{label:'Yes',points:0}, {label:'No',points:0}] }
    ]
  },
  {
    id: 'abcd2-tia',
    name: 'ABCD² Score (TIA)',
    description: 'Stroke Risk Post-TIA',
    isScoringInteractive: true,
    scoringInterpretation: (s) => {
      if (s <= 3) return 'Low Risk: 1.0% stroke risk at 2 days';
      if (s <= 5) return 'Moderate Risk: 4.1% stroke risk at 2 days';
      return 'High Risk: 8.1% stroke risk at 2 days';
    },
    steps: [
      { id: 'a', question: 'Age >= 60', options: [{label:'Yes',points:1}, {label:'No',points:0}] },
      { id: 'b', question: 'BP >= 140/90 mmHg', options: [{label:'Yes',points:1}, {label:'No',points:0}] },
      { id: 'c', question: 'Clinical Features', options: [{label:'Unilateral weakness',points:2}, {label:'Speech disturbance without weakness',points:1}, {label:'Other',points:0}] },
      { id: 'd1', question: 'Duration of Symptoms', options: [{label:'>= 60 minutes',points:2}, {label:'10 - 59 minutes',points:1}, {label:'< 10 minutes',points:0}] },
      { id: 'd2', question: 'Diabetes', options: [{label:'Yes',points:1}, {label:'No',points:0}] }
    ]
  },
  {
    id: 'ciwa-alcohol',
    name: 'CIWA-Ar (Alcohol Withdrawal)',
    description: 'Withdrawal Severity Assessment',
    isScoringInteractive: true,
    scoringInterpretation: (s) => {
      if (s <= 8) return 'Mild Withdrawal: Supportive care, monitor q4-8h';
      if (s <= 15) return 'Moderate Withdrawal: BZD therapy indicated';
      return 'Severe Withdrawal: Aggressive treatment, risk of DTs/Seizures';
    },
    steps: [
      { id: 'nv', question: 'Nausea and Vomiting (0-7)', options: Array.from({length:8}).map((_,i)=>({label:`${i}`,points:i})) },
      { id: 'tr', question: 'Tremor (0-7)', options: Array.from({length:8}).map((_,i)=>({label:`${i}`,points:i})) },
      { id: 'ps', question: 'Paroxysmal Sweats (0-7)', options: Array.from({length:8}).map((_,i)=>({label:`${i}`,points:i})) },
      { id: 'ax', question: 'Anxiety (0-7)', options: Array.from({length:8}).map((_,i)=>({label:`${i}`,points:i})) },
      { id: 'ag', question: 'Agitation (0-7)', options: Array.from({length:8}).map((_,i)=>({label:`${i}`,points:i})) },
      { id: 'td', question: 'Tactile Disturbances (0-7)', options: Array.from({length:8}).map((_,i)=>({label:`${i}`,points:i})) },
      { id: 'ad', question: 'Auditory Disturbances (0-7)', options: Array.from({length:8}).map((_,i)=>({label:`${i}`,points:i})) },
      { id: 'vd', question: 'Visual Disturbances (0-7)', options: Array.from({length:8}).map((_,i)=>({label:`${i}`,points:i})) },
      { id: 'hd', question: 'Headache / Fullness in head (0-7)', options: Array.from({length:8}).map((_,i)=>({label:`${i}`,points:i})) },
      { id: 'or', question: 'Orientation (0-4)', options: Array.from({length:5}).map((_,i)=>({label:`${i}`,points:i})) }
    ]
  },
  {
    id: 'c-cspine',
    name: 'Canadian C-Spine Rule',
    description: 'C-Spine Radiography Reference',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: '1. High Risk (Must Image)',
        color: 'red',
        items: [
          'Age >= 65',
          'Dangerous mechanism (Fall >3ft, axial load, high speed MVC, bicycle collision)',
          'Paresthesias in extremities'
        ]
      },
      {
        title: '2. Low Risk (Safe to Assess ROM)',
        color: 'emerald',
        items: [
          'Simple rear-end MVC',
          'Sitting position in ED',
          'Ambulatory at any time',
          'Delayed onset neck pain',
          'Absence of midline C-spine tenderness'
        ]
      },
      {
        title: '3. Range of Motion Assessment',
        color: 'amber',
        items: [
          'If able to rotate neck 45 degrees left AND right: No X-ray required.'
        ]
      }
    ]
  },
  {
    id: 'ottawa-knee',
    name: 'Ottawa Knee Rule',
    description: 'Reference for Knee Fractures',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: 'Imaging Required if Any Present:',
        color: 'red',
        items: [
          'Age >= 55',
          'Isolated tenderness of patella',
          'Tenderness at head of fibula',
          'Inability to flex to 90 degrees',
          'Inability to bear weight both immediately and in ED (4 steps)'
        ]
      }
    ]
  },
  {
    id: 'ottawa-ankle',
    name: 'Ottawa Ankle / Foot Rule',
    description: 'Reference for Ankle/Foot Fractures',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: 'Ankle Series Required if:',
        color: 'red',
        items: [
          'Bone tenderness at posterior edge or tip of lateral malleolus (6cm)',
          'Bone tenderness at posterior edge or tip of medial malleolus (6cm)',
          'Inability to bear weight both immediately and in ED'
        ]
      },
      {
        title: 'Foot Series Required if:',
        color: 'red',
        items: [
          'Bone tenderness at base of 5th metatarsal',
          'Bone tenderness at navicular',
          'Inability to bear weight both immediately and in ED'
        ]
      }
    ]
  },
  {
    id: 'sepsis-criteria',
    name: 'SIRS / Sepsis Criteria',
    description: 'Systemic Inflammatory Response',
    isStaticReference: true,
    steps: [],
    referenceGroups: [
      {
        title: 'SIRS Criteria (>= 2 for SIRS)',
        color: 'blue',
        items: [
          'Temperature >38.3°C (101°F) or <36°C (96.8°F)',
          'Heart Rate > 90 bpm',
          'Resp Rate > 20 or PaCO2 < 32 mmHg',
          'WBC > 12,000 or < 4,000 or >10% bands'
        ]
      },
      {
        title: 'Definitions',
        color: 'red',
        items: [
          'Sepsis: SIRS + Suspected or confirmed source of infection',
          'Septic Shock: Sepsis + Hypotension despite fluid resuscitation OR Lactate > 2 mmol/L',
          'qSOFA: Altered mental status, SBP <= 100, RR >= 22'
        ]
      }
    ]
  }
];
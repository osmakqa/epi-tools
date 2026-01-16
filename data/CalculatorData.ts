
import { Medication } from '../types';

export const COMMON_MEDS: Medication[] = [
  {
    name: 'Paracetamol',
    category: 'COMMON',
    dosing: { standard: [10, 20] },
    preparations: [
      { label: 'Drops (100mg/mL)', value: 100, unit: 'mg/mL' },
      { label: '125mg/5mL', value: 25, unit: 'mg/mL' },
      { label: '250mg/5mL', value: 50, unit: 'mg/mL' },
      { label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }
    ]
  },
  {
    name: 'Ibuprofen',
    category: 'COMMON',
    dosing: { standard: [5, 10] },
    preparations: [
      { label: '100mg/5mL', value: 20, unit: 'mg/mL' },
      { label: '200mg/5mL', value: 40, unit: 'mg/mL' }
    ]
  }
];

export const PEDI_ANTIBIOTICS: Medication[] = [
  {
    name: 'Amoxicillin',
    category: 'ANTIMICROBIALS',
    dosing: { q8: [25, 50], q12: [25, 50] },
    preparations: [
      { label: '125mg/5mL', value: 25, unit: 'mg/mL' },
      { label: '250mg/5mL', value: 50, unit: 'mg/mL' }
    ]
  },
  {
    name: 'Co-Amoxiclav',
    category: 'ANTIMICROBIALS',
    dosing: { q8: [25, 45], q12: [25, 45] },
    preparations: [
      { label: '156.25mg/5mL', value: 31.25, unit: 'mg/mL' },
      { label: '228.5mg/5mL', value: 45.7, unit: 'mg/mL' },
      { label: '457mg/5mL', value: 91.4, unit: 'mg/mL' }
    ]
  },
  {
    name: 'Azithromycin',
    category: 'ANTIMICROBIALS',
    dosing: { q24: [10, 10] },
    preparations: [{ label: '200mg/5mL', value: 40, unit: 'mg/mL' }]
  },
  {
    name: 'Cefixime',
    category: 'ANTIMICROBIALS',
    dosing: { q12: [8, 8], q24: [8, 8] },
    preparations: [
      { label: '100mg/5mL', value: 20, unit: 'mg/mL' },
      { label: '200mg/5mL', value: 40, unit: 'mg/mL' }
    ]
  },
  {
    name: 'Cefuroxime',
    category: 'ANTIMICROBIALS',
    dosing: { q8: [100, 150], q12: [20, 30] },
    preparations: [
      { label: '125mg/5mL', value: 25, unit: 'mg/mL' },
      { label: '250mg/5mL', value: 50, unit: 'mg/mL' },
      { label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }
    ]
  },
  {
    name: 'Cephalexin',
    category: 'ANTIMICROBIALS',
    dosing: { q12: [25, 25] },
    preparations: [
      { label: '100mg/5mL', value: 20, unit: 'mg/mL' },
      { label: '125mg/5mL', value: 25, unit: 'mg/mL' },
      { label: '250mg/5mL', value: 50, unit: 'mg/mL' }
    ]
  },
  {
    name: 'Clarithromycin',
    category: 'ANTIMICROBIALS',
    dosing: { q12: [15, 15] },
    preparations: [{ label: '125mg/5mL', value: 25, unit: 'mg/mL' }]
  },
  {
    name: 'Clindamycin',
    category: 'ANTIMICROBIALS',
    dosing: { q8: [20, 30] },
    preparations: [{ label: '75mg/5mL', value: 15, unit: 'mg/mL' }]
  },
  {
    name: 'Metronidazole',
    category: 'ANTIMICROBIALS',
    dosing: { q6: [15, 30] },
    preparations: [{ label: '125mg/5mL', value: 25, unit: 'mg/mL' }]
  },
  {
    name: 'Ampicillin-Sulbactam',
    category: 'ANTIMICROBIALS',
    dosing: { q6: [200, 200] },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Ceftriaxone',
    category: 'ANTIMICROBIALS',
    dosing: { q12: [75, 100], q24: [75, 100] },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  }
];

export const RESUS_DRUGS: Medication[] = [
  {
    name: 'Epinephrine (IV/IO)',
    category: 'RESUSCITATION',
    dosing: { single: 0.01 },
    preparations: [{ label: '1:10000 (0.1mg/mL)', value: 0.1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Epinephrine (ET)',
    category: 'RESUSCITATION',
    dosing: { single: 0.1 },
    preparations: [{ label: '1:1000 (1mg/mL)', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Atropine (IV/IO)',
    category: 'RESUSCITATION',
    dosing: { single: 0.02 },
    preparations: [{ label: '0.1mg/mL', value: 0.1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Amiodarone (Arrest)',
    category: 'RESUSCITATION',
    dosing: { single: 5 },
    preparations: [{ label: '50mg/mL', value: 50, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Adenosine (1st Dose)',
    category: 'RESUSCITATION',
    dosing: { single: 0.1 },
    preparations: [{ label: '3mg/mL', value: 3, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Adenosine (2nd Dose)',
    category: 'RESUSCITATION',
    dosing: { single: 0.2 },
    preparations: [{ label: '3mg/mL', value: 3, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Cardioversion (1st)',
    category: 'RESUSCITATION',
    unitType: 'J',
    dosing: { standard: [0.5, 1] },
    preparations: [{ label: 'Energy Setting', value: 1, unit: 'J', isIV: true }]
  },
  {
    name: 'Cardioversion (2nd)',
    category: 'RESUSCITATION',
    unitType: 'J',
    dosing: { single: 2 },
    preparations: [{ label: 'Energy Setting', value: 1, unit: 'J', isIV: true }]
  },
  {
    name: 'Defibrillation',
    category: 'RESUSCITATION',
    unitType: 'J',
    customStep: 1,
    dosing: { standard: [2, 4] },
    preparations: [{ label: 'Energy Setting', value: 1, unit: 'J', isIV: true }]
  }
];

export const SEIZURE_DRUGS: Medication[] = [
  {
    name: 'Midazolam (IV)',
    category: 'SEIZURE',
    customStep: 0.1,
    dosing: { standard: [0.1, 0.2] },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Midazolam (Intranasal)',
    category: 'SEIZURE',
    dosing: { single: 0.2 },
    preparations: [{ label: '5mg/mL', value: 5, unit: 'mg/mL' }]
  },
  {
    name: 'Diazepam (IV)',
    category: 'SEIZURE',
    customStep: 0.1,
    dosing: { standard: [0.1, 0.3] },
    preparations: [{ label: '5mg/mL', value: 5, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Diazepam (PR)',
    category: 'SEIZURE',
    dosing: { single: 0.5 },
    preparations: [{ label: '5mg/mL', value: 5, unit: 'mg/mL' }]
  },
  {
    name: 'Phenobarbital',
    category: 'SEIZURE',
    maxDose: 800,
    dosing: { single: 20 },
    preparations: [{ label: '130mg/mL', value: 130, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Phenytoin',
    category: 'SEIZURE',
    maxDose: 1000,
    dosing: { single: 20 },
    preparations: [{ label: 'IV Preparation', value: 50, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Sodium Valproate',
    category: 'SEIZURE',
    dosing: { standard: [40, 60] },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Levetiracetam',
    category: 'SEIZURE',
    dosing: { single: 60 },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Propofol (Loading)',
    category: 'SEIZURE',
    dosing: { standard: [0.5, 2] },
    preparations: [{ label: 'IV Preparation', value: 10, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Propofol (Infusion)',
    category: 'SEIZURE',
    dosing: { standard: [1.5, 4] },
    preparations: [{ label: 'Infusion (mg/hr)', value: 1, unit: 'mg/hr', isIV: true }]
  },
  {
    name: 'Midazolam (Loading)',
    category: 'SEIZURE',
    maxDose: 10,
    customStep: 0.1,
    dosing: { standard: [0.1, 0.2] },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Midazolam (Infusion)',
    category: 'SEIZURE',
    dosing: { standard: [0.05, 0.4] },
    preparations: [{ label: 'Infusion (mg/hr)', value: 1, unit: 'mg/hr', isIV: true }]
  },
  {
    name: 'Ketamine (Loading)',
    category: 'SEIZURE',
    dosing: { standard: [2, 3] },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Ketamine (Infusion)',
    category: 'SEIZURE',
    dosing: { standard: [0.01, 0.06] },
    preparations: [{ label: 'Infusion (mg/hr)', value: 1, unit: 'mg/hr', isIV: true }]
  }
];

export const ANAPHYLAXIS_DRUGS: Medication[] = [
  {
    name: 'Epinephrine (IM)',
    category: 'ANAPHYLAXIS',
    dosing: { single: 0.01 },
    preparations: [{ label: '1:1000 (1mg/mL)', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Diphenhydramine',
    category: 'ANAPHYLAXIS',
    dosing: { single: 1 },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Ranitidine',
    category: 'ANAPHYLAXIS',
    dosing: { single: 0.5 },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Hydrocortisone IV',
    category: 'ANAPHYLAXIS',
    customStep: 1,
    maxDose: 500,
    dosing: { standard: [5, 10] },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  },
  {
    name: 'Methylprednisolone IV',
    category: 'ANAPHYLAXIS',
    customStep: 1,
    maxDose: 125,
    dosing: { standard: [1, 2] },
    preparations: [{ label: 'IV Preparation', value: 1, unit: 'mg/mL', isIV: true }]
  }
];

export const VASOPRESSOR_CONFIG = [
  {
    name: 'Dopamine',
    amounts: [200, 400, 800], // mg
    diluents: [100, 250], // mL
    min: 0,
    max: 20,
    step: 1,
    unit: 'mcg/kg/min'
  },
  {
    name: 'Dobutamine',
    amounts: [250, 500, 1000], // mg
    diluents: [100, 250], // mL
    min: 0,
    max: 20,
    step: 1,
    unit: 'mcg/kg/min'
  },
  {
    name: 'Norepinephrine',
    amounts: [2, 4, 8, 16, 32], // mg
    diluents: [100, 250], // mL
    min: 0,
    max: 2,
    step: 0.1,
    unit: 'mcg/kg/min'
  }
];

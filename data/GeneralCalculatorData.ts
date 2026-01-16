
import { CalculatorDef } from '../types';

// --- HELPERS ---
const getCKDStage = (val: number) => {
  if (val >= 90) return 'Stage 1: Normal/High function';
  if (val >= 60) return 'Stage 2: Mildly decreased';
  if (val >= 45) return 'Stage 3a: Mild-Moderate loss';
  if (val >= 30) return 'Stage 3b: Mod-Severe loss';
  if (val >= 15) return 'Stage 4: Severely decreased';
  return 'Stage 5: Kidney Failure';
};

// --- CALCULATOR DEFINITIONS ---
export const CALCULATORS: CalculatorDef[] = [
  // --- RESPIRATORY ---
  {
    id: 'desired_fio2',
    name: 'Desired FiO2 Calculator',
    category: 'Respiratory',
    inputs: [
      { id: 'lpm', label: 'Current Oxygen (LPM)', type: 'number', unit: 'L/min' },
      { id: 'curr_pao2', label: 'Current PaO2', type: 'number', unit: 'mmHg' },
      { id: 'des_pao2', label: 'Desired PaO2', type: 'number', unit: 'mmHg' }
    ],
    calculate: (v) => {
      const lpm = Number(v.lpm);
      const currPao2 = Number(v.curr_pao2);
      const desPao2 = Number(v.des_pao2);
      
      if (!currPao2 || !desPao2) return 'Enter PaO2 values';
      
      // Clinical heuristic: FiO2 (%) = 21 + (4 * LPM)
      const currFio2 = 21 + (4 * (lpm || 0));
      const res = (desPao2 * currFio2) / currPao2;
      
      // Reverse heuristic to get LPM: LPM = (FiO2 - 21) / 4
      const desLpm = Math.max(0, (res - 21) / 4);
      
      let warning = '';
      if (res > 100) {
        warning = '\n⚠️ Exceeds 100% FiO2 potential.';
      }
      
      return `Estimated Current FiO2: ${currFio2}%\n\nDesired FiO2: ${res.toFixed(0)}%\nDesired O2: ${desLpm.toFixed(1)} LPM${warning}`;
    }
  },
  {
    id: 'abg',
    name: 'ABG Analyzer',
    category: 'Respiratory',
    inputs: [
      { id: 'ph', label: 'pH', type: 'number', placeholder: '7.40' },
      { id: 'pco2', label: 'pCO2 (mmHg)', type: 'number', placeholder: '40' },
      { id: 'hco3', label: 'HCO3 (mEq/L)', type: 'number', placeholder: '24' },
      { id: 'po2', label: 'pO2 (mmHg)', type: 'number', placeholder: '90' }
    ],
    calculate: (v) => {
      const ph = Number(v.ph);
      const pco2 = Number(v.pco2);
      const hco3 = Number(v.hco3);
      const po2 = v.po2 ? Number(v.po2) : null;
      if (!ph || !pco2 || !hco3) return 'Enter values';

      let primary = '';
      let comp = 'Uncompensated';

      if (ph < 7.35) {
        if (pco2 > 45 && hco3 < 22) primary = 'Mixed Resp/Met Acidosis';
        else if (pco2 > 45) {
          primary = 'Respiratory Acidosis';
          const expHco3 = 24 + ((pco2 - 40) / 10);
          if (hco3 > expHco3 + 2) comp = 'Partially Compensated';
          else if (ph >= 7.35) comp = 'Fully Compensated';
        } else if (hco3 < 22) {
          primary = 'Metabolic Acidosis';
          const expPco2 = (1.5 * hco3) + 8;
          if (pco2 < expPco2 - 2) comp = 'Partially Compensated (Concomitant Resp Alk)';
          else if (pco2 > expPco2 + 2) comp = 'Partially Compensated (Concomitant Resp Acid)';
          else comp = 'Compensated (Winter\'s Rule Met)';
        }
      } else if (ph > 7.45) {
        if (pco2 < 35 && hco3 > 26) primary = 'Mixed Resp/Met Alkalosis';
        else if (pco2 < 35) {
          primary = 'Respiratory Alkalosis';
          if (hco3 < 22) comp = 'Partially Compensated';
        } else if (hco3 > 26) {
          primary = 'Metabolic Alkalosis';
          const expPco2 = 0.7 * (hco3 - 24) + 40;
          if (Math.abs(pco2 - expPco2) < 2) comp = 'Fully Compensated';
          else comp = 'Partially Compensated';
        }
      } else {
        primary = 'Normal pH';
        if (pco2 > 45 || pco2 < 35 || hco3 > 26 || hco3 < 22) primary = 'Mixed Disorder / Compensated';
        else primary = 'Normal ABG';
        comp = '';
      }

      let oxy = '';
      if (po2 !== null) {
        if (po2 < 60) oxy = 'Severe Hypoxemia';
        else if (po2 < 80) oxy = 'Mild Hypoxemia';
        else oxy = 'Normal Oxygenation';
      }

      return `${primary}\n${comp}\n${oxy ? `Oxygenation: ${oxy}` : ''}`;
    }
  },
  {
    id: 'adult_vent',
    name: 'ETT Depth & Tidal Volume (Adult)',
    category: 'Respiratory',
    inputs: [
      { id: 'ht', label: 'Height', type: 'number', unit: 'cm' },
      { id: 'sex', label: 'Sex', type: 'radio', options: [{ label: 'Male', value: 'm' }, { label: 'Female', value: 'f' }] }
    ],
    calculate: (v) => {
      if (!v.ht) return 'Enter height';
      const ht = Number(v.ht);
      const base = v.sex === 'm' ? 50 : 45.5;
      const pbw = base + 0.91 * (ht - 152.4);
      const tv6 = (pbw * 6).toFixed(0);
      const tv8 = (pbw * 8).toFixed(0);
      const depth = v.sex === 'm' ? '23 cm' : '21 cm';
      const size = v.sex === 'm' ? '7.5 - 8.0' : '7.0 - 7.5';
      return `PBW: ${pbw.toFixed(1)} kg\n\nTV (6-8 mL/kg): ${tv6}-${tv8} mL\nETT Size: ${size} mm\nDepth: ~${depth} at lip`;
    }
  },
  {
    id: 'ett_pedia',
    name: 'Pediatric ETT Size & Depth',
    category: 'Respiratory',
    inputs: [
       { id: 'age', label: 'Age', type: 'number', unit: 'yrs' },
       { id: 'wt', label: 'Weight', type: 'number', unit: 'kg' }
    ],
    calculate: (v) => {
       if (!v.age || !v.wt) return 'Enter values';
       const age = Number(v.age);
       const uncuffed = (age / 4) + 4;
       const cuffed = (age / 4) + 3.5;
       const depth = (age / 2) + 12;
       return `Uncuffed ID: ${uncuffed.toFixed(1)} mm\nCuffed ID: ${cuffed.toFixed(1)} mm\nDepth (Lip): ~${depth.toFixed(1)} cm\nTV: ${(v.wt*6).toFixed(0)}-${(v.wt*8).toFixed(0)} mL`;
    }
  },
  {
    id: 'rox',
    name: 'ROX Index (HFNC)',
    category: 'Respiratory',
    inputs: [
      { id: 'spo2', label: 'SpO2', type: 'number', unit: '%' },
      { id: 'fio2', label: 'FiO2', type: 'number', unit: '%' },
      { id: 'rr', label: 'Resp Rate', type: 'number', unit: '/min' }
    ],
    calculate: (v) => {
      if (!v.spo2 || !v.fio2 || !v.rr) return 'Enter values';
      const fio2 = Number(v.fio2) > 1 ? Number(v.fio2)/100 : Number(v.fio2);
      const rox = (Number(v.spo2) / fio2) / Number(v.rr);
      return `ROX: ${rox.toFixed(2)}\n(>= 4.88: Likely Success\n< 2.85: High Failure Risk)`;
    }
  },

  // --- CARDIOVASCULAR ---
  {
    id: 'map',
    name: 'Mean Arterial Pressure',
    category: 'Cardiovascular',
    inputs: [
      { id: 'sbp', label: 'SBP', type: 'number', unit: 'mmHg' },
      { id: 'dbp', label: 'DBP', type: 'number', unit: 'mmHg' }
    ],
    calculate: (v) => {
      if(!v.sbp || !v.dbp) return 'Enter values';
      return `${((Number(v.sbp) + 2 * Number(v.dbp)) / 3).toFixed(0)} mmHg`;
    }
  },

  // --- TRAUMA ---
  {
    id: 'parkland',
    name: 'Parkland Formula',
    category: 'Trauma',
    inputs: [{ id: 'wt', label: 'Weight', type: 'number', unit: 'kg' }, { id: 'tbsa', label: 'TBSA %', type: 'number' }],
    calculate: (v) => {
      if(!v.wt || !v.tbsa) return 'Enter values';
      const vol = 4 * Number(v.wt) * Number(v.tbsa);
      return `Total 24h: ${vol} mL LR\n1st 8h: ${vol/2} mL (${(vol/2/8).toFixed(0)} mL/hr)`;
    }
  },

  // --- RENAL & ELECTROLYTES ---
  {
    id: 'ckd_epi',
    name: 'CKD-EPI (GFR)',
    category: 'Renal',
    inputs: [{id:'cr',label:'Creatinine',type:'number'}, {id:'age',label:'Age',type:'number'}, {id:'sex',label:'Sex',type:'radio',options:[{label:'Male',value:'m'},{label:'Female',value:'f'}]}],
    calculate: (v) => {
      if(!v.cr || !v.age) return 'Enter values';
      const cr = Number(v.cr); const age = Number(v.age);
      const k = v.sex === 'f' ? 0.7 : 0.9; const a = v.sex === 'f' ? -0.241 : -0.302;
      const sexF = v.sex === 'f' ? 1.012 : 1;
      const gfr = 142 * Math.pow(Math.min(cr/k, 1), a) * Math.pow(Math.max(cr/k, 1), -1.2) * Math.pow(0.9938, age) * sexF;
      return `${gfr.toFixed(1)} mL/min/1.73m²\n${getCKDStage(gfr)}`;
    }
  },
  {
    id: 'cockcroft',
    name: 'Cockcroft-Gault Equation',
    category: 'Renal',
    inputs: [{id:'cr',label:'Creatinine',type:'number'},{id:'age',label:'Age',type:'number'},{id:'wt',label:'Weight',type:'number'},{id:'sex',label:'Sex',type:'radio',options:[{label:'Male',value:1},{label:'Female',value:0.85}]}],
    calculate: (v) => {
      if(!v.cr || !v.age || !v.wt) return 'Enter values';
      const res = ((140 - Number(v.age)) * Number(v.wt) * Number(v.sex)) / (72 * Number(v.cr));
      return `${res.toFixed(1)} mL/min`;
    }
  },
  {
    id: 'bedside_schwartz',
    name: 'Bedside Schwartz (Pedia GFR)',
    category: 'Renal',
    inputs: [
      { id: 'ht', label: 'Height', type: 'number', unit: 'cm' },
      { id: 'cr', label: 'Creatinine', type: 'number', placeholder: 'mg/dL' }
    ],
    calculate: (v) => {
      if(!v.ht || !v.cr) return 'Enter values';
      const gfr = (0.413 * Number(v.ht)) / Number(v.cr);
      return `${gfr.toFixed(1)} mL/min/1.73m²\n${getCKDStage(gfr)}`;
    }
  },
  {
    id: 'hco3_deficit',
    name: 'Bicarbonate Deficit',
    category: 'Renal',
    inputs: [{id:'wt',label:'Weight (kg)',type:'number'},{id:'curr',label:'Curr HCO3',type:'number'},{id:'des',label:'Desired HCO3',type:'number'}],
    calculate: (v) => {
      if(!v.wt || !v.curr || !v.des) return 'Enter values';
      const def = 0.5 * Number(v.wt) * (Number(v.des) - Number(v.curr));
      return `${def.toFixed(1)} mEq required`;
    }
  },
  {
    id: 'bun_cr',
    name: 'BUN Creatinine Ratio',
    category: 'Renal',
    inputs: [{id:'bun',label:'BUN',type:'number'},{id:'cr',label:'Creatinine',type:'number'}],
    calculate: (v) => {
      if(!v.bun || !v.cr) return 'Enter values';
      const r = Number(v.bun) / Number(v.cr);
      return `Ratio: ${r.toFixed(1)}\n${r > 20 ? 'Prerenal likely' : 'Intrarenal/Normal'}`;
    }
  },
  {
    id: 'na_corr',
    name: 'Sodium Corr (Glucose)',
    category: 'Renal',
    inputs: [{id:'na',label:'Measured Na',type:'number'},{id:'glu',label:'Glucose',type:'number'}],
    calculate: (v) => {
      if(!v.na || !v.glu) return 'Enter values';
      const res = Number(v.na) + 1.6 * ((Number(v.glu) - 100) / 100);
      return `${res.toFixed(1)} mmol/L (Corrected)`;
    }
  },
  {
    id: 'fwd',
    name: 'Free Water Deficit',
    category: 'Renal',
    inputs: [{id:'na',label:'Curr Na',type:'number'},{id:'wt',label:'Weight',type:'number'},{id:'sex',label:'Factor',type:'radio',options:[{label:'M (0.6)',value:0.6},{label:'F (0.5)',value:0.5}]}],
    calculate: (v) => {
      if(!v.na || !v.wt) return 'Enter values';
      const def = Number(v.sex) * Number(v.wt) * ((Number(v.na)/140) - 1);
      return `${def.toFixed(1)} Liters deficit`;
    }
  },
  {
    id: 'anion_gap',
    name: 'Serum Anion Gap',
    category: 'Renal',
    inputs: [{id:'na',label:'Na',type:'number'},{id:'cl',label:'Cl',type:'number'},{id:'hco3',label:'HCO3',type:'number'}],
    calculate: (v) => {
      if(!v.na || !v.cl || !v.hco3) return 'Enter values';
      return `${(Number(v.na) - (Number(v.cl) + Number(v.hco3))).toFixed(1)} mEq/L`;
    }
  },

  // --- GENERAL & MISC ---
  {
    id: 'preg_due',
    name: 'Pregnancy Due Date & GA',
    category: 'General',
    inputs: [
      { id: 'type', label: 'Method', type: 'radio', options: [{label: 'LMP', value: 'lmp'}, {label: 'Ultrasound', value: 'us'}] },
      { id: 'date', label: 'Reference Date (LMP or Scan Date)', type: 'date' },
      { id: 'ga_w', label: 'GA Weeks (at scan)', type: 'number', placeholder: '0' },
      { id: 'ga_d', label: 'GA Days (at scan)', type: 'number', placeholder: '0' },
    ],
    calculate: (v) => {
      if (!v.date) return 'Select date';
      const refDate = new Date(v.date);
      const today = new Date();
      let edd = new Date();
      let gaDays = 0;

      if (v.type === 'lmp') {
        edd.setTime(refDate.getTime() + 280 * 86400000);
        gaDays = Math.floor((today.getTime() - refDate.getTime()) / 86400000);
      } else {
        const scanGA = (Number(v.ga_w||0) * 7) + Number(v.ga_d||0);
        edd.setTime(refDate.getTime() + (280 - scanGA) * 86400000);
        gaDays = scanGA + Math.floor((today.getTime() - refDate.getTime()) / 86400000);
      }
      const gw = Math.floor(gaDays / 7);
      const gd = gaDays % 7;
      return `EDD: ${edd.toDateString()}\nCurr GA: ${gw}w ${gd}d`;
    }
  },
  {
    id: 'bmi',
    name: 'BMI & IBW',
    category: 'General',
    inputs: [{id:'wt',label:'Weight (kg)',type:'number'},{id:'ht',label:'Height (cm)',type:'number'},{id:'sex',label:'Sex',type:'radio',options:[{label:'M',value:'m'},{label:'F',value:'f'}]}],
    calculate: (v) => {
      if(!v.wt || !v.ht) return 'Enter values';
      const m = Number(v.ht)/100; const bmi = Number(v.wt)/(m*m);
      const ibw = (v.sex === 'm' ? 50 : 45.5) + 2.3 * ((Number(v.ht)/2.54) - 60);
      return `BMI: ${bmi.toFixed(1)}\nIBW: ~${ibw.toFixed(1)} kg`;
    }
  },
  {
    id: 'anc',
    name: 'Absolute Neutrophil Count',
    category: 'General',
    inputs: [{id:'wbc',label:'WBC',type:'number'},{id:'segs',label:'Segs %',type:'number'},{id:'bands',label:'Bands %',type:'number'}],
    calculate: (v) => {
      if(!v.wbc) return 'Enter values';
      const anc = Number(v.wbc) * ((Number(v.segs||0) + Number(v.bands||0))/100);
      return `${anc.toFixed(0)} cells/mm3`;
    }
  },
  {
    id: 'apgar',
    name: 'APGAR Score',
    category: 'General',
    isScore: true,
    inputs: [
      { id: 'a', label: 'Appearance', type: 'select', options: [{label:'Blue/Pale (0)',value:0},{label:'Body pink, ext blue (1)',value:1},{label:'Pink (2)',value:2}] },
      { id: 'p', label: 'Pulse', type: 'select', options: [{label:'Absent (0)',value:0},{label:'<100 (1)',value:1},{label:'>100 (2)',value:2}] },
      { id: 'g', label: 'Grimace', type: 'select', options: [{label:'Floppy (0)',value:0},{label:'Min response (1)',value:1},{label:'Cry/Sneeze (2)',value:2}] },
      { id: 'a2', label: 'Activity', type: 'select', options: [{label:'Absent (0)',value:0},{label:'Flexed (1)',value:1},{label:'Active (2)',value:2}] },
      { id: 'r', label: 'Resp', type: 'select', options: [{label:'Absent (0)',value:0},{label:'Slow/Irreg (1)',value:1},{label:'Vigorous (2)',value:2}] },
    ],
    calculate: (v) => {
       const score = Object.values(v).reduce((a,b) => Number(a)+Number(b), 0);
       return { score, result: score >= 7 ? 'Normal' : score <= 3 ? 'Critically Low' : 'Fair' };
    }
  },

  // --- GASTRO ---
  {
    id: 'alvarado',
    name: 'Alvarado Score (Appy)',
    category: 'Gastro',
    isScore: true,
    inputs: [
      { id: 'mig', label: 'Migration of pain (+1)', type: 'radio', options: [{label:'Yes', value: 1}, {label:'No', value: 0}] },
      { id: 'ano', label: 'Anorexia (+1)', type: 'radio', options: [{label:'Yes', value: 1}, {label:'No', value: 0}] },
      { id: 'nau', label: 'Nausea (+1)', type: 'radio', options: [{label:'Yes', value: 1}, {label:'No', value: 0}] },
      { id: 'tend', label: 'RLQ Tenderness (+2)', type: 'radio', options: [{label:'Yes', value: 2}, {label:'No', value: 0}] },
      { id: 'reb', label: 'Rebound (+1)', type: 'radio', options: [{label:'Yes', value: 1}, {label:'No', value: 0}] },
      { id: 'temp', label: 'Fever (+1)', type: 'radio', options: [{label:'Yes', value: 1}, {label:'No', value: 0}] },
      { id: 'leuk', label: 'Leukocytosis (+2)', type: 'radio', options: [{label:'Yes', value: 2}, {label:'No', value: 0}] },
      { id: 'shf', label: 'Left shift (+1)', type: 'radio', options: [{label:'Yes', value: 1}, {label:'No', value: 0}] },
    ],
    calculate: (v) => {
      const score = Object.values(v).reduce((a,b) => Number(a)+Number(b), 0);
      let res = score <= 4 ? 'Unlikely' : score <= 6 ? 'Possible' : 'Likely';
      return { score, result: res };
    }
  },
  {
    id: 'glasgow_blatch',
    name: 'Glasgow-Blatchford (UGIB)',
    category: 'Gastro',
    isScore: true,
    inputs: [
      { id: 'bun', label: 'BUN', type: 'select', options: [{label:'<18',value:0},{label:'>18',value:2},{label:'>23',value:3},{label:'>28',value:4},{label:'>70',value:6}] },
      { id: 'sbp', label: 'SBP', type: 'select', options: [{label:'>110',value:0},{label:'100-109',value:1},{label:'90-99',value:2},{label:'<90',value:3}] },
      { id: 'mel', label: 'Melena (+1)', type: 'radio', options: [{label:'Yes', value: 1}, {label:'No', value: 0}] },
      { id: 'syn', label: 'Syncope (+2)', type: 'radio', options: [{label:'Yes', value: 2}, {label:'No', value: 0}] },
    ],
    calculate: (v) => {
      const score = Object.values(v).reduce((a,b) => Number(a)+Number(b), 0);
      return { score, result: score === 0 ? 'Low Risk (Outpatient scope)' : 'High Risk (Inpatient)' };
    }
  },
  {
    id: 'bwps',
    name: 'Burch-Wartofsky (Thyroid Storm)',
    category: 'General',
    isScore: true,
    inputs: [
      { id: 't', label: 'Temp', type: 'select', options: [{label:'<99',value:0},{label:'99-100',value:5},{label:'100-101',value:10},{label:'>104',value:30}] },
      { id: 'cns', label: 'CNS', type: 'select', options: [{label:'Absent',value:0},{label:'Agitation',value:10},{label:'Delirium',value:20},{label:'Coma',value:30}] },
      { id: 'gi', label: 'GI', type: 'select', options: [{label:'Absent',value:0},{label:'Mod',value:10},{label:'Severe',value:20}] },
      { id: 'hr', label: 'Heart Rate', type: 'select', options: [{label:'<90',value:0},{label:'90-109',value:5},{label:'>=140',value:25}] },
    ],
    calculate: (v) => {
      const score = Object.values(v).reduce((a,b) => Number(a)+Number(b), 0);
      let res = score < 25 ? 'Unlikely' : score <= 44 ? 'Impending Storm' : 'Highly Suggestive';
      return { score, result: res };
    }
  }
];

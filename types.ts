export enum ModuleType {
  HOME = 'HOME',
  ANTIMICROBIAL = 'ANTIMICROBIAL',
  ACLS = 'ACLS',
  PALS = 'PALS',
  ATLS = 'ATLS',
  RSI = 'RSI',
  PATHWAYS = 'PATHWAYS',
  SPLINTING = 'SPLINTING',
  CALCULATORS = 'CALCULATORS',
  CODE_BLUE = 'CODE_BLUE',
  HISTORY = 'HISTORY',
  ALGORITHM = 'ALGORITHM',
  ORTHO_MENU = 'ORTHO_MENU',
  ORTHO_GUIDE = 'ORTHO_GUIDE',
  SEARCH = 'SEARCH',
  PDF_VIEWER = 'PDF_VIEWER'
}

export interface OrthoInjury {
  region: string;
  category: string;
  injury: string;
  subclassification?: string;
  mechanism?: string;
  findings?: string;
  imaging?: string;
  treatment?: string;
  referral?: string;
  homeCare?: string;
  longTerm?: string;
  complications?: string;
  demographics?: string;
}

export type CalcCategory = 'PEDIA' | 'OTHERS';
export type PediaSubCategory = 'IVF' | 'COMMON' | 'ANTIMICROBIAL' | 'RESUSCITATION' | 'ANAPHYLAXIS' | 'SEIZURE';

export interface DrugPreparation {
  label: string;
  value: number; // concentration per mL
  unit: string;
  isIV?: boolean;
}

export interface Medication {
  name: string;
  category: string;
  maxDose?: number;
  unitType?: string;
  customStep?: number;
  dosing?: {
    standard?: [number, number];
    q6?: [number, number];
    q8?: [number, number];
    q12?: [number, number];
    q24?: [number, number];
    single?: number;
  };
  preparations: DrugPreparation[];
}

export interface PopulationGuide {
  firstLine: string;
  secondLine?: string;
}

export interface AntimicrobialGuideEntry {
  system: string;
  disease: string;
  pediatric?: PopulationGuide;
  adult?: PopulationGuide;
  remarks?: string;
}

export interface LogEntry {
  timestamp: string;
  action: string;
  details?: string;
}

export interface CodeSession {
  id: string;
  type: string;
  startTime: string;
  duration: string;
  logs: LogEntry[];
}

export interface FlowStep {
  id: string;
  question: string;
  details?: string[];
  options: {
    label: string;
    nextStepId?: string;
    result?: string;
    color?: string;
    points?: number;
  }[];
}

export interface Pathway {
  id: string;
  name: string;
  description: string;
  steps: FlowStep[];
  isChecklist?: boolean;
  isStaticReference?: boolean;
  isScoringInteractive?: boolean;
  referenceGroups?: { title: string; items: string[]; color: string }[];
  checklistConfig?: {
    resultIfAny: string;
    resultIfNone: string;
  };
  scoringInterpretation?: (score: number) => string;
}

// --- GENERAL CALCULATOR TYPES ---
export type InputType = 'number' | 'select' | 'radio' | 'date';

export interface CalcInput {
  id: string;
  label: string;
  type: InputType;
  options?: { label: string; value: string | number; points?: number }[];
  placeholder?: string;
  unit?: string;
}

export interface CalculatorDef {
  id: string;
  name: string;
  category: string;
  inputs: CalcInput[];
  calculate?: (vals: Record<string, any>) => string | number | { score: number; result: string };
  isScore?: boolean;
}
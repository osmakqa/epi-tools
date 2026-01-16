
import React, { useState, useMemo, useEffect } from 'react';
import { Medication, DrugPreparation } from '../types';

interface Props {
  weight: number;
  medsList: Medication[];
}

const MedicationCalculator: React.FC<Props> = ({ weight, medsList }) => {
  const [selectedMed, setSelectedMed] = useState<Medication>(medsList[0]);
  const [selectedPrep, setSelectedPrep] = useState<DrugPreparation>(medsList[0]?.preparations[0]);
  const [doseType, setDoseType] = useState<'standard'|'q6'|'q8'|'q12'|'q24'|'single'>('standard');
  const [doseRangeVal, setDoseRangeVal] = useState<number>(0);

  // Reset state when medication list changes (e.g. switching categories)
  useEffect(() => {
    if (medsList.length > 0) {
      const med = medsList[0];
      setSelectedMed(med);
      // Reset logic below will handle prep and dose type
    }
  }, [medsList]);

  // Reset prep and dose type when selected medication changes
  useEffect(() => {
    if (selectedMed) {
      setSelectedPrep(selectedMed.preparations[0]);
      
      // Pick first available dose type
      let type: any = 'standard';
      if (selectedMed.dosing?.standard) type = 'standard';
      else if (selectedMed.dosing?.q6) type = 'q6';
      else if (selectedMed.dosing?.q8) type = 'q8';
      else if (selectedMed.dosing?.q12) type = 'q12';
      else if (selectedMed.dosing?.q24) type = 'q24';
      else if (selectedMed.dosing?.single !== undefined) type = 'single';
      
      setDoseType(type);
    }
  }, [selectedMed]);

  // Update slider bounds and value whenever med or doseType changes
  const sliderConfig = useMemo(() => {
    const dosing = selectedMed?.dosing as any;
    if (!dosing) return { min: 0, max: 100, step: 1 };
    
    let range: [number, number] | undefined;
    if (doseType === 'standard') range = dosing.standard;
    else if (doseType === 'q6') range = dosing.q6;
    else if (doseType === 'q8') range = dosing.q8;
    else if (doseType === 'q12') range = dosing.q12;
    else if (doseType === 'q24') range = dosing.q24;
    else if (doseType === 'single') return { min: dosing.single || 0, max: dosing.single || 0, step: 0.01 };

    if (range) {
      const step = selectedMed.customStep ?? ((range[1] - range[0]) > 5 ? 1 : 0.01);
      return { min: range[0], max: range[1], step };
    }
    return { min: 0, max: 100, step: 1 };
  }, [selectedMed, doseType]);

  // Initialize doseRangeVal when bounds change
  useEffect(() => {
    setDoseRangeVal(sliderConfig.min);
  }, [sliderConfig.min, sliderConfig.max]);

  const calcDose = useMemo(() => {
    if (!weight || !selectedPrep) return 0;
    
    const totalDailyMg = weight * doseRangeVal;
    
    // Divide total daily Mg by frequency if applicable
    let divisor = 1;
    if (doseType === 'q6') divisor = 4;
    if (doseType === 'q8') divisor = 3;
    if (doseType === 'q12') divisor = 2;
    if (doseType === 'q24') divisor = 1;
    
    let singleDoseMg = totalDailyMg / divisor;

    // Apply max dose capping
    if (selectedMed.maxDose && singleDoseMg > selectedMed.maxDose) {
      singleDoseMg = selectedMed.maxDose;
    }

    if (selectedPrep?.isIV) return singleDoseMg;
    return singleDoseMg / selectedPrep.value;
  }, [weight, doseRangeVal, selectedPrep, doseType, selectedMed]);

  const doseOptions = useMemo(() => {
    if (!selectedMed) return [];
    const opts: Array<'standard'|'q6'|'q8'|'q12'|'q24'|'single'> = [];
    if (selectedMed.dosing?.standard) opts.push('standard');
    if (selectedMed.dosing?.q6) opts.push('q6');
    if (selectedMed.dosing?.q8) opts.push('q8');
    if (selectedMed.dosing?.q12) opts.push('q12');
    if (selectedMed.dosing?.q24) opts.push('q24');
    if (selectedMed.dosing?.single !== undefined) opts.push('single');
    return opts;
  }, [selectedMed]);

  const unitDisplay = useMemo(() => {
    if (selectedMed?.unitType) return selectedMed.unitType;
    return 'mg';
  }, [selectedMed]);

  const doseUnitDisplay = useMemo(() => {
    if (selectedMed?.unitType) return `${selectedMed.unitType}/kg`;
    return 'mg/kg';
  }, [selectedMed]);

  if (!selectedMed || !selectedPrep) return null;

  return (
    <div className="bg-slate-900 p-6 rounded-[32px] border border-slate-800 space-y-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="space-y-4">
         <div className="space-y-1">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Select Medication</label>
           <div className="relative">
             <select 
               value={selectedMed.name} 
               onChange={e => { 
                 const m = medsList.find(x => x.name === e.target.value); 
                 if(m) setSelectedMed(m); 
               }} 
               className="w-full bg-blue-950/30 border-2 border-blue-900/40 rounded-2xl p-4 font-black text-lg text-white appearance-none focus:border-blue-500 outline-none shadow-inner transition-all"
             >
               {medsList.map(m => <option key={m.name} value={m.name} className="bg-slate-900">{m.name}</option>)}
             </select>
             <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"></i>
           </div>
         </div>
         <div className="space-y-1">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Preparation</label>
           <div className="relative">
             <select 
               value={selectedPrep.label} 
               onChange={e => { 
                 const p = selectedMed.preparations.find(x => x.label === e.target.value); 
                 if(p) setSelectedPrep(p); 
               }} 
               className="w-full bg-blue-950/30 border-2 border-blue-900/20 rounded-xl p-3 text-sm font-bold text-slate-200 outline-none focus:border-blue-500 transition-all shadow-inner"
             >
               {selectedMed.preparations.map(p => <option key={p.label} value={p.label} className="bg-slate-900">{p.label}</option>)}
             </select>
             <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none text-xs"></i>
           </div>
         </div>
       </div>

       {doseOptions.length > 1 && (
         <div className="flex gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
            {doseOptions.map(opt => (
              <button key={opt} onClick={() => setDoseType(opt)} className={`flex-1 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${doseType === opt ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800 text-slate-500 hover:text-slate-300'}`}>
                {opt}
              </button>
            ))}
         </div>
       )}

       <div className="space-y-4 bg-slate-950 p-5 rounded-3xl border border-slate-800">
         <div className="flex justify-between items-center">
           <span className="text-xs font-black text-slate-200 uppercase tracking-tight">
             {doseType.startsWith('q') ? 'DAILY DOSE' : 'DOSE'}: <span className="text-blue-400 font-black">{doseRangeVal}</span> <span className="text-[10px] text-slate-500">{doseUnitDisplay}</span>
           </span>
         </div>
         <input 
            type="range" 
            min={sliderConfig.min} 
            max={sliderConfig.max} 
            step={sliderConfig.step} 
            value={doseRangeVal} 
            onChange={e => setDoseRangeVal(Number(e.target.value))} 
            className="w-full h-2 bg-blue-950/40 rounded-lg appearance-none cursor-pointer accent-blue-600 active:accent-blue-500" 
            disabled={sliderConfig.min === sliderConfig.max} 
          />
       </div>

       <div className="bg-blue-600 p-8 rounded-[40px] text-center shadow-2xl shadow-blue-600/30 relative overflow-hidden">
          <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 opacity-80">
            {doseType.startsWith('q') ? `Give every ${doseType.substring(1)} hours (${doseType.toUpperCase()})` : 'Administer Dose'}
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-6xl font-black text-white tracking-tighter">{calcDose.toFixed(2)}</span>
            <span className="text-2xl font-black text-blue-200">{selectedPrep.isIV ? unitDisplay : 'mL'}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-500/50 flex flex-col justify-center gap-1 text-[10px] font-black text-blue-100/70">
              {doseType.startsWith('q') && <span>Total Daily: {(weight * doseRangeVal).toFixed(1)}{unitDisplay}</span>}
              {selectedMed.maxDose && <span>Max Cap: {selectedMed.maxDose}{unitDisplay}</span>}
          </div>
       </div>
    </div>
  );
};

export default MedicationCalculator;

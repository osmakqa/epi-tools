import React, { useState, useMemo, useEffect } from 'react';
import { PEDI_ANTIBIOTICS, RESUS_DRUGS, SEIZURE_DRUGS, ANAPHYLAXIS_DRUGS, COMMON_MEDS } from '../data/CalculatorData';
import { CalcCategory, PediaSubCategory } from '../types';
import MedicationCalculator from './MedicationCalculator';
import GeneralCalculator from './GeneralCalculator';
import VasopressorCalculator from './VasopressorCalculator';

interface Props {
  initialDeepLink?: string;
  onDeepLinkUsed?: () => void;
}

const PediatricCalculator: React.FC<Props> = ({ initialDeepLink, onDeepLinkUsed }) => {
  const [category, setCategory] = useState<string>('PEDIA');
  const [subCat, setSubCat] = useState<PediaSubCategory>('COMMON');
  const [weight, setWeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    // If a deep link is active and it's a general calc (implied if initialDeepLink exists here)
    if (initialDeepLink && !initialDeepLink.includes('medication-')) {
       setCategory('OTHERS');
    }
  }, [initialDeepLink]);

  const medsList = useMemo(() => {
    switch(subCat) {
      case 'COMMON': return COMMON_MEDS;
      case 'ANTIMICROBIAL': return PEDI_ANTIBIOTICS;
      case 'RESUSCITATION': return RESUS_DRUGS;
      case 'ANAPHYLAXIS': return ANAPHYLAXIS_DRUGS;
      case 'SEIZURE': return SEIZURE_DRUGS;
      default: return COMMON_MEDS;
    }
  }, [subCat]);

  const ivfResults = useMemo(() => {
    if (!weight) return null;
    
    // Maintenance (Holliday-Segar)
    const maintVol = weight <= 10 ? weight * 100 : weight <= 20 ? 1000 + (weight - 10) * 50 : 1500 + (weight - 20) * 20;
    const maintRate = maintVol / 24;

    // Deficits
    const mildDeficitMin = weight * 30;
    const mildDeficitMax = weight * 50;
    
    // Mild Rate (Maintenance + Deficit over 24h)
    const mildRateMin = maintRate + (mildDeficitMin / 24);
    const mildRateMax = maintRate + (mildDeficitMax / 24);
    
    const modDeficitMin = weight * 60;
    const modDeficitMax = weight * 90;
    
    const severeDeficit = weight * 100;

    // Moderate Calculation (Using max 90ml/kg for specific rate planning example)
    const modTarget = modDeficitMax; 
    const modRate8 = maintRate + ((modTarget * 0.5) / 8);
    const modRate16 = maintRate + ((modTarget * 0.5) / 16);

    // Severe Calculation (Bolus -> Remainder over 24h)
    const bolusVol = weight * 20;
    const severeRemainder = severeDeficit - bolusVol;
    const severeRate24 = maintRate + (severeRemainder / 24);

    return {
      maintenance: { vol: maintVol, rate: maintRate },
      mild: { min: mildDeficitMin, max: mildDeficitMax, rateMin: mildRateMin, rateMax: mildRateMax },
      moderate: { min: modDeficitMin, max: modDeficitMax, rate8: modRate8, rate16: modRate16 },
      severe: { bolus: bolusVol, rate24: severeRate24 }
    };
  }, [weight]);

  return (
    <div className="flex flex-col h-full bg-slate-950 font-sans">
      <div className="flex bg-slate-900 border-b border-slate-800 shrink-0 overflow-x-auto no-scrollbar">
        <button onClick={() => setCategory('PEDIA')} className={`flex-1 min-w-[80px] py-4 text-[10px] font-black uppercase tracking-widest ${category === 'PEDIA' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500'}`}>Pediatric</button>
        <button onClick={() => setCategory('VASOPRESSORS')} className={`flex-1 min-w-[80px] py-4 text-[10px] font-black uppercase tracking-widest ${category === 'VASOPRESSORS' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500'}`}>Vasopressors</button>
        <button onClick={() => setCategory('OTHERS')} className={`flex-1 min-w-[80px] py-4 text-[10px] font-black uppercase tracking-widest ${category === 'OTHERS' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500'}`}>General</button>
      </div>

      {category === 'OTHERS' ? (
        <GeneralCalculator initialCalcId={initialDeepLink} onDeepLinkUsed={onDeepLinkUsed} />
      ) : category === 'VASOPRESSORS' ? (
        <VasopressorCalculator />
      ) : (
        <>
          <div className="p-3 grid grid-cols-3 gap-1.5 shrink-0 bg-slate-950">
            {(['IVF', 'COMMON', 'ANTIMICROBIAL', 'RESUSCITATION', 'ANAPHYLAXIS', 'SEIZURE'] as PediaSubCategory[]).map(s => (
              <button key={s} onClick={() => setSubCat(s)} className={`py-2 px-1 rounded-lg text-[9px] font-black border transition-all truncate ${subCat === s ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                {s}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1 px-1">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={weight || ''} 
                    onChange={e => setWeight(Number(e.target.value))} 
                    className="w-full bg-blue-950/20 border-2 border-blue-900/30 rounded-2xl p-4 text-3xl font-black text-white focus:border-blue-500 outline-none transition-all shadow-inner" 
                    placeholder="0.0" 
                  />
                  <div className="absolute right-4 bottom-4 text-xs font-bold text-blue-500/50 pointer-events-none uppercase">KG</div>
                </div>
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1 px-1">Age (yrs)</label>
                  <input 
                    type="number" 
                    value={age || ''} 
                    onChange={e => setAge(Number(e.target.value))} 
                    className="w-full bg-blue-950/20 border-2 border-blue-900/30 rounded-2xl p-4 text-3xl font-black text-white focus:border-blue-500 outline-none transition-all shadow-inner" 
                    placeholder="0" 
                  />
                  <div className="absolute right-4 bottom-4 text-xs font-bold text-blue-500/50 pointer-events-none uppercase">YRS</div>
                </div>
              </div>
            </div>

            {subCat === 'IVF' && ivfResults && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-blue-900/10 p-5 rounded-3xl border border-blue-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Maintenance</p>
                      <p className="text-[9px] text-slate-500 font-bold">Holliday-Segar Formula</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-blue-400">{ivfResults.maintenance.rate.toFixed(1)} <span className="text-sm">mL/hr</span></p>
                      <p className="text-[10px] text-slate-400 font-bold">{ivfResults.maintenance.vol.toFixed(0)} mL / day</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Mild Dehydration</p>
                      <p className="text-[9px] text-slate-500 font-bold">30-50 mL/kg (Deficit)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Rate (Maint + Deficit)</p>
                      <p className="text-lg font-black text-emerald-400">{ivfResults.mild.rateMin.toFixed(1)} - {ivfResults.mild.rateMax.toFixed(1)} <span className="text-xs">mL/hr</span></p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-[9px] text-slate-500 font-bold uppercase">Total Deficit Vol</span>
                    <span className="text-sm font-black text-emerald-600">{ivfResults.mild.min.toFixed(0)} - {ivfResults.mild.max.toFixed(0)} mL</span>
                  </div>
                </div>

                <div className="bg-orange-900/10 p-5 rounded-3xl border border-orange-500/20 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest">Moderate (60-90 mL/kg)</p>
                        <p className="text-[9px] text-slate-500 font-bold">Rates calculated @ 90mL/kg</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Deficit Range</p>
                        <p className="text-lg font-black text-orange-400">{ivfResults.moderate.min.toFixed(0)} - {ivfResults.moderate.max.toFixed(0)} mL</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-orange-500/10">
                    <div className="bg-slate-950 p-3 rounded-2xl">
                      <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">1st 8 Hours</p>
                      <p className="text-xl font-black text-orange-300">{ivfResults.moderate.rate8.toFixed(1)} <span className="text-[10px]">mL/hr</span></p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-2xl">
                      <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Next 16 Hours</p>
                      <p className="text-xl font-black text-orange-300">{ivfResults.moderate.rate16.toFixed(1)} <span className="text-[10px]">mL/hr</span></p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-900/10 p-5 rounded-3xl border border-red-500/20 space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] text-red-400 font-black uppercase tracking-widest">Severe (≥100 mL/kg)</p>
                    <span className="bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded">EMERGENCY</span>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-red-500/20">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                      <i className="fas fa-bolt text-white"></i>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase">Immediate Bolus (20 mL/kg)</p>
                      <p className="text-2xl font-black text-white">{ivfResults.severe.bolus.toFixed(0)} mL</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="text-[10px] text-slate-400 font-black uppercase">Remainder over 24 hrs</p>
                      <p className="text-[9px] text-slate-600 font-bold">+ Maintenance</p>
                    </div>
                    <p className="text-2xl font-black text-red-300">{ivfResults.severe.rate24.toFixed(1)} <span className="text-sm">mL/hr</span></p>
                  </div>
                </div>
              </div>
            )}

            {subCat !== 'IVF' && (
              <MedicationCalculator weight={weight} medsList={medsList} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PediatricCalculator;
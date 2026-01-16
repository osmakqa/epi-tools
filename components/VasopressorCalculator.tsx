
import React, { useState, useMemo, useEffect } from 'react';
import { VASOPRESSOR_CONFIG } from '../data/CalculatorData';

const VasopressorCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(0);
  const [selectedDrugIndex, setSelectedDrugIndex] = useState(0);
  const [amount, setAmount] = useState<number>(0);
  const [diluent, setDiluent] = useState<number>(0);
  const [dose, setDose] = useState<number>(0);

  const config = VASOPRESSOR_CONFIG[selectedDrugIndex];

  // Initialize defaults when drug changes
  useEffect(() => {
    setAmount(config.amounts[0]);
    setDiluent(config.diluents[0]);
    setDose(config.min);
  }, [selectedDrugIndex]);

  const results = useMemo(() => {
    if (!weight || !amount || !diluent) return { mlHr: 0, mlMin: 0, conc: 0 };

    // Concentration in mcg/mL
    // Amount is in mg, so * 1000 to get mcg
    const totalMcg = amount * 1000;
    const concMcgPerMl = totalMcg / diluent;

    // Dose is in mcg/kg/min
    // Total dose required per minute in mcg
    const totalDosePerMin = dose * weight;

    // Rate in mL/min = (Total dose mcg/min) / (Conc mcg/mL)
    const rateMlMin = totalDosePerMin / concMcgPerMl;

    // Rate in mL/hr
    const rateMlHr = rateMlMin * 60;

    return {
      mlHr: rateMlHr,
      mlMin: rateMlMin,
      conc: concMcgPerMl
    };
  }, [weight, amount, diluent, dose]);

  return (
    <div className="flex flex-col h-full bg-slate-950 font-sans p-4 pb-24 overflow-y-auto">
      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl mb-6">
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
      </div>

      <div className="bg-slate-900 p-6 rounded-[32px] border border-slate-800 space-y-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-4">
          {/* Drug Selection */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Select Vasopressor</label>
            <div className="relative">
              <select 
                value={selectedDrugIndex} 
                onChange={e => setSelectedDrugIndex(Number(e.target.value))} 
                className="w-full bg-blue-950/30 border-2 border-blue-900/40 rounded-2xl p-4 font-black text-lg text-white appearance-none focus:border-blue-500 outline-none transition-all shadow-inner"
              >
                {VASOPRESSOR_CONFIG.map((d, i) => <option key={d.name} value={i} className="bg-slate-900">{d.name}</option>)}
              </select>
              <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"></i>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Amount Selection */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Amount (mg)</label>
              <div className="relative">
                <select 
                  value={amount} 
                  onChange={e => setAmount(Number(e.target.value))} 
                  className="w-full bg-blue-950/30 border-2 border-blue-900/20 rounded-xl p-3 text-sm font-bold text-slate-200 outline-none focus:border-blue-500 transition-all shadow-inner"
                >
                  {config.amounts.map(val => <option key={val} value={val} className="bg-slate-900">{val} mg</option>)}
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none text-xs"></i>
              </div>
            </div>

            {/* Diluent Selection */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Diluent (mL)</label>
              <div className="relative">
                <select 
                  value={diluent} 
                  onChange={e => setDiluent(Number(e.target.value))} 
                  className="w-full bg-blue-950/30 border-2 border-blue-900/20 rounded-xl p-3 text-sm font-bold text-slate-200 outline-none focus:border-blue-500 transition-all shadow-inner"
                >
                  {config.diluents.map(val => <option key={val} value={val} className="bg-slate-900">{val} mL</option>)}
                </select>
                <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Dose Slider */}
        <div className="space-y-4 bg-slate-950 p-5 rounded-3xl border border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-slate-200 uppercase tracking-tight">
              Target Dose
            </span>
            <span className="text-xl font-black text-blue-400">
              {dose} <span className="text-[10px] text-slate-500 uppercase">{config.unit}</span>
            </span>
          </div>
          <input 
            type="range" 
            min={config.min} 
            max={config.max} 
            step={config.step} 
            value={dose} 
            onChange={e => setDose(Number(e.target.value))} 
            className="w-full h-2 bg-blue-950/40 rounded-lg appearance-none cursor-pointer accent-blue-600 active:accent-blue-500" 
          />
           <div className="flex justify-between text-[9px] font-bold text-slate-600 uppercase">
             <span>{config.min}</span>
             <span>{config.max}</span>
           </div>
        </div>

        {/* Results */}
        <div className="bg-blue-600 p-8 rounded-[40px] text-center shadow-2xl shadow-blue-600/30 relative overflow-hidden">
          <div className="absolute top-4 left-4 text-[9px] font-black text-blue-200/50 uppercase tracking-widest text-left">
             Conc: {results.conc.toFixed(0)} mcg/mL
          </div>
          <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 opacity-80 mt-2">
            Infusion Rate
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-6xl font-black text-white tracking-tighter">{results.mlHr.toFixed(1)}</span>
            <span className="text-xl font-black text-blue-200">mL/hr</span>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-500/50 flex flex-col justify-center gap-1 text-[10px] font-black text-blue-100/70">
              <span>{results.mlMin.toFixed(4)} mL/min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VasopressorCalculator;

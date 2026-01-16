import React, { useState, useMemo, useEffect } from 'react';
import { CalcInput, CalculatorDef } from '../types';
import { CALCULATORS } from '../data/GeneralCalculatorData';

interface Props {
  initialCalcId?: string;
  onDeepLinkUsed?: () => void;
}

const GeneralCalculator: React.FC<Props> = ({ initialCalcId, onDeepLinkUsed }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  useEffect(() => {
    if (initialCalcId) {
      const calc = CALCULATORS.find(x => x.id === initialCalcId);
      if (calc) {
        setSelectedId(calc.id);
        setInputs({});
      }
      onDeepLinkUsed?.();
    }
  }, [initialCalcId]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(CALCULATORS.map(c => c.category))).sort()], []);
  
  const filteredCalcs = useMemo(() => 
    CALCULATORS.filter(c => 
      (filterCat === 'All' || c.category === filterCat) && 
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, filterCat]);

  const activeCalc = useMemo(() => CALCULATORS.find(c => c.id === selectedId), [selectedId]);

  const activeResult = useMemo(() => {
    if (!activeCalc || !activeCalc.calculate) return null;
    return activeCalc.calculate(inputs);
  }, [activeCalc, inputs]);

  const renderInput = (input: CalcInput) => {
    switch(input.type) {
      case 'number':
        return (
          <div key={input.id} className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{input.label}</label>
            <div className="relative">
              <input 
                type="number" 
                className="w-full bg-blue-950/20 border-2 border-blue-900/30 rounded-xl p-3 text-white font-bold outline-none focus:border-blue-500 transition-all shadow-inner" 
                placeholder={input.placeholder || '0'} 
                value={inputs[input.id] || ''} 
                onChange={e => setInputs({...inputs, [input.id]: e.target.value})} 
              />
              {input.unit && <span className="absolute right-3 top-3.5 text-xs font-bold text-blue-500/50 uppercase">{input.unit}</span>}
            </div>
          </div>
        );
      case 'radio':
        return (
          <div key={input.id} className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">{input.label}</label>
            <div className="flex flex-wrap gap-2">
              {input.options?.map(opt => (
                <button 
                  key={opt.value} 
                  onClick={() => setInputs({...inputs, [input.id]: opt.value})} 
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${inputs[input.id] === opt.value ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 'select':
        return (
          <div key={input.id} className="space-y-1">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{input.label}</label>
             <select 
               className="w-full bg-blue-950/30 border-2 border-blue-900/40 rounded-xl p-3 text-white text-xs font-bold outline-none focus:border-blue-500 transition-all shadow-inner" 
               value={inputs[input.id] || 0} 
               onChange={e => setInputs({...inputs, [input.id]: e.target.value})}
             >
                {input.options?.map(opt => <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>)}
             </select>
          </div>
        );
      case 'date':
        return (
          <div key={input.id} className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{input.label}</label>
            <input 
              type="date" 
              className="w-full bg-blue-950/20 border-2 border-blue-900/30 rounded-xl p-3 text-white font-bold outline-none focus:border-blue-500 transition-all shadow-inner" 
              value={inputs[input.id] || ''} 
              onChange={e => setInputs({...inputs, [input.id]: e.target.value})} 
            />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950">
      <div className="p-4 bg-slate-900 border-b border-slate-800 space-y-3">
        {selectedId ? (
          <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-slate-400 hover:text-white">
            <i className="fas fa-chevron-left"></i> <span className="font-bold text-xs uppercase">Back to List</span>
          </button>
        ) : (
          <>
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
              <input 
                type="text" 
                placeholder="Search calculators..." 
                className="w-full bg-blue-950/20 border-2 border-blue-900/30 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-blue-500 transition-all shadow-inner" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map(c => (
                <button 
                  key={c} 
                  onClick={() => setFilterCat(c)} 
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase whitespace-nowrap transition-all ${filterCat === c ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {!selectedId ? (
          <div className="grid gap-3 animate-in slide-in-from-left duration-300">
            {filteredCalcs.map(calc => (
              <button 
                key={calc.id} 
                onClick={() => { setSelectedId(calc.id); setInputs({}); }} 
                className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all text-left"
              >
                <div>
                  <h4 className="font-black text-slate-200 text-sm group-hover:text-blue-400">{calc.name}</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{calc.category}</p>
                </div>
                <i className="fas fa-chevron-right text-slate-700"></i>
              </button>
            ))}
          </div>
        ) : (
          activeCalc && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white uppercase leading-none">{activeCalc.name}</h3>
                {activeCalc.isScore && <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-2 py-1 rounded uppercase">Score</span>}
              </div>
              <div className="space-y-4">{activeCalc.inputs.map(renderInput)}</div>
              {activeResult && (
                <div className="mt-8 bg-blue-600 p-6 rounded-[24px] shadow-xl shadow-blue-600/20 text-center animate-in zoom-in-95">
                  {typeof activeResult === 'object' ? (
                    <>
                      <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Total Score</p>
                      <div className="text-5xl font-black text-white mb-2">{activeResult.score}</div>
                      <div className="border-t border-blue-400/30 pt-3 mt-3">
                        <p className="text-sm font-bold text-blue-100">{activeResult.result}</p>
                      </div>
                    </>
                  ) : (
                     <>
                       <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-2">Result</p>
                       <p className="text-xl font-black text-white whitespace-pre-wrap">{activeResult}</p>
                     </>
                  )}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GeneralCalculator;
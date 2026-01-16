
import React, { useState } from 'react';
import { RSI_STEPS, RSI_PRETREATMENT, RSI_INDUCTION, RSI_PARALYTICS, SUX_SAFETY } from '../data/RSIData';

interface Props {
  onClose: () => void;
}

const RSIGuide: React.FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'STEPS' | 'MEDS' | 'SAFETY'>('STEPS');

  return (
    <div className="flex flex-col h-full bg-slate-950 font-sans md:max-w-4xl md:mx-auto">
      <div className="bg-sky-600/20 border-b border-sky-500/30 p-4 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-black tracking-tight text-sky-500 uppercase">RSI Guide</h2>
          <p className="text-[9px] font-bold text-sky-500/60 uppercase tracking-widest">Rapid Sequence Intubation</p>
        </div>
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-slate-400">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="flex bg-slate-900 border-b border-slate-800 shrink-0">
        <button 
          onClick={() => setActiveTab('STEPS')} 
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'STEPS' ? 'text-sky-500 bg-sky-500/5 border-b-2 border-sky-500' : 'text-slate-500'}`}
        >
          Steps
        </button>
        <button 
          onClick={() => setActiveTab('MEDS')} 
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'MEDS' ? 'text-sky-500 bg-sky-500/5 border-b-2 border-sky-500' : 'text-slate-500'}`}
        >
          Meds
        </button>
        <button 
          onClick={() => setActiveTab('SAFETY')} 
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'SAFETY' ? 'text-sky-500 bg-sky-500/5 border-b-2 border-sky-500' : 'text-slate-500'}`}
        >
          Safety
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6 pb-24 md:p-8">
        {activeTab === 'STEPS' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Table 29A-6 RSI Steps</h3>
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-xl">
              {RSI_STEPS.map((step, i) => (
                <div key={i} className={`p-4 text-xs font-bold text-slate-200 border-b border-slate-800/50 last:border-none flex gap-4 items-start md:p-6 ${i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'}`}>
                  <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center text-[10px] shrink-0 md:w-8 md:h-8 md:text-sm">{i + 1}</span>
                  <span className="leading-relaxed mt-1 md:text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'MEDS' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            {/* Pretreatment */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] px-2">Pretreatment Agents</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {RSI_PRETREATMENT.map((m, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-[28px] space-y-3 shadow-lg h-full">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-black text-white uppercase">{m.agent}</h4>
                      <span className="text-[10px] font-black text-sky-400 bg-sky-400/10 px-2 py-1 rounded">{m.dose}</span>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Indications</p>
                      <p className="text-xs text-slate-300 font-bold">{m.indications}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <p className="text-[9px] font-black text-red-500/70 uppercase tracking-widest mb-1">Precautions</p>
                      <p className="text-[11px] text-slate-500 italic leading-relaxed">{m.precautions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Induction */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] px-2">Induction Agents</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {RSI_INDUCTION.map((m, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-[28px] space-y-3 shadow-lg h-full">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-black text-white uppercase">{m.agent}</h4>
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{m.dose}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase">Onset</p>
                        <p className="text-xs text-slate-200 font-bold">{m.onset}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase">Duration</p>
                        <p className="text-xs text-slate-200 font-bold">{m.duration}</p>
                      </div>
                    </div>
                    <div className="bg-emerald-500/5 p-3 rounded-2xl border border-emerald-500/10">
                      <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Benefits</p>
                      <p className="text-xs text-slate-200 font-bold">{m.benefits}</p>
                    </div>
                    <div className="bg-amber-500/5 p-3 rounded-2xl border border-amber-500/10">
                      <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-1">Caveats</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{m.caveats}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Paralytics */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] px-2">Paralytics (NMB)</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {RSI_PARALYTICS.map((m, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-[28px] space-y-3 shadow-lg h-full">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-black text-white uppercase">{m.agent}</h4>
                      <span className="text-[10px] font-black text-red-400 bg-red-400/10 px-2 py-1 rounded">{m.dose}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase">Onset</p>
                        <p className="text-xs text-slate-200 font-bold">{m.onset}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase">Duration</p>
                        <p className="text-xs text-slate-200 font-bold">{m.duration}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Clinical Notes</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{m.comments}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'SAFETY' && (
          <div className="space-y-6 animate-in slide-in-from-left duration-300">
            <div className="bg-red-600 p-8 rounded-[40px] text-center shadow-xl shadow-red-600/20 mb-8 md:py-16">
              <i className="fas fa-biohazard text-4xl text-red-200 mb-4 md:text-6xl"></i>
              <h3 className="text-2xl font-black text-white uppercase leading-tight md:text-4xl">Succinylcholine Safety</h3>
              <p className="text-[10px] font-bold text-red-100 uppercase tracking-widest mt-2 opacity-80 md:text-sm md:mt-4">Vital Clinical Alerts</p>
            </div>

            <div className="grid md:grid-cols-2 md:gap-8">
              <section className="space-y-3">
                <h4 className="text-xs font-black text-red-500 uppercase tracking-widest px-4">Complications</h4>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg h-full">
                  {SUX_SAFETY.complications.map((c, i) => (
                    <div key={i} className="p-4 flex gap-3 items-start border-b border-slate-800/50 last:border-none md:p-6">
                      <i className="fas fa-circle-exclamation text-red-500/50 text-[10px] mt-1 md:text-xs"></i>
                      <p className="text-xs font-bold text-slate-300 leading-relaxed md:text-sm">{c}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <h4 className="text-xs font-black text-red-600 uppercase tracking-widest px-4">CONTRAINDICATIONS (DO NOT GIVE)</h4>
                <div className="bg-slate-900 border-2 border-red-900/50 rounded-3xl overflow-hidden shadow-2xl h-full">
                  {SUX_SAFETY.contraindications.map((c, i) => (
                    <div key={i} className="p-4 flex gap-3 items-start border-b border-red-900/20 last:border-none bg-red-950/20 md:p-6">
                      <i className="fas fa-ban text-red-600 text-[10px] mt-1 md:text-xs"></i>
                      <p className="text-xs font-black text-slate-100 uppercase tracking-tight leading-relaxed md:text-sm">{c}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RSIGuide;

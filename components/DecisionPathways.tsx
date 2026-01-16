import React, { useState, useMemo, useEffect } from 'react';
import { PATHWAY_DATA } from '../constants';
import { Pathway, FlowStep } from '../types';

interface Props {
  initialPathwayId?: string;
  onDeepLinkUsed?: () => void;
}

const DecisionPathways: React.FC<Props> = ({ initialPathwayId, onDeepLinkUsed }) => {
  const [activePathway, setActivePathway] = useState<Pathway | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [history, setHistory] = useState<{ stepId: string; optionLabel: string }[]>([]);
  const [finalResult, setFinalResult] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [scoringSelections, setScoringSelections] = useState<Record<string, number>>({});

  useEffect(() => {
    if (initialPathwayId) {
      const p = PATHWAY_DATA.find(x => x.id === initialPathwayId);
      if (p) {
        selectPathway(p);
      }
      onDeepLinkUsed?.();
    }
  }, [initialPathwayId]);

  const currentStep = useMemo(() => {
    if (!activePathway || !currentStepId || activePathway.isStaticReference || activePathway.isScoringInteractive) return null;
    return activePathway.steps.find(s => s.id === currentStepId);
  }, [activePathway, currentStepId]);

  const totalScore = useMemo(() => {
    return Object.values(scoringSelections).reduce((acc, val) => acc + val, 0);
  }, [scoringSelections]);

  const selectPathway = (p: Pathway) => {
    setActivePathway(p);
    if (!p.isStaticReference && !p.isScoringInteractive) {
      setCurrentStepId(p.steps[0].id);
    }
    setHistory([]);
    setFinalResult(null);
    setCheckedItems(new Set());
    setScoringSelections({});
  };

  const handleOption = (opt: any) => {
    if (opt.result) {
      setHistory(prev => [...prev, { stepId: currentStepId!, optionLabel: opt.label }]);
      setFinalResult(opt.result);
      return;
    }
    if (opt.nextStepId) {
      setHistory(prev => [...prev, { stepId: currentStepId!, optionLabel: opt.label }]);
      setCurrentStepId(opt.nextStepId);
    }
  };

  const toggleCheck = (label: string) => {
    const next = new Set(checkedItems);
    if (next.has(label)) next.delete(label);
    else next.add(label);
    setCheckedItems(next);
  };

  const selectScoringOption = (stepId: string, points: number) => {
    setScoringSelections(prev => ({ ...prev, [stepId]: points }));
  };

  const finishChecklist = () => {
    if (!activePathway?.checklistConfig) return;
    const result = checkedItems.size > 0 
      ? activePathway.checklistConfig.resultIfAny 
      : activePathway.checklistConfig.resultIfNone;
    setFinalResult(result);
  };

  const goBack = () => {
    if (activePathway?.isStaticReference || activePathway?.isScoringInteractive) {
      setActivePathway(null);
      return;
    }
    if (finalResult) {
      setFinalResult(null);
      if (activePathway?.isChecklist) return; // Checklist stays on main step
      const last = history[history.length - 1];
      if (last) {
        setCurrentStepId(last.stepId);
        setHistory(prevH => prevH.slice(0, -1));
      }
      return;
    }
    if (history.length > 0) {
      const last = history[history.length - 1];
      setCurrentStepId(last.stepId);
      setHistory(prevH => prevH.slice(0, -1));
    } else {
      setActivePathway(null);
    }
  };

  const restart = () => {
    if (activePathway) {
      if (!activePathway.isStaticReference && !activePathway.isScoringInteractive) {
        setCurrentStepId(activePathway.steps[0].id);
      }
      setHistory([]);
      setFinalResult(null);
      setCheckedItems(new Set());
      setScoringSelections({});
    }
  };

  if (activePathway) {
    return (
      <div className="flex flex-col h-full bg-slate-950 animate-in fade-in duration-300">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0 shadow-lg sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="max-w-[180px]">
              <h2 className="text-sm font-black text-white uppercase leading-none truncate">{activePathway.name}</h2>
              <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">
                {activePathway.isStaticReference ? 'Medical Reference' : activePathway.isScoringInteractive ? 'Interactive Score' : activePathway.isChecklist ? 'Safety Checklist' : 'Interactive Pathway'}
              </p>
            </div>
          </div>
          {!activePathway.isStaticReference && (
            <button onClick={restart} className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-2 rounded-lg">
              Reset
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-40 no-scrollbar">
          {activePathway.isStaticReference ? (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-300">
              {activePathway.referenceGroups?.map((group, gIdx) => (
                <div key={gIdx} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-1 w-12 rounded-full ${group.color === 'red' ? 'bg-red-600' : 'bg-amber-500'}`}></div>
                    <h3 className={`text-sm font-black uppercase tracking-widest ${group.color === 'red' ? 'text-red-500' : 'text-amber-500'}`}>
                      {group.title}
                    </h3>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                    {group.items.map((item, iIdx) => (
                      <div 
                        key={iIdx} 
                        className={`p-4 text-xs font-bold text-slate-200 border-b border-slate-800/50 last:border-none flex gap-3 items-start ${iIdx % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'}`}
                      >
                        <i className={`fas fa-circle text-[6px] mt-1.5 ${group.color === 'red' ? 'text-red-600' : 'text-amber-500'}`}></i>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : activePathway.isScoringInteractive ? (
            <div className="space-y-5">
              {activePathway.steps.map((step) => (
                <div key={step.id} className="bg-slate-900 border border-slate-800 p-5 rounded-[28px] space-y-4 shadow-sm">
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-tight">{step.question}</h4>
                  <div className="flex flex-wrap gap-2">
                    {step.options.map((opt, oIdx) => {
                      const isSelected = scoringSelections[step.id] === opt.points;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => selectScoringOption(step.id, opt.points || 0)}
                          className={`flex-1 min-w-[120px] py-3 px-3 rounded-xl text-[10px] font-black uppercase transition-all border-2 text-center ${
                            isSelected 
                              ? 'bg-blue-600 border-blue-400 text-white shadow-lg' 
                              : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                          }`}
                        >
                          {opt.label} 
                          {opt.points !== undefined && <span className="ml-1 opacity-60">({opt.points > 0 ? `+${opt.points}` : opt.points})</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {!finalResult && history.length > 0 && !activePathway.isChecklist && (
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pathway History</p>
                  <div className="space-y-2">
                    {history.map((h, idx) => {
                      const stepObj = activePathway.steps.find(s => s.id === h.stepId);
                      return (
                        <div key={idx} className="flex gap-3 items-start border-l-2 border-blue-900/50 pl-4 py-1 animate-in fade-in slide-in-from-left duration-200">
                          <div className="flex-1">
                            <p className="text-[9px] font-black text-slate-500 uppercase">{stepObj?.question}</p>
                            <p className="text-xs font-bold text-blue-400">Selected: {h.optionLabel}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep && !finalResult && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
                        {activePathway.isChecklist ? 'Assessment' : 'Next Step'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">
                      {currentStep.question}
                    </h3>
                  </div>

                  {currentStep.details && currentStep.details.length > 0 && (
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-inner">
                      {currentStep.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <i className="fas fa-check-circle text-blue-500 text-xs mt-0.5"></i>
                          <span className="text-sm text-slate-300 font-bold leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activePathway.isChecklist ? (
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        {currentStep.options.map((opt, idx) => {
                          const isChecked = checkedItems.has(opt.label);
                          return (
                            <button
                              key={idx}
                              onClick={() => toggleCheck(opt.label)}
                              className={`w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all text-left ${
                                isChecked 
                                  ? 'bg-blue-600/20 border-blue-500 text-white' 
                                  : 'bg-slate-900 border-slate-800 text-slate-400'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                                isChecked ? 'bg-blue-500 border-blue-400' : 'bg-slate-950 border-slate-700'
                              }`}>
                                {isChecked && <i className="fas fa-check text-[10px] text-white"></i>}
                              </div>
                              <span className="font-bold text-sm uppercase tracking-tight">{opt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={finishChecklist}
                        className="w-full bg-blue-600 py-5 mt-4 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                      >
                        Finish Checklist
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {currentStep.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOption(opt)}
                          className="w-full bg-slate-900 border-2 border-slate-800 p-5 rounded-[24px] flex items-center justify-between group active:scale-[0.98] active:border-blue-500 transition-all text-left hover:bg-slate-800"
                        >
                          <span className="font-black text-slate-100 uppercase text-sm tracking-tight">{opt.label}</span>
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 group-active:text-blue-500 transition-colors">
                            <i className={`fas ${opt.result ? 'fa-flag-checkered' : 'fa-chevron-right'} text-xs`}></i>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {finalResult && (
                <div className="space-y-8 animate-in zoom-in-95 duration-300 text-center py-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto border-4 ${
                    finalResult.toLowerCase().includes('contraindicated') || finalResult.toLowerCase().includes('required') || finalResult.toLowerCase().includes('shock')
                      ? 'bg-red-500/20 text-red-500 border-red-500/10'
                      : 'bg-emerald-500/20 text-emerald-500 border-emerald-500/10'
                  }`}>
                    <i className={`fas ${
                      finalResult.toLowerCase().includes('contraindicated') || finalResult.toLowerCase().includes('required') || finalResult.toLowerCase().includes('shock')
                      ? 'fa-exclamation-triangle' : 'fa-check'
                    } text-3xl`}></i>
                  </div>
                  <div className="space-y-3">
                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${
                      finalResult.toLowerCase().includes('contraindicated') || finalResult.toLowerCase().includes('required') || finalResult.toLowerCase().includes('shock')
                      ? 'text-red-500' : 'text-emerald-500'
                    }`}>Conclusion</p>
                    <div className={`border-2 p-8 rounded-[40px] shadow-2xl ${
                      finalResult.toLowerCase().includes('contraindicated') || finalResult.toLowerCase().includes('required') || finalResult.toLowerCase().includes('shock')
                      ? 'bg-red-900/10 border-red-500/20 shadow-red-500/10'
                      : 'bg-emerald-900/10 border-emerald-500/20 shadow-emerald-500/10'
                    }`}>
                      <p className="text-xl font-black text-white leading-relaxed uppercase tracking-tight">{finalResult}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {activePathway.isScoringInteractive && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 p-4 shadow-2xl z-50 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-between gap-4">
              <div className="shrink-0 text-center px-4 border-r border-slate-800">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Score</p>
                <div className="text-4xl font-black text-blue-500 leading-none">{totalScore}</div>
              </div>
              <div className="flex-1">
                <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Interpretation</p>
                <p className="text-xs font-bold text-slate-100 leading-tight">
                  {activePathway.scoringInterpretation ? activePathway.scoringInterpretation(totalScore) : 'Complete all selections for results.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-950 h-full overflow-y-auto no-scrollbar pb-24">
      <header>
        <h2 className="text-2xl font-black text-white leading-none uppercase">Clinical Protocols</h2>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">Decision Pathways & Scoring</p>
      </header>

      <div className="grid gap-3">
        {PATHWAY_DATA.map(p => (
          <button 
            key={p.id} 
            onClick={() => selectPathway(p)}
            className="w-full bg-slate-900 border border-slate-800 p-6 rounded-[32px] flex items-center justify-between group active:scale-[0.98] transition-all text-left"
          >
            <div className="flex-1 pr-4">
              <h4 className="text-lg font-black text-slate-100 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{p.name}</h4>
              <p className="text-[10px] font-black text-slate-500 uppercase mt-1 tracking-widest">{p.description}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600/20 transition-all shadow-inner shrink-0">
              <i className="fas fa-calculator text-slate-600 group-hover:text-blue-400"></i>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DecisionPathways;
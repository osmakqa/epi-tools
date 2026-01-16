
import React, { useState, useEffect } from 'react';
import { LogEntry, CodeSession } from '../types';

interface Props {
  type: 'ACLS' | 'PALS' | 'EMERGENCY';
  onClose: () => void;
}

const RHYTHMS = ['VF', 'pVT', 'Asystole', 'PEA', 'SVT', 'Sinus Tach', 'Bradycardia'];
const MEDS_EVENTS = [
  'Amiodarone 300mg', 'Amiodarone 150mg', 'Lidocaine 100mg', 'Lidocaine 50mg',
  'Magnesium 2g', 'Bicarbonate 50mEq', 'Calcium Gluconate 1g', 'D50W 50mL',
  'Naloxone 2mg', 'Atropine 1mg', 'Intubation', 'IO Access', 'IV Access',
  'ROSC', 'Termination'
];

const CodeBlueTracker: React.FC<Props> = ({ type, onClose }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [epiSeconds, setEpiSeconds] = useState(0);
  const [cycleSeconds, setCycleSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showRhythmPicker, setShowRhythmPicker] = useState<null | 'CHECK' | 'SHOCK'>(null);
  const [showMedsMenu, setShowMedsMenu] = useState(false);
  const [shockConfig, setShockConfig] = useState({ joules: 200, wave: 'Biphasic' });

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTotalSeconds(prev => prev + 1);
        setEpiSeconds(prev => prev + 1);
        setCycleSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const addLog = (action: string, details?: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { timestamp: time, action, details }]);
  };

  const startCode = () => {
    setIsActive(true);
    addLog(`Code Started`, `Type: ${type}`);
  };

  const selectRhythm = (rhythm: string) => {
    if (showRhythmPicker === 'CHECK') {
      addLog('Pulse/Rhythm Check', rhythm);
      setCycleSeconds(0);
    } else if (showRhythmPicker === 'SHOCK') {
      addLog('Shock Delivered', `${shockConfig.joules}J (${shockConfig.wave}) - Rhythm: ${rhythm}`);
    }
    setShowRhythmPicker(null);
  };

  const selectMedEvent = (item: string) => {
    addLog('Event/Medication', item);
    if (item === 'ROSC' || item === 'Termination') setIsActive(false);
    setShowMedsMenu(false);
  };

  const saveToHistory = () => {
    const session: CodeSession = {
      id: Date.now().toString(),
      type,
      startTime: new Date().toISOString(),
      duration: formatTime(totalSeconds),
      logs
    };
    const history = JSON.parse(localStorage.getItem('code_history') || '[]');
    localStorage.setItem('code_history', JSON.stringify([session, ...history].slice(0, 20)));
    onClose();
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const maxJoules = shockConfig.wave === 'Biphasic' ? 200 : 360;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col font-sans md:relative md:h-full md:inset-auto md:bg-transparent">
      <div className="bg-red-900/40 border-b border-red-500/30 p-4 flex justify-between items-center shrink-0 md:bg-red-600/10 md:rounded-t-3xl">
        <h2 className="text-xl font-black tracking-tight text-red-500">{type} TRACKER</h2>
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-slate-400 md:hidden">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-8 md:max-w-4xl md:mx-auto md:w-full">
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center md:p-8 md:rounded-[32px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest md:text-sm">Total Time</span>
            <div className="text-4xl font-mono font-bold text-slate-200 md:text-7xl">{formatTime(totalSeconds)}</div>
          </div>
          <div className={`p-4 rounded-2xl border text-center transition-all md:p-8 md:rounded-[32px] ${epiSeconds > 180 ? 'bg-red-950 border-red-500 animate-pulse' : 'bg-slate-900 border-slate-800'}`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest md:text-sm">Epi (3-5m)</span>
            <div className="text-4xl font-mono font-bold md:text-7xl">{formatTime(epiSeconds)}</div>
          </div>
        </div>

        <button 
          onClick={() => setShowRhythmPicker('CHECK')}
          className={`w-full p-5 rounded-2xl border-2 font-black text-xl transition-all md:p-10 md:rounded-[40px] md:text-4xl ${cycleSeconds > 120 ? 'bg-orange-600 border-orange-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
        >
          {cycleSeconds > 120 ? 'TIME TO CHECK PULSE' : `CYCLE: ${formatTime(cycleSeconds)}`}
        </button>

        {!isActive ? (
          <button onClick={startCode} className="w-full bg-red-600 text-white py-8 rounded-3xl text-3xl font-black shadow-2xl shadow-red-600/20 active:scale-95 transition-transform md:py-16 md:text-5xl md:rounded-[48px]">
            START CODE
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <div className="col-span-2 bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4 md:col-span-2 md:row-span-2 md:p-8 md:rounded-[32px] md:space-y-8">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 md:text-base">
                <span>SHOCK CONFIG</span>
                <div className="flex gap-2">
                  {['Biphasic', 'Monophasic'].map(w => (
                    <button key={w} onClick={() => {
                      const newMax = w === 'Biphasic' ? 200 : 360;
                      setShockConfig({ wave: w, joules: Math.min(shockConfig.joules, newMax) });
                    }} className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all md:px-5 md:py-2 md:text-xs ${shockConfig.wave === w ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800 text-slate-500'}`}>{w}</button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2 md:space-y-4">
                <div className="flex justify-between items-end px-1">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest md:text-sm">Energy Level</span>
                  <span className="text-2xl font-black text-blue-500 md:text-5xl">{shockConfig.joules}J</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={maxJoules} 
                  step="10" 
                  value={shockConfig.joules} 
                  onChange={(e) => setShockConfig({ ...shockConfig, joules: parseInt(e.target.value) })}
                  className="w-full h-2 bg-blue-950/40 rounded-lg appearance-none cursor-pointer accent-blue-600 active:accent-blue-500 transition-all md:h-4"
                />
                <div className="flex justify-between px-1 text-[8px] font-black text-slate-600 uppercase tracking-tighter md:text-xs">
                  <span>0 J</span>
                  <span>{maxJoules} J</span>
                </div>
              </div>

              <button onClick={() => setShowRhythmPicker('SHOCK')} className="w-full bg-red-600 text-white py-4 rounded-xl font-black text-xl shadow-lg active:scale-95 transition-all uppercase tracking-tight md:py-8 md:text-3xl md:rounded-3xl">Perform Shock</button>
            </div>

            <button onClick={() => { setEpiSeconds(0); addLog('Epi Given'); }} className="bg-emerald-600 text-white py-6 rounded-2xl font-black shadow-lg active:scale-95 transition-all md:h-full md:text-2xl md:rounded-[32px]">DRUGS (EPI)</button>
            <button onClick={() => setShowMedsMenu(true)} className="bg-slate-800 text-slate-300 py-6 rounded-2xl font-black border border-slate-700 active:scale-95 transition-all md:h-full md:text-2xl md:rounded-[32px]">MEDS / EVENT</button>
            <button onClick={() => { setIsActive(false); addLog('Code Stopped'); }} className="col-span-2 bg-slate-200 text-slate-950 py-4 rounded-2xl font-black shadow-md active:scale-95 transition-all md:text-2xl md:rounded-3xl">STOP CODE</button>
          </div>
        )}

        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-inner md:p-8 md:rounded-[32px]">
          <h3 className="text-xs font-black text-slate-500 uppercase mb-3 md:text-sm md:mb-6">Live Session Log</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar md:max-h-96">
            {logs.slice().reverse().map((l, i) => (
              <div key={i} className="flex gap-4 items-start border-l-2 border-red-500/20 pl-4 py-1 md:py-3 md:pl-8">
                <span className="font-mono text-red-500 text-[10px] font-bold shrink-0 md:text-sm">{l.timestamp}</span>
                <div>
                  <p className="text-sm font-bold text-slate-200 uppercase md:text-lg">{l.action}</p>
                  {l.details && <p className="text-xs text-slate-500 md:text-sm">{l.details}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isActive && totalSeconds > 0 && (
          <button onClick={saveToHistory} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-600/20 md:py-8 md:text-2xl md:rounded-3xl">SAVE TO HISTORY</button>
        )}
      </div>

      {/* RHYTHM PICKER MODAL */}
      {showRhythmPicker && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-end md:items-center md:justify-center">
          <div className="bg-slate-900 w-full rounded-t-[32px] p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300 md:max-w-xl md:rounded-[40px] md:p-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-black text-slate-200 md:text-3xl">SELECT RHYTHM</h3>
              <button onClick={() => setShowRhythmPicker(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 pb-8 md:pb-0">
              {RHYTHMS.map(r => (
                <button key={r} onClick={() => selectRhythm(r)} className="bg-slate-800 py-5 rounded-2xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-700 active:scale-95 transition-all uppercase md:text-xl">{r}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MEDS/EVENTS MODAL */}
      {showMedsMenu && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-end md:items-center md:justify-center">
          <div className="bg-slate-900 w-full max-h-[80vh] rounded-t-[32px] p-6 flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 md:max-w-2xl md:rounded-[40px] md:p-10 md:max-h-[70vh]">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <h3 className="text-xl font-black text-slate-200 md:text-3xl">LOG MEDS / EVENT</h3>
              <button onClick={() => setShowMedsMenu(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto grid grid-cols-1 gap-2 pb-10 no-scrollbar md:grid-cols-2 md:gap-4">
              {MEDS_EVENTS.map(item => (
                <button 
                  key={item} 
                  onClick={() => selectMedEvent(item)} 
                  className="w-full py-4 px-6 bg-slate-800 rounded-xl text-slate-200 font-bold text-left hover:bg-slate-750 active:scale-[0.98] transition-all flex justify-between items-center border border-slate-700/50 md:py-6 md:px-8"
                >
                  <span className="uppercase text-sm md:text-base">{item}</span>
                  <i className="fas fa-plus text-blue-500 text-xs"></i>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeBlueTracker;

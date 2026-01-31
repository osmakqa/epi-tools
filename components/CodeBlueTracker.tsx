import React, { useState, useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface Props {
  type: 'ACLS' | 'PALS' | 'EMERGENCY';
  onClose: () => void;
}

const RHYTHMS = ['VF', 'pVT', 'Asystole', 'PEA', 'SVT', 'Sinus Tach', 'Bradycardia'];
const FINAL_RHYTHMS = [
  'Sinus Rhythm', 'Sinus Tachycardia', 'Sinus Bradycardia', 
  'AF in CVR', 'AF in RVR', 'Sinus Arrhythmia', 'Expired'
];
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
  const [isMetronomeEnabled, setIsMetronomeEnabled] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showRhythmPicker, setShowRhythmPicker] = useState<null | 'CHECK' | 'SHOCK'>(null);
  const [showFinalRhythmPicker, setShowFinalRhythmPicker] = useState(false);
  const [showMedsMenu, setShowMedsMenu] = useState(false);
  const [shockConfig, setShockConfig] = useState({ joules: 200, wave: 'Biphasic' });
  const [isSaving, setIsSaving] = useState(false);

  // Summary counts
  const [epiCount, setEpiCount] = useState(0);
  const [shockCount, setShockCount] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);
  const [finalRhythm, setFinalRhythm] = useState<string>("");

  // Metronome Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextTickTimeRef = useRef<number>(0);
  const metronomeIntervalRef = useRef<number | null>(null);

  // General Resuscitation Timer
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

  // Metronome Sound Engine
  useEffect(() => {
    if (isActive && isMetronomeEnabled) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      nextTickTimeRef.current = ctx.currentTime;
      
      const scheduleNextTick = () => {
        // Schedule sounds in advance for precision
        while (nextTickTimeRef.current < ctx.currentTime + 0.1) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, nextTickTimeRef.current); // A5 note
          
          gain.gain.setValueAtTime(0.1, nextTickTimeRef.current);
          gain.gain.exponentialRampToValueAtTime(0.001, nextTickTimeRef.current + 0.05);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(nextTickTimeRef.current);
          osc.stop(nextTickTimeRef.current + 0.05);
          
          // 120 BPM = 2 Hz = 0.5 seconds per tick
          nextTickTimeRef.current += 0.5;
        }
      };

      metronomeIntervalRef.current = window.setInterval(scheduleNextTick, 25);
    } else {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
    }

    return () => {
      if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
    };
  }, [isActive, isMetronomeEnabled]);

  const addLog = (action: string, details?: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { timestamp: time, action, details: details || "" }]);
  };

  const removeLog = (index: number) => {
    setLogs(prev => prev.filter((_, i) => i !== index));
  };

  const startCode = () => {
    const now = new Date();
    setStartTime(now);
    setStopTime(null);
    setIsActive(true);
    setTotalSeconds(0);
    setEpiSeconds(0);
    setCycleSeconds(0);
    setEpiCount(0);
    setShockCount(0);
    setLogs([]);
    addLog(`Code Started`, `Type: ${type}`);
    
    // Resume audio context on user gesture
    if (audioCtxRef.current) audioCtxRef.current.resume();
  };

  const stopCode = () => {
    setIsActive(false);
    setStopTime(new Date());
    setShowFinalRhythmPicker(true);
  };

  const cancelStopCode = () => {
    setIsActive(true);
    setStopTime(null);
    setShowFinalRhythmPicker(false);
  };

  const handleFinalRhythm = (rhythm: string) => {
    setFinalRhythm(rhythm);
    addLog('Code Stopped', `Final Rhythm: ${rhythm}`);
    setShowFinalRhythmPicker(false);
  };

  const selectRhythm = (rhythm: string) => {
    if (showRhythmPicker === 'CHECK') {
      addLog('Pulse/Rhythm Check', rhythm);
      setCycleSeconds(0);
    } else if (showRhythmPicker === 'SHOCK') {
      setShockCount(prev => prev + 1);
      addLog('Shock Delivered', `${shockConfig.joules}J (${shockConfig.wave}) - Rhythm: ${rhythm}`);
    }
    setShowRhythmPicker(null);
  };

  const handleEpiClick = () => {
    if (!isActive) return;
    setEpiSeconds(0);
    setEpiCount(prev => prev + 1);
    addLog('Epinephrine Given', `Total doses: ${epiCount + 1}`);
  };

  const selectMedEvent = (item: string) => {
    addLog('Event/Medication', item);
    if (item === 'ROSC' || item === 'Termination') stopCode();
    setShowMedsMenu(false);
  };

  const saveToHistory = async () => {
    setIsSaving(true);
    try {
      const sanitizedLogs = logs.map(log => ({
        timestamp: log.timestamp,
        action: log.action,
        details: log.details || ""
      }));

      const session = {
        type,
        startTime: startTime?.toISOString() || new Date().toISOString(),
        stopTime: stopTime?.toISOString() || "",
        totalEpinephrine: epiCount,
        totalShocks: shockCount,
        totalMinutes: Math.floor(totalSeconds / 60),
        finalRhythm: finalRhythm,
        createdAt: serverTimestamp(),
        duration: formatTime(totalSeconds),
        logs: sanitizedLogs
      };

      await addDoc(collection(db, 'code_history'), session);
      onClose();
    } catch (error: any) {
      console.error("Firestore Error:", error);
      alert("Failed to save to cloud: " + error.message);
    } finally {
      setIsSaving(false);
    }
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
        <div className="flex flex-col">
          <h2 className="text-xl font-black tracking-tight text-red-500">{type} TRACKER</h2>
          {isActive && (
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Live Session</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isActive && (
             <button 
               onClick={() => setIsMetronomeEnabled(!isMetronomeEnabled)}
               className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isMetronomeEnabled ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}
               title="Toggle CPR Metronome (120 BPM)"
             >
               <i className={`fas ${isMetronomeEnabled ? 'fa-volume-high' : 'fa-volume-mute'}`}></i>
             </button>
          )}
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-slate-400 md:hidden">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-8 md:max-w-4xl md:mx-auto md:w-full">
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center md:p-8 md:rounded-[32px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest md:text-sm">Total Time</span>
            <div className="text-4xl font-mono font-bold text-slate-200 md:text-7xl">{formatTime(totalSeconds)}</div>
          </div>
          <button 
            onClick={handleEpiClick}
            disabled={!isActive}
            className={`p-4 rounded-2xl border text-center transition-all md:p-8 md:rounded-[32px] cursor-pointer active:scale-95 ${!isActive ? 'bg-slate-900 border-slate-800 opacity-50' : epiSeconds > 180 ? 'bg-red-950 border-red-500 animate-pulse' : 'bg-slate-900 border-slate-800 hover:border-blue-500'}`}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest md:text-sm flex flex-col">
              <span>Epi (3-5m)</span>
              {isActive && <span className="text-blue-500 text-[8px] animate-pulse">(Tap to Log)</span>}
            </span>
            <div className={`text-4xl font-mono font-bold md:text-7xl ${epiSeconds > 180 ? 'text-red-500' : 'text-slate-200'}`}>{formatTime(epiSeconds)}</div>
            {epiCount > 0 && <span className="text-[10px] font-black text-blue-400 uppercase mt-1">Doses: {epiCount}</span>}
          </button>
        </div>

        <button 
          onClick={() => setShowRhythmPicker('CHECK')}
          disabled={!isActive}
          className={`w-full p-5 rounded-2xl border-2 font-black text-xl transition-all md:p-10 md:rounded-[40px] md:text-4xl ${!isActive ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-50' : cycleSeconds > 120 ? 'bg-orange-600 border-orange-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-orange-500'}`}
        >
          {!isActive ? 'CODE STOPPED' : cycleSeconds > 120 ? (
            <div className="flex flex-col items-center">
              <span className="animate-pulse">TIME TO CHECK PULSE</span>
              <span className="text-sm font-mono opacity-80">OVERDUE: {formatTime(cycleSeconds - 120)}</span>
            </div>
          ) : `CYCLE: ${formatTime(cycleSeconds)}`}
        </button>

        {!isActive && !stopTime ? (
          <button onClick={startCode} className="w-full bg-red-600 text-white py-8 rounded-3xl text-3xl font-black shadow-2xl shadow-red-600/20 active:scale-95 transition-transform md:py-16 md:text-5xl md:rounded-[48px]">
            START CODE
          </button>
        ) : isActive ? (
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

            <button onClick={() => setShowMedsMenu(true)} className="col-span-2 bg-slate-800 text-slate-300 py-8 rounded-2xl font-black border border-slate-700 active:scale-95 transition-all md:h-full md:text-2xl md:rounded-[32px] uppercase">Other Meds / Event</button>
            <button onClick={stopCode} className="col-span-2 bg-slate-200 text-slate-950 py-4 rounded-2xl font-black shadow-md active:scale-95 transition-all md:text-2xl md:rounded-3xl">STOP CODE</button>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 animate-in zoom-in-95">
             <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest">Session Summary</h3>
                <span className="text-[10px] font-black text-slate-600 uppercase">{type} RESUS</span>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <SummaryStat label="Start Time" value={startTime?.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) || "--"} />
                <SummaryStat label="Stop Time" value={stopTime?.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) || "--"} />
                <SummaryStat label="Total Epi" value={`${epiCount} Doses`} />
                <SummaryStat label="Total Shocks" value={`${shockCount} Shocks`} />
                <SummaryStat label="Final Rhythm" value={finalRhythm || "Not Set"} />
                <SummaryStat label="Total Minutes" value={`${Math.floor(totalSeconds / 60)} min`} />
             </div>
             <div className="flex gap-3 mt-4">
               <button onClick={startCode} className="flex-1 bg-slate-800 text-slate-300 py-3 rounded-xl font-bold uppercase text-xs">Reset Tracker</button>
               <button 
                 onClick={saveToHistory} 
                 disabled={isSaving}
                 className={`flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold uppercase text-xs shadow-lg shadow-blue-600/20 ${isSaving ? 'opacity-50' : ''}`}
               >
                 {isSaving ? 'Saving...' : 'Save to Cloud'}
               </button>
             </div>
          </div>
        )}

        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-inner md:p-8 md:rounded-[32px]">
          <h3 className="text-xs font-black text-slate-500 uppercase mb-3 md:text-sm md:mb-6">Live Session Log</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar md:max-h-96">
            {logs.slice().reverse().map((l, i) => {
              const actualIndex = logs.length - 1 - i;
              return (
                <div key={actualIndex} className="flex gap-4 items-start border-l-2 border-red-500/20 pl-4 py-1 md:py-3 md:pl-8 group">
                  <span className="font-mono text-red-500 text-[10px] font-bold shrink-0 md:text-sm">{l.timestamp}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-200 uppercase md:text-lg">{l.action}</p>
                    {l.details && <p className="text-xs text-slate-500 md:text-sm">{l.details}</p>}
                  </div>
                  <button 
                    onClick={() => removeLog(actualIndex)}
                    className="w-8 h-8 rounded-lg bg-red-600/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <i className="fas fa-trash-alt text-xs"></i>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FINAL RHYTHM PICKER */}
      {showFinalRhythmPicker && (
        <div className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-6">
          <div className="bg-slate-900 w-full max-w-sm rounded-[40px] p-8 border border-slate-800 space-y-6 shadow-2xl relative">
            <button 
              onClick={cancelStopCode}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:text-white"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="text-center">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Final Rhythm</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Select code outcome rhythm</p>
            </div>
            <div className="grid gap-2">
              {FINAL_RHYTHMS.map(r => (
                <button 
                  key={r} 
                  onClick={() => handleFinalRhythm(r)}
                  className="w-full py-4 bg-slate-800 border border-slate-700/50 rounded-2xl text-slate-200 font-bold uppercase text-xs hover:bg-slate-700 active:scale-95 transition-all"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RHYTHM PICKER MODAL */}
      {showRhythmPicker && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-end md:items-center md:justify-center">
          <div className="bg-slate-900 w-full rounded-t-[32px] p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300 md:max-w-xl md:rounded-[40px] md:p-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-black text-slate-200 md:text-3xl uppercase">Select Rhythm</h3>
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
              <h3 className="text-xl font-black text-slate-200 md:text-3xl uppercase">Other Meds / Event</h3>
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

const SummaryStat: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div>
    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-bold text-slate-200 uppercase">{value}</p>
  </div>
);

export default CodeBlueTracker;
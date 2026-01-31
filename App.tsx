import React, { useState, useEffect } from 'react';
import { ModuleType, CodeSession } from './types';
import CodeBlueTracker from './components/CodeBlueTracker';
import PediatricCalculator from './components/PediatricCalculator';
import AntimicrobialGuide from './components/AntimicrobialGuide';
import DecisionPathways from './components/DecisionPathways';
import OrthoGuide from './components/OrthoGuide';
import GlobalSearch from './components/GlobalSearch';
import ATLSGuide from './components/ATLSGuide';
import RSIGuide from './components/RSIGuide';
import PdfViewer from './components/PdfViewer';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const ACLS_RESOURCES = [
  { title: 'Cardiac Arrest Algorithm', url: 'https://maxterrenal-hash.github.io/justculture/Adult%20Cardiac%20Arrest%20Algo.pdf' },
  { title: 'Tachyarrhythmia', url: 'https://maxterrenal-hash.github.io/justculture/Adult%20Tachy.pdf' },
  { title: 'Bradyarrhythmia', url: 'https://maxterrenal-hash.github.io/justculture/Adult%20Brady.pdf' },
  { title: 'Post-Cardiac Arrest', url: 'https://maxterrenal-hash.github.io/justculture/Adult%20PostCardiac.pdf' },
  { title: 'Pregnant Cardiac Arrest', url: 'https://maxterrenal-hash.github.io/justculture/Pregnant%20Cardiac%20Arrest.pdf' },
  { title: 'Electrical Cardioversion Algorithm', url: 'https://maxterrenal-hash.github.io/justculture/Electrical%20Cardioversion%20Algo.pdf' },
  { title: 'LVAD', url: 'https://maxterrenal-hash.github.io/justculture/LVAD.pdf' },
];

const PALS_RESOURCES = [
  { title: 'Cardiac Arrest', url: 'https://maxterrenal-hash.github.io/justculture/Pedia%20Cardiac%20Arrest%20Algo.pdf' },
  { title: 'Neonatal Resuscitation', url: 'https://maxterrenal-hash.github.io/justculture/Neonatal%20Resu.pdf' },
  { title: 'Tachyarrhythmia', url: 'https://maxterrenal-hash.github.io/justculture/Pedia%20Tachy.pdf' },
  { title: 'Bradyarrhythmia', url: 'https://maxterrenal-hash.github.io/justculture/Pedia%20Brady.pdf' },
  { title: 'Infant Foreign-Body Airway Obstruction', url: 'https://maxterrenal-hash.github.io/justculture/Infant%20Foreign.pdf' },
  { title: 'Child Foreign-Body Airway Obstruction', url: 'https://maxterrenal-hash.github.io/justculture/Child%20Foreign.pdf' },
];

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.HOME);
  const [deepLinkSubId, setDeepLinkSubId] = useState<string | undefined>(undefined);
  const [pdfConfig, setPdfConfig] = useState<{ url: string; title: string; returnModule: ModuleType } | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [history, setHistory] = useState<any[]>([]); 
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (activeModule === ModuleType.HISTORY) {
      setLoadingHistory(true);
      const q = query(collection(db, 'code_history'), orderBy('startTime', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const historyData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        setHistory(historyData);
        setLoadingHistory(false);
      }, (error) => {
        console.error("Firestore error: ", error);
        setLoadingHistory(false);
      });
      return () => unsubscribe();
    }
  }, [activeModule]);

  const handleNavigate = (module: ModuleType, subId?: string) => {
    setActiveModule(module);
    setDeepLinkSubId(subId);
  };

  const openPdf = (url: string, title: string, returnModule: ModuleType = ModuleType.HOME) => {
    setPdfConfig({ url, title, returnModule });
    setActiveModule(ModuleType.PDF_VIEWER);
  };

  const resetDeepLink = () => setDeepLinkSubId(undefined);

  const handleDeleteEntry = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      try {
        await deleteDoc(doc(db, 'code_history', id));
      } catch (error) {
        console.error("Delete error: ", error);
        alert("Failed to delete entry.");
      }
    }
  };

  const handleDeleteLogEntry = async (sessionId: string, logIndex: number) => {
    const session = history.find(s => s.id === sessionId);
    if (!session) return;

    if (window.confirm("Delete this log entry?")) {
      const updatedLogs = [...session.logs];
      updatedLogs.splice(logIndex, 1);
      
      try {
        const sessionRef = doc(db, 'code_history', sessionId);
        await updateDoc(sessionRef, { logs: updatedLogs });
      } catch (error) {
        console.error("Error updating logs:", error);
        alert("Failed to delete log entry.");
      }
    }
  };

  const renderInfoModal = () => (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center space-y-6">
        <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto text-blue-500 text-4xl">
           <i className="fas fa-microchip"></i>
        </div>
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">EPI <span className="text-blue-500 italic">Tools</span></h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Version 1.0.0 (Global Build)</p>
        </div>
        <div className="space-y-2 py-4 border-y border-slate-800/50">
          <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-tight">Support & Feedback</p>
          <a href="mailto:maxterrenal@gmail.com" className="block w-full py-3 bg-slate-800 rounded-2xl text-blue-400 font-black text-sm hover:bg-slate-750 transition-colors">
            maxterrenal@gmail.com
          </a>
        </div>
        <button 
          onClick={() => setShowInfo(false)}
          className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
        >
          Dismiss
        </button>
      </div>
    </div>
  );

  const renderHistory = () => {
    return (
      <div className="flex flex-col h-full bg-slate-950">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <h2 className="text-xl font-black text-slate-200 uppercase tracking-tight">Cloud History</h2>
          <button onClick={() => setActiveModule(ModuleType.HOME)} className="p-2 text-slate-400"><i className="fas fa-times"></i></button>
        </div>
        <div className="p-4 overflow-y-auto space-y-3 pb-24 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {loadingHistory ? (
            <div className="col-span-2 py-20 text-center flex flex-col items-center">
               <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="text-[10px] font-black uppercase text-slate-600">Syncing with cloud...</p>
            </div>
          ) : history.map(h => {
            const start = h.startTime ? new Date(h.startTime) : null;
            const stop = h.stopTime ? new Date(h.stopTime) : null;
            return (
              <div key={h.id} className="bg-slate-900 border border-slate-800 p-5 rounded-[32px] h-fit relative group shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-red-600 text-[10px] font-black px-2 py-1 rounded text-white uppercase tracking-widest">{h.type}</span>
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    {start?.toLocaleDateString() || "--"}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-3 mb-4">
                   <div>
                     <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Duration</p>
                     <p className="text-lg font-black text-slate-200">{h.duration || h.totalMinutes + 'm'}</p>
                   </div>
                   <div>
                     <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Final Rhythm</p>
                     <p className="text-sm font-black text-emerald-500 truncate">{h.finalRhythm || "--"}</p>
                   </div>
                   <div>
                     <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Start / Stop</p>
                     <p className="text-[10px] font-bold text-slate-400">
                        {start?.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) || "--"} - {stop?.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) || "--"}
                     </p>
                   </div>
                   <div>
                     <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Epi / Shocks</p>
                     <p className="text-[10px] font-bold text-slate-400">
                        Epi: {h.totalEpinephrine || 0} • Shocks: {h.totalShocks || 0}
                     </p>
                   </div>
                </div>
                
                <button 
                  onClick={() => handleDeleteEntry(h.id)}
                  className="absolute top-4 right-4 w-8 h-8 bg-red-600/10 text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 active:scale-90 transition-all hover:bg-red-600 hover:text-white shadow-sm"
                >
                  <i className="fas fa-trash-alt text-xs"></i>
                </button>

                <details className="mt-2 group/logs">
                  <summary className="text-[9px] font-black text-slate-500 uppercase cursor-pointer group-open/logs:mb-4 bg-slate-950/50 p-2 rounded-lg list-none flex items-center gap-2">
                    <i className="fas fa-list-ul text-blue-500"></i> Full Code Log
                  </summary>
                  <div className="space-y-3 pl-3 border-l-2 border-slate-800 animate-in slide-in-from-top-2">
                    {h.logs?.map((l: any, i: number) => (
                      <div key={i} className="space-y-0.5 group/logentry relative">
                        <div className="flex justify-between items-baseline pr-8">
                          <p className="text-[10px] font-black text-slate-200 uppercase">{l.action}</p>
                          <span className="text-[8px] font-mono text-slate-500">{l.timestamp}</span>
                        </div>
                        {l.details && <p className="text-[9px] text-slate-500 font-medium pr-8">{l.details}</p>}
                        <button 
                          onClick={() => handleDeleteLogEntry(h.id, i)}
                          className="absolute right-0 top-0 w-6 h-6 rounded-md bg-red-600/10 text-red-500 flex items-center justify-center opacity-0 group-hover/logentry:opacity-100 transition-opacity"
                        >
                          <i className="fas fa-trash text-[8px]"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            );
          })}
          {!loadingHistory && history.length === 0 && <p className="text-center text-slate-600 py-20 uppercase font-black text-[10px] tracking-widest col-span-2">No saved codes in cloud.</p>}
        </div>
      </div>
    );
  };

  const renderResourceMenu = (title: string, resources: { title: string; url: string }[], returnModule: ModuleType) => (
    <div className="flex flex-col h-full bg-slate-950">
      <div className="p-6 shrink-0 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none">{title}</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Resource Database</p>
        </div>
        <button onClick={() => setActiveModule(ModuleType.HOME)} className="p-2 text-slate-500">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24 no-scrollbar md:p-6 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {resources.map((res, i) => (
          <button 
            key={i} 
            onClick={() => openPdf(res.url, res.title, returnModule)}
            className="w-full bg-slate-900 border border-slate-800 p-5 rounded-[28px] flex items-center gap-5 active:bg-slate-800 active:scale-[0.98] transition-all text-left group shadow-lg h-fit md:p-5 md:rounded-3xl md:gap-4"
          >
            <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-2xl flex items-center justify-center text-xl shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all md:w-11 md:h-11 md:text-lg md:rounded-xl">
              <i className="fas fa-file-pdf"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-black text-slate-100 uppercase text-sm leading-tight tracking-tight md:text-sm">{res.title}</h4>
              <p className="text-[9px] font-bold text-slate-600 uppercase mt-1 md:mt-0.5 md:text-[10px]">Clinical Protocol</p>
            </div>
            <i className="fas fa-chevron-right text-slate-800 text-xs md:opacity-30"></i>
          </button>
        ))}
      </div>
    </div>
  );

  const renderAlgorithmChoice = (type: 'ACLS' | 'PALS') => {
    if (type === 'ACLS') return renderResourceMenu('ACLS', ACLS_RESOURCES, ModuleType.ACLS);
    if (type === 'PALS') return renderResourceMenu('PALS', PALS_RESOURCES, ModuleType.PALS);
    return null;
  };

  const renderOrthoMenu = () => (
    <div className="p-6 space-y-8 flex flex-col h-full items-center justify-center bg-slate-950 md:max-w-2xl md:mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-white uppercase">ORTHOPEDICS</h2>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Resource</p>
      </div>
      <div className="grid gap-4 w-full md:grid-cols-2">
        <button 
          onClick={() => openPdf('https://maxterrenal-hash.github.io/justculture/emrasplintguide.pdf', 'EMRA Splint Guide', ModuleType.ORTHO_MENU)} 
          className="w-full bg-slate-900 border border-slate-800 p-8 rounded-[40px] text-left relative overflow-hidden group active:scale-95 transition-all shadow-xl"
        >
          <div className="relative z-10">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-2">In-App Resource</span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Splint Guide</h3>
            <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase">EMRA Clinical Guide</p>
          </div>
          <i className="fas fa-file-pdf absolute -right-4 -bottom-4 text-9xl text-slate-800/50"></i>
        </button>
        <button 
          onClick={() => setActiveModule(ModuleType.ORTHO_GUIDE)} 
          className="w-full bg-orange-600 p-8 rounded-[40px] text-left relative overflow-hidden group shadow-2xl shadow-orange-600/20 active:scale-95 transition-all"
        >
          <div className="relative z-10">
            <span className="text-[10px] font-black text-orange-200 uppercase tracking-widest block mb-2">Internal Database</span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ortho Guide</h3>
            <p className="text-[10px] text-orange-100/70 font-bold mt-2 uppercase">Fractures & Management</p>
          </div>
          <i className="fas fa-bone absolute -right-4 -bottom-4 text-9xl text-white/10"></i>
        </button>
      </div>
      <button onClick={() => setActiveModule(ModuleType.HOME)} className="text-slate-600 font-black uppercase text-[10px] tracking-widest mt-10 hover:text-slate-400">Cancel</button>
    </div>
  );

  const renderHome = () => (
    <div className="p-6 space-y-8 overflow-y-auto no-scrollbar h-full md:max-w-5xl md:mx-auto">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight leading-none uppercase">EPI <span className="text-blue-500 italic">Tools</span></h1>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">EMED resource portal v1.0</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowInfo(true)} className="w-10 h-10 bg-slate-900/40 border border-slate-800/50 rounded-full flex items-center justify-center text-slate-600 active:bg-slate-800 md:w-12 md:h-12 hover:text-blue-500 transition-colors">
            <i className="fas fa-info-circle md:text-xl"></i>
          </button>
          <button onClick={() => handleNavigate(ModuleType.SEARCH)} className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-blue-500 active:bg-slate-800 shadow-lg md:w-12 md:h-12">
            <i className="fas fa-search md:text-xl"></i>
          </button>
          <button onClick={() => setActiveModule(ModuleType.HISTORY)} className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-800 md:w-12 md:h-12">
            <i className="fas fa-history md:text-xl"></i>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-2 md:grid-cols-4 md:gap-6">
        <button onClick={() => setActiveModule(ModuleType.ACLS)} className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col items-center gap-1 active:bg-slate-800 md:p-8 md:rounded-[32px] md:hover:border-blue-500/50 transition-colors">
          <i className="fas fa-heartbeat text-lg text-red-500 md:text-4xl"></i>
          <span className="font-black uppercase text-[8px] text-slate-300 md:text-xs md:mt-2">ACLS</span>
        </button>
        <button onClick={() => setActiveModule(ModuleType.PALS)} className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col items-center gap-1 active:bg-slate-800 md:p-8 md:rounded-[32px] md:hover:border-blue-500/50 transition-colors">
          <i className="fas fa-child text-lg text-red-500 md:text-4xl"></i>
          <span className="font-black uppercase text-[8px] text-slate-300 md:text-xs md:mt-2">PALS</span>
        </button>
        <button onClick={() => setActiveModule(ModuleType.ATLS)} className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col items-center gap-1 active:bg-slate-800 md:p-8 md:rounded-[32px] md:hover:border-blue-500/50 transition-colors">
          <i className="fas fa-truck-medical text-lg text-amber-500 md:text-4xl"></i>
          <span className="font-black uppercase text-[8px] text-slate-300 md:text-xs md:mt-2">ATLS</span>
        </button>
        <button onClick={() => setActiveModule(ModuleType.RSI)} className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col items-center gap-1 active:bg-slate-800 md:p-8 md:rounded-[32px] md:hover:border-blue-500/50 transition-colors">
          <i className="fas fa-lungs text-lg text-sky-500 md:text-4xl"></i>
          <span className="font-black uppercase text-[8px] text-slate-300 md:text-xs md:mt-2">RSI</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <button onClick={() => setActiveModule(ModuleType.ORTHO_MENU)} className="bg-slate-900 border border-slate-800 p-6 rounded-[32px] flex flex-col items-center gap-3 active:bg-slate-800 md:hover:border-blue-500/50 transition-colors">
          <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center text-2xl md:w-20 md:h-20 md:text-4xl"><i className="fas fa-bone"></i></div>
          <span className="font-black text-slate-200 text-xs uppercase md:text-sm">Ortho</span>
        </button>
        <button onClick={() => setActiveModule(ModuleType.CALCULATORS)} className="bg-slate-900 border border-slate-800 p-6 rounded-[32px] flex flex-col items-center gap-3 active:bg-slate-800 md:hover:border-blue-500/50 transition-colors">
          <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center text-2xl md:w-20 md:h-20 md:text-4xl"><i className="fas fa-calculator"></i></div>
          <span className="font-black text-slate-200 text-xs uppercase md:text-sm">Calculators</span>
        </button>
        <button onClick={() => setActiveModule(ModuleType.ANTIMICROBIAL)} className="bg-slate-900 border border-slate-800 p-6 rounded-[32px] flex flex-col items-center gap-3 active:bg-slate-800 md:hover:border-blue-500/50 transition-colors">
          <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-2xl md:w-20 md:h-20 md:text-4xl"><i className="fas fa-capsules"></i></div>
          <span className="font-black text-slate-200 text-xs uppercase md:text-sm">Antimicrobials</span>
        </button>
        <button onClick={() => setActiveModule(ModuleType.PATHWAYS)} className="bg-slate-900 border border-slate-800 p-6 rounded-[32px] flex flex-col items-center gap-3 active:bg-slate-800 md:hover:border-blue-500/50 transition-colors">
          <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-2xl md:w-20 md:h-20 md:text-4xl"><i className="fas fa-diagram-project"></i></div>
          <span className="font-black text-slate-200 text-xs uppercase md:text-sm">Pathways</span>
        </button>
      </div>

      <div className="hidden md:block bg-blue-600/10 border border-blue-500/20 p-8 rounded-[40px] text-center">
         <h3 className="text-xl font-black text-white uppercase mb-2">Web Workstation Mode</h3>
         <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">You are currently viewing the EPI Tools desktop interface. All mobile protocols are synchronized and optimized for a larger screen experience.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 max-w-md mx-auto relative flex flex-col ring-1 ring-slate-800 shadow-2xl overflow-hidden md:max-w-none md:mx-0 md:flex-row md:ring-0">
      
      {/* INFO MODAL OVERLAY */}
      {showInfo && renderInfoModal()}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 z-50">
        <div className="p-8 border-b border-slate-800">
           <div className="flex justify-between items-start">
             <h2 className="text-2xl font-black text-white tracking-tighter uppercase">EPI <span className="text-blue-500 italic">Tools</span></h2>
             <button onClick={() => setShowInfo(true)} className="text-slate-600 hover:text-blue-500 transition-colors"><i className="fas fa-info-circle"></i></button>
           </div>
           <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Web Workstation v1.0</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 no-scrollbar">
           <SidebarLink icon="fa-home" label="Home" active={activeModule === ModuleType.HOME} onClick={() => setActiveModule(ModuleType.HOME)} color="text-blue-500" />
           <div className="pt-4 pb-2 px-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Emergency Tools</div>
           <SidebarLink icon="fa-bolt" label="Code Blue" active={activeModule === ModuleType.CODE_BLUE} onClick={() => setActiveModule(ModuleType.CODE_BLUE)} color="text-red-500" />
           <SidebarLink icon="fa-lungs" label="RSI Guide" active={activeModule === ModuleType.RSI} onClick={() => setActiveModule(ModuleType.RSI)} color="text-sky-500" />
           <SidebarLink icon="fa-heartbeat" label="ACLS" active={activeModule === ModuleType.ACLS} onClick={() => setActiveModule(ModuleType.ACLS)} color="text-red-500" />
           <SidebarLink icon="fa-child" label="PALS" active={activeModule === ModuleType.PALS} onClick={() => setActiveModule(ModuleType.PALS)} color="text-red-500" />
           <SidebarLink icon="fa-truck-medical" label="ATLS" active={activeModule === ModuleType.ATLS} onClick={() => setActiveModule(ModuleType.ATLS)} color="text-amber-500" />
           
           <div className="pt-4 pb-2 px-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Clinical Care</div>
           <SidebarLink icon="fa-bone" label="Orthopedics" active={activeModule === ModuleType.ORTHO_MENU || activeModule === ModuleType.ORTHO_GUIDE} onClick={() => setActiveModule(ModuleType.ORTHO_MENU)} color="text-orange-500" />
           <SidebarLink icon="fa-calculator" label="Calculators" active={activeModule === ModuleType.CALCULATORS} onClick={() => setActiveModule(ModuleType.CALCULATORS)} color="text-amber-500" />
           <SidebarLink icon="fa-capsules" label="Antimicrobials" active={activeModule === ModuleType.ANTIMICROBIAL} onClick={() => setActiveModule(ModuleType.ANTIMICROBIAL)} color="text-blue-500" />
           <SidebarLink icon="fa-diagram-project" label="Pathways" active={activeModule === ModuleType.PATHWAYS} onClick={() => setActiveModule(ModuleType.PATHWAYS)} color="text-emerald-500" />
        </nav>
        <div className="p-6 border-t border-slate-800">
           <button onClick={() => setActiveModule(ModuleType.HISTORY)} className="w-full py-4 bg-slate-800 rounded-2xl flex items-center justify-center gap-3 text-slate-400 hover:text-white transition-colors">
              <i className="fas fa-history"></i>
              <span className="font-black uppercase text-xs">Cloud History</span>
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 pb-20 overflow-hidden md:pb-0 relative h-screen">
        {activeModule === ModuleType.HOME && renderHome()}
        {activeModule === ModuleType.ACLS && renderAlgorithmChoice('ACLS')}
        {activeModule === ModuleType.PALS && renderAlgorithmChoice('PALS')}
        {activeModule === ModuleType.ATLS && <ATLSGuide onClose={() => setActiveModule(ModuleType.HOME)} />}
        {activeModule === ModuleType.RSI && <RSIGuide onClose={() => setActiveModule(ModuleType.HOME)} />}
        {activeModule === ModuleType.CODE_BLUE && <CodeBlueTracker type="EMERGENCY" onClose={() => setActiveModule(ModuleType.HOME)} />}
        {activeModule === ModuleType.CALCULATORS && <PediatricCalculator initialDeepLink={deepLinkSubId} onDeepLinkUsed={resetDeepLink} />}
        {activeModule === ModuleType.ANTIMICROBIAL && <AntimicrobialGuide initialSearch={deepLinkSubId} onDeepLinkUsed={resetDeepLink} />}
        {activeModule === ModuleType.PATHWAYS && <DecisionPathways initialPathwayId={deepLinkSubId} onDeepLinkUsed={resetDeepLink} />}
        {activeModule === ModuleType.ORTHO_MENU && renderOrthoMenu()}
        {activeModule === ModuleType.ORTHO_GUIDE && <OrthoGuide initialSearch={deepLinkSubId} onDeepLinkUsed={resetDeepLink} />}
        {activeModule === ModuleType.SEARCH && <GlobalSearch onClose={() => setActiveModule(ModuleType.HOME)} onSelect={handleNavigate} />}
        {activeModule === ModuleType.HISTORY && renderHistory()}
        {activeModule === ModuleType.PDF_VIEWER && pdfConfig && (
          <PdfViewer 
            url={pdfConfig.url} 
            title={pdfConfig.title} 
            onClose={() => setActiveModule(pdfConfig.returnModule)} 
          />
        )}
      </div>

      {/* MOBILE NAVIGATION */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-950/80 backdrop-blur-2xl border-t border-slate-800/50 flex justify-around py-3 px-4 z-40 md:hidden">
        <button onClick={() => setActiveModule(ModuleType.HOME)} className={`flex flex-col items-center gap-1 transition-all ${activeModule === ModuleType.HOME ? 'text-blue-500 scale-110' : 'text-slate-600'}`}><i className="fas fa-home text-lg"></i><span className="text-[8px] font-black uppercase">Home</span></button>
        <button onClick={() => setActiveModule(ModuleType.ORTHO_MENU)} className={`flex flex-col items-center gap-1 transition-all ${activeModule === ModuleType.ORTHO_MENU || activeModule === ModuleType.ORTHO_GUIDE || activeModule === ModuleType.PDF_VIEWER ? 'text-orange-500 scale-110' : 'text-slate-600'}`}><i className="fas fa-bone text-lg"></i><span className="text-[8px] font-black uppercase">Ortho</span></button>
        <div className="relative -top-6"><button onClick={() => setActiveModule(ModuleType.CODE_BLUE)} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${activeModule === ModuleType.CODE_BLUE ? 'bg-red-600 text-white' : 'bg-slate-900 border border-slate-800 text-red-500'}`}><i className="fas fa-bolt text-2xl"></i></button></div>
        <button onClick={() => setActiveModule(ModuleType.CALCULATORS)} className={`flex flex-col items-center gap-1 transition-all ${activeModule === ModuleType.CALCULATORS ? 'text-amber-500 scale-110' : 'text-slate-600'}`}><i className="fas fa-calculator text-lg"></i><span className="text-[8px] font-black uppercase">Calc</span></button>
        <button onClick={() => handleNavigate(ModuleType.SEARCH)} className={`flex flex-col items-center gap-1 transition-all ${activeModule === ModuleType.SEARCH ? 'text-blue-500 scale-110' : 'text-slate-600'}`}><i className="fas fa-search text-lg"></i><span className="text-[8px] font-black uppercase">Search</span></button>
      </nav>
    </div>
  );
};

const SidebarLink: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void; color: string }> = ({ icon, label, active, onClick, color }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${active ? 'bg-blue-600/10 shadow-inner' : 'hover:bg-slate-800/50'}`}
  >
    <div className={`w-8 h-8 flex items-center justify-center text-lg ${active ? color : 'text-slate-600'}`}>
       <i className={`fas ${icon}`}></i>
    </div>
    <span className={`text-xs font-black uppercase tracking-tight transition-colors ${active ? 'text-white' : 'text-slate-500'}`}>
       {label}
    </span>
  </button>
);

export default App;
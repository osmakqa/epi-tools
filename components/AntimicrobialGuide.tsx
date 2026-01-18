import React, { useState, useEffect } from 'react';
import { AntimicrobialGuideEntry } from '../types';
import { ANTIMICROBIAL_DATA } from '../data/AntimicrobialData';

interface Props {
  initialSearch?: string;
  onDeepLinkUsed?: () => void;
}

const AntimicrobialGuide: React.FC<Props> = ({ initialSearch, onDeepLinkUsed }) => {
  const [data, setData] = useState<AntimicrobialGuideEntry[]>(ANTIMICROBIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  useEffect(() => {
    if (initialSearch) {
      setSearch(initialSearch);
      onDeepLinkUsed?.();
    }
  }, [initialSearch]);

  const filteredItems = data.filter(item => 
    item.disease.toLowerCase().includes(search.toLowerCase()) || 
    item.system.toLowerCase().includes(search.toLowerCase())
  );

  const systems = Array.from(new Set(data.map(i => i.system)));
  const isSearching = search.trim().length > 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-950 text-slate-500">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="font-black text-xs uppercase tracking-widest animate-pulse">Loading Guidelines...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 font-sans">
      <div className="p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-2xl">
        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input 
            type="text" 
            placeholder="Search guidelines..."
            className="w-full pl-11 pr-10 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {isSearching && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              <i className="fas fa-times-circle"></i>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {isSearching ? (
          <div className="p-4 space-y-6">
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-2">
              Found {filteredItems.length} matching guidelines
            </h3>
            <div className="grid gap-4">
              {filteredItems.map((item, idx) => <DiseaseCard key={idx} item={item} />)}
            </div>
          </div>
        ) : (
          <>
            {!selectedSystem ? (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-white leading-none">Antimicrobials</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">DOH National Guidelines</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {systems.map((system) => (
                    <button key={system} onClick={() => setSelectedSystem(system)} className="w-full bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center justify-between group active:bg-slate-800 transition-all text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><i className="fas fa-folder-open text-sm"></i></div>
                        <span className="text-sm font-black text-slate-200 uppercase tracking-tight group-hover:text-blue-400 transition-colors">{system}</span>
                      </div>
                      <i className="fas fa-chevron-right text-slate-700 group-hover:text-blue-500"></i>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-3 px-2">
                  <button onClick={() => setSelectedSystem(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400"><i className="fas fa-chevron-left text-xs"></i></button>
                  <div>
                    <h3 className="text-xs font-black text-blue-500 uppercase tracking-widest">{selectedSystem}</h3>
                    <p className="text-[10px] font-bold text-slate-500">Guidelines list</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  {data.filter(i => i.system === selectedSystem).map((item, idx) => <DiseaseCard key={idx} item={item} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const DiseaseCard: React.FC<{ item: AntimicrobialGuideEntry }> = ({ item }) => (
  <div className="bg-slate-900 p-6 rounded-[32px] border border-slate-800 shadow-lg space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className="space-y-1">
      <h4 className="text-lg font-black text-white leading-tight uppercase tracking-tight">{item.disease}</h4>
      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{item.system}</p>
    </div>
    
    {item.pediatric && (
      <div className="space-y-3 p-4 bg-pink-500/5 border border-pink-500/10 rounded-2xl">
        <div className="flex items-center gap-2">
          <i className="fas fa-child text-pink-500 text-xs"></i>
          <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Pediatric</span>
        </div>
        <div className="grid gap-3">
           <div>
             <p className="text-[9px] font-black text-slate-500 uppercase mb-1">1st Line Regimen</p>
             <p className="text-xs text-slate-200 font-semibold leading-relaxed">{item.pediatric.firstLine}</p>
           </div>
           {item.pediatric.secondLine && (
             <div>
               <p className="text-[9px] font-black text-slate-500 uppercase mb-1">2nd Line / Alternatives</p>
               <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.pediatric.secondLine}</p>
             </div>
           )}
        </div>
      </div>
    )}

    {item.adult && (
      <div className="space-y-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
        <div className="flex items-center gap-2">
          <i className="fas fa-user text-blue-500 text-xs"></i>
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Adult</span>
        </div>
        <div className="grid gap-3">
           <div>
             <p className="text-[9px] font-black text-slate-500 uppercase mb-1">1st Line Regimen</p>
             <p className="text-xs text-slate-200 font-semibold leading-relaxed">{item.adult.firstLine}</p>
           </div>
           {item.adult.secondLine && (
             <div>
               <p className="text-[9px] font-black text-slate-500 uppercase mb-1">2nd Line / Alternatives</p>
               <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.adult.secondLine}</p>
             </div>
           )}
        </div>
      </div>
    )}

    {item.remarks && (
      <div className="pt-4 border-t border-slate-800">
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
          <i className="fas fa-info-circle text-blue-500"></i> Clinical Remarks
        </p>
        <p className="text-[11px] text-slate-400 italic leading-relaxed">{item.remarks}</p>
      </div>
    )}
  </div>
);

export default AntimicrobialGuide;
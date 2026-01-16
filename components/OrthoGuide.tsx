import React, { useState, useMemo, useEffect } from 'react';
import { ORTHO_DATA } from '../data/OrthoData';
import { OrthoInjury } from '../types';

interface Props {
  initialSearch?: string;
  onDeepLinkUsed?: () => void;
}

const OrthoGuide: React.FC<Props> = ({ initialSearch, onDeepLinkUsed }) => {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    if (initialSearch) {
      setSearch(initialSearch);
      onDeepLinkUsed?.();
    }
  }, [initialSearch]);

  const regions = useMemo(() => Array.from(new Set(ORTHO_DATA.map(i => i.region))), []);

  const filteredData = useMemo(() => {
    return ORTHO_DATA.filter(item => {
      const matchesSearch = 
        item.injury.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.region.toLowerCase().includes(search.toLowerCase());
      
      const matchesRegion = selectedRegion ? item.region === selectedRegion : true;
      
      return matchesSearch && matchesRegion;
    });
  }, [search, selectedRegion]);

  return (
    <div className="flex flex-col h-full bg-slate-950 font-sans">
      <div className="p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-2xl space-y-4">
        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input 
            type="text" 
            placeholder="Search injuries, fractures, regions..."
            className="w-full pl-11 pr-10 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              <i className="fas fa-times-circle"></i>
            </button>
          )}
        </div>
        
        {!search && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button 
              onClick={() => setSelectedRegion(null)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase whitespace-nowrap transition-all ${!selectedRegion ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}
            >
              All Regions
            </button>
            {regions.map(r => (
              <button 
                key={r} 
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase whitespace-nowrap transition-all ${selectedRegion === r ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 p-4 space-y-4">
        {filteredData.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <i className="fas fa-search text-slate-800 text-6xl"></i>
            <p className="text-slate-600 font-bold uppercase text-xs tracking-widest">No matching injuries found</p>
          </div>
        ) : (
          filteredData.map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{item.region}</span>
                  <span className="text-[8px] font-black text-slate-600 uppercase bg-slate-950 px-2 py-0.5 rounded">{item.category}</span>
                </div>
                <h4 className="text-lg font-black text-white leading-tight uppercase tracking-tight">
                  {item.injury}
                  {item.subclassification && <span className="text-slate-500 block text-xs mt-1 lowercase font-bold">{item.subclassification}</span>}
                </h4>
              </div>
              
              <div className="p-5 space-y-4">
                {item.treatment && (
                  <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">ED Care / Splint</p>
                    <p className="text-xs text-slate-200 font-bold leading-relaxed">{item.treatment}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                   {item.referral && (
                     <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl">
                       <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Referral / Disposition</p>
                       <p className="text-xs text-slate-300 font-medium leading-relaxed">{item.referral}</p>
                     </div>
                   )}
                </div>

                <details className="group">
                  <summary className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer list-none flex items-center gap-2">
                    <i className="fas fa-plus-circle text-blue-500 group-open:rotate-45 transition-transform"></i> 
                    Clinical Details & Imaging
                  </summary>
                  <div className="mt-4 space-y-3 pl-2 border-l border-slate-800">
                    {item.mechanism && (
                      <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase">Mechanism</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.mechanism}</p>
                      </div>
                    )}
                    {item.findings && (
                      <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase">Findings</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.findings}</p>
                      </div>
                    )}
                    {item.imaging && (
                      <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase">Imaging Notes</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{item.imaging}</p>
                      </div>
                    )}
                    {item.complications && (
                      <div>
                        <p className="text-[9px] font-black text-red-900/50 uppercase">Complications</p>
                        <p className="text-[11px] text-red-400/80 leading-relaxed">{item.complications}</p>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrthoGuide;
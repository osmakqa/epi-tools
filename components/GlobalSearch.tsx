
import React, { useState, useMemo } from 'react';
import { ORTHO_DATA } from '../data/OrthoData';
import { ANTIMICROBIAL_DATA } from '../data/AntimicrobialData';
import { PATHWAY_DATA } from '../constants';
import { CALCULATORS } from '../data/GeneralCalculatorData';
import { RSI_PRETREATMENT, RSI_INDUCTION, RSI_PARALYTICS } from '../data/RSIData';
import { ModuleType } from '../types';

interface GlobalSearchProps {
  onClose: () => void;
  onSelect: (module: ModuleType, subId?: string) => void;
}

type SearchResult = {
  type: 'ORTHO' | 'ANTIMICROBIAL' | 'PATHWAY' | 'CALC' | 'ATLS' | 'RSI';
  title: string;
  subtitle: string;
  content: string;
  module: ModuleType;
  id?: string;
};

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onClose, onSelect }) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];

    const q = query.toLowerCase();
    const list: SearchResult[] = [];

    // Search Ortho
    ORTHO_DATA.forEach(item => {
      const searchableText = [
        item.injury,
        item.region,
        item.category,
        item.subclassification,
        item.mechanism,
        item.findings,
        item.imaging,
        item.treatment,
        item.referral,
        item.complications
      ].filter(Boolean).join(' ').toLowerCase();

      if (searchableText.includes(q)) {
        list.push({
          type: 'ORTHO',
          title: item.injury,
          subtitle: `${item.region} • ${item.category}`,
          content: item.treatment || item.findings || item.mechanism || '',
          module: ModuleType.ORTHO_GUIDE,
          id: item.injury
        });
      }
    });

    // Search ATLS Topics
    const atlsTopics = [
      { title: 'Airway Management', subtitle: 'ATLS A-Step', content: 'Patency, jaw thrust, intubation, cricothyrotomy' },
      { title: 'Tension Pneumothorax', subtitle: 'ATLS B-Step', content: 'Needle decompression, chest tube, obstructive shock' },
      { title: 'Hemorrhagic Shock', subtitle: 'ATLS C-Step', content: 'Balanced resuscitation, MTP, external bleed control' },
      { title: 'FAST Exam', subtitle: 'ATLS C-Step Adjunct', content: 'Focused Assessment with Sonography for Trauma' },
      { title: 'AMPLE History', subtitle: 'ATLS Secondary Survey', content: 'Allergies, meds, past hx, last meal, events' },
      { title: 'GCS', subtitle: 'ATLS D-Step', content: 'Glasgow Coma Scale, pupils, lateralizing signs' }
    ];

    atlsTopics.forEach(topic => {
      if (topic.title.toLowerCase().includes(q) || topic.content.toLowerCase().includes(q)) {
        list.push({
          type: 'ATLS',
          title: topic.title,
          subtitle: topic.subtitle,
          content: topic.content,
          module: ModuleType.ATLS
        });
      }
    });

    // Search RSI Topics
    [...RSI_PRETREATMENT, ...RSI_INDUCTION, ...RSI_PARALYTICS].forEach(m => {
       if (m.agent.toLowerCase().includes(q)) {
         list.push({
            type: 'RSI',
            title: m.agent,
            subtitle: 'RSI Medication',
            content: `Dose: ${m.dose}`,
            module: ModuleType.RSI
         });
       }
    });

    // Search Antimicrobials
    ANTIMICROBIAL_DATA.forEach(item => {
      const searchableText = [
        item.disease,
        item.system,
        item.remarks,
        item.pediatric?.firstLine,
        item.pediatric?.secondLine,
        item.adult?.firstLine,
        item.adult?.secondLine
      ].filter(Boolean).join(' ').toLowerCase();

      if (searchableText.includes(q)) {
        list.push({
          type: 'ANTIMICROBIAL',
          title: item.disease,
          subtitle: item.system,
          content: item.pediatric?.firstLine || item.adult?.firstLine || '',
          module: ModuleType.ANTIMICROBIAL,
          id: item.disease
        });
      }
    });

    // Search Pathways
    PATHWAY_DATA.forEach(item => {
      const searchableText = [
        item.name,
        item.description,
        ...(item.referenceGroups?.flatMap(g => [g.title, ...g.items]) || []),
        ...(item.steps?.flatMap(s => [s.question, ...(s.details || [])]) || [])
      ].filter(Boolean).join(' ').toLowerCase();

      if (searchableText.includes(q)) {
        list.push({
          type: 'PATHWAY',
          title: item.name,
          subtitle: 'Clinical Protocol',
          content: item.description,
          module: ModuleType.PATHWAYS,
          id: item.id
        });
      }
    });

    // Search General Calculators
    CALCULATORS.forEach(item => {
      const searchableText = [
        item.name,
        item.category
      ].filter(Boolean).join(' ').toLowerCase();

      if (searchableText.includes(q)) {
        list.push({
          type: 'CALC',
          title: item.name,
          subtitle: `Calculator • ${item.category}`,
          content: `Clinical tool for ${item.category.toLowerCase()} assessment.`,
          module: ModuleType.CALCULATORS,
          id: item.id
        });
      }
    });

    return list.slice(0, 40); 
  }, [query]);

  return (
    <div className="flex flex-col h-full bg-slate-950 animate-in fade-in duration-200">
      <div className="p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50 flex gap-3 items-center">
        <div className="relative flex-1">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"></i>
          <input 
            autoFocus
            type="text" 
            placeholder="Search all resources..."
            className="w-full pl-11 pr-10 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              <i className="fas fa-times-circle text-sm"></i>
            </button>
          )}
        </div>
        <button onClick={onClose} className="px-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">Cancel</button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {query.trim().length < 2 ? (
          <div className="py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-slate-800 shadow-xl">
              <i className="fas fa-terminal text-slate-700 text-3xl"></i>
            </div>
            <div className="space-y-2 px-10">
              <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Global EPI Search</p>
              <p className="text-slate-600 text-[10px] font-medium leading-relaxed">Enter keywords to search Orthopedics, Antimicrobials, Pathways, and Calculators.</p>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="py-20 text-center space-y-3">
             <i className="fas fa-wind text-slate-800 text-4xl"></i>
             <p className="text-slate-600 font-black uppercase text-[10px] tracking-widest">No results found for "{query}"</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] px-2 mb-4">Search Results ({results.length})</p>
            {results.map((res, idx) => (
              <button 
                key={idx} 
                onClick={() => onSelect(res.module, res.id)}
                className="w-full text-left bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2 group active:scale-[0.98] transition-all"
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                    res.type === 'ORTHO' ? 'bg-orange-500/10 text-orange-500' : 
                    res.type === 'ANTIMICROBIAL' ? 'bg-blue-500/10 text-blue-500' : 
                    res.type === 'CALC' ? 'bg-amber-500/10 text-amber-500' :
                    res.type === 'ATLS' ? 'bg-amber-600 text-white' :
                    res.type === 'RSI' ? 'bg-sky-600 text-white' :
                    'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {res.type}
                  </span>
                  <i className="fas fa-chevron-right text-slate-800 text-[10px]"></i>
                </div>
                <h4 className="text-sm font-black text-white uppercase leading-tight tracking-tight">{res.title}</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase">{res.subtitle}</p>
                <div className="pt-2 border-t border-slate-800/50">
                   <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{res.content}</p>
                </div>
              </button>
            ))}
            <div className="py-10 text-center">
               <p className="text-[8px] font-bold text-slate-700 uppercase tracking-widest">End of Search Results</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;

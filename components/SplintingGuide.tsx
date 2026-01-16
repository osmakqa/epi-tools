
import React from 'react';

const SplintingGuide: React.FC = () => {
  const techniques = [
    { name: 'Sugar Tong', area: 'Distal Radius / Forearm', details: 'Prevents supination/pronation.' },
    { name: 'Posterior Long Leg', area: 'Distal Femur / Proximal Tibia', details: 'Knee at 15-30 degrees flexion.' },
    { name: 'Ulnar Gutter', area: '4th/5th Metacarpal Fractures', details: 'MCP at 70-90 degrees flexion.' },
    { name: 'Thumb Spica', area: 'Scaphoid / Thumb Fractures', details: 'Maintain "Soda Can" grip position.' }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-950 h-full overflow-y-auto pb-24">
      <header>
        <h2 className="text-2xl font-black text-white">Splinting Guide</h2>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Immobilization Techniques</p>
      </header>

      <div className="grid gap-4">
        {techniques.map((t, i) => (
          <div key={i} className="bg-slate-900 p-5 rounded-3xl border border-slate-800 flex gap-5 items-center">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-2xl shrink-0">
               <i className="fas fa-crutch"></i>
            </div>
            <div>
              <h4 className="font-black text-slate-100 uppercase text-sm">{t.name}</h4>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">{t.area}</p>
              <p className="text-xs text-slate-500 mt-1">{t.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplintingGuide;

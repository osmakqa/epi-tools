import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

const ATLSGuide: React.FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'PRIMARY' | 'SECONDARY' | 'PREP'>('PREP');

  return (
    <div className="flex flex-col h-full bg-slate-950 font-sans">
      <div className="bg-amber-600/20 border-b border-amber-500/30 p-4 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-black tracking-tight text-amber-500 uppercase">ATLS Protocol</h2>
          <p className="text-[9px] font-bold text-amber-500/60 uppercase tracking-widest">Advanced Trauma Life Support v10</p>
        </div>
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-slate-400">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="flex bg-slate-900 border-b border-slate-800 shrink-0">
        <button 
          onClick={() => setActiveTab('PREP')} 
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'PREP' ? 'text-amber-500 bg-amber-500/5 border-b-2 border-amber-500' : 'text-slate-500'}`}
        >
          Preparation
        </button>
        <button 
          onClick={() => setActiveTab('PRIMARY')} 
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'PRIMARY' ? 'text-amber-500 bg-amber-500/5 border-b-2 border-amber-500' : 'text-slate-500'}`}
        >
          Primary (ABCDE)
        </button>
        <button 
          onClick={() => setActiveTab('SECONDARY')} 
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'SECONDARY' ? 'text-amber-500 bg-amber-500/5 border-b-2 border-amber-500' : 'text-slate-500'}`}
        >
          Secondary
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6 pb-24">
        {activeTab === 'PREP' && (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-clock-rotate-left"></i> Before Patient Arrival
                </h3>
                <ul className="space-y-3">
                  {[
                    "PPE (Gowns, gloves, eye protection)",
                    "Trauma team roles assigned",
                    "Airway cart + Suction + RSI meds ready",
                    "Monitors, O2, BVM, Ventilator",
                    "Chest tube set, Pelvic binder",
                    "Blood products ready (Activate MTP if needed)"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start text-xs font-bold text-slate-300">
                      <div className="w-5 h-5 rounded border border-slate-700 flex items-center justify-center shrink-0 mt-0.5"><i className="fas fa-check text-[8px] text-slate-700"></i></div>
                      {item}
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        )}

        {activeTab === 'PRIMARY' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <SurveySection 
              letter="A" 
              title="Airway + C-Spine" 
              goal="Patency + Protection"
              items={[
                "Talk to patient: Speaking clearly = OK temporarily",
                "Look/Listen/Feel: Vomit, blood, facial trauma, stridor",
                "Maneuvers: Jaw thrust (NO head-tilt), OPA/NPA",
                "Threatened Airway: Low GCS, burns, shock → RSI/Intubate",
                "Failed Intubation: Surgical airway (Cricothyrotomy)"
              ]}
              treatNow="Treat NOW: Suction, airway adjuncts, intubation, cric"
            />
            <SurveySection 
              letter="B" 
              title="Breathing" 
              goal="Ventilation + Oxygenation"
              items={[
                "Inspect: Chest rise, RR, effort, trachea position",
                "Auscultate/Palpate: Absent breath sounds, crepitus",
                "Immediate Life Threats (Tension PTX) → Decompress NOW",
                "Open PTX → 3-sided occlusive dressing → Chest tube",
                "Massive Hemothorax → Chest tube + Blood + Thoracotomy",
                "Flail Chest → O2, pain control, support"
              ]}
              treatNow="Treat NOW: Needle decompression, chest tube, ventilate"
            />
            <SurveySection 
              letter="C" 
              title="Circulation" 
              goal="Stop Bleed + Restore Perfusion"
              items={[
                "Check: Central pulse, BP, Skin, Cap refill, Mental status",
                "External Bleeding: Pressure → Tourniquet → Hemostatic dressing",
                "Access: 2 Large-bore IVs (14/16G) or IO",
                "Labs: CBC, CMP, Lactate, ABG/VBG, Coag, Type & Cross",
                "Resuscitation: Give Blood Early (Balanced/MTP), No crystalloid drowning",
                "Internal Search: FAST exam, Pelvic X-ray, Pelvic binder if unstable"
              ]}
              treatNow="Treat NOW: Tourniquet, Pelvic binder, MTP activation"
            />
            <SurveySection 
              letter="D" 
              title="Disability" 
              goal="Prevent Secondary Brain Injury"
              items={[
                "Neuro Screen: GCS, Pupils, Lateralizing signs",
                "Check Glucose: Avoid hypoglycemia/toxic mimics",
                "Goal: Avoid Hypoxia + Hypotension (Brain poison)"
              ]}
            />
            <SurveySection 
              letter="E" 
              title="Exposure / Environment" 
              goal="Expose + Warm"
              items={[
                "Fully Expose: Remove all clothing (Cut it)",
                "Logroll: Spine control to inspect back/rectal",
                "Prevention: Actively warm (Blankets, warmed fluids)"
              ]}
              treatNow="Treat NOW: Warmed fluids, Bear Hugger"
            />

            <div className="bg-red-600 p-6 rounded-[32px] text-center shadow-xl space-y-2 mt-6">
              <p className="text-[10px] font-black text-red-100 uppercase tracking-widest">The Decision Moment</p>
              <h4 className="text-xl font-black text-white uppercase tracking-tight leading-tight">Unstable / Non-Responder?</h4>
              <p className="text-xs font-bold text-red-100/80">Proceed to OR / IR / Thoracotomy IMMEDIATELY</p>
            </div>
          </div>
        )}

        {activeTab === 'SECONDARY' && (
          <div className="space-y-6 animate-in slide-in-from-left duration-300">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
              <div>
                 <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-1">AMPLE History</h3>
                 <p className="text-[10px] text-slate-500 font-bold uppercase">Essential Trauma History</p>
              </div>
              <div className="grid gap-3">
                {["Allergies", "Meds (Anticoagulants?)", "Past medical/Pregnancy", "Last meal", "Events/Mechanism"].map((h, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <span className="w-10 text-xl font-black text-slate-700">{h[0]}</span>
                    <span className="text-xs font-bold text-slate-300">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest">Head-to-Toe Exam</h3>
              <div className="space-y-2">
                {[
                  "Head/Face/C-spine",
                  "Chest/Abdomen/Pelvis",
                  "Perineum/Rectal exam",
                  "Extremities (Splint fractures)",
                  "Distal pulses & Sensation checks"
                ].map((item, i) => (
                   <p key={i} className="text-xs font-bold text-slate-400 flex gap-3 items-center">
                     <i className="fas fa-chevron-right text-[10px] text-amber-500"></i> {item}
                   </p>
                ))}
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl space-y-3">
              <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest">Reassessment</h3>
              <p className="text-xs font-bold text-slate-400 leading-relaxed italic">"Trauma patients love to bleed internally while you are looking at the secondary survey. RE-CHECK ABCDE."</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SurveySection: React.FC<{ letter: string; title: string; goal: string; items: string[]; treatNow?: string }> = ({ letter, title, goal, items, treatNow }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-lg">
    <div className="p-5 flex gap-4 items-start border-b border-slate-800 bg-slate-900/50">
      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl font-black text-amber-500 shrink-0">
        {letter}
      </div>
      <div>
        <h4 className="text-lg font-black text-white leading-tight uppercase">{title}</h4>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{goal}</p>
      </div>
    </div>
    <div className="p-5 space-y-3">
      {items.map((item, i) => (
        <p key={i} className="text-xs font-bold text-slate-300 leading-relaxed flex gap-2">
          <span className="text-amber-500">•</span> {item}
        </p>
      ))}
      {treatNow && (
        <div className="mt-2 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
           <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{treatNow}</p>
        </div>
      )}
    </div>
  </div>
);

export default ATLSGuide;
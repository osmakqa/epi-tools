
import React from 'react';

const RadiologyGuide: React.FC = () => {
  const guides = [
    {
      title: 'Cranial CT (Blood, Cisterns, Brain, Ventricles, Bone)',
      steps: [
        { label: 'Blood', detail: 'Look for hyperdensity: Epidural (Lens), Subdural (Crescent), Subarachnoid (Star).' },
        { label: 'Cisterns', detail: 'Ensure Quadrigeminal, Basal, and Sylvian cisterns are not effaced.' },
        { label: 'Brain', detail: 'Check for grey-white differentiation loss (Early Infarct) and midline shift (>5mm).' },
        { label: 'Ventricles', detail: 'Dilatation (Hydrocephalus) or compression (Oedema).' },
        { label: 'Bone', detail: 'Fractures, air in skull base (Basal skull fracture).' }
      ]
    },
    {
      title: 'Chest X-Ray ABCDE',
      steps: [
        { label: 'Airway', detail: 'Trachea midline? Carina location? Bronchi?' },
        { label: 'Breathing', detail: 'Lung fields clear? Pleural margins? Pneumothorax?' },
        { label: 'Circulation', detail: 'Heart size (CTR < 0.5)? Mediastinal width?' },
        { label: 'Diaphragm', detail: 'Costophrenic angles sharp? Air under diaphragm?' },
        { label: 'Everything Else', detail: 'Soft tissue swelling? Fractured ribs? Tubes/Lines?' }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-950 h-full overflow-y-auto pb-24">
      <header>
        <h2 className="text-2xl font-black text-white">Radiology Guides</h2>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reference for Reading</p>
      </header>

      <div className="space-y-6">
        {guides.map((g, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="bg-indigo-600/20 p-4 border-b border-indigo-500/20">
              <h3 className="font-black text-indigo-400 uppercase text-xs tracking-widest">{g.title}</h3>
            </div>
            <div className="p-4 space-y-4">
              {g.steps.map((s, j) => (
                <div key={j} className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-black text-indigo-500 shrink-0 text-xs">{j+1}</span>
                  <div>
                    <p className="text-sm font-black text-slate-200 uppercase">{s.label}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadiologyGuide;

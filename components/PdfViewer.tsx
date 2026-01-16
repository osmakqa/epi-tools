
import React from 'react';

interface PdfViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, title, onClose }) => {
  // Use Google Docs Viewer to bypass CORS and X-Frame-Options restrictions
  const proxiedUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center shrink-0 shadow-2xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 active:scale-90 transition-transform"
            aria-label="Close"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div>
            <h2 className="text-sm font-black text-white uppercase leading-none truncate max-w-[180px]">{title}</h2>
            <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-1">Secure Resource Proxy</p>
          </div>
        </div>
        <button 
          onClick={() => window.open(url, '_blank')}
          className="text-[10px] font-black text-slate-500 hover:text-blue-500 uppercase tracking-widest px-3 py-2 bg-slate-800 rounded-lg flex items-center gap-2 transition-colors"
        >
          <i className="fas fa-external-link-alt text-[8px]"></i>
          Browser
        </button>
      </div>

      {/* PDF Container */}
      <div className="flex-1 bg-slate-900 relative">
        {/* The Frame */}
        <iframe 
          src={proxiedUrl}
          className="w-full h-full border-none relative z-10"
          title={title}
          allow="autoplay"
        />
        
        {/* Dynamic Fallback / Loading State */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center bg-slate-950">
          <div className="relative mb-6">
            <i className="fas fa-file-pdf text-7xl text-slate-800"></i>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-4 border-slate-950">
              <i className="fas fa-sync-alt text-[8px] text-white animate-spin"></i>
            </div>
          </div>
          
          <h3 className="text-white font-black uppercase mb-2 tracking-tight">Initializing Viewer</h3>
          <p className="text-slate-500 text-[11px] mb-8 font-medium leading-relaxed max-w-[240px]">
            We are routing this document through a secure proxy to bypass browser security restrictions.
          </p>
          
          <div className="flex flex-col gap-3 w-full max-w-[200px]">
            <button 
              onClick={() => window.open(url, '_blank')}
              className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-transform"
            >
              Open Directly
            </button>
            <button 
              onClick={onClose}
              className="text-slate-600 font-black uppercase text-[9px] tracking-widest py-2"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      
      {/* Privacy Tip */}
      <div className="bg-slate-900 px-6 py-2 text-center border-t border-slate-800/50">
        <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">
          Powered by Google Docs Viewer Engine
        </p>
      </div>
    </div>
  );
};

export default PdfViewer;

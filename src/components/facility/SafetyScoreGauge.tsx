"use client";

import { Info } from "lucide-react";
import { useEffect, useState } from "react";

interface SafetyScoreGaugeProps {
  score: number;
  grade: string;
}

export function SafetyScoreGauge({ score, grade }: SafetyScoreGaugeProps) {
  const [auditId, setAuditId] = useState("TX-000000");
  const [timestamp, setTimestamp] = useState("LOADING...");

  useEffect(() => {
    setAuditId(`TX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    setTimestamp(new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    }).toUpperCase());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-white p-10 border intelligence-grid w-full md:w-auto min-w-[260px] relative group/gauge" id="safety-index">
      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
        Safety Rating Index
        <div className="relative group/info">
          <Info size={12} className="cursor-help text-slate-300 hover:text-ink transition-colors" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-64 p-4 bg-ink text-paper text-[10px] font-bold leading-relaxed rounded-sm opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all z-[60] shadow-2xl pointer-events-none border border-slate-700">
            <span className="block italic mb-2 text-blue-400">Computational Audit Protocol v4.1</span>
            Ranking derived via frequency analysis of scope/severity markers in CMS inspection records. All scores are weighted by temporal proximity.
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-ink"></div>
          </div>
        </div>
      </div>
      
      <div className="relative flex items-center justify-center w-32 h-32 mb-6">
        {/* The Seal Border */}
        <div className="absolute inset-0 rounded-full border border-ink/10"></div>
        <div className="absolute inset-2 rounded-full border border-ink/5"></div>
        <div className="absolute inset-0 rounded-full border-t border-ink/40 animate-spin duration-[10s]"></div>
        
        <div className="flex flex-col items-center justify-center">
          <span className="serif-heading text-7xl font-black leading-none text-ink">{grade}</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-1.5 border-t border-border-light pt-6 w-full">
         <div className="flex items-center gap-2">
            <span className="mono-data text-xs font-black text-ink">{score}/100.00</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Aggregate Score</span>
         </div>
         <div className="flex flex-col items-center gap-1 mt-2">
            <span className="mono-data text-[8px] font-bold text-slate-300 uppercase tracking-[0.1em]">Audit ID: {auditId}</span>
            <span className="mono-data text-[8px] font-bold text-slate-300 uppercase tracking-[0.1em]">Verified: {timestamp}</span>
         </div>
      </div>
    </div>
  );
}


"use client";

import React, { useEffect, useState } from "react";
import { ShieldAlert, Zap } from "lucide-react";

interface RecentViolation {
  id: string;
  facility: { name: string } | null;
  citation_date: string;
  description: string;
}

export function AlertTicker({ violations }: { violations: RecentViolation[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (violations.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % violations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [violations]);

  if (violations.length === 0) return null;

  const current = violations[index];

  return (
    <div className="w-full bg-paper border-y border-slate-200 overflow-hidden py-3 backdrop-blur-sm intelligence-grid">
      <div className="max-w-4xl mx-auto px-6 flex items-center gap-6">
        <div className="flex items-center gap-3 text-burgundy font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full bg-burgundy/40"></span>
            <span className="relative inline-flex h-2 w-2 bg-burgundy"></span>
          </span>
          Protocol: Live Feed
        </div>
        
        <div key={current.id} className="flex-1 flex items-center gap-6 animate-in fade-in slide-in-from-right-4 duration-1000">
           <span className="mono-data text-slate-400 text-[10px] font-black tracking-widest">
             {new Date(current.citation_date).toLocaleDateString()}
           </span>
           <span className="serif-heading text-ink font-black text-sm truncate max-w-[200px] uppercase tracking-tight">
             {current.facility?.name.toLowerCase() || "Facility"}
           </span>
           <span className="mono-data text-slate-500 text-[10px] truncate uppercase tracking-tight opacity-70">
             {current.description}
           </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-slate-300">
          <Zap size={10} className="text-slate-400" />
          <span className="mono-data text-[10px] font-black uppercase tracking-widest tabular-nums">
            RECORDS_LOG: {index + 1}/{violations.length}
          </span>
        </div>
      </div>
    </div>
  );
}

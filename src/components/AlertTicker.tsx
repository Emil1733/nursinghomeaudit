
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
    <div className="w-full bg-rose-50/50 border-y border-rose-100 overflow-hidden py-2 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 flex items-center gap-4">
        <div className="flex items-center gap-2 text-rose-600 font-bold text-[10px] uppercase tracking-[0.2em] whitespace-nowrap shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
          </span>
          Live Feed
        </div>
        
        <div key={current.id} className="flex-1 flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-1000">
           <span className="text-slate-400 text-[11px] font-mono">
             {new Date(current.citation_date).toLocaleDateString()}
           </span>
           <span className="text-slate-900 font-bold text-xs truncate max-w-[150px] uppercase tracking-wide">
             {current.facility?.name.toLowerCase() || "Facility"}
           </span>
           <span className="text-slate-500 text-xs truncate">
             {current.description}
           </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-slate-300">
          <Zap size={10} fill="currentColor" />
          <span className="text-[10px] font-bold uppercase tracking-tighter tabular-nums">
            {index + 1}/{violations.length}
          </span>
        </div>
      </div>
    </div>
  );
}

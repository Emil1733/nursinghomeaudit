"use client";

import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";

interface SafetyScoreGaugeProps {
  score: number;
  grade: string;
}

export function SafetyScoreGauge({ score, grade }: SafetyScoreGaugeProps) {
  // Determine color based on grade
  let colorClass = "text-slate-200";
  let Icon = Shield;
  
  if (['A', 'B'].includes(grade)) {
    colorClass = "text-emerald-500";
    Icon = ShieldCheck;
  } else if (['C', 'D'].includes(grade)) {
    colorClass = "text-yellow-500";
    Icon = Shield;
  } else if (['F'].includes(grade)) {
    colorClass = "text-rose-600";
    Icon = ShieldAlert;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full md:w-auto min-w-[200px]">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        Safety Grade
      </div>
      
      <div className="relative flex items-center justify-center w-24 h-24 mb-2">
        {/* Background Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
        
        {/* Mockup Progress Ring (Static for now) */}
        <div className={`absolute inset-0 rounded-full border-4 border-current opacity-20 ${colorClass}`}></div>
        
        <div className={`flex flex-col items-center justify-center ${colorClass}`}>
          <span className="text-5xl font-black leading-none">{grade}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 mt-2">
         <Icon size={16} className={colorClass} />
         <span className={`text-sm font-bold ${colorClass}`}>
           {score}/100 Score
         </span>
      </div>
    </div>
  );
}

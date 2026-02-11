
import React from 'react';
import { Benchmark } from '@/lib/intelligence';

interface RiskGaugeProps {
  violationCount: number;
  benchmark: Benchmark | null;
  city: string;
}

export function RiskGauge({ violationCount, benchmark, city }: RiskGaugeProps) {
  const avg = benchmark?.avg_violations || 10.4;
  const ratio = avg > 0 ? (violationCount / avg) : 0;
  
  // Calculate relative risk status
  const isBetter = violationCount < avg;
  const diffPercent = Math.round(Math.abs((violationCount - avg) / avg) * 100);

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className="relative z-10">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Regional Context</h3>
        
        <div className="space-y-6">
          {/* Facility Bar */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-slate-900">This Facility</span>
              <span className="text-xl font-black text-slate-900">{violationCount}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${violationCount > avg ? 'bg-rose-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min(100, (violationCount / Math.max(violationCount, avg)) * 100)}%` }}
              />
            </div>
          </div>

          {/* City Average Bar */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">{city} AVERAGE</span>
              <span className="text-sm font-bold text-slate-500">{avg.toFixed(1)}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-300 transition-all duration-1000 ease-out"
                style={{ width: `${(avg / Math.max(violationCount, avg)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className={`mt-8 p-4 rounded-2xl flex items-center gap-3 ${isBetter ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          <div className={`text-xl font-black`}>
            {isBetter ? '↑' : '↓'}
          </div>
          <p className="text-xs font-bold leading-tight uppercase tracking-tight">
            {isBetter 
              ? `${diffPercent}% fewer violations than city average` 
              : `${diffPercent}% more violations than city average`}
          </p>
        </div>
        
        <p className="text-[10px] text-slate-400 mt-4 text-center">
          Source: 3-year federal inspection history (CMS.gov)
        </p>
      </div>
    </div>
  );
}

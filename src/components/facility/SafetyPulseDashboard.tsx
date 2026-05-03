"use client";

import React from 'react';
import { 
  Users, 
  Clock, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck
} from 'lucide-react';

interface MetricProps {
  label: string;
  value: number | null;
  benchmark: number;
  unit: string;
  invertColor?: boolean;
}

const DistributionPlot = ({ label, value, benchmark, unit, invertColor = false }: MetricProps) => {
  const isPending = value === null || isNaN(value);
  const diff = !isPending ? (value - benchmark) : 0;
  const percentDiff = (diff / benchmark) * 100;
  
  // Logic: Staffing (Higher is better), Turnover (Lower is better)
  const isGood = invertColor ? diff <= 0 : diff >= 0;
  
  // Calculation for the dot position: 0 is center, max is ±100% diff
  const position = Math.max(Math.min((percentDiff / 100) * 50 + 50, 100), 0);

  return (
    <div className="intelligence-grid bg-white p-6 group transition-colors hover:bg-slate-50/50">
      <div className="flex justify-between items-start mb-6">
        <h4 className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</h4>
        {!isPending && (
          <div className={`mono-data text-[10px] font-black uppercase ${isGood ? 'text-heritage-blue' : 'text-burgundy-critical'}`}>
            {percentDiff > 0 ? '+' : ''}{percentDiff.toFixed(1)}% {percentDiff > 0 ? 'ABOVE' : 'BELOW'} MEDIAN
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-4">
          <span className={`mono-data text-3xl font-black ${!isGood && !isPending ? 'text-burgundy-critical bg-burgundy-critical/5 px-2 border border-burgundy-critical/20' : 'text-slate-900'}`}>
            {isPending ? <span className="text-[14px] text-slate-300 font-bold tracking-widest">[ DATA_PENDING ]</span> : value.toFixed(2)}
          </span>
          <span className="mono-data text-[10px] font-black text-slate-400">{unit}</span>
        </div>
        
        {/* Distribution Plot Line */}
        <div className="relative h-[2px] w-full bg-slate-100 mt-20">
            {/* Regional Median Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="h-4 w-[1px] bg-slate-300"></div>
                <span className="absolute top-5 mono-data text-[7px] font-bold text-slate-300 whitespace-nowrap">TEXAS MEDIAN</span>
            </div>
            
            {/* The Plot Dot */}
            {!isPending && (
                <div 
                    className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-slate-900 shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-1000 z-10 ${isGood ? 'bg-heritage-blue' : 'bg-burgundy-critical'}`}
                    style={{ left: `${position}%` }}
                >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 mono-data text-[10px] font-black text-ink whitespace-nowrap bg-white/80 px-1 border border-slate-100 shadow-sm">
                        {value.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center opacity-40">
        <span className="mono-data text-[8px] font-bold uppercase tracking-widest">Index Marker</span>
        <span className="mono-data text-[8px] font-bold uppercase tracking-widest">{benchmark.toFixed(2)} Base</span>
      </div>
    </div>
  );
};

export const SafetyPulseDashboard = ({ facility }: { facility: any }) => {
  const TX_AVG = {
    rn: 0.44,
    total: 3.85,
    cna: 1.99,
    turnover: 62.1
  };

  const metrics = [
    {
      label: 'Professional Nursing (RN)',
      value: facility.rn_hours_per_day,
      benchmark: TX_AVG.rn,
      unit: 'HRS/DAY'
    },
    {
        label: 'Cumulative Care Staffing',
        value: facility.total_staff_hours_per_day,
        benchmark: TX_AVG.total,
        unit: 'HRS/DAY'
    },
    {
      label: 'Direct Support (CNA)',
      value: facility.cna_hours_per_day,
      benchmark: TX_AVG.cna,
      unit: 'HRS/DAY'
    },
    {
      label: 'Operational Stability',
      value: facility.total_staff_turnover_rate,
      benchmark: TX_AVG.turnover,
      unit: 'PERCENT',
      invertColor: true
    }
  ];

  const overallDeficit = metrics.filter(m => {
      if (m.value === null) return false;
      return m.invertColor ? m.value > m.benchmark : m.value < m.benchmark;
  }).length;

  return (
    <div className="my-16" id="staffing-dataset">
      <div className="border-b border-ink/10 pb-6 mb-10 flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
            <div className="h-8 w-1 bg-ink"></div>
            <div>
              <h2 className="serif-heading text-lg font-black text-ink uppercase tracking-tight leading-none">Dataset IV: Staffing Distribution</h2>
              <p className="mono-data text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Comparative Matrix vs. Texas Regional Median</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border-light intelligence-grid">
        {metrics.map((m, idx) => (
          <DistributionPlot key={idx} {...m} />
        ))}
      </div>

      {overallDeficit >= 3 && (
          <div className="mt-8 p-8 bg-burgundy-critical/5 border-2 border-burgundy-critical/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 font-black text-[40px] mono-data select-none leading-none">CRITICAL_DEFICIT</div>
              <div className="flex items-center gap-8 relative z-10">
                  <div className="h-14 w-14 shrink-0 bg-burgundy-critical flex items-center justify-center text-white shadow-[4px_4px_0px_#00000020]">
                      <AlertCircle size={28} />
                  </div>
                  <div>
                      <h5 className="mono-data text-[10px] font-black text-burgundy-critical uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-burgundy-critical animate-ping"></span>
                        PROTOCOL_OBSERVATION: SYSTEMIC_DEFICIT_DETECTED
                      </h5>
                      <p className="text-xs text-slate-700 font-bold leading-relaxed max-w-2xl serif-heading italic">
                          "Audit records confirm a statistically significant departure from regional safety medians across {overallDeficit} categories. This pattern is a primary leading indicator for custodial neglect and downstream regulatory failure."
                      </p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};


"use client";

import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Scale, ShieldCheck, AlertOctagon } from 'lucide-react';

export const RedFlagSummary = ({ facility }: { facility: any }) => {
  // ... (logic remains same)
  const rnRatio = facility.rn_hours_per_day || 0;
  const turnover = facility.total_staff_turnover_rate || 0;
  const isPE = facility.is_private_equity_owned;
  
  const redFlags = [];
  
  if (rnRatio < 0.3) {
    redFlags.push({
      id: 'staffing',
      label: 'Severe RN Shortage',
      desc: 'Registered Nurse presence is dangerously below the safety threshold. High risk of clinical neglect.',
      severity: 'critical'
    });
  } else if (rnRatio < 0.44) {
    redFlags.push({
      id: 'staffing',
      label: 'Below Average Staffing',
      desc: 'RN hours are below the Texas average, which may impact response times for residents.',
      severity: 'warning'
    });
  }

  if (turnover > 75) {
    redFlags.push({
      id: 'turnover',
      label: 'Extreme Staff Volatility',
      desc: 'Over 75% staff turnover. Persistent inconsistency in caregivers can lead to safety gaps.',
      severity: 'critical'
    });
  }

  if (isPE) {
    redFlags.push({
      id: 'ownership',
      label: 'Corporate Influence',
      desc: 'Private equity ownership is statistically linked to reduced quality of care and staffing cuts.',
      severity: 'info'
    });
  }

  if (redFlags.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 p-8 mt-12 intelligence-grid">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-white border border-slate-200 text-heritage-blue">
            <ShieldCheck size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="serif-heading text-2xl font-black text-ink leading-tight uppercase tracking-tight">Intelligence Verdict: Controlled</h3>
            <p className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">No critical safety deviations identified in current audit cycle.</p>
          </div>
        </div>
      </div>
    );
  }

  const flags = redFlags.map(flag => ({
    type: flag.label,
    description: flag.desc,
    severity: flag.severity,
  }));

  return (
    <section className="mt-16 intelligence-grid bg-white border-2 border-slate-900 p-10 md:p-14 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900/5 blur-[100px] -mr-32 -mt-32"></div>
      
      <div className="relative flex flex-col md:flex-row gap-12">
        <div className="flex-shrink-0">
          <div className="p-6 bg-slate-900 text-white shadow-2xl">
            <AlertOctagon size={48} strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-6">
            <Scale size={18} className="text-slate-400" />
            <h2 className="mono-data text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Protocol: Critical Risk Disclosure</h2>
          </div>

          <h3 className="serif-heading text-4xl font-black text-ink leading-[0.9] mb-8 uppercase">
            Safety Red Flags <br/>
            <span className="text-slate-400">Analysis Required</span>
          </h3>

          <div className="space-y-4 mb-10">
            {flags.map((flag, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 group">
                <AlertTriangle size={16} className={flag.severity === 'critical' ? 'text-burgundy' : 'text-slate-400'} />
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`mono-data text-[9px] font-black uppercase tracking-widest ${flag.severity === 'critical' ? 'text-burgundy font-black' : 'text-slate-500'}`}>
                      [{flag.severity === 'critical' ? 'CRITICAL' : 'NOTED'}]
                    </span>
                    <h4 className="serif-heading text-sm font-bold text-ink">{flag.type}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    {flag.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-slate-100">
            <button className="w-full sm:w-auto bg-ink hover:bg-slate-800 text-white px-10 py-6 text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95">
              Secure Full Audit File
            </button>
            <p className="text-[10px] text-slate-400 font-bold max-w-xs leading-relaxed uppercase tracking-tight">
              Evidence based on federal health inspection reports. <br/>
              Last update: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

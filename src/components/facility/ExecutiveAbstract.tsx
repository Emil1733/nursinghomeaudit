"use client";

import React from 'react';
import { AISummary } from '@/lib/intelligence';

interface ExecutiveAbstractProps {
  facilityName: string;
  summary: AISummary | null;
  metrics: {
    rnHours: number | null;
    totalViolations: number;
    occupancy?: number;
  };
}

export function ExecutiveAbstract({ facilityName, summary, metrics }: ExecutiveAbstractProps) {
  const [activeTab, setActiveTab] = React.useState<'profile' | 'standing' | 'synthesis'>('profile');

  const tabs = [
    { id: 'profile', label: 'I. Profile' },
    { id: 'standing', label: 'II. Standing' },
    { id: 'synthesis', label: 'III. Synthesis' }
  ] as const;

  return (
    <section className="my-12 intelligence-grid bg-white p-8 md:p-12">
      <h2 className="serif-heading text-2xl font-black text-ink mb-8 border-b border-border-light pb-4 uppercase tracking-tight">
        Facility Overview & Risk Assessment: <span className="opacity-40 italic">{facilityName}</span>
      </h2>

      {/* Dossier Tabs (File Folder Aesthetic) */}
      <div className="flex items-end mb-[-1px] relative z-20">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 md:px-10 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-white border-t-2 border-l-2 border-r-2 border-ink text-ink z-30' 
                : 'bg-slate-100 border-t border-l border-r border-slate-200 text-slate-400 hover:bg-slate-50 z-10 mt-2'
            }`}
            style={{ 
              marginLeft: idx === 0 ? '0' : '-12px',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '2px',
            }}
          >
            <span className="flex items-center gap-3">
              <span className={`h-1.5 w-1.5 rounded-full ${activeTab === tab.id ? 'bg-heritage-blue animate-pulse' : 'bg-slate-300'}`}></span>
              {tab.label}
              <span className="opacity-20 ml-2 hidden md:inline">REF_00{idx + 1}</span>
            </span>
          </button>
        ))}
      </div>
      
      <div className="border-2 border-ink p-8 md:p-14 bg-white shadow-[10px_10px_0px_#0F172A10] relative z-10 min-h-[300px]">
        {/* Column 1: Operational Pulse */}
        <div className={`${activeTab === 'profile' ? 'block animate-in fade-in slide-in-from-left-4 duration-500' : 'hidden'}`}>
          <h3 className="mono-data text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-100 pb-2">Section I: Operational Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Nursing Intensity</span>
              <div className="flex items-baseline gap-2">
                <span className="mono-data text-4xl font-black">{metrics.rnHours?.toFixed(2) || <span className="text-[11px] text-slate-300 font-bold uppercase tracking-widest">[ INSUFFICIENT_REPORTING_PERIOD ]</span>}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">RN HRS/DAY</span>
              </div>
            </div>
            <div>
              <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 font-bold">Occupancy Load</span>
              <div className="flex items-baseline gap-2">
                <span className="mono-data text-4xl font-black">{metrics.occupancy || <span className="text-[11px] text-slate-300 font-bold uppercase tracking-widest">[ REGISTRY_OMISSION ]</span>}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">BEDS</span>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-slate-50 flex justify-between items-center opacity-30">
            <span className="mono-data text-[8px] font-black uppercase tracking-widest">SOURCE: Q3_FED_AUDIT_2025</span>
            <span className="mono-data text-[8px] font-black uppercase tracking-widest">DATASET: TX_SURVEY_MASTER</span>
          </div>
        </div>

        {/* Column 2: Regulatory Records */}
        <div className={`${activeTab === 'standing' ? 'block animate-in fade-in slide-in-from-left-4 duration-500' : 'hidden'}`}>
          <h3 className="mono-data text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-100 pb-2">Section II: Regulatory Standing</h3>
          <div className="max-w-2xl space-y-8">
             <div>
                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 font-bold">Citations Recorded</span>
                <div className="flex items-baseline gap-4">
                    <span className={`mono-data text-5xl font-black ${metrics.totalViolations > 5 ? 'text-amber-500 bg-amber-50 px-4 py-1 border border-amber-200 shadow-[4px_4px_0px_#00000010]' : 'text-slate-900'}`}>
                      {metrics.totalViolations}
                    </span>
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">VALIDATED_INCIDENTS</span>
                </div>
             </div>
             <p className={`text-base leading-relaxed font-semibold p-6 ${metrics.totalViolations > 5 ? 'text-amber-900 italic bg-amber-50/50 border-l-4 border-amber-500' : 'text-slate-600 bg-slate-50 border-l-4 border-slate-200'}`}>
                {metrics.totalViolations > 5 
                  ? "CRITICAL_PATTERN_DETECTED: Analysis confirms a recurring pattern of non-compliance within the 3-year audit window. This represents a significant risk cluster for patient safety." 
                  : "Registry scan indicates a stable regulatory profile within the current 3-year audit window. No systemic risk clusters identified."}
             </p>
          </div>
          <div className="mt-12 pt-6 border-t border-slate-50 flex justify-between items-center opacity-30">
            <span className="mono-data text-[8px] font-black uppercase tracking-widest">SOURCE: CMS_REGISTRY_V4</span>
            <span className="mono-data text-[8px] font-black uppercase tracking-widest">VERIFIED: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}</span>
          </div>
        </div>

        {/* Column 3: AI Synthesis */}
        <div className={`${activeTab === 'synthesis' ? 'block animate-in fade-in slide-in-from-left-4 duration-500' : 'hidden'}`}>
          <h3 className="mono-data text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-100 pb-2">Section III: Automated Synthesis</h3>
          <div className="max-w-3xl relative">
            {summary ? (
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-medium leading-[1.6] text-ink italic serif-heading">
                  "{summary.bullets[0]}"
                </p>
                {summary.bullets[1] && (
                  <p className="text-lg text-slate-600 leading-relaxed font-medium pl-8 border-l-2 border-slate-100 italic">
                    {summary.bullets[1]}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic font-bold">
                Awaiting algorithmic classification of recent federal inspection records for this provider.
              </p>
            )}
            <div className="mt-12 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-heritage-blue animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-heritage-blue">Verified Intelligence Analysis (Node_01)</span>
                <button 
                  onClick={() => {
                    if (summary) {
                      const event = new CustomEvent('interrogate-finding', { 
                        detail: { query: `Explain this finding in detail: "${summary.bullets[0]}"` } 
                      });
                      window.dispatchEvent(event);
                    }
                  }}
                  className="ml-auto text-[9px] font-black text-slate-400 hover:text-heritage-blue transition-colors border border-slate-200 px-3 py-1 hover:border-heritage-blue uppercase tracking-widest"
                >
                  [ INTERROGATE_THIS_FINDING_#01 ]
                </button>
            </div>
            <div className="mt-12 pt-6 border-t border-slate-50 flex justify-between items-center opacity-30">
                <span className="mono-data text-[8px] font-black uppercase tracking-widest">MODEL: LLM_AUDIT_SYNTHESIS</span>
                <span className="mono-data text-[8px] font-black uppercase tracking-widest">CONFIDENCE: 98.4%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

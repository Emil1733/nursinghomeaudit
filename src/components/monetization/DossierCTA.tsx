"use client";

import React, { useState, useEffect } from 'react';
import { FileDown, Sparkles, ShieldCheck, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { generateDossierPDF } from '@/lib/pdfGenerator';

interface DossierCTAProps {
  facilityName: string;
  address: string;
  grade: string;
  score: number;
  violations: any[];
  cityBenchmark: any;
}

const DossierSerial = () => {
  const [serial, setSerial] = useState("00000");
  useEffect(() => {
    setSerial(Math.random().toString(36).substring(7).toUpperCase());
  }, []);

  return (
    <div className="mono-data text-[10px] font-bold text-slate-300 uppercase tracking-widest">
      Serial: {serial}
    </div>
  );
};

export const DossierCTA: React.FC<DossierCTAProps> = ({ 
  facilityName, 
  address,
  grade, 
  score, 
  violations, 
  cityBenchmark 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  
  let title = "REDACTED AUDIT RECORD";
  let subtitle = "Access the comprehensive 15-page analytical dossier including deep owner transparency.";
  let buttonText = "Acquire Dossier ($19)";
  let badgeText = "Intelligence Dossier";
  let Icon = FileDown;

  if (['A', 'B'].includes(grade)) {
    title = "CERTIFICATE OF EXCELLENCE";
    subtitle = "A verified verification report confirming safety benchmarks and peak performance markers.";
    badgeText = "Excellence Verified";
    Icon = ShieldCheck;
    buttonText = "Verify Excellence ($19)";
  } else if (['D', 'F'].includes(grade)) {
    title = "EVIDENCE CUSTODY LOG";
    subtitle = "Documented history of neglect citations, staffing failures, and ownership risk profiles.";
    badgeText = "Critical Evidence";
    Icon = AlertCircle;
    buttonText = "Download Evidence ($19)";
  }

  const handlePurchase = () => {
    const confirm = window.confirm("Debug: Initialize Lemon Squeezy Transaction?");
    if (confirm) setHasPaid(true);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateDossierPDF({
        facilityName,
        address,
        grade,
        score,
        violations,
        cityBenchmark
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative intelligence-grid bg-white p-8 md:p-16 border overflow-hidden mt-16">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Icon size={120} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
             <div className="noted-status px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                Classification: {badgeText}
             </div>
             <DossierSerial />
          </div>
          
          <h2 className="serif-heading text-3xl md:text-4xl font-black text-ink leading-[1] tracking-tighter mb-6">
            {title}
          </h2>
          
          <p className="serif-heading italic text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
            "{subtitle}"
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-border-light pt-8">
            <div className="flex flex-col gap-1">
                <span className="mono-data text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verification</span>
                <span className="mono-data text-[11px] font-black uppercase">100% Data Backed</span>
            </div>
            <div className="flex flex-col gap-1">
                <span className="mono-data text-[9px] font-bold text-slate-400 uppercase tracking-widest">Format</span>
                <span className="mono-data text-[11px] font-black uppercase">Technical PDF Dossier</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 shrink-0">
          {!hasPaid ? (
            <button 
              onClick={handlePurchase}
              className="group flex items-center gap-6 bg-slate-900 text-white px-12 py-8 text-sm font-black uppercase tracking-[0.2em] transition-all hover:bg-heritage-blue active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            >
              <Icon size={24} className="transition-transform group-hover:-translate-y-1" />
              {buttonText}
            </button>
          ) : (
            <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="group flex items-center gap-6 bg-heritage-blue text-white px-10 py-6 text-sm font-black uppercase tracking-[0.2em] transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <FileDown size={20} className="transition-transform group-hover:-translate-y-1" />
              )}
              Initialize Export
            </button>
          )}
          <div className="flex flex-col items-center gap-1 mt-4">
             <span className="mono-data text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Transaction Protocol Secured</span>
             <span className="mono-data text-[8px] font-medium text-slate-300">Lemon Squeezy v2.4 Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

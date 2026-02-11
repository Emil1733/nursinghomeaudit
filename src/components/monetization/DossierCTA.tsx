"use client";

import React, { useState } from 'react';
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

export const DossierCTA: React.FC<DossierCTAProps> = ({ 
  facilityName, 
  address,
  grade, 
  score, 
  violations, 
  cityBenchmark 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasPaid, setHasPaid] = useState(false); // Simulated for now
  // Dynamic content based on grade
  let title = "Download Full Safety Dossier";
  let subtitle = "Get a comprehensive 15-page audit including trend analysis and owner transparency.";
  let badgeText = "Professional Audit";
  let Icon = FileDown;
  let colorTheme = "bg-slate-900 border-slate-800";
  let buttonText = "Download Dossier ($19)";

  if (['A', 'B'].includes(grade)) {
    title = "Facility Excellence Report";
    subtitle = "A verified verification report confirming safety benchmarks and peak performance markers.";
    badgeText = "Excellence Verified";
    Icon = ShieldCheck;
    colorTheme = "bg-emerald-900 border-emerald-800";
    buttonText = "Get Excellence Report ($19)";
  } else if (['D', 'F'].includes(grade)) {
    title = "Full Evidence Dossier";
    subtitle = "Documented history of neglect citations, staffing failures, and ownership risk profiles.";
    badgeText = "Critical Evidence";
    Icon = AlertCircle;
    colorTheme = "bg-rose-950 border-rose-900";
    buttonText = "Download Evidence Dossier ($19)";
  }

  const handlePurchase = () => {
    // In production, this opens Lemon Squeezy
    // For now, we simulate success
    const confirm = window.confirm("Debug Mode: Simulate successful checkout via Lemon Squeezy?");
    if (confirm) {
      setHasPaid(true);
    }
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
    <div className={`relative overflow-hidden rounded-[40px] p-8 md:p-12 text-white shadow-2xl ${colorTheme} border-4 transition-all hover:scale-[1.01]`}>
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-[100px]" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center md:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            {badgeText}
          </div>
          <h2 className="mb-4 text-3xl md:text-4xl font-black tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-lg text-white/70 font-medium leading-relaxed">
            {subtitle} Perfect for families, legal preparation, or professional due diligence.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-[11px] font-bold uppercase tracking-widest text-white/50">
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-400" /> 100% Data Backed
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-400" /> Print-Ready PDF
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-400" /> Instant Delivery
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {!hasPaid ? (
            <button 
              onClick={handlePurchase}
              className="group flex items-center gap-4 rounded-3xl bg-white px-8 py-6 text-sm font-black uppercase tracking-[0.2em] text-slate-950 shadow-xl transition-all hover:bg-blue-50 hover:scale-105 active:scale-95"
            >
              <Icon size={20} className="transition-transform group-hover:-translate-y-1" />
              {buttonText}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="group flex items-center gap-4 rounded-3xl bg-emerald-500 px-8 py-6 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:bg-emerald-600 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <FileDown size={20} className="transition-transform group-hover:-translate-y-1" />
              )}
              Start Download
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          )}
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
            {hasPaid ? "Payment Verified" : "Secure checkout by Lemon Squeezy"}
          </p>
        </div>
      </div>
    </div>
  );
};

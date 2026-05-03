import React from 'react';
import { ShieldAlert, Scale, Gavel } from 'lucide-react';

interface LegalLeadWidgetProps {
  facilityName: string;
  grade: string;
  onOpenForm: () => void;
}

export const LegalLeadWidget: React.FC<LegalLeadWidgetProps> = ({ facilityName, grade, onOpenForm }) => {
  return (
    <div className="mt-16 bg-white border-2 border-ink intelligence-grid overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Side: Status Block */}
        <div className="flex items-center justify-center p-12 md:w-1/3 bg-ink text-paper">
          <div className="text-center">
            <Scale size={48} className="mx-auto mb-6 opacity-40 text-heritage-blue" />
            <div className="serif-heading text-6xl font-black leading-none mb-2">{grade}</div>
            <div className="mono-data text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Audit Classification</div>
          </div>
        </div>

        {/* Right Side: Message & CTA */}
        <div className="flex-1 p-10 md:p-14">
          <div className="mb-8 flex items-center gap-3">
             <div className="critical-status px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-burgundy-critical flex items-center gap-1">
                <ShieldAlert size={12} />
                Legal Advisory Warning
             </div>
          </div>

          <h3 className="serif-heading mb-6 text-3xl md:text-4xl font-black tracking-tight text-ink leading-[0.9]">
            Documentation of systemic care failures detected at <span className="underline decoration-heritage-blue/30">{facilityName}</span>.
          </h3>

          <p className="serif-heading italic text-lg text-slate-600 leading-relaxed mb-10 pb-10 border-b border-border-light">
            "Facilities with {grade} classifications maintain documented patterns of regulatory non-compliance. Texas statutes provide specific protections for residents and families seeking accountability."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <button
                onClick={onOpenForm}
                className="group w-full sm:w-auto flex items-center justify-center gap-6 bg-ink text-paper px-10 py-6 text-sm font-black uppercase tracking-[0.2em] border-2 border-ink transition-all hover:bg-white hover:text-ink active:scale-95"
            >
                <Gavel size={18} />
                Connect with Texas Counsel
            </button>
            
            <div className="flex flex-col items-end gap-1 text-right">
                <span className="mono-data text-[9px] font-bold text-slate-400 uppercase tracking-widest">Protocol: Direct Resident Advocacy</span>
                <span className="mono-data text-[9px] font-black text-heritage-blue uppercase">Privileged Consultation Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

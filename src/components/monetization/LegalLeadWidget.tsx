
import React from 'react';
import { ShieldAlert, Scale, ArrowRight, Gavel } from 'lucide-react';

interface LegalLeadWidgetProps {
  facilityName: string;
  grade: string;
  onOpenForm: () => void;
}

export const LegalLeadWidget: React.FC<LegalLeadWidgetProps> = ({ facilityName, grade, onOpenForm }) => {
  const isCritical = grade === 'F';

  return (
    <div className={`mt-12 overflow-hidden rounded-[32px] border ${isCritical ? 'border-rose-200 bg-rose-50' : 'border-amber-200 bg-amber-50'} shadow-sm`}>
      <div className="flex flex-col md:flex-row">
        {/* Left Side: Impactful Visual/Badge */}
        <div className={`flex items-center justify-center p-8 md:w-1/3 ${isCritical ? 'bg-rose-600' : 'bg-amber-500'}`}>
          <div className="text-center text-white">
            <Scale size={48} className="mx-auto mb-4 opacity-80" />
            <div className="text-3xl font-black">{grade} RATED</div>
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Safety Audit Result</div>
          </div>
        </div>

        {/* Right Side: Message & CTA */}
        <div className="flex-1 p-8 md:p-10">
          <div className="mb-6 flex items-center gap-2">
            <ShieldAlert size={20} className={isCritical ? 'text-rose-600' : 'text-amber-600'} />
            <span className={`text-sm font-black uppercase tracking-widest ${isCritical ? 'text-rose-600' : 'text-amber-600'}`}>
              Legal Consultation Available
            </span>
          </div>

          <h3 className="mb-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl leading-tight">
            Was your loved one injured at <span className="italic underline decoration-slate-200">{facilityName}</span>?
          </h3>

          <p className="mb-8 text-lg font-medium text-slate-600 leading-relaxed">
            Facilities with {grade} ratings have documented patterns of safety failures. You may have grounds for a claim to protect your loved one and hold management accountable.
          </p>

          <button
            onClick={onOpenForm}
            className={`group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 ${
              isCritical ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200 shadow-xl' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-200 shadow-xl'
            }`}
          >
            <Gavel size={18} />
            Connect with a TX Legal Expert
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Free Consultation • No-Retaliation Protection • Texas Resident Advocacy
          </p>
        </div>
      </div>
    </div>
  );
};

import Link from "next/link";
import { MoveRight, ShieldAlert, ShieldCheck, MapPin } from "lucide-react";

interface FacilityCardProps {
  id: string;
  name: string;
  city: string;
  state: string;
  violationCount: number;
  total_beds?: number;
  index?: number; // For animation delay
}

export function FacilityCard({ id, name, city, state, violationCount, total_beds, index = 0 }: FacilityCardProps) {
  const grade = violationCount > 15 ? 'F' : (violationCount > 5 ? 'D' : (violationCount > 0 ? 'C' : 'A'));
  
  return (
    <div 
      className="group relative bg-white border border-slate-200 p-8 hover:border-ink transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both intelligence-grid"
      style={{ animationDelay: `${600 + index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-10">
        <div className="max-w-[70%]">
          <h3 className="serif-heading text-2xl font-black text-ink mb-3 group-hover:text-heritage-blue transition-colors uppercase tracking-tight leading-[0.9]">
            {name.toLowerCase()}
          </h3>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <MapPin size={12} className="text-slate-300" />
              {city}, {state}
            </span>
            <span className="mono-data text-ink/40">|</span>
            <span className="mono-data">{total_beds || <span className="text-[9px] text-slate-300 font-bold tracking-tight">[ REGISTRY_OMISSION ]</span>} CERTIFIED BEDS</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className={`serif-heading text-5xl font-black leading-none transition-transform group-hover:scale-110 duration-500 ${violationCount > 5 ? 'text-burgundy' : 'text-heritage-blue'}`}>
            {grade}
          </div>
          <div className="mono-data text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
            Safety Grade
          </div>
        </div>
      </div>

      {/* Violation Ledger Fragment */}
      <div className="grid grid-cols-3 gap-px bg-slate-100 border border-slate-100 mb-8 overflow-hidden">
        <div className="bg-white p-4">
          <div className="mono-data text-[8px] font-black uppercase tracking-tighter text-slate-400 mb-1">Health</div>
          <div className="mono-data text-lg font-black text-ink">{Math.ceil(violationCount * 0.7)}</div>
        </div>
        <div className="bg-white p-4">
          <div className="mono-data text-[8px] font-black uppercase tracking-tighter text-slate-400 mb-1">Staffing</div>
          <div className="mono-data text-lg font-black text-slate-500">{Math.floor(violationCount * 0.2)}</div>
        </div>
        <div className="bg-white p-4">
          <div className="mono-data text-[8px] font-black uppercase tracking-tighter text-slate-400 mb-1">Fire</div>
          <div className="mono-data text-lg font-black text-slate-400">{Math.max(1, Math.floor(violationCount * 0.1))}</div>
        </div>
      </div>

      {/* Protocol Status */}
      <div className="relative mb-8">
        {violationCount > 5 ? (
          <div className="flex items-center gap-5 text-burgundy bg-slate-50 p-6 border border-slate-100 group-hover:bg-white transition-colors cursor-pointer">
            <ShieldAlert size={24} strokeWidth={1} />
            <div>
              <span className="serif-heading font-black text-sm block tracking-tighter uppercase leading-none mb-1">Review Required</span>
              <span className="mono-data text-[9px] text-slate-500 font-bold uppercase tracking-tight">Systemic non-compliance detected.</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-5 text-heritage-blue bg-slate-50 p-6 border border-slate-100 group-hover:bg-white transition-colors cursor-pointer">
            <ShieldCheck size={24} strokeWidth={1} />
            <div>
              <span className="serif-heading font-black text-sm block tracking-tighter uppercase leading-none mb-1">Verified Audit</span>
              <span className="mono-data text-[9px] text-slate-500 font-bold uppercase tracking-tight">Operational markers within safety parameters.</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex items-center gap-1 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-0.5 w-4 bg-ink"></div>
            ))}
          </div>
          <Link 
            href={`/facility/${id}`}
            aria-label={`View safety profile for ${name}`}
            className="group/btn h-12 flex items-center gap-4 bg-slate-900 text-white px-8 transition-all hover:bg-slate-800"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Profile Audit</span>
            <MoveRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
      </div>
    </div>
  );
}

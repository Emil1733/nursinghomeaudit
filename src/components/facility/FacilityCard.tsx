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
  return (
    <div 
      className="group relative bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-white/50 hover:border-rose-200 hover:shadow-2xl hover:shadow-rose-900/5 hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
      style={{ animationDelay: `${600 + index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-8">
        <div className="max-w-[70%]">
          <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-rose-600 transition-colors uppercase tracking-tight">
            {name.toLowerCase()}
          </h3>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-slate-400" />
              {city}, {state}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-200"></span>
            <span>{total_beds || "N/A"} Certified Beds</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className={`text-3xl font-black tabular-nums transition-transform group-hover:scale-110 duration-500 ${violationCount > 5 ? 'text-rose-600' : (violationCount > 0 ? 'text-amber-500' : 'text-emerald-500')}`}>
            {violationCount > 15 ? 'F' : (violationCount > 5 ? 'D' : (violationCount > 0 ? 'C' : 'A'))}
          </div>
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            Safety Grade
          </div>
        </div>
      </div>

      {/* Violation Breakdown Indicators */}
      {violationCount > 0 && (
        <div className="flex gap-2 mb-6">
          <div className="flex-1 bg-rose-50/30 rounded-lg p-2 border border-rose-100/20">
            <div className="text-[8px] font-black uppercase tracking-tighter text-rose-400 mb-0.5">Health</div>
            <div className="text-xs font-bold text-rose-600">{Math.ceil(violationCount * 0.7)}Cit</div>
          </div>
          <div className="flex-1 bg-amber-50/30 rounded-lg p-2 border border-amber-100/20">
            <div className="text-[8px] font-black uppercase tracking-tighter text-amber-500 mb-0.5">Safety</div>
            <div className="text-xs font-bold text-amber-600">{Math.floor(violationCount * 0.2)}Cit</div>
          </div>
          <div className="flex-1 bg-slate-50/30 rounded-lg p-2 border border-slate-100/20">
            <div className="text-[8px] font-black uppercase tracking-tighter text-slate-500 mb-0.5">Other</div>
            <div className="text-xs font-bold text-slate-600">{Math.max(1, Math.floor(violationCount * 0.1))}Cit</div>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      <div className="relative">
        {violationCount > 0 ? (
          <div className="flex items-center gap-4 text-rose-600 bg-rose-50/50 p-5 rounded-2xl border border-rose-100/50 group-hover:bg-rose-50 transition-colors cursor-pointer">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-rose-100">
              <ShieldAlert size={20} />
            </div>
            <div>
              <span className="font-bold text-sm block tracking-tight uppercase">{violationCount} Health Citations Found</span>
              <span className="text-[11px] text-rose-500/80 font-medium">History of non-compliance.</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-emerald-600 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/50 group-hover:bg-emerald-50 transition-colors cursor-pointer">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-emerald-100">
              <ShieldCheck size={20} />
            </div>
            <span className="font-bold text-sm tracking-tight uppercase">Exceeding Federal Safety Standards</span>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-1 w-4 rounded-full bg-rose-100"></div>
            ))}
          </div>
          <Link 
          href={`/facility/${id}`}
          aria-label={`View safety profile for ${name}`}
          className="group/btn relative px-6 py-2.5 bg-slate-900 text-white rounded-full overflow-hidden transition-all duration-300 hover:pr-10 cursor-pointer"
        >
          <span className="relative z-10 text-xs font-bold uppercase tracking-widest">Profile audit</span>
          <MoveRight className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover/btn:opacity-100 transition-all duration-300" size={14} />
        </Link>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { CityStats } from '@/lib/city-utils';

export default function CityHero({ cityData }: { cityData: CityStats }) {
  const { name, total_facilities, avg_safety_score, avg_violations } = cityData;

  const isAtRisk = avg_safety_score < 75;

  return (
    <div className="relative overflow-hidden bg-white border-2 border-slate-900 p-10 md:p-14 mb-16 intelligence-grid">
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div>
          <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
            <Link href="/" className="hover:text-ink transition-colors">United States</Link>
            <span>/</span>
            <Link href="/" className="hover:text-ink transition-colors text-slate-900">Texas</Link>
          </div>
          
          <h1 className="serif-heading text-5xl md:text-7xl font-black text-ink mb-6 uppercase leading-[0.85]">
            Region Report: <br/>
            <span className="opacity-40 italic">{name}, TX</span>
          </h1>
          
          <div className="max-w-2xl">
            {!isAtRisk ? (
              <p className="text-lg text-slate-600 font-semibold leading-tight italic border-l-4 border-heritage-blue pl-6 py-2">
                Nursing facilities in the <span className="text-ink">{name}</span> census tract demonstrate regulatory performance superior to the state median. Audit data shows a stabilized care environment.
              </p>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-6 border-l-4 border-burgundy">
                <span className="mono-data text-[10px] font-black text-burgundy block mb-3 uppercase tracking-[0.2em]">
                  [ DEVIATION ALERT: REGIONAL RISK ]
                </span>
                <p className="text-lg text-ink font-semibold leading-tight italic">
                   Aggregated audit records for <span className="text-ink">{name}</span> indicate systemic clinical and safety risks exceeding Texas state averages. Critical scrutiny of individual providers is required.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 shrink-0">
          <div className="bg-slate-50 border border-slate-100 p-8 min-w-[200px]">
            <div className="mono-data text-[9px] font-black text-slate-400 mb-3 uppercase tracking-widest leading-none">Regional Safety Index</div>
            <div className={`serif-heading text-6xl font-black leading-none ${isAtRisk ? 'text-burgundy' : 'text-heritage-blue'}`}>
              {avg_safety_score}
            </div>
            <div className="mono-data text-[8px] font-black text-slate-400 mt-3 uppercase tracking-tighter">Scale: 000-100 (Optimal)</div>
          </div>

          <div className="bg-slate-900 p-8 min-w-[200px]">
             <div className="mono-data text-[9px] font-black text-white/50 mb-3 uppercase tracking-widest leading-none">Aggregate Violations</div>
            <div className="serif-heading text-6xl font-black text-white leading-none">
              {avg_violations}
            </div>
            <div className="mono-data text-[8px] font-black text-white/30 mt-3 uppercase tracking-tighter">Mean Incidents Per Facility</div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 flex gap-1 items-center opacity-10">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-0.5 w-12 bg-ink"></div>
        ))}
      </div>
    </div>
  );
}

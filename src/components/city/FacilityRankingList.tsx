import { EnhancedFacility } from '@/lib/city-utils';
import { FacilityCard } from '@/components/facility/FacilityCard';
import { Trophy, AlertTriangle, Activity } from 'lucide-react';

export default function FacilityRankingList({ facilities }: { facilities: EnhancedFacility[] }) {
  const total = facilities.length;

  // CASE 1: Small dataset (<= 4 facilities) -> Unified comparison list
  if (total <= 4) {
    return (
      <div className="mb-20 intelligence-grid">
        <div className="flex items-center gap-4 mb-10 border-b-2 border-slate-900 pb-6">
          <div className="p-4 bg-slate-900 text-white">
            <Activity size={24} strokeWidth={1} />
          </div>
          <div>
            <h2 className="serif-heading text-3xl font-black text-ink uppercase tracking-tight">Regional Comparative Analytics</h2>
            <p className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Audit scope: {total} facilities within geographic radius</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {facilities.map((fac, idx) => (
            <FacilityCard
              key={fac.id}
              id={fac.id}
              name={fac.name}
              city={fac.city}
              state={fac.state}
              violationCount={fac.intelligence.violation_count}
              total_beds={fac.total_beds}
              index={idx}
            />
          ))}
        </div>
      </div>
    );
  }

  // CASE 2: Enough data for split rankings
  const sorted = [...facilities].sort((a, b) => 
    (b.intelligence.safety_score || 0) - (a.intelligence.safety_score || 0)
  );

  const half = Math.ceil(total / 2);
  const topRated = sorted.slice(0, Math.min(half, 5));
  
  const worstRated = sorted
    .slice(Math.max(half, total - 5))
    .sort((a, b) => (a.intelligence.safety_score || 0) - (b.intelligence.safety_score || 0));

  const bestScore = topRated[0]?.intelligence.safety_score || 0;
  const topTitle = bestScore >= 70 ? "Tier I: Optimal Performance" : "Select Providers";
  const topSubtitle = bestScore >= 70 ? "Facilities exceeding regional safety medians" : "Comparative analysis of local providers";

  return (
    <div className="grid lg:grid-cols-2 gap-16 mb-24 intelligence-grid">
      {/* Top Rated Section */}
      <div>
        <div className="flex items-center gap-4 mb-10 border-b-2 border-heritage-blue pb-6">
          <div className="p-4 bg-heritage-blue text-white">
            <Trophy size={24} strokeWidth={1} />
          </div>
          <div>
            <h2 className="serif-heading text-3xl font-black text-ink uppercase tracking-tight">{topTitle}</h2>
            <p className="mono-data text-[10px] font-black text-heritage-blue uppercase tracking-widest mt-1">{topSubtitle}</p>
          </div>
        </div>
        
        <div className="space-y-8">
          {topRated.map((fac, idx) => (
            <FacilityCard
              key={fac.id}
              id={fac.id}
              name={fac.name}
              city={fac.city}
              state={fac.state}
              violationCount={fac.intelligence.violation_count}
              total_beds={fac.total_beds}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Lowest Rated Section */}
      <div>
        <div className="flex items-center gap-4 mb-10 border-b-2 border-burgundy pb-6">
          <div className="p-4 bg-burgundy text-white">
            <AlertTriangle size={24} strokeWidth={1} />
          </div>
          <div>
            <h2 className="serif-heading text-3xl font-black text-ink uppercase tracking-tight">Priority Watch List</h2>
             <p className="mono-data text-[10px] font-black text-burgundy uppercase tracking-widest mt-1">Facilities with critical historical deviations</p>
          </div>
        </div>

        <div className="space-y-8">
          {worstRated.map((fac, idx) => (
            <FacilityCard
              key={fac.id}
              id={fac.id}
              name={fac.name}
              city={fac.city}
              state={fac.state}
              violationCount={fac.intelligence.violation_count}
              total_beds={fac.total_beds}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { EnhancedFacility } from '@/lib/city-utils';
import { FacilityCard } from '@/components/facility/FacilityCard';
import { Trophy, AlertTriangle, Activity } from 'lucide-react';

export default function FacilityRankingList({ facilities }: { facilities: EnhancedFacility[] }) {
  const total = facilities.length;

  // CASE 1: Small dataset (<= 4 facilities) -> Unified comparison list
  if (total <= 4) {
    return (
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Local Safety Comparison</h2>
            <p className="text-sm text-slate-500 font-medium">Results for all {total} facilities in this area</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
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
  // Sort by score DESC
  const sorted = [...facilities].sort((a, b) => 
    (b.intelligence.safety_score || 0) - (a.intelligence.safety_score || 0)
  );

  // Partition: Top 50% vs Bottom 50% max 5 each
  const half = Math.ceil(total / 2);
  const topRated = sorted.slice(0, Math.min(half, 5));
  
  // To Watch: Taken from the bottom, ensuring no overlap
  const worstRated = sorted
    .slice(Math.max(half, total - 5))
    .sort((a, b) => (a.intelligence.safety_score || 0) - (b.intelligence.safety_score || 0)); // Re-sort worst for 'worst first'

  // Dynamic Titles based on quality
  const bestScore = topRated[0]?.intelligence.safety_score || 0;
  const topTitle = bestScore >= 70 ? "Top Rated Facilities" : "Best Available Care";
  const topSubtitle = bestScore >= 70 ? "Safest options based on history" : "Compare safety ratings for local options";

  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      {/* Top Rated Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-yellow-100 rounded-2xl text-yellow-600">
            <Trophy size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{topTitle}</h2>
            <p className="text-sm text-slate-500 font-medium">{topSubtitle}</p>
          </div>
        </div>
        
        <div className="space-y-6">
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
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-rose-100 rounded-2xl text-rose-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Facilities to Watch</h2>
             <p className="text-sm text-slate-500 font-medium">Higher volume of recent citations</p>
          </div>
        </div>

        <div className="space-y-6">
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

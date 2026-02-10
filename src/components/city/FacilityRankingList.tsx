import { EnhancedFacility } from '@/lib/city-utils';
import { FacilityCard } from '@/components/facility/FacilityCard';
import { Trophy, AlertTriangle } from 'lucide-react';

export default function FacilityRankingList({ facilities }: { facilities: EnhancedFacility[] }) {
  // Top 5 (Already sorted descending by score)
  const topRated = facilities.slice(0, 5);
  
  // Bottom 5 (Reverse sort -> Worst first)
  const worstRated = [...facilities]
    .sort((a, b) => (a.intelligence.safety_score || 0) - (b.intelligence.safety_score || 0)) // Ascending
    .slice(0, 5);

  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      {/* Top Rated Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-yellow-100 rounded-2xl text-yellow-600">
            <Trophy size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Top Rated Facilities</h2>
            <p className="text-sm text-slate-500 font-medium">Safest options based on inspection history</p>
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

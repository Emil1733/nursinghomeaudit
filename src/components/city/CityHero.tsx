import Link from 'next/link';
import { CityStats } from '@/lib/city-utils';

export default function CityHero({ cityData }: { cityData: CityStats }) {
  const { name, total_facilities, avg_safety_score, avg_violations } = cityData;

  // Color logic for score
  let scoreColor = 'text-gray-500';
  if (avg_safety_score >= 90) scoreColor = 'text-green-400';
  else if (avg_safety_score >= 80) scoreColor = 'text-blue-400';
  else if (avg_safety_score >= 70) scoreColor = 'text-yellow-400';
  else scoreColor = 'text-red-400';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gray-900 border border-white/10 p-8 md:p-12 mb-12">
      {/* Background Mesh Gradient */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Texas</Link>
            <span>/</span>
            <span className="text-white">{name}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nursing Homes in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{name}, TX</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            {avg_safety_score >= 75 ? (
              <>
                Nursing homes in <strong className="text-white">{name}</strong> perform <strong className="text-emerald-400">better than the state average</strong>, 
                with a collective Safety Score of {avg_safety_score}. 
                Compare {total_facilities} facilities to find the best care.
              </>
            ) : (
              <>
                <span className="text-rose-400 font-bold block mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                  Safety Alert
                </span>
                Residents in <strong className="text-white">{name}</strong> face <strong className="text-rose-400">higher safety risks</strong> than the Texas average. 
                The city's collective score of {avg_safety_score} is below the standard. 
                Check violation histories carefully.
              </>
            )}
          </p>
        </div>

        <div className="flex gap-6">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[140px]">
            <div className="text-sm text-gray-400 mb-1">Avg Safety Score</div>
            <div className={`text-4xl font-bold ${scoreColor}`}>
              {avg_safety_score}
            </div>
            <div className="text-xs text-gray-500 mt-1">out of 100</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[140px]">
             <div className="text-sm text-gray-400 mb-1">Avg Violations</div>
            <div className="text-4xl font-bold text-orange-400">
              {avg_violations}
            </div>
            <div className="text-xs text-gray-500 mt-1">per facility</div>
          </div>
        </div>
      </div>
    </div>
  );
}

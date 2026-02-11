import { getAllCities, getCityHubData } from '@/lib/city-utils';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, Building2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: "Texas Nursing Home Directory | Safety Ratings by City",
  description: "Browse safety records for nursing homes across all Texas cities. Find facility ratings, violations, and AI-summarized reports near you.",
  alternates: {
    canonical: '/directory',
  },
};

export const revalidate = 3600;

export default async function DirectoryPage() {
  const cityHubs = await getCityHubData();
  const cities = Object.keys(cityHubs).sort((a, b) => a.localeCompare(b));
  
  // Calculate Statewide Stats
  const totalFacilities = Object.values(cityHubs).reduce((acc, hub) => acc + hub.total_facilities, 0);
  const totalViolations = Object.values(cityHubs).reduce((acc, hub) => acc + (hub.avg_violations * hub.total_facilities), 0);
  
  // Weighted Average Safety Score
  const totalScoreMass = Object.values(cityHubs).reduce((acc, hub) => acc + (hub.avg_safety_score * hub.total_facilities), 0);
  const avgStateScore = Math.round(totalScoreMass / totalFacilities);

  // Group by first letter for better UX
  const grouped: Record<string, string[]> = cities.reduce((acc, city) => {
    const letter = city[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(city);
    return acc;
  }, {} as Record<string, string[]>);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
            <Breadcrumbs items={[{ label: 'Directory', href: '/directory' }]} />
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-16 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Texas Facilities Directory
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mb-8">
            Browse our complete database of 1,176+ nursing homes across Texas. 
            Select a city to view safety grades and detailed violation reports.
          </p>

          {/* Statewide Stats Bar */}
          <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-start">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Building2 size={20} />
                </div>
                <div className="text-left">
                    <div className="text-2xl font-black text-slate-900 leading-none">{totalFacilities.toLocaleString()}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Facilities Tracked</div>
                </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                    <ShieldCheck size={20} />
                </div>
                <div className="text-left">
                    <div className="text-2xl font-black text-slate-900 leading-none">{avgStateScore}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Avg State Score</div>
                </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl">
                <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
                    <AlertTriangle size={20} />
                </div>
                <div className="text-left">
                    <div className="text-2xl font-black text-slate-900 leading-none">{Math.round(totalViolations).toLocaleString()}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Violations</div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 pb-24">
        <div className="space-y-16">
            {letters.map((letter) => (
                <section key={letter} className="relative scroll-mt-24" id={`letter-${letter}`}>
                    <div className="sticky top-16 z-10 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 py-4 mb-8 flex items-end gap-4">
                         <h2 className="text-4xl font-black text-slate-200 leading-none">{letter}</h2>
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{grouped[letter].length} Cities</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {grouped[letter].map((city) => (
                            <Link 
                                key={city}
                                href={`/city/${city.toLowerCase().replace(/\s+/g, '-')}`}
                                className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/10 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-rose-50 group-hover:text-rose-500 text-slate-400 transition-colors">
                                    <MapPin size={16} />
                                </div>
                                <span className="font-medium text-slate-700 group-hover:text-slate-900 text-sm truncate">
                                    {city}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
      </main>
    </div>
  );
}

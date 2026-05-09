
import { Metadata } from 'next';
import Link from 'next/link';
import { getCityHubData } from '@/lib/city-utils';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SearchAutocomplete } from '@/components/SearchAutocomplete';
import { CityGrid } from '@/components/city/CityGrid';
import { ShieldAlert, MapPin, ClipboardList, TrendingDown } from 'lucide-react';

export const revalidate = 86400; // 24 hours ISR

export const metadata: Metadata = {
  title: "Texas Nursing Home Inspection Reports | 2026 Safety Audit",
  description: "Complete database of Texas nursing home inspection reports. Review violations, safety ratings, and health scores for all 1,176+ facilities across every Texas city.",
  alternates: {
    canonical: 'https://nursinghomeaudit.com/texas',
  },
};

export default async function TexasHubPage() {
  const cityHubs = await getCityHubData();
  const cities = Object.values(cityHubs).sort((a, b) => b.total_facilities - a.total_facilities);

  // Aggregate State Stats
  const totalFacilities = cities.reduce((sum, c) => sum + c.total_facilities, 0);
  const avgSafetyScore = Math.round(cities.reduce((sum, c) => sum + (c.avg_safety_score * c.total_facilities), 0) / totalFacilities);
  const avgViolations = (cities.reduce((sum, c) => sum + (c.avg_violations * c.total_facilities), 0) / totalFacilities).toFixed(1);

  const riskLevel = avgSafetyScore < 60 ? 'CRITICAL' : avgSafetyScore < 75 ? 'ELEVATED' : 'STABLE';
  const riskColor = riskLevel === 'CRITICAL' ? 'text-red-600' : riskLevel === 'ELEVATED' ? 'text-orange-600' : 'text-emerald-600';

  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-slate-900 selection:text-white relative overflow-x-hidden intelligence-grid">
      
      <main className="max-w-6xl mx-auto px-8 py-12 pt-24">
        
        <Breadcrumbs 
          items={[
            { label: 'Directory', href: '/directory' },
            { label: 'Texas', href: '/texas' }
          ]} 
        />

        <div className="mt-12 mb-20">
          <div className="inline-block border-2 border-slate-900 px-6 py-2 mb-8 bg-slate-50">
            <span className="mono-data text-[10px] font-black uppercase tracking-[0.4em] text-ink">
              Jurisdictional Report: State of Texas
            </span>
          </div>
          
          <h1 className="serif-heading text-5xl sm:text-7xl font-black text-ink tracking-tight mb-8 uppercase leading-[0.9]">
            Texas Nursing Home <br/>
            <span className="opacity-40 italic">Inspection Reports</span>
          </h1>

          <div className="grid md:grid-cols-3 gap-12 mt-16 border-y-2 border-slate-900 py-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <ShieldAlert className="text-slate-400" size={16} />
                <span className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest">State Safety Index</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-black mono-data tracking-tighter ${riskColor}`}>{avgSafetyScore}</span>
                <span className="text-slate-400 font-bold uppercase text-[10px]">/ 100</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest mt-2 text-slate-500">Risk Profile: <span className={riskColor}>{riskLevel}</span></p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <ClipboardList className="text-slate-400" size={16} />
                <span className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Violations</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black mono-data tracking-tighter">{avgViolations}</span>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Per Facility</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest mt-2 text-slate-500">Statewide Benchmark</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="text-slate-400" size={16} />
                <span className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest">Coverage Depth</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black mono-data tracking-tighter">{totalFacilities}</span>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Providers</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest mt-2 text-slate-500">Across {cities.length} Cities</p>
            </div>
          </div>
        </div>

        <div className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-0.5 flex-grow bg-slate-100"></div>
            <h2 className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Jurisdictional Registry</h2>
            <div className="h-0.5 flex-grow bg-slate-100"></div>
          </div>
          
          <CityGrid initialCities={cities} />
        </div>

        <section className="mt-40 p-12 bg-slate-900 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 translate-x-1/2 -translate-y-1/2 rounded-full"></div>
           <div className="relative z-10 max-w-2xl">
              <h2 className="serif-heading text-4xl font-black mb-6 uppercase leading-none">Why Data Transparency Matters in Texas Care</h2>
              <p className="text-slate-400 leading-relaxed mb-8 font-medium">
                Texas currently hosts one of the largest concentrations of nursing facilities in the United States. With regulatory standards varying significantly between metropolitan hubs like Houston and rural jurisdictions, independent auditing is the only way for families to truly assess risk.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <TrendingDown className="text-red-500" size={16} />
                  <span className="mono-data text-[10px] font-black uppercase tracking-widest">Real-time Violation Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="text-emerald-500" size={16} />
                  <span className="mono-data text-[10px] font-black uppercase tracking-widest">AI-Analyzed Federal Transcripts</span>
                </div>
              </div>
           </div>
        </section>

      </main>

      <footer className="max-w-6xl mx-auto px-8 py-20 border-t border-slate-100 text-center">
        <p className="mono-data text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
          NursingHomeAudit.com • Texas State Registry • 2026 Protocol
        </p>
      </footer>
    </div>
  );
}

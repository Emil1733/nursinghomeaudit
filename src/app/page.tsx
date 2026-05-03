
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { AlertTicker } from "@/components/AlertTicker";
import { FacilityCard } from "@/components/facility/FacilityCard";
import { Metadata } from "next";

export const revalidate = 3600; // Enable ISR: Revalidate every hour for instant CDN delivery

export const metadata: Metadata = {
  title: "Texas Nursing Home Safety Audit | Search Ratings & Violations",
  description: "Free, real-time safety audit of every Texas nursing home. Search 1,176+ facilities for history of violations, health scores, and AI family summaries.",
  alternates: {
    canonical: '/',
  },
};

interface Violation {
  id: string;
  facility_id: string;
  citation_date: string;
  description: string;
}

interface Facility {
  id: string;
  name: string;
  city: string;
  state: string;
  license_number: string;
  violations: Violation[];
}

export default async function Home() {
  // Fetch top 30 facilities with their total violation counts
  const { data: facilities } = await supabase
    .from("facilities")
    .select("*, violations:violations(count)")
    .order("name")
    .limit(30);

  // Fetch only the 20 most recent violations for the global feed
  const { data: recentViolations } = await supabase
    .from("violations")
    .select("*, facility:facilities(name)")
    .order("citation_date", { ascending: false })
    .limit(20);

  // Map facilities and their aggregate counts
  const facilitiesWithGrades = (facilities || []).map((f: any) => {
    const totalViolations = f.violations?.[0]?.count || 0;
    return { ...f, violationCount: totalViolations };
  });

  // Fetch total count of facilities for the live badge
  const { count: tx_count } = await supabase
    .from("facilities")
    .select("*", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-slate-900 selection:text-white relative overflow-x-hidden intelligence-grid">
      
      <main className="max-w-4xl mx-auto px-8 py-12 pt-24">
        <div className="mb-20 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-block border-2 border-slate-900 px-6 py-2 mb-8">
            <span className="mono-data text-[10px] font-black uppercase tracking-[0.4em] text-ink">
              Federal Oversight Hub: State of Texas
            </span>
          </div>
          <h1 className="serif-heading text-6xl sm:text-8xl font-black text-ink tracking-tight mb-8 uppercase leading-[0.85]">
            Provider <br/>
            <span className="opacity-40 italic">Audit Protocol</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-tight font-semibold italic border-l-4 border-slate-100 pl-8 py-2">
            Independent indexing of federal safety records. Tracking systemic regulatory deviations across all Medicare-certified providers in the Texas jurisdiction.
          </p>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both border-2 border-slate-900 p-1 bg-slate-50">
          <SearchAutocomplete />
        </div>

        {/* Recent Alerts Feed (Subset) */}
        <div className="space-y-12 mt-20">
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-6 animate-in fade-in duration-1000 delay-500 fill-mode-both">
            <h2 className="serif-heading text-2xl font-black text-ink uppercase tracking-tight">
              Regional Active Ledger
            </h2>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 bg-heritage-blue animate-pulse"></div>
              <span className="mono-data text-[10px] text-slate-400 font-black uppercase tracking-widest">
                {tx_count || "1,176"} ACTIVE PROVIDER PROFILES
              </span>
            </div>
          </div>

          <div className="grid gap-8">
            {facilitiesWithGrades?.slice(0, 10).map((facility: any, idx: number) => (
              <FacilityCard
                key={facility.id}
                id={facility.id}
                name={facility.name}
                city={facility.city}
                state={facility.state}
                violationCount={facility.violationCount}
                total_beds={facility.total_beds}
                index={idx}
              />
            ))}
          </div>

          {(!facilities || facilities.length === 0) && (
            <div className="text-center py-20 bg-slate-50 border border-slate-200">
              <p className="mono-data text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Initializing secure federal data link...</p>
            </div>
          )}
        </div>

        {/* Top Cities Internal Linking */}
        <div className="mt-32 pt-20 border-t-2 border-slate-900">
          <h3 className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 text-center">
            Operational Jurisdictions
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
             {["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Lubbock"].map(city => (
                <Link key={city} href={`/city/${city.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white border border-slate-200 px-8 py-3 mono-data text-[10px] font-black uppercase tracking-widest text-ink hover:bg-slate-900 hover:text-white transition-all">
                  {city}
                </Link>
             ))}
             <Link href="/directory" className="px-8 py-3 mono-data text-[10px] font-black uppercase tracking-widest text-heritage-blue hover:underline">
                [ + Full Registry Access ]
             </Link>
          </div>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-8 py-20 border-t border-slate-100 text-center">
        <div className="flex justify-center gap-2 mb-8 opacity-20">
            {[...Array(12)].map((_, i) => (
                <div key={i} className="h-0.5 w-8 bg-ink"></div>
            ))}
        </div>
        <p className="mono-data text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
          NursingHomeAudit.com • Intelligence Division • 2026 Audit Series
        </p>
        <p className="mono-data text-[8px] text-slate-300 uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
          Aggregated under strict compliance with the Freedom of Information Act (FOIA). All datasets sourced from CMS Federal Healthcare Repositories.
        </p>
      </footer>
    </div>
  );
}

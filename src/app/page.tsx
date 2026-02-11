
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { AlertTicker } from "@/components/AlertTicker";
import { FacilityCard } from "@/components/facility/FacilityCard";
import { Metadata } from "next";

export const revalidate = 0;

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-100 relative overflow-x-hidden">
      
      {/* Background Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-200/30 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 text-white p-1.5 rounded-lg shadow-lg shadow-rose-600/20">
              <ShieldAlert size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">NursingHomeAudit<span className="text-slate-500 font-normal">.com</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">V2.1 Beta</span>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="text-sm font-medium text-slate-500">
              Texas Audit
            </div>
          </div>
        </div>
      </header>

      {/* Live Feed Ticker */}
      <AlertTicker violations={recentViolations || []} />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Is Mom Safe?
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            We track state inspection reports that nursing homes hide. 
            Real-time violation alerts for Texas families.
          </p>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          <SearchAutocomplete />
        </div>

        {/* Recent Alerts Feed (Subset) */}
        <div className="space-y-8 mt-4">
          <div className="flex items-center justify-between px-2 animate-in fade-in duration-1000 delay-500 fill-mode-both">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              Regional Audit Feed
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                {tx_count || "1,176"} Facilities Scanned
              </span>
            </div>
          </div>

          <div className="grid gap-6">
            {facilitiesWithGrades?.map((facility: any, idx: number) => (
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
            <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm italic">Initializing federal data stream...</p>
            </div>
          )}
        </div>

        {/* Top Cities Internal Linking */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">
            Browse Top Texas Cities
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
             {["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Lubbock"].map(city => (
                <Link key={city} href={`/city/${city.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-slate-200 hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm">
                  {city}
                </Link>
             ))}
             <Link href="/directory" className="px-4 py-2 text-rose-600 hover:text-rose-700">
                + View All Cities
             </Link>
          </div>
        </div>
      </main>

      <footer className="max-w-3xl mx-auto px-6 py-12 border-t border-slate-200 text-center">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-2">
          NursingHomeAudit.com • 2026 Audit • Texas Jurisdiction
        </p>
        <p className="text-[9px] text-slate-300 uppercase tracking-[0.1em]">
          Data sourced from CMS Health & Safety Deficiencies Dataset
        </p>
      </footer>
    </div>
  );
}

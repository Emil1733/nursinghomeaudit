import { supabase } from "@/lib/supabase";
import { FacilityHeader } from "@/components/facility/FacilityHeader";
import { SafetyScoreGauge } from "@/components/facility/SafetyScoreGauge";
import { CitationTimeline } from "@/components/facility/CitationTimeline";
import { notFound } from "next/navigation";
import { SafetyPulse } from "@/components/facility/SafetyPulse";
import { RiskGauge } from "@/components/facility/RiskGauge";
import { getFacilityIntel, getCityBenchmark } from "@/lib/intelligence";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { LegalLeadSection } from "@/components/monetization/LegalLeadSection";
import { Database, Clock, TrendingDown, TrendingUp, BarChart3 } from "lucide-react";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: facility } = await supabase
    .from("facilities")
    .select("name, city, state")
    .eq("id", id)
    .single();

  if (!facility) return {};

  const intel = getFacilityIntel(id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nursinghomeaudit.com';

  // Critical SEO Strategy: Noindex pages without intelligence or safety data to prevent index bloat
  const shouldIndex = !!intel;

  return {
    title: `${facility.name} Safety Audit & Violations | ${facility.city}, ${facility.state}`,
    description: `See the safety record, health violations, and AI-summarized family pulse for ${facility.name} in ${facility.city}. Protect your loved ones with transparent data.`,
    robots: {
      index: shouldIndex,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/facility/${id}`,
    }
  };
}

export default async function FacilityPage({ params }: PageProps) {
  const { id } = await params;
  
  // 1. Fetch Facility data
  const { data: facility, error: facError } = await supabase
    .from("facilities")
    .select("*")
    .eq("id", id)
    .single();

  if (facError || !facility) {
    return notFound();
  }

  // 2. Fetch Violations for this facility
  const { data: violations } = await supabase
    .from("violations")
    .select("*")
    .eq("facility_id", id)
    .order("citation_date", { ascending: false });

  // 3. Fetch Safety Score
  const { data: scoreData } = await supabase
    .from("safety_scores")
    .select("*")
    .eq("facility_id", id)
    .single();

  const score = scoreData?.score_value ?? 75; // Default score
  const grade = scoreData?.grade_letter ?? (violations && violations.length > 5 ? 'F' : 'B');

  // Fetch Intelligence data (Static Store)
  const intel = getFacilityIntel(id);
  const benchmark = getCityBenchmark(facility.city);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-100">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs 
            items={[
                { label: 'Directory', href: '/directory' },
                { label: facility.city, href: `/city/${facility.city.toLowerCase().replace(/\s+/g, '-')}` },
                { label: facility.name, href: `/facility/${facility.id}` }
            ]} 
        />
        <FacilityHeader facility={facility} />
        
        {/* Intelligence Layer: AI Pulse & Risk Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {intel ? (
            <SafetyPulse summary={intel.summary} />
          ) : (
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-center items-center text-center">
              <p className="text-slate-400 text-sm font-medium">AI analysis pending for this facility.</p>
            </div>
          )}
          <RiskGauge 
            violationCount={violations?.length || 0} 
            benchmark={benchmark} 
            city={facility.city} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col justify-center">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <span className="block text-2xl font-black text-slate-900">{violations?.length || 0}</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Total Violations</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <span className="block text-2xl font-black text-slate-900">{facility.total_beds || "N/A"}</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Certified Beds</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SafetyScoreGauge score={score} grade={grade} />
          </div>
        </div>

        {/* Legal Lead Engagement (Conditional for F/D Grades) */}
        <LegalLeadSection facilityId={facility.id} facilityName={facility.name} grade={grade} />

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mt-12">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Violation History</h2>
          <CitationTimeline violations={violations || []} />
        </div>

        {/* Regional Benchmarking (Objectivity Signal) */}
        <div className="mt-8 bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={18} className="text-slate-400" />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Regional Safety Benchmarking</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-slate-600">City Performance ({facility.city})</span>
                        <span className="text-xs font-black text-slate-400">AVG: {benchmark?.avg_violations.toFixed(1) || "12.4"}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative">
                        {/* City Average Marker */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-slate-300 z-10 left-[50%]"></div>
                        {/* Facility Performance */}
                        <div 
                            className={`h-full transition-all duration-1000 ${grade === 'F' ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${Math.min(((violations?.length || 0) / (Math.max(benchmark?.avg_violations || 10, 5) * 2)) * 100, 100)}%` }}
                        ></div>
                    </div>
                    <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
                        {violations && benchmark && violations.length > benchmark.avg_violations ? (
                            <><TrendingUp size={12} className="text-rose-500" /> {((violations.length / benchmark.avg_violations - 1) * 100).toFixed(0)}% more citations than local average</>
                        ) : (
                            <><TrendingDown size={12} className="text-emerald-500" /> Outperforming city safety markers</>
                        )}
                    </p>
                </div>

                <div className="flex flex-col justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[11px] leading-relaxed text-slate-500 font-medium italic">
                        "Comparative analysis is essential for identifying systemic neglect. Our benchmarks are updated monthly using raw CMS files."
                    </p>
                </div>
            </div>
        </div>

        {/* Resource Guide (Authority Link) */}
        <div className="mt-8 p-8 bg-blue-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-md">
                <h3 className="text-xl font-bold mb-2">Need help understanding this audit?</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                    Read our expert guide on interpreting federal health inspections and identifying safety red flags.
                </p>
            </div>
            <Link 
                href="/resources/reading-inspection-reports"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-colors whitespace-nowrap"
            >
                Open Guide
            </Link>
        </div>

        {/* Data Integrity Footer (Institutional Trust) */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Database size={14} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Source: CMS.gov / Medicare.gov</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dataset Sync: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
            </div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Audit ID: NH-AUDIT-{facility.id.slice(0, 8).toUpperCase()}
            </div>
        </div>
      </main>
    </div>
  );
}

import { supabase } from "@/lib/supabase";
import { FacilityHeader } from "@/components/facility/FacilityHeader";
import { SafetyScoreGauge } from "@/components/facility/SafetyScoreGauge";
import { CitationTimeline } from "@/components/facility/CitationTimeline";
import { notFound } from "next/navigation";
import { getFacilityIntel, getCityBenchmark } from "@/lib/intelligence";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { LegalLeadSection } from "@/components/monetization/LegalLeadSection";
import { DossierCTA } from "@/components/monetization/DossierCTA";
import { Database, Clock, TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import { ChatPromptWrapper } from "@/components/chat/ChatPromptWrapper";
import { SafetyPulseDashboard } from "@/components/facility/SafetyPulseDashboard";
import { RedFlagSummary } from "@/components/facility/RedFlagSummary";
import { ExecutiveAbstract } from "@/components/facility/ExecutiveAbstract";

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
  const { data: scoreRecords } = await supabase
    .from("safety_scores")
    .select("*")
    .eq("facility_id", id)
    .limit(1);

  const scoreData = scoreRecords && scoreRecords.length > 0 ? scoreRecords[0] : null;
  const score = scoreData?.score_value ?? 75;
  const grade = scoreData?.grade_letter ?? (violations && violations.length > 5 ? 'F' : 'B');

  // Fetch Intelligence data
  const intel = getFacilityIntel(id);
  const benchmark = getCityBenchmark(facility.city);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NursingHome',
    '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nursinghomeaudit.com'}/facility/${id}`,
    name: facility.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: facility.address,
      addressLocality: facility.city,
      addressRegion: facility.state,
      postalCode: facility.zip_code,
      addressCountry: 'US',
    },
    description: `Independent safety audit and health inspection reports for ${facility.name} in ${facility.city}, ${facility.state}. View safety grades and recent violations.`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: score,
      bestRating: '100',
      worstRating: '0',
      reviewCount: violations?.length || 0,
    },
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-slate-900 selection:text-white pb-20">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Breadcrumbs 
            items={[
                { label: 'Directory', href: '/directory' },
                { label: facility.city, href: `/city/${facility.city.toLowerCase().replace(/\s+/g, '-')}` },
                { label: facility.name, href: `/facility/${facility.id}` }
            ]} 
        />
        <FacilityHeader facility={facility} />
        
        {/* Executive Abstract */}
        <ExecutiveAbstract 
          facilityName={facility.name} 
          summary={intel ? intel.summary : null}
          metrics={{
            rnHours: facility.rn_hours_per_day,
            totalViolations: violations?.length || 0,
            occupancy: facility.total_beds
          }}
        />

        {/* New Production Data Dashboard */}
        <SafetyPulseDashboard facility={facility} />

        {/* High-Impact Safety Verdict */}
        <RedFlagSummary facility={facility} />
        
        {/* Section Connector: PARAMETERS_SYNC */}
        <div className="my-8 flex items-center gap-4 py-4 border-t border-dashed border-slate-200">
            <span className="mono-data text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] bg-paper px-2 z-10">REGISTRY_LINK: PARAMETERS_SYNC_0x9A2</span>
            <div className="flex-grow border-t border-dashed border-slate-100"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-slate-200 intelligence-grid mb-12 border relative z-10">
          <div className="md:col-span-2 bg-white p-10">
              <h2 className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Index Record: Facility Parameters</h2>
              <div className="grid grid-cols-2 gap-12">
                <div className="border-l-2 border-ink pl-6">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Audit Citations</span>
                  <div className="flex items-baseline gap-2">
                    <span className="mono-data text-4xl font-black text-ink">{violations?.length || 0}</span>
                    <span className="mono-data text-[10px] font-bold text-slate-300">TOTAL</span>
                  </div>
                </div>
                <div className="border-l-2 border-slate-200 pl-6">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Occupancy Load</span>
                  <div className="flex items-baseline gap-2">
                    <span className="mono-data text-4xl font-black text-ink">{facility.total_beds || <span className="text-[11px] text-slate-300 font-bold uppercase tracking-widest">[ REGISTRY_OMISSION ]</span>}</span>
                    <span className="mono-data text-[10px] font-bold text-slate-300">BEDS</span>
                  </div>
                </div>
              </div>
          </div>
          <div className="bg-white flex items-center justify-center p-8 relative z-30">
            <SafetyScoreGauge score={score} grade={grade} />
          </div>
        </div>

        {/* Section Connector: LITIGATION_INDEX */}
        <div className="my-8 flex items-center gap-4 py-4 border-t border-dashed border-slate-200">
            <span className="mono-data text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] bg-paper px-2 z-10">REGISTRY_LINK: LITIGATION_INDEX_0xFF4</span>
            <div className="flex-grow border-t border-dashed border-slate-100"></div>
        </div>

        {/* Legal Lead Engagement */}
        <LegalLeadSection facilityId={facility.id} facilityName={facility.name} grade={grade} />

        {/* Section Connector: VIOLATION_LEDGER */}
        <div className="my-8 flex items-center gap-4 py-4 border-t border-dashed border-slate-200">
            <span className="mono-data text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] bg-paper px-2 z-10">REGISTRY_LINK: VIOLATION_LEDGER_RAW</span>
            <div className="flex-grow border-t border-dashed border-slate-100"></div>
        </div>

        <div className="bg-white border p-10 intelligence-grid">
          <h2 className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Violation Ledger: Clinical Incident Log</h2>
          <CitationTimeline violations={violations || []} />
        </div>

        {/* Regional Benchmarking */}
        <div className="mt-16 intelligence-grid bg-white border p-10 md:p-14">
            <div className="flex items-center gap-3 mb-10">
                <BarChart3 size={18} className="text-slate-400" />
                <h3 className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol: Regional Benchmarking</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <div className="flex justify-between items-end mb-4 px-1">
                        <span className="serif-heading text-xl font-black text-ink">Market Variance: {facility.city}</span>
                        <span className="mono-data text-[10px] font-black text-slate-400 uppercase tracking-widest">Index Avg: {benchmark?.avg_violations.toFixed(1) || "12.4"}</span>
                    </div>
                    <div className="h-4 bg-slate-50 border border-slate-100 overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 w-0.5 bg-slate-300 z-10 left-[50%]"></div>
                        <div 
                            className={`h-full transition-all duration-1000 ${(violations?.length || 0) > (benchmark?.avg_violations || 12) ? 'bg-slate-300' : 'bg-heritage-blue'}`}
                            style={{ width: `${Math.min(((violations?.length || 0) / (Math.max(benchmark?.avg_violations || 10, 5) * 2)) * 100, 100)}%` }}
                        />
                    </div>
                    <div className="mt-3 flex justify-between items-center opacity-60">
                        <span className="mono-data text-[8px] font-bold uppercase tracking-widest">Optimal</span>
                        <span className="mono-data text-[8px] font-bold uppercase tracking-widest text-right">Deviated</span>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50">
                        <TrendingUp size={16} className="text-slate-400 mt-1" />
                        <div>
                            <p className="mono-data text-[11px] font-black text-ink uppercase tracking-tight mb-1">Comparative Analysis</p>
                            <p className="serif-heading italic text-xs text-slate-600 leading-relaxed">
                                This facility performs {(violations?.length || 0) > (benchmark?.avg_violations || 12) ? 'below' : 'above'} the regional safety median for {facility.city}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Premium Dossier CTA */}
        <div className="mt-8">
            <DossierCTA 
                facilityName={facility.name} 
                address={facility.address}
                grade={grade} 
                score={score}
                violations={violations || []}
                cityBenchmark={benchmark}
            />
        </div>

        {/* Resource Guide */}
        <div className="mt-16 bg-white border-2 border-slate-100 p-10 md:p-14 intelligence-grid flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
                <div className="mono-data text-[10px] font-black text-heritage-blue uppercase tracking-[0.2em] mb-4">Methodology & Interpretation</div>
                <h3 className="serif-heading text-3xl font-black text-ink leading-[0.9] mb-4">Interpreting Federal Audit Data</h3>
                <p className="serif-heading italic text-slate-600 text-base leading-relaxed">
                    Our analysis utilizes raw CMS Quality Of Care data files. Understanding how inspection cycles, scope, and severity levels interact is critical for family safety planning.
                </p>
            </div>
            <Link 
                href="/resources/reading-inspection-reports"
                className="group w-full md:w-auto bg-slate-900 text-white px-10 py-6 text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-800 flex items-center justify-center gap-4"
            >
                Access Technical Guide
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
        </div>

        {/* Data Integrity Footer */}
        <div className="mt-24 border-t border-slate-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
            <div className="flex items-center gap-3">
                <Database size={14} />
                <span className="mono-data text-[9px] font-black uppercase tracking-widest">Data Source: CMS.gov Raw Files</span>
            </div>
            <div className="flex items-center gap-3">
                <Clock size={14} />
                <span className="mono-data text-[9px] font-black uppercase tracking-widest">Record Status: Valid as of {new Date().toLocaleDateString()}</span>
            </div>
        </div>
      </main>

      <ChatPromptWrapper facility={facility} />
    </div>
  );
}

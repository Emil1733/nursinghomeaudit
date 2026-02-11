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

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Violation History</h2>
          <CitationTimeline violations={violations || []} />
        </div>

        {/* Resource Guide (Authority Link) */}
        <div className="mt-12 p-8 bg-blue-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
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
      </main>
    </div>
  );
}

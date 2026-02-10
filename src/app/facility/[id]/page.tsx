
import { supabase } from "@/lib/supabase";
import { FacilityHeader } from "@/components/facility/FacilityHeader";
import { SafetyScoreGauge } from "@/components/facility/SafetyScoreGauge";
import { CitationTimeline } from "@/components/facility/CitationTimeline";
import { notFound } from "next/navigation";
import { SafetyPulse } from "@/components/facility/SafetyPulse";
import { RiskGauge } from "@/components/facility/RiskGauge";
import { getFacilityIntel, getCityBenchmark } from "@/lib/intelligence";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FacilityPage({ params }: { params: Promise<{ id: string }> }) {
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
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Stats</h3>
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
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Violation History</h3>
          <CitationTimeline violations={violations || []} />
        </div>
      </main>
    </div>
  );
}

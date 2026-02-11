
import { AlertCircle, FileText, CheckCircle, Search, Info } from "lucide-react";
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "How to Read a Nursing Home Inspection Report | Guide",
  description: "Learn how to decipher federal CMS Form 2567, identify high-risk citations, and understand 'Immediate Jeopardy' in nursing home health inspections.",
  alternates: {
    canonical: '/resources/reading-inspection-reports',
  },
};

export default function GuidePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-8">
            <Breadcrumbs 
                items={[
                    { label: 'Resources', href: '/resources' },
                    { label: 'Reading Reports', href: '/resources/reading-inspection-reports' }
                ]} 
            />
        </div>
        <div className="max-w-3xl mx-auto px-6 pb-20">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-6">
            How to Read a Nursing Home Inspection Report (CMS-2567)
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Federal inspection reports are intentionally dense. This guide helps you find the "Red Flags" that facilities often try to hide.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-slate prose-lg">
        <div className="space-y-12">
            
            <section>
                <h2 className="text-2xl font-black text-slate-900">1. Locate the "Scope & Severity" (S&S)</h2>
                <p className="text-slate-600 leading-relaxed">
                    Nearly every citation in a federal report is given a letter grade from **A to L**. This is the single most important data point in the document.
                </p>
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 my-6">
                    <h4 className="flex items-center gap-2 text-rose-800 font-bold mb-2">
                        <AlertCircle size={20} />
                        The "Deadly" Grid: J, K, and L
                    </h4>
                    <p className="text-sm text-rose-700">
                        Citations labeled **J, K, or L** represent **Immediate Jeopardy**. This means the facility's non-compliance has caused, or is likely to cause, serious injury, impairment, or death to a resident.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-black text-slate-900">2. Find the "F-Tag" Number</h2>
                <p className="text-slate-600 leading-relaxed">
                    Deficiencies are categorized by "F-Tags." These numbers correspond to specific federal regulations.
                </p>
                <ul className="space-y-4 text-slate-600 list-none pl-0">
                    <li className="flex gap-4">
                        <div className="font-mono bg-slate-100 px-2 py-1 rounded h-fit font-bold">F600</div>
                        <span>**Free from Abuse and Neglect**: Any citation here is a critical warning sign.</span>
                    </li>
                    <li className="flex gap-4">
                        <div className="font-mono bg-slate-100 px-2 py-1 rounded h-fit font-bold">F689</div>
                        <span>**Free from Accident Hazards**: Often used for falls and elopement (residents leaving the building unattended).</span>
                    </li>
                    <li className="flex gap-4">
                        <div className="font-mono bg-slate-100 px-2 py-1 rounded h-fit font-bold">F812</div>
                        <span>**Food Procurement/Store/Prepare**: Covers kitchen hygiene and food safety.</span>
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-black text-slate-900">3. Look for "Recurrent" Violations</h2>
                <p className="text-slate-600 leading-relaxed">
                    One mistake can happen at any facility. However, if you see the same F-Tag appearing in multiple inspections over 2-3 years, it indicates a **systemic failure in management**.
                </p>
                <div className="bg-blue-900 rounded-3xl p-8 text-white">
                    <h4 className="text-xl font-bold mb-4">Our Audit Advantage</h4>
                    <p className="text-blue-200 text-sm leading-relaxed mb-6">
                        We scan the last 3 years of inspection data automatically. If a facility has repeat violations, we deduct extra points from their Safety Score to reflect the increased risk to residents.
                    </p>
                    <Link 
                        href="/directory"
                        className="text-white font-bold flex items-center gap-2 hover:underline"
                    >
                        Search current rankings <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            <section className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="text-emerald-600" size={20} />
                    Checklist for Your Next Tour
                </h3>
                <p className="text-sm text-slate-600 mb-6 font-medium">
                    When visiting a facility, ask the administrator specifically about their recent F-Tag citations:
                </p>
                <ul className="text-sm text-slate-500 space-y-3 pl-4 list-disc">
                    <li>"I saw a recent F689 citation in your audit. What specific staff training have you implemented since then?"</li>
                    <li>"Your last inspection was 14 months ago. Have you had your annual state survey yet this year?"</li>
                    <li>"Can I see your most recent CMS-2567 report? (They are legally required to provide this to you)."</li>
                </ul>
            </section>
        </div>
      </article>
    </div>
  );
}

function ArrowRight({ size, className }: { size: number, className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

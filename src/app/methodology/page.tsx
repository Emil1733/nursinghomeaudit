
import { ShieldCheck, Info, Database, Scale } from "lucide-react";
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Audit Methodology | How We Calculate Nursing Home Safety Scores",
  description: "Transparency in our auditing process. Learn how we use federal CMS health deficiency data to calculate Safety Scores for Texas nursing homes.",
  alternates: {
    canonical: '/methodology',
  },
};

export default function MethodologyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-8">
            <Breadcrumbs items={[{ label: 'Methodology', href: '/methodology' }]} />
        </div>
        <div className="max-w-3xl mx-auto px-6 pb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Audit Methodology
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            We believe that every family deserves access to unfiltered safety data. This page outlines the data sources, calculations, and logic used to generate the Nursing Home Audit Safety Scores.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {/* Section 1: Data Source */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-900">1. Data Sources</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our primary data source is the <strong>Provider Data Catalog (PDC)</strong> maintained by the <strong>Centers for Medicare & Medicaid Services (CMS)</strong>. We focus on two specific datasets:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li><strong>Health Deficiencies:</strong> Records of inspections where federal or state surveyors found violations of health and safety standards.</li>
            <li><strong>Penalties:</strong> Records of monetary fines and payment denials imposed due to severe or uncorrected deficiencies.</li>
          </ul>
        </section>

        {/* Section 2: Weighting */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Scale className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-900">2. Score Calculation</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            A facility's Safety Score starts at <strong>100</strong>. Points are deducted based on the volume and severity of citations over a rolling 3-year period:
          </p>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="font-bold text-slate-700">Violation Type</span>
                <span className="font-bold text-slate-700">Deduction Weight</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium italic">Standard Health Citation</span>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">-2 to -5 pts</span>
            </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium italic">Pattern of Deficiencies</span>
                <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-bold">-10 pts</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-slate-900 font-bold">"Immediate Jeopardy" (Critical)</span>
                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-bold">-25 pts</span>
            </div>
          </div>
        </section>

        {/* Section 3: Grading */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-900">3. Grading Scale</h2>
          </div>
          <div className="grid grid-cols-5 gap-3">
             {[
               { grade: 'A', range: '90-100', color: 'bg-emerald-500', label: 'Exceptional' },
               { grade: 'B', range: '80-89', color: 'bg-blue-500', label: 'Safety First' },
               { grade: 'C', range: '70-79', color: 'bg-yellow-500', label: 'Average' },
               { grade: 'D', range: '60-69', color: 'bg-orange-500', label: 'At Risk' },
               { grade: 'F', range: '0-59', color: 'bg-rose-500', label: 'Critical' },
             ].map((item) => (
               <div key={item.grade} className="text-center">
                 <div className={`${item.color} text-white font-black py-3 rounded-xl mb-2 text-xl`}>
                    {item.grade}
                 </div>
                 <div className="text-[10px] uppercase font-bold text-slate-400 leading-tight">
                    {item.label}
                 </div>
               </div>
             ))}
          </div>
        </section>

        {/* Section 4: AI Usage */}
        <section className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
           <div className="flex items-center gap-3 mb-4">
             <Info className="text-blue-600" size={24} />
             <h2 className="text-xl font-bold text-blue-900">The Role of AI</h2>
           </div>
           <p className="text-blue-800/80 leading-relaxed text-sm">
             We use Large Language Models (LLMs) to summarize dense, technical federal reports into plain English. The AI does not decide the Safety Score; rather, it highlights the <strong>actual text</strong> found in the public record to make it easier for families to understand the nature of a citation.
           </p>
        </section>
      </div>
    </div>
  );
}

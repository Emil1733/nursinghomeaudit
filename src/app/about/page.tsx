
import { ShieldCheck, Database, Lock } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nursing Home Audit | Our Mission for Transparency",
  description: "Learn how Nursing Home Audit uses federal CMS data and AI to provide free, transparent safety audits for Texas nursing homes.",
  openGraph: {
    title: "About Nursing Home Audit | Our Mission",
    description: "Empowering families with truth. We track what nursing homes try to hide.",
  }
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            We Believe in Radical Transparency
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Elder care decisions shouldn't be made in the dark. We aggregate dispersed federal data into clear, actionable safety audits for Texas families.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">
        {/* Section 1 */}
        <div className="flex gap-6">
          <div className="bg-rose-100 p-3 rounded-xl h-fit">
            <Database className="text-rose-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Sourced from Federal Data</h2>
            <p className="text-slate-600 leading-relaxed">
              Our data comes directly from the <strong>Centers for Medicare & Medicaid Services (CMS)</strong>. We ingest the "Health Deficiencies" and "Penalties" datasets daily to ensure you see the exact same records that federal regulators see—unfiltered and unedited.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex gap-6">
          <div className="bg-emerald-100 p-3 rounded-xl h-fit">
            <ShieldCheck className="text-emerald-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">The "Safety Score" Algorithm</h2>
            <p className="text-slate-600 leading-relaxed">
              Federal star ratings can be misleading. Our proprietary <strong>Nursing Home Audit Score</strong> focuses strictly on <em>safety violations</em> and <em>substandard care citations</em>. We verify if a facility has a history of harming residents, neglecting hygiene, or failing fire safety protocols.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex gap-6">
          <div className="bg-slate-100 p-3 rounded-xl h-fit">
            <Lock className="text-slate-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Free & Independent</h2>
            <p className="text-slate-600 leading-relaxed">
              Nursing Home Audit is an independent transparency project. We do not accept payments from nursing homes to remove or alter their records. Our loyalty is to the families and residents of Texas.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to search?</h3>
          <p className="text-slate-400 mb-8">
            Check the safety record of any licensed nursing home in Texas.
          </p>
          <Link 
            href="/"
            className="inline-block bg-white text-slate-900 px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors"
          >
            Start Audit
          </Link>
        </div>
      </div>
    </div>
  );
}

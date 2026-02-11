
import { AlertCircle, FileText, CheckCircle, Search, Info, ArrowRight, BookOpen } from "lucide-react";
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "How to Read a Nursing Home Inspection Report | Guide",
  description: "Stop being intimidated by federal paperwork. Our guide breaks down the CMS-2567 form so you can find the truth about any Texas nursing home.",
  alternates: {
    canonical: '/resources/reading-inspection-reports',
  },
};

export default function GuidePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-12">
            <Breadcrumbs 
                items={[
                    { label: 'Resources', href: '/resources' },
                    { label: 'Reading Reports', href: '/resources/reading-inspection-reports' }
                ]} 
            />
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-8 mb-6">
            Stop Being Intimidated by the <span className="text-blue-600">CMS-2567</span>.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Federal inspection reports aren't designed to be easy to read. In fact, they look like a phone book from 1995. But hidden inside that paperwork is the truth about how a facility actually treats people when you aren't looking.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-slate prose-lg max-prose">
        <div className="space-y-16">
            
            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-blue-600 pl-4 mb-8">1. The "S&S" Grid: The ONLY Letter That Matters</h2>
                <p className="text-slate-600 leading-relaxed">
                    When you look at a CMS-2567 report, look for a small box or column labeled **S&S** (Scope and Severity). This isn't just a random letter—it's the surveyor's final verdict on how dangerous the situation was.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <span className="text-xs font-black uppercase text-slate-400 tracking-tighter">Level 1 & 2 (A-F)</span>
                        <h4 className="font-bold text-slate-900 mt-1 mb-2">Standard Citations</h4>
                        <p className="text-sm text-slate-500">"Potential for minimal harm." This covers things like paperwork errors or slightly dusty vents. Important, but not a dealbreaker on its own.</p>
                    </div>
                    <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl shadow-sm">
                        <span className="text-xs font-black uppercase text-rose-400 tracking-tighter italic">Level 3 & 4 (G-L)</span>
                        <h4 className="font-bold text-rose-900 mt-1 mb-2">The Real Danger Zone</h4>
                        <p className="text-sm text-rose-700">**G through I** means Actual Harm. **J through L** means "Immediate Jeopardy." If you see these, it means someone was hurt or was in significant danger while under their care.</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-emerald-600 pl-4 mb-8">2. Ignoring the Marketing: Follow the "F-Tags"</h2>
                <p className="text-slate-600 leading-relaxed">
                    Nursing homes will tell you about their "vibrant activities" and "five-star dining." The F-Tags tell you about their failures. These numbers are a universal code used by inspectors.
                </p>
                <div className="space-y-4">
                    <div className="group flex items-start gap-6 p-6 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 transition-all">
                        <div className="font-black text-2xl text-blue-100 group-hover:text-blue-200 transition-colors">F600</div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-900 leading-tight">Abuse & Neglect</h4>
                            <p className="text-slate-500 text-sm mt-1">If you see an F600 citation, stop and read every word. This isn't about paperwork; it's about how the staff interacts with residents. Physical, verbal, or mental abuse are captured here.</p>
                        </div>
                    </div>
                    <div className="group flex items-start gap-6 p-6 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 transition-all">
                        <div className="font-black text-2xl text-blue-100 group-hover:text-blue-200 transition-colors">F689</div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-900 leading-tight">Accidents & Falls</h4>
                            <p className="text-slate-500 text-sm mt-1">Is the building safe? Are there enough staff to help someone get to the bathroom? F689 tracks elopement (residents wandering off) and preventable injuries.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-amber-500 pl-4 mb-8">3. The Three-Year Rule: One Mistake vs. A Culture</h2>
                <p className="text-slate-600 leading-relaxed">
                    Even the best facilities in Texas can have a "bad day." An inspector might find a single unwashed tray in the kitchen (F812). That's a mistake.
                </p>
                <p className="text-slate-600 leading-relaxed bg-amber-50 p-6 rounded-2xl italic">
                    "A pattern of F812 citations over three consecutive years isn't a mistake—it's a management failure. It means the leadership knows there is a problem and hasn't fixed it."
                </p>
                <p className="text-slate-600 leading-relaxed pt-4">
                    When you use our Audit Search, we prioritize these patterns. We look past the single-day snapshots and show you the long-term culture of the building.
                </p>
            </section>

            <div className="bg-slate-900 rounded-[40px] p-10 md:p-14 text-white">
                <h3 className="text-3xl font-black mb-6 leading-tight">The "Touring Parent" Secret</h3>
                <p className="text-slate-400 text-lg mb-8">
                    Next time you tour a nursing home, bring the CMS-2567 with you. Ask the Admissions Director: *"I noticed an F600 violation from last November. What specific changes did you make to the night staff training after that?"*
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                        href="/directory"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center flex items-center justify-center gap-2"
                    >
                        Search Local Audits <ArrowRight size={18} />
                    </Link>
                    <Link 
                        href="/methodology"
                        className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center"
                    >
                        Our Methodology
                    </Link>
                </div>
            </div>

            <section className="border-t border-slate-200 pt-16">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full border-2 border-blue-600 p-1">
                        <div className="w-full h-full bg-slate-200 rounded-full overflow-hidden flex items-center justify-center">
                            <Search className="text-slate-400" size={20} />
                        </div>
                    </div>
                    <div>
                        <span className="block text-sm font-black text-slate-900 tracking-tight">Nursing Home Audit Team</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transparency Project</span>
                    </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xl italic">
                    Disclaimer: This guide is for educational purposes. We are an independent audit project and do not provide legal or medical advice. Always verify data directly with CMS.gov and consult with a professional when making healthcare decisions.
                </p>
            </section>
        </div>
      </article>
    </div>
  );
}

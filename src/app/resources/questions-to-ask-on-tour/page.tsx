
import { MessageCircle, Users, Coffee, Clock, ShieldAlert, ArrowRight, BookOpen, Search, HeartPulse, Sparkles } from "lucide-react";
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "10 Real Questions to Ask During a Nursing Home Tour",
  description: "Don't just look at the lobby. Ask these 10 challenging questions to find out how a facility actually operates behind the scenes.",
  alternates: {
    canonical: '/resources/questions-to-ask-on-tour',
  },
};

export default function QuestionsGuidePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-12">
            <Breadcrumbs 
                items={[
                    { label: 'Resources', href: '/resources' },
                    { label: 'Touring Questions', href: '/resources/questions-to-ask-on-tour' }
                ]} 
            />
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-8 mb-6">
            Beyond the Lobby: <span className="text-emerald-600">10 Questions</span> They Won't Expect.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            When you tour a nursing home, the admissions team is showing you their "highlight reel." To find the truth, you have to ask about the things they don't put in the brochure. 
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-slate prose-lg max-prose">
        <div className="space-y-12">
            
            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex gap-4 items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">1</div>
                    <h2 className="text-xl font-black text-slate-900 m-0">"What is your staffing ratio at 2:00 AM on a Sunday?"</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0">
                    Most facilities boast about their daytime averages. But nights and weekends are when neglect often happens. Ask for the specific headcount of RNs and CNAs during the quietest hours. 
                </p>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex gap-4 items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">2</div>
                    <h2 className="text-xl font-black text-slate-900 m-0">"What percentage of your staff is 'Agency'?"</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0">
                    Agency staff are temporary workers. While they are qualified, they don't know the residents' habits, quirks, or medical history. A high percentage of agency staff often indicates low morale and high turnover.
                </p>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex gap-4 items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">3</div>
                    <h2 className="text-xl font-black text-slate-900 m-0">"Can I talk to a family member of a current resident right now?"</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0">
                    A great facility has nothing to hide. If they hesitate or only want you to talk to "pre-approved" references, that’s a red flag. Check the common areas and speak to families you see visiting spontaneously.
                </p>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md border-rose-100 bg-rose-50/30">
                <div className="flex gap-4 items-center mb-4">
                    <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-black">4</div>
                    <h2 className="text-xl font-black text-slate-900 m-0">"How did you address the F689 citation from 2024?"</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0 italic">
                    **The Auditor's Move**: Use our search to find their specific citations before you go. Asking about a specific violation shows them you are an informed advocate and forces them to explain their improvement plan.
                </p>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex gap-4 items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">5</div>
                    <h2 className="text-xl font-black text-slate-900 m-0">"Can residents eat on their own schedule, or is it strictly 7-12-5?"</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0">
                    Rigid schedules are often about the staff's convenience, not the residents' health. Look for "person-centered" care where a resident can get a snack or a meal whenever they are hungry.
                </p>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex gap-4 items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">6</div>
                    <h2 className="text-xl font-black text-slate-900 m-0">"What is your turnover rate for CNAs?"</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0">
                    CNAs (Certified Nursing Assistants) do 90% of the hands-on care. If the CNAs are leaving every 6 months, your loved one will never have a consistent caregiver who knows their needs.
                </p>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex gap-4 items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">7</div>
                    <h2 className="text-xl font-black text-slate-900 m-0">"How many falls occurred on this floor last month?"</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0">
                    Don't accept "we don't have many." Ask for the number. Every facility tracks this data. Honesty about their fall rates is better than a vague "we're very safe."
                </p>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex gap-4 items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">8</div>
                    <h2 className="text-xl font-black text-slate-900 m-0">"How do you communicate with families during a non-emergency?"</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0">
                    Everyone calls for a fall. But will they call you if your dad didn't eat lunch or seems a bit more confused than usual? Ask for their "Progress Report" policy.
                </p>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex gap-4 items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">9</div>
                    <h2 className="text-xl font-black text-slate-900 m-0">"Who owns this facility?"</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0">
                    Is it a local non-profit or a multi-state private equity group? Ownership often dictates whether the facility prioritizes "Patient Care" or "Profit Margins." 
                </p>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex gap-4 items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">10</div>
                    <h2 className="text-xl font-black text-slate-900 m-0">"Can I see the kitchen?"</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0">
                    If they say no, turn around and leave. The kitchen is the hardest part of a nursing home to keep clean and organized. If they aren't proud of it, there's a reason.
                </p>
            </section>

            <div className="bg-slate-900 rounded-[40px] p-10 md:p-14 text-white mt-16 shadow-2xl shadow-blue-900/20">
                <h3 className="text-3xl font-black mb-6 leading-tight">Ready to Audit a Facility?</h3>
                <p className="text-slate-400 text-lg mb-8">
                    Use our free search to get the "Internal Record" of any nursing home in Texas before you step foot in the lobby.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                        href="/directory"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center flex items-center justify-center gap-2"
                    >
                        Search Local Audits <ArrowRight size={18} />
                    </Link>
                    <Link 
                        href="/resources/reading-inspection-reports"
                        className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center"
                    >
                        How to Read Reports
                    </Link>
                </div>
            </div>
        </div>
      </article>
    </div>
  );
}

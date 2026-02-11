
import { Users, Clock, ShieldCheck, AlertCircle, ArrowRight, BookOpen, Search, Info, TrendingDown, ClipboardCheck } from "lucide-react";
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Understanding Nursing Home Staffing Ratios | Texas Guide",
  description: "Don't let the numbers confuse you. Learn how to calculate 'Real' staffing ratios in Texas nursing homes and why the total hours can be misleading.",
  alternates: {
    canonical: '/resources/staffing-ratios-explained',
  },
};

export default function StaffingGuidePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
            <Breadcrumbs 
                items={[
                    { label: 'Resources', href: '/resources' },
                    { label: 'Staffing Ratios', href: '/resources/staffing-ratios-explained' }
                ]} 
            />
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-8 mb-6">
            The Staffing <span className="text-blue-600">Numbers Game</span>.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Nursing homes love to talk about their "Hours Per Resident Day." But that single number hides a lot of shortcuts. If a facility has one administrator in the office and zero nurses on the floor, the "hours" might look fine, but the care is non-existent.
          </p>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 prose prose-slate prose-lg max-prose">
        <div className="space-y-16">
            
            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-blue-600 pl-4 mb-8">The Three Pillars of Staffing</h2>
                <p className="text-slate-600 leading-relaxed">
                    When you audit a facility's staffing, you need to look at three distinct roles. Each one has a different impact on your loved one's day.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                    <div className="p-6 bg-white border border-slate-200 rounded-[24px]">
                        <h4 className="font-bold text-slate-900 mb-2">RN (Registered Nurse)</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">The clinical leaders. They handle complex assessments and emergencies. High RN hours usually mean better outcomes during a crisis.</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-200 rounded-[24px]">
                        <h4 className="font-bold text-slate-900 mb-2">LPN (Licensed Practical Nurse)</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">The "Med Medics." These nurses primarily handle medications and treatments. Essential, but often overwhelmed if ratios are bad.</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-200 rounded-[24px]">
                        <h4 className="font-bold text-slate-900 mb-2">CNA (Certified Nursing Asst)</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Critical Care. They handle bathing, dressing, and feeding. **90% of a resident's daily interaction is with a CNA.**</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-rose-600 pl-4 mb-8">Why "Averages" are Dangerous</h2>
                <p className="text-slate-600 leading-relaxed">
                    CMS reports a facility's "Total Staffing Hours." But keep in mind: **these are self-reported.** 
                </p>
                <div className="bg-rose-50 border border-rose-100 rounded-[32px] p-8 my-8">
                    <h4 className="flex items-center gap-2 text-rose-900 font-bold mb-4">
                        <AlertCircle size={20} />
                        The Night Shift Vacuum
                    </h4>
                    <p className="text-sm text-rose-800 leading-relaxed m-0">
                        A facility might have great staffing from 9 AM to 5 PM when the State inspectors are likely to visit. But if they drop to 1 CNA for every 30 residents at midnight, that is where falls, neglect, and uncleaned accidents happen. **Always ask for the NIGHT SHIFT ratio.**
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-emerald-600 pl-4 mb-8">What to look for on a tour</h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                    Don't look at the lobby or the fountains. Look at the people.
                </p>
                <ul className="space-y-6 list-none pl-0">
                    <li className="flex gap-4">
                        <div className="shrink-0 p-2 bg-emerald-50 rounded-xl text-emerald-600 h-fit">
                            <ClipboardCheck size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 m-0">Check the Call Light Panel</p>
                            <p className="text-sm text-slate-500 leading-relaxed">Is it constantly beeping? Do you see nurses running, or are they walking with purpose? High-stress "running" usually means they are underwater on their ratios.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="shrink-0 p-2 bg-emerald-50 rounded-xl text-emerald-600 h-fit">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 m-0">The Agency "Frown"</p>
                            <p className="text-sm text-slate-500 leading-relaxed">Ask how many staff are "Agency" (temp workers). Agency staff are expensive and often don't know the residents. If the turnover is high, the care is never consistent.</p>
                        </div>
                    </li>
                </ul>
            </section>

            <div className="bg-slate-900 rounded-[40px] p-10 md:p-14 text-white">
                <h3 className="text-3xl font-black mb-6 leading-tight">Staffing is Safety.</h3>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Our safety scores take staffing levels into account. We cross-reference violation data with hours-per-day to find the facilities that are truly struggling to cover their residents.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                        href="/directory"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center flex items-center justify-center gap-2"
                    >
                        Check Real Rankings <ArrowRight size={18} />
                    </Link>
                    <Link 
                        href="/resources/questions-to-ask-on-tour"
                        className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center"
                    >
                        Touring Questions
                    </Link>
                </div>
            </div>

            <section className="bg-blue-50 rounded-[32px] p-10 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingDown className="text-blue-600" size={24} />
                    <h4 className="text-xl font-black text-blue-900 m-0">The "Staffing Garnish" Warning</h4>
                </div>
                <p className="text-blue-800 text-sm leading-relaxed m-0 italic">
                    Be wary of facilities that count "Administrative RNs" in their clinical staffing ratios. If the Director of Nursing sits in an office all day, they aren't helping your mom out of bed. Always ask for the "Floor Staff" count only.
                </p>
            </section>
        </div>
      </article>
    </div>
  );
}


import { Eye, HeartPulse, Droplets, Utensils, AlertTriangle, ArrowRight, BookOpen, Search, Info } from "lucide-react";
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Recognizing Signs of Nursing Home Neglect | Family Guide",
  description: "Neglect isn't always obvious. Learn the quiet indicators that a nursing home is failing your loved one before a crisis happens.",
  alternates: {
    canonical: '/resources/signs-of-neglect',
  },
};

export default function NeglectGuidePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
            <Breadcrumbs 
                items={[
                    { label: 'Resources', href: '/resources' },
                    { label: 'Signs of Neglect', href: '/resources/signs-of-neglect' }
                ]} 
            />
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-8 mb-6">
            The Quiet Crisis: How to <span className="text-amber-600">Spot Neglect</span>.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Abuse is often loud and visible. Neglect is different—it is a slow, quiet failure of care. In many Texas nursing homes, neglect happens because the facility is understaffed, not because the staff are "bad people."
          </p>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 prose prose-slate prose-lg max-prose">
        <div className="space-y-16">
            
            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-amber-500 pl-4 mb-8">The "Smell Test" & Hygiene</h2>
                <p className="text-slate-600 leading-relaxed">
                    It sounds blunt, but your nose is one of your best auditing tools. A nursing home should smell like a home, not like urine or heavy industrial bleach (which is often used to mask odors).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                    <div className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Droplets className="text-blue-500" size={24} />
                            <h4 className="font-bold text-slate-900 m-0">Incontinence Issues</h4>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed m-0">
                            Check if your loved one is frequently in soiled clothes or if their bedding is damp. This is a primary sign that there aren't enough CNAs to perform "rounds" every two hours as required by safety standards.
                        </p>
                    </div>
                    <div className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="text-blue-500" size={24} />
                            <h4 className="font-bold text-slate-900 m-0">Personal Grooming</h4>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed m-0">
                            Are their nails clipped? Is their hair washed? Are their teeth brushed? When a facility is short-staffed, basic grooming is the first thing to be ignored.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-rose-600 pl-4 mb-8">Clinical Indicators</h2>
                <p className="text-slate-600 leading-relaxed mb-10">
                    Some signs of neglect require a closer look at the resident's physical health. Don't be afraid to pull back the covers or ask for a skin check.
                </p>
                <div className="space-y-6">
                    <div className="flex gap-6 p-8 rounded-[32px] bg-rose-50 border border-rose-100 italic">
                        <div className="shrink-0 w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-lg">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-rose-900 mb-2">Pressure Sores (Bedsores)</h4>
                            <p className="text-rose-800 text-sm leading-relaxed m-0">
                                This is the most common clinical sign of neglect. A Stage 1 or 2 pressure sore (redness that doesn't go away) is a warning. A Stage 3 or 4 sore is a **medical emergency** and usually indicates the resident isn't being turned or repositioned.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 p-8 rounded-[32px] bg-blue-50 border border-blue-100">
                        <div className="shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg">
                            <Utensils size={24} />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-blue-900 mb-2">Unexplained Weight Loss</h4>
                            <p className="text-blue-800 text-sm leading-relaxed m-0">
                                If your loved one is losing weight rapidly, it may not just be "old age." They may not be receiving enough help with feeding, or their water pitcher might be out of reach, leading to dehydration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-slate-900 pl-4 mb-8">Behavioral Red Flags</h2>
                <p className="text-slate-600 leading-relaxed mb-10">
                    Neglect isn't just physical; it's emotional. Watch for changes in how the resident interacts with the environment and staff.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                    <li className="p-6 bg-slate-100 rounded-2xl border border-slate-200">
                        <p className="text-sm font-bold text-slate-900 mb-2">The "Staff-Fear" Response</p>
                        <p className="text-xs text-slate-500 leading-relaxed">Does the resident seem nervous or silent when a specific staff member enters the room? Do they flinch or seem overly apologetic?</p>
                    </li>
                    <li className="p-6 bg-slate-100 rounded-2xl border border-slate-200">
                        <p className="text-sm font-bold text-slate-900 mb-2">Social Withdrawal</p>
                        <p className="text-xs text-slate-500 leading-relaxed">If a social person suddenly stops leaving their room or engaging in activities, they may be suffering from "Learned Helplessness" due to ignored call lights.</p>
                    </li>
                </ul>
            </section>

            <div className="bg-slate-900 rounded-[40px] p-10 md:p-14 text-white">
                <h3 className="text-3xl font-black mb-6 leading-tight">What to do if you spot these signs?</h3>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Trust your gut. Facilities are pros at explaining away "minor" issues. If you see a pattern, it's time to act.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 underline-offset-4">
                    <Link 
                        href="/resources/filing-a-complaint"
                        className="bg-rose-600 hover:bg-rose-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center"
                    >
                        File a Complaint
                    </Link>
                    <Link 
                        href="/resources/resident-rights-texas"
                        className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center flex items-center justify-center gap-2"
                    >
                        Learn Their Rights
                    </Link>
                </div>
            </div>

            <section className="bg-indigo-50 rounded-[32px] p-8 border border-indigo-100 flex gap-6 items-start">
                <div className="p-3 bg-indigo-600 text-white rounded-2xl">
                    <HeartPulse size={24} />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-indigo-900 mb-2 font-black italic underline decoration-indigo-200">The "Auditor's Secret": The Call Light Test</h4>
                    <p className="text-indigo-800 text-sm leading-relaxed m-0">
                        When you visit, sit in the hallway for 15 minutes. Listen for call lights. If you hear a light beeping for more than 5 minutes without a staff member entering the room, that is a definitive sign of chronic understaffing and systemic neglect.
                    </p>
                </div>
            </section>
        </div>
      </article>
    </div>
  );
}

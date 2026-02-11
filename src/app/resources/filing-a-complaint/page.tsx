
import { ClipboardList, Phone, Send, ShieldAlert, ArrowRight, BookOpen, AlertCircle, Info, CheckCircle2, Siren } from "lucide-react";
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "How to File a Nursing Home Complaint in Texas | Step-by-Step Guide",
  description: "Don't feel helpless. Learn the exact steps to file an effective, official complaint with Texas Health and Human Services (HHSC).",
  alternates: {
    canonical: '/resources/filing-a-complaint',
  },
};

export default function ComplaintGuidePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-12">
            <Breadcrumbs 
                items={[
                    { label: 'Resources', href: '/resources' },
                    { label: 'Filing a Complaint', href: '/resources/filing-a-complaint' }
                ]} 
            />
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-8 mb-6">
            How to File an <span className="text-rose-600">Effective</span> Complaint.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Filing a complaint isn't just about complaining—it's about creating a paper trail that the State of Texas is legally required to investigate. If you do it right, you force the facility to change.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-slate prose-lg max-prose">
        <div className="space-y-16">
            
            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-rose-600 pl-4 mb-8">Step 1: Document EVERYTHING</h2>
                <p className="text-slate-600 leading-relaxed font-medium mb-6">
                    The State needs facts, not just feelings. Before you call the hotline, gather these four things:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                        <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                            <Clock size={18} className="text-blue-500" />
                            Time & Date
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">Exact time of the incident or when the problem was discovered.</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                        <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                            <Users size={18} className="text-blue-500" />
                            Who was there?
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">Names of specific staff members involved or witnesses (other families, residents).</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                        <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                            <AlertCircle size={18} className="text-blue-500" />
                            Specific Violation
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">What happened? (e.g., missed medication, fall without report, unsanitary conditions).</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
                        <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                            <Siren size={18} className="text-blue-500" />
                            Physical Evidence
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">Photos of injuries or environmental hazards, if safe to take them.</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-slate-900 pl-4 mb-8">Step 2: Choose Your Path</h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                    Texas gives you three ways to file. You can remain 100% anonymous through all of them.
                </p>
                <div className="space-y-6">
                    <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-600 text-white rounded-xl"><Phone size={20} /></div>
                            <h4 className="text-xl font-black text-blue-900">The Hotline (Fastest)</h4>
                        </div>
                        <p className="text-blue-800 text-lg font-black mb-2">1-800-458-9858</p>
                        <p className="text-blue-700/80 text-sm leading-relaxed">Available Monday–Friday, 7 AM to 6 PM. After hours, you can leave a recorded message that will be tracked the next business morning.</p>
                    </div>

                    <div className="p-8 bg-white border border-slate-200 rounded-[32px] transition-all hover:border-slate-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-slate-900 text-white rounded-xl"><Send size={20} /></div>
                            <h4 className="text-xl font-black text-slate-900">Online Submission</h4>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">Use the Texas HHSC Complaint Portal. This is the best way to attach photos or scanned documents as evidence.</p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 rounded-[40px] p-10 md:p-14 text-white">
                <h3 className="text-3xl font-black mb-6 leading-tight">The "Pro Tip" for Faster Action</h3>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    If you believe your loved one is in immediate danger (e.g., signs of physical abuse or a total lack of nursing staff), use the words **"IMMEDIATE JEOPARDY"** when you call. This triggers a much faster response time from state surveyors.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                        href="/resources/resident-rights-texas"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center"
                    >
                        Learn Their Rights
                    </Link>
                    <Link 
                        href="/directory"
                        className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center flex items-center justify-center gap-2"
                    >
                        Find Alt Facilities <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-black text-slate-900 border-l-4 border-emerald-600 pl-4 mb-8">Step 3: What Happens Next?</h2>
                <div className="space-y-8">
                    <div className="flex gap-6">
                        <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-black">1</div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">State Intake</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">HHSC reviews your complaint and determines the priority level based on the risk of harm described.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-black">2</div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Unannounced Investigation</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">An inspector will visit the facility **without warning**. They will interview staff, review records, and observe care related to your complaint.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-black">3</div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">The Ruling</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">At the end of the investigation, you will receive a formal letter stating whether the complaint was "Substantiated" or "Unsubstantiated."</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-rose-50 border border-rose-100 rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="p-4 bg-rose-600 text-white rounded-2xl shadow-lg">
                    <ShieldAlert size={32} />
                </div>
                <div>
                    <h4 className="text-xl font-bold text-rose-900 mb-2">When to Call 911 Instead</h4>
                    <p className="text-rose-800 text-sm leading-relaxed m-0">
                        The HHSC hotline is for regulatory enforcement. **If you see active abuse, a medical emergency, or a crime in progress, call local police and 911 immediately.** Do not wait for a state inspector.
                    </p>
                </div>
            </div>
        </div>
      </article>
    </div>
  );
}

function Users({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function Clock({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

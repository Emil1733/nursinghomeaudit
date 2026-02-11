
import { Scale, Lock, Heart, ShieldCheck, ArrowRight, BookOpen, AlertCircle, Info } from "lucide-react";
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "The Texas Nursing Home Bill of Rights | Plain English Guide",
  description: "Don't let facilities push you around. Understand the legal rights protected by Texas law for every nursing home resident.",
  alternates: {
    canonical: '/resources/resident-rights-texas',
  },
};

export default function RightsGuidePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-12">
            <Breadcrumbs 
                items={[
                    { label: 'Resources', href: '/resources' },
                    { label: 'Resident Rights', href: '/resources/resident-rights-texas' }
                ]} 
            />
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-8 mb-6">
            The <span className="text-blue-600">Texas Resident</span> Bill of Rights.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            In Texas, moving into a nursing home does not mean giving up your civil rights. The law (Texas Administrative Code Title 26) protects specific freedoms that many facilities unfortunately treat as optional.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-slate prose-lg max-prose">
        <div className="space-y-12">
            
            <section className="relative overflow-hidden bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                <div className="flex gap-4 items-center mb-6">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                        <Scale size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 m-0">Right to Dignity & Privacy</h2>
                </div>
                <p className="text-slate-600 leading-relaxed m-0">
                    This is more than just "being nice." It is a legal requirement. Residents have the right to:
                </p>
                <ul className="mt-4 space-y-2 text-slate-500 text-sm list-none pl-0">
                    <li className="flex gap-2">
                        <div className="text-blue-500 font-bold">•</div>
                        <span>**Full Privacy** during medical treatment, visits, and phone calls.</span>
                    </li>
                    <li className="flex gap-2">
                        <div className="text-blue-500 font-bold">•</div>
                        <span>**Choose their own clothing** and keep personal belongings in their room.</span>
                    </li>
                    <li className="flex gap-2">
                        <div className="text-blue-500 font-bold">•</div>
                        <span>**Respectful Communication**: Staff cannot speak "down" to residents or treat them like children.</span>
                    </li>
                </ul>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                <div className="flex gap-4 items-center mb-6">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                        <Lock size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 m-0">Right to Financial Control</h2>
                </div>
                <p className="text-slate-600 leading-relaxed m-0">
                    The facility is not a bank. Residents have the right to manage their own financial affairs. If they choose to let the facility hold their money, the facility **must** provide a quarterly statement showing every single penny spent.
                </p>
                <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3 text-emerald-800 text-sm">
                    <Info size={18} className="shrink-0" />
                    <p className="m-0 font-medium">Facilities are legally barred from co-mingling resident funds with the facility's business accounts.</p>
                </div>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                <div className="flex gap-4 items-center mb-6">
                    <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
                        <Heart size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 m-0">Right to Information & Choice</h2>
                </div>
                <p className="text-slate-600 leading-relaxed m-0">
                    Residents have the absolute right to choose their own doctor and be fully informed about their medical condition in language they understand.
                </p>
                <ul className="mt-4 space-y-2 text-slate-500 text-sm list-none pl-0">
                    <li className="flex gap-2">
                        <div className="text-rose-500 font-bold">•</div>
                        <span>**Informed Refusal**: Residents can say "No" to any treatment or medication.</span>
                    </li>
                    <li className="flex gap-2">
                        <div className="text-rose-500 font-bold">•</div>
                        <span>**Access to Records**: You have a legal right to review medical records within 24 hours of a request.</span>
                    </li>
                </ul>
            </section>

            <section className="bg-slate-900 rounded-[40px] p-10 md:p-14 text-white">
                <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="text-rose-500" size={28} />
                    <h3 className="text-3xl font-black m-0 leading-tight">The "No-Retaliation" Guarantee</h3>
                </div>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Many families are afraid to speak up because they fear the staff will neglect their loved one in retaliation. **Texas law strictly prohibits retaliation.**
                </p>
                <p className="text-slate-300 text-sm italic border-l-2 border-blue-500 pl-6 mb-8">
                    "A facility cannot discharge, transfer, or punish a resident for filing a complaint or participating in an audit of the facility."
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                        href="/directory"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center flex items-center justify-center gap-2"
                    >
                        Search Local Audits <ArrowRight size={18} />
                    </Link>
                    <Link 
                        href="/resources/questions-to-ask-on-tour"
                        className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all text-center"
                    >
                        Touring Guide
                    </Link>
                </div>
            </section>

            <div className="border-t border-slate-200 pt-16">
                <h4 className="text-lg font-bold text-slate-900 mb-4">How to Report a Violation in Texas</h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                    If any of these rights are being violated, do not wait. You can file an anonymous complaint with the **Texas Health and Human Services Commission (HHSC)**.
                </p>
                <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-sm">
                    <p className="font-bold text-slate-800 mb-2">Texas HHSC Complaint Hotline:</p>
                    <p className="text-blue-600 font-black text-xl mb-0">1-800-458-9858</p>
                    <p className="text-slate-400 mt-2">Available 24/7 for reporting abuse, neglect, or rights violations.</p>
                </div>
            </div>
        </div>
      </article>
    </div>
  );
}

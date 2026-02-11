
import { BookOpen, ShieldCheck, HeartPulse, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Elder Care Resources & Guides | Nursing Home Audit",
  description: "Free educational resources for Texas families. Learn how to choose a safe nursing home, understand resident rights, and interpret health inspections.",
  alternates: {
    canonical: '/resources',
  },
};

const guideCategories = [
  {
    title: "Choosing a Facility",
    description: "Expert advice on selecting the right care environment for your loved ones.",
    icon: <Search className="text-blue-600" size={24} />,
    guides: [
      { name: "How to Read Inspection Reports", slug: "reading-inspection-reports", duration: "5 min read" },
      { name: "10 Questions to Ask During a Tour", slug: "questions-to-ask-on-tour", duration: "8 min read" },
    ]
  },
  {
    title: "Safety & Rights",
    description: "Understand the legal protections and safety standards required by law.",
    icon: <ShieldCheck className="text-emerald-600" size={24} />,
    guides: [
      { name: "Texas Resident Bill of Rights", slug: "resident-rights-texas", duration: "10 min read" },
      { name: "Filing a Complaint: A Step-by-Step Guide", slug: "filing-a-complaint", duration: "6 min read" },
    ]
  },
  {
    title: "Health & Wellbeing",
    description: "Monitoring clinical care and identifying signs of neglect.",
    icon: <HeartPulse className="text-rose-600" size={24} />,
    guides: [
      { name: "Recognizing Signs of Neglect", slug: "signs-of-neglect", duration: "7 min read" },
      { name: "Understanding Staffing Ratios", slug: "staffing-ratios-explained", duration: "5 min read" },
    ]
  }
];

export default function ResourcesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
            <Breadcrumbs items={[{ label: 'Resources', href: '/resources' }]} />
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <BookOpen size={14} />
                Knowledge Base
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-6">
              Empowering Families with <span className="text-blue-600">The Truth</span>.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Deciding on a nursing home is one of the most difficult choices a family can make. Our free resources help you navigate the technical and emotional maze of elder care.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {guideCategories.map((category) => (
            <div key={category.title} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col">
              <div className="mb-6 p-3 bg-slate-50 w-fit rounded-2xl">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{category.title}</h2>
              <p className="text-slate-500 mb-8 border-b border-slate-100 pb-6 leading-relaxed">
                {category.description}
              </p>
              
              <div className="space-y-4 flex-grow">
                {category.guides.map((guide) => (
                  <Link 
                    key={guide.slug}
                    href={`/resources/${guide.slug}`}
                    className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{guide.name}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{guide.duration}</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Methodology Teaser */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
                <h3 className="text-3xl font-black mb-4">How we audit nursing homes.</h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                    Our safety scores are based on objective federal data, not marketing brochures. Learn about our weighted algorithm and data sources.
                </p>
                <Link 
                    href="/methodology"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors"
                >
                    View Our Methodology <ArrowRight size={18} />
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                    <span className="block text-2xl font-black text-blue-400">1,176</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Facilities audited</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                    <span className="block text-2xl font-black text-rose-400">DAILY</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Data updates</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

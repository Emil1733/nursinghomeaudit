
import { HelpCircle, ChevronRight } from 'lucide-react';

interface FAQProps {
  facilityName: string;
  violationsCount: number;
  grade: string;
  score: number;
  city: string;
}

export function FacilityFAQ({ facilityName, violationsCount, grade, score, city }: FAQProps) {
  const faqs = [
    {
      question: `Is ${facilityName} considered a safe facility?`,
      answer: `Based on our recent audit of CMS data, ${facilityName} has a safety grade of "${grade}" and a clinical score of ${score}/100. This assessment is based on recent health inspections and citation frequency compared to the ${city} regional average.`
    },
    {
      question: `How many safety violations does ${facilityName} have?`,
      answer: `${facilityName} currently has ${violationsCount} documented violations on record. You can view the full timeline of these citations, including dates and severity levels, in our violation history section above.`
    },
    {
      question: `How does ${facilityName} compare to other nursing homes in ${city}?`,
      answer: `Our benchmarking shows how ${facilityName} performs relative to other facilities in ${city}. A higher safety grade indicates fewer health citations and better adherence to federal safety standards than local competitors.`
    }
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <HelpCircle size={18} className="text-blue-500" />
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Facility Safety FAQ</h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="group cursor-default">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2 group-hover:text-blue-600 transition-colors">
                <ChevronRight size={16} className="mt-1 shrink-0 text-slate-300 group-hover:text-blue-400 transition-colors" />
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-50 group-hover:border-blue-100 transition-colors">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

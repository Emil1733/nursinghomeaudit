
"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, FileText } from "lucide-react";

interface Violation {
  id: string;
  citation_date: string;
  citation_code?: string;
  description: string;
  long_description?: string;
  severity_scope?: string;
}

export function CitationTimeline({ violations }: { violations: Violation[] }) {
  if (!violations || violations.length === 0) {
    return (
      <div className="bg-emerald-50 text-emerald-800 p-8 rounded-3xl flex flex-col items-center text-center gap-4 border border-emerald-100">
        <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
          <CheckCircle size={32} />
        </div>
        <div>
          <h3 className="font-bold text-lg">Clean Record</h3>
          <p className="text-sm opacity-80">No violations found for this facility in our current records.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {violations.map((v) => (
        <CitationCard key={v.id} violation={v} />
      ))}
    </div>
  );
}

function CitationCard({ violation }: { violation: Violation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const narrative = violation.long_description || violation.description;
  const shouldTruncate = narrative.length > 200;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-slate-300">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
              <AlertTriangle size={18} />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                CITATION DATE
              </span>
              <span className="text-sm font-black text-slate-900">
                {new Date(violation.citation_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
          
          {violation.citation_code && (
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <FileText size={12} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                F-TAG: {violation.citation_code}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 leading-snug group-hover:text-rose-600 transition-colors">
            {violation.description}
          </h4>
          
          <div className="text-slate-600 leading-relaxed text-sm">
            <p className={isExpanded ? "" : "line-clamp-3"}>
              {narrative}
            </p>
            
            {shouldTruncate && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 text-rose-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 hover:text-rose-700 transition-all"
              >
                {isExpanded ? (
                  <>Collapse Narrative <ChevronUp size={14} /></>
                ) : (
                  <>View Full Narrative <ChevronDown size={14} /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Visual Indicator of Severity (Mocked for now) */}
      <div className="bg-slate-50 border-t border-slate-100 px-5 py-2 flex items-center justify-between">
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scope & Severity</span>
         <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full uppercase">High Impact</span>
      </div>
    </div>
  );
}

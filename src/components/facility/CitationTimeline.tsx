"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";

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
      <div className="noted-status p-12 flex flex-col items-center text-center gap-4">
        <div className="serif-heading text-xl font-black text-slate-400 italic">No Documented Citations</div>
        <p className="mono-data text-[10px] uppercase font-bold text-slate-300">Clean Regulatory Ledger for Selected Period</p>
      </div>
    );
  }

  return (
    <div className="intelligence-grid bg-white border-collapse" id="violation-ledger">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b-2 border-ink bg-paper">
            <th className="mono-data text-[9px] font-black uppercase tracking-widest p-4 text-slate-500">Date</th>
            <th className="mono-data text-[9px] font-black uppercase tracking-widest p-4 text-slate-500">Classification</th>
            <th className="mono-data text-[9px] font-black uppercase tracking-widest p-4 text-slate-500 hidden md:table-cell">Severity Binder</th>
            <th className="mono-data text-[9px] font-black uppercase tracking-widest p-4 text-slate-500 text-right">Records</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-light">
          {violations.map((v) => (
            <ViolationRow key={v.id} violation={v} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ViolationRow({ violation }: { violation: Violation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isHarm = ['G', 'H', 'I', 'J', 'K', 'L'].includes(violation.severity_scope || 'D');
  const narrative = violation.long_description || violation.description;

  return (
    <>
      <tr 
        className={`group cursor-pointer hover:bg-slate-50/50 transition-colors ${isExpanded ? 'bg-paper' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="p-4 align-top">
          <span className="mono-data text-[11px] font-black text-ink whitespace-nowrap">
            {new Date(violation.citation_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
          </span>
        </td>
        <td className="p-4 align-top">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`serif-heading text-sm font-bold leading-tight ${isHarm ? 'text-burgundy-critical underline decoration-burgundy-critical/30 underline-offset-4' : 'text-ink'}`}>
                      {violation.description}
                  </span>
                  {isHarm && <span className="mono-data text-[7px] font-black text-burgundy-critical border border-burgundy-critical/40 bg-burgundy-critical/5 px-1 py-0.5 whitespace-nowrap">SEVERITY_HARM_DETECTED</span>}
                </div>
                {violation.citation_code && (
                    <div className="flex items-center gap-1.5 opacity-40">
                        <FileText size={10} />
                        <span className="mono-data text-[9px] font-black uppercase">Ref: F-{violation.citation_code}</span>
                    </div>
                )}
            </div>
        </td>
        <td className="p-4 align-top hidden md:table-cell">
            {isHarm ? (
                <div className="bg-burgundy-critical text-white px-2 py-1 text-[8px] font-black uppercase tracking-widest inline-block shadow-[3px_3px_0px_#741919]">
                    Level: Actual Harm
                </div>
            ) : (
                <div className="bg-slate-100 text-slate-500 px-2 py-1 text-[8px] font-black uppercase tracking-widest inline-block border border-slate-200">
                    Level: Potential
                </div>
            )}
        </td>
        <td className="p-4 align-top text-right">
            <button className="text-ink transition-transform duration-300">
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={4} className="p-8 bg-paper/50">
            <div className="max-w-3xl border-l border-ink/20 pl-8">
                <h5 className="mono-data text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Technical Documentation & Narrative</h5>
                <div className="serif-heading text-sm leading-relaxed text-slate-700 italic border-b border-border-light pb-6 mb-6">
                    "{narrative}"
                </div>
                <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col gap-1">
                        <span className="mono-data text-[8px] font-bold text-slate-400 uppercase tracking-widest">Scope Identifier</span>
                        <span className="mono-data text-[10px] font-black">{violation.severity_scope || 'UNCLASSIFIED'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="mono-data text-[8px] font-bold text-slate-400 uppercase tracking-widest">Regulatory Tag</span>
                        <span className="mono-data text-[10px] font-black">CMS-F{violation.citation_code || <span className="text-slate-200">[ UNK ]</span>}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="mono-data text-[8px] font-bold text-slate-400 uppercase tracking-widest">Audit Status</span>
                        <span className="mono-data text-[10px] font-black uppercase">Verified • Public Record</span>
                    </div>
                </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

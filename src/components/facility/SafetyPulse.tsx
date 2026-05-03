import { ShieldCheck, ShieldAlert, ShieldEllipsis, Sparkles } from 'lucide-react';
import { AISummary } from '@/lib/intelligence';

export function SafetyPulse({ summary }: { summary: AISummary }) {
  const isPositive = summary.tone === 'positive';
  const isWarning = summary.tone === 'warning';

  return (
    <div className="relative overflow-hidden border-2 border-slate-900 p-8 intelligence-grid bg-white">
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-4 bg-slate-900 text-white`}>
          {isPositive ? <ShieldCheck size={28} strokeWidth={1} /> : isWarning ? <ShieldAlert size={28} strokeWidth={1} /> : <ShieldEllipsis size={28} strokeWidth={1} />}
        </div>
        <div>
          <h3 className="serif-heading text-xl font-black text-ink uppercase tracking-tight flex items-center gap-2 leading-none">
            Operational Synthesis
          </h3>
          <p className="mono-data text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">AI-AUGMENTED RISK AUDIT • VER_1.0</p>
        </div>
      </div>

      <ul className="space-y-6" itemProp="description">
        {summary.bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-5 group" itemProp="reviewAspect">
            <span className={`mt-2 h-1 w-4 shrink-0 bg-slate-900 opacity-20 group-hover:opacity-100 transition-opacity`} />
            <p className="text-sm text-ink leading-relaxed font-semibold italic">
              "{bullet}"
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-10 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
            <div className={`h-2 w-2 ${isPositive ? 'bg-heritage-blue' : isWarning ? 'bg-burgundy' : 'bg-slate-300'}`}></div>
            <span className="mono-data text-[10px] font-black uppercase tracking-widest text-slate-500">
                Source: Department of Health and Human Services • Inspection History • Oct 2026
            </span>
        </div>
      </div>
    </div>
  );
}

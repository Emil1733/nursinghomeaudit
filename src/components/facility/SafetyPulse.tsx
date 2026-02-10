
import { ShieldCheck, ShieldAlert, ShieldEllipsis, Sparkles } from 'lucide-react';
import { AISummary } from '@/lib/intelligence';

export function SafetyPulse({ summary }: { summary: AISummary }) {
  const isPositive = summary.tone === 'positive';
  const isWarning = summary.tone === 'warning';

  return (
    <div className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-500 ${
      isPositive ? 'bg-emerald-50/50 border-emerald-100' : 
      isWarning ? 'bg-rose-50/50 border-rose-100' : 
      'bg-slate-50/50 border-slate-100'
    }`}>
      {/* Decorative Blur */}
      <div className={`absolute -top-12 -right-12 h-32 w-32 blur-3xl rounded-full opacity-20 ${
        isPositive ? 'bg-emerald-400' : isWarning ? 'bg-rose-400' : 'bg-slate-400'
      }`} />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-xl ${
            isPositive ? 'bg-emerald-100 text-emerald-600' : 
            isWarning ? 'bg-rose-100 text-rose-600' : 
            'bg-slate-100 text-slate-600'
          }`}>
            {isPositive ? <ShieldCheck size={20} /> : isWarning ? <ShieldAlert size={20} /> : <ShieldEllipsis size={20} />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              Safety Pulse
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">AI-GENERATED FAMILY INSIGHTS</p>
          </div>
        </div>

        <ul className="space-y-4">
          {summary.bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-4 group">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-transform group-hover:scale-150 ${
                isPositive ? 'bg-emerald-400' : isWarning ? 'bg-rose-400' : 'bg-slate-400'
              }`} />
              <p className="text-sm text-slate-600 leading-relaxed font-medium group-hover:text-slate-900 transition-colors">
                {bullet}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-4 border-t border-slate-100/50">
          <p className="text-[10px] text-slate-400 italic">
            Note: This summary is generated from recently documented safety inspections and citations.
          </p>
        </div>
      </div>
    </div>
  );
}

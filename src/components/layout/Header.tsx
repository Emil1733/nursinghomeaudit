import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-slate-900 sticky top-0 z-50 intelligence-grid">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <div className="flex flex-col border-l-4 border-slate-900 pl-4">
            <span className="serif-heading font-black text-2xl tracking-tighter text-ink leading-none uppercase">
              Audit <span className="opacity-30 italic">Registry</span>
            </span>
            <span className="mono-data text-[8px] font-black uppercase tracking-[0.5em] text-heritage-blue mt-1 leading-none">
              Federal Oversight Hub • Texas_Jurisdiction
            </span>
          </div>
        </Link>

        {/* Minimalist Command-Style Search (Visual Mockup) */}
        <div className="hidden lg:flex flex-1 max-w-lg mx-16">
            <div className="w-full bg-slate-50 border border-slate-200 px-6 py-2 flex items-center gap-3 focus-within:border-slate-900 transition-colors">
                <span className="mono-data text-[10px] text-slate-400 font-black">QUERY_PROTOCOL:</span>
                <input 
                    type="text" 
                    placeholder="FIND_FACILITY_OR_REGION..." 
                    className="bg-transparent border-none outline-none ring-0 text-[11px] font-black mono-data w-full placeholder:text-slate-300 uppercase tracking-widest"
                />
            </div>
        </div>

        <nav className="flex items-center gap-8">
          <Link href="/directory" className="mono-data text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-ink transition-colors">
            [ ARCHIVE ]
          </Link>
          <Link 
            href="/directory" 
            className="bg-slate-900 text-white px-8 py-3 mono-data text-[10px] font-black uppercase tracking-[0.3em] hover:bg-heritage-blue transition-all"
          >
            Generate_Report
          </Link>
        </nav>
      </div>
    </header>
  );
}

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center group transition-all">
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-slate-900 leading-none">
              NursingHome<span className="text-rose-600">Audit</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-1 leading-none">
              Transparency Project
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/directory" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            Directory
          </Link>
          <Link href="/about" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            About
          </Link>
          <Link 
            href="/directory" 
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-600/20 transition-all"
          >
            Start Audit
          </Link>
        </nav>
      </div>
    </header>
  );
}

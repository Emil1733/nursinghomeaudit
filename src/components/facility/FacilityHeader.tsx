import { MapPin, Building2, ShieldAlert, Briefcase } from "lucide-react";
import Link from "next/link";

interface Facility {
  name: string;
  address?: string;
  city: string;
  state: string;
  zip_code?: string;
  license_number?: string;
  owner_name?: string;
  is_private_equity_owned?: boolean;
  ownership_type?: string;
}

export function FacilityHeader({ facility }: { facility: Facility }) {
  const isPE = facility.is_private_equity_owned;
  const isREIT = facility.ownership_type?.toLowerCase().includes('reit');

  return (
    <div className="mb-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="noted-status px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-slate-500">
            Official Audit Record
          </div>
          {isPE && (
            <div className="critical-status px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-burgundy-critical flex items-center gap-1">
              <ShieldAlert size={10} />
              Private Equity Oversight Required
            </div>
          )}
          {isREIT && (
             <div className="noted-status px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-slate-500 border-ink/20">
              Structured Asset / REIT
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-ink pb-6">
          <div className="flex-1">
            <h1 className="serif-heading text-4xl md:text-5xl font-black text-ink leading-[0.9] tracking-tighter mb-4">
              {facility.name}
            </h1>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-500 mono-data text-xs font-bold uppercase tracking-wider">
                    <MapPin size={12} />
                    <span>
                    <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${facility.address}, ${facility.city}, ${facility.state} ${facility.zip_code}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-ink transition-colors"
                    >
                        {facility.address}
                    </a>
                    , <Link href={`/city/${facility.city.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-ink transition-colors">{facility.city}</Link>, {facility.state} {facility.zip_code}
                    </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">License:</span>
                        <span className="mono-data text-[10px] font-black">{facility.license_number || <span className="text-[9px] text-slate-300 font-bold">[ NO_RECORD_ON_FILE ]</span>}</span>
                    </div>
                    {facility.owner_name && (
                        <div className="flex items-center gap-1">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Operator:</span>
                            <span className="mono-data text-[10px] font-black truncate max-w-[200px]">{facility.owner_name}</span>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

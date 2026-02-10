
import { MapPin, Building2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Facility {
  name: string;
  address?: string;
  city: string;
  state: string;
  zip_code?: string;
  license_number?: string;
  owner_name?: string;
}

export function FacilityHeader({ facility }: { facility: Facility }) {
  return (
    <div className="mb-8">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Search
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm tracking-wide uppercase mb-2">
            <Building2 size={16} />
            Nursing Facility
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            {facility.name}
          </h1>
          <div className="flex items-center gap-2 text-slate-600 text-lg">
            <MapPin size={20} className="shrink-0" />
            <span>
              {facility.address}, {facility.city}, {facility.state} {facility.zip_code}
            </span>
          </div>
          {facility.owner_name && (
            <p className="mt-3 text-sm text-slate-400">
              Owned by: <span className="font-medium text-slate-600">{facility.owner_name}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { MapPin, Building2, FileWarning } from "lucide-react";

interface FacilityHeaderProps {
  name: string;
  address: string;
  city: string;
  state: string;
  citationCount: number;
}

export function FacilityHeader({ name, address, city, state, citationCount }: FacilityHeaderProps) {
  return (
    <div className="bg-primary text-primary-foreground p-6 md:p-8 rounded-lg mb-6 shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-secondary mb-1">
            <Building2 className="w-4 h-4" />
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest">Licensed Nursing Facility</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif leading-tight">{name}</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-primary-foreground/80 text-sm">
            <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{address}, {city}, {state}</span>
            </div>
          </div>
        </div>
        
        {citationCount > 0 && (
          <div className="w-full md:w-auto bg-destructive/10 border border-destructive/20 p-4 rounded text-destructive-foreground flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 min-w-[120px]">
            <div className="flex items-center gap-2 md:hidden">
                <FileWarning className="w-5 h-5 text-destructive" />
                <span className="font-bold uppercase text-xs">Violations Found</span>
            </div>
            <FileWarning className="w-6 h-6 text-destructive hidden md:block" />
            <span className="text-2xl font-bold font-mono text-destructive">{citationCount}</span>
            <span className="text-xs uppercase hidden md:block">Citations</span>
          </div>
        )}
      </div>
    </div>
  );
}

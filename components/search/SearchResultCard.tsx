import Link from "next/link";
import { type FacilityDetails } from "@/lib/queries";
import { Shield, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResultCardProps {
  facility: FacilityDetails;
}

export function SearchResultCard({ facility }: SearchResultCardProps) {
  // Agent Design: Color coding based on score
  let scoreColor = "text-secondary";
  let borderColor = "border-secondary/20";
  
  if (facility.adjusted_total_score < 60) {
    scoreColor = "text-destructive";
    borderColor = "border-destructive/20";
  } else if (facility.adjusted_total_score < 80) {
    scoreColor = "text-orange-500";
    borderColor = "border-orange-500/20";
  }

  return (
    <Link href={`/facility/${facility.id}`} className="block group">
      <div className={cn("bg-white p-6 rounded-lg border shadow-sm transition-all hover:shadow-md hover:scale-[1.01]", borderColor)}>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold font-serif text-primary group-hover:underline decoration-secondary/30 underline-offset-4">
                    {facility.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{facility.city}, {facility.state}</span>
                </div>
            </div>

            <div className="flex flex-col items-end">
                <div className={cn("flex items-center gap-1 font-mono font-bold text-xl", scoreColor)}>
                    <Shield className="w-5 h-5 fill-current opacity-20" />
                    <span>{facility.adjusted_total_score}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Safety Score</span>
            </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between border-t border-muted pt-3">
             <span className="text-xs text-muted-foreground">
                {facility.total_beds ? `${facility.total_beds} Beds` : 'Capacity Unknown'}
             </span>
             <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Audit <ArrowRight className="w-3 h-3" />
             </span>
        </div>
      </div>
    </Link>
  );
}

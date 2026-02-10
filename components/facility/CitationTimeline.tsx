import { AlertTriangle, Calendar, FileText } from "lucide-react";

interface Violation {
  id: string;
  date: string;
  tagCode: string; // e.g., F-323
  severity: string; // e.g., "G"
  description: string;
}

interface CitationTimelineProps {
  violations: Violation[];
}

export function CitationTimeline({ violations }: CitationTimelineProps) {
  // Agent Design: Vertical Timeline is best for Mobile ("Thumb Zone")
  // Sort by date descending (newest first)
  const sorted = [...violations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
      {sorted.map((v, index) => (
        <div key={v.id} className="relative flex items-start group">
            {/* Timeline Dot */}
            <div className="absolute left-0 mt-1.5 ml-1.5 -translate-x-1/2 w-7 h-7 bg-background border-2 border-muted rounded-full flex items-center justify-center group-hover:border-destructive group-hover:scale-110 transition-all z-10">
                <div className={`w-2.5 h-2.5 rounded-full ${v.severity === 'J' || v.severity === 'K' || v.severity === 'L' ? 'bg-destructive' : 'bg-secondary'}`} />
            </div>

            {/* Content Card */}
            <div className="ml-10 w-full">
                <div className="bg-card border border-muted p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-muted text-foreground">
                                <FileText className="w-3 h-3" />
                                {v.tagCode}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {v.date}
                            </span>
                        </div>
                        {/* Severity Badge */}
                        <span className={`text-xs font-bold px-2 py-1 rounded self-start md:self-auto ${
                            v.severity === 'J' || v.severity === 'K' || v.severity === 'L' 
                            ? 'bg-destructive/10 text-destructive' 
                            : 'bg-secondary/10 text-secondary'
                        }`}>
                            Severity: {v.severity}
                        </span>
                    </div>
                    
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                        {v.severity === 'J' ? "Immediate Jeopardy: " : ""}{v.description.substring(0, 100)}...
                    </h4>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Full citation details available in report.
                    </p>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}

import { cn } from "@/lib/utils";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

interface SafetyScoreGaugeProps {
  score: number;
}

export function SafetyScoreGauge({ score }: SafetyScoreGaugeProps) {
  // Logic from Agent Data: 0-100 Score
  // Agent Design: Navy/Teal/Red Palette
  
  let colorClass = "text-primary";
  let Icon = ShieldCheck;
  let grade = "A";
  let label = "Excellent Safety Record";

  if (score < 60) {
    colorClass = "text-destructive"; // Red
    Icon = ShieldX;
    grade = "F";
    label = "Critical Deficiencies Found";
  } else if (score < 80) {
    colorClass = "text-orange-500"; // Warning (using Tailwind utility if needed, or muted)
    Icon = ShieldAlert;
    grade = "C";
    label = "Below Average Safety";
  } else {
    colorClass = "text-secondary"; // Teal
    grade = "A";
    label = "Meets Safety Standards";
  }

  return (
    <div className="flex items-center gap-4 p-6 bg-white border border-muted rounded-lg shadow-sm">
      <div className={cn("relative flex items-center justify-center w-24 h-24 rounded-full border-4", colorClass.replace("text-", "border-"))}>
        <div className="text-3xl font-bold font-mono">{score}</div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Safety Score</h3>
        <div className="flex items-center gap-2">
            <span className={cn("text-4xl font-bold", colorClass)}>{grade}</span>
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{label}</span>
                <span className="text-xs text-muted-foreground">Based on state citation history</span>
            </div>
        </div>
      </div>
    </div>
  );
}

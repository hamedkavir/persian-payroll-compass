import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "navy" | "teal" | "info" | "warning";

const toneStyles: Record<Tone, string> = {
  navy: "bg-primary text-primary-foreground",
  teal: "bg-teal-soft text-teal",
  info: "bg-info-soft text-info",
  warning: "bg-warning-soft text-warning",
};

export function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  tone,
  change,
  changeLabel,
  footnote,
}: {
  label: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  tone: Tone;
  change?: { text: string; positive: boolean };
  changeLabel?: string;
  footnote?: string;
}) {
  return (
    <Card className="flex flex-col gap-5 p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", toneStyles[tone])}>
          <Icon className="size-5" />
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="tabular text-[1.75rem] font-bold leading-none tracking-tight text-foreground">
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      <div className="flex items-center gap-2 border-t border-border/70 pt-4 text-xs">
        {change && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
              change.positive ? "bg-success-soft text-success" : "bg-destructive-soft text-destructive",
            )}
          >
            {change.positive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
            {change.text}
          </span>
        )}
        <span className="text-muted-foreground">{changeLabel ?? footnote}</span>
      </div>
    </Card>
  );
}

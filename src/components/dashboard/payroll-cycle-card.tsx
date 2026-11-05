import { Check, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { company, payrollCycle } from "@/lib/demo-data";
import { faNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PayrollCycleCard() {
  const done = payrollCycle.filter((s) => s.status === "done").length;
  const percent = Math.round((done / payrollCycle.length) * 100);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">چرخه حقوق {company.currentPeriod}</CardTitle>
          <span className="rounded-full bg-warning-soft px-2.5 py-1 text-xs font-medium text-warning">
            در جریان
          </span>
        </div>
        <CardDescription>مرحله {faNumber(done + 1)} از {faNumber(payrollCycle.length)}</CardDescription>
        <div className="flex items-center gap-3 pt-2">
          <Progress value={percent} className="h-2 bg-muted [&>div]:bg-teal" />
          <span className="tabular text-xs font-semibold text-foreground">٪{faNumber(percent)}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <ol className="relative space-y-0">
          {payrollCycle.map((step, i) => (
            <li key={step.title} className="relative flex gap-3 pb-4 last:pb-0">
              {i < payrollCycle.length - 1 && (
                <span
                  className={cn(
                    "absolute right-[13px] top-7 h-[calc(100%-1.25rem)] w-px",
                    step.status === "done" ? "bg-teal" : "bg-border",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex size-[27px] shrink-0 items-center justify-center rounded-full border text-xs",
                  step.status === "done" && "border-teal bg-teal text-teal-foreground",
                  step.status === "current" && "border-warning bg-warning-soft text-warning",
                  step.status === "pending" && "border-border bg-card text-muted-foreground",
                )}
              >
                {step.status === "done" ? (
                  <Check className="size-3.5" strokeWidth={3} />
                ) : step.status === "current" ? (
                  <Clock className="size-3.5" />
                ) : (
                  faNumber(i + 1)
                )}
              </span>
              <div className="min-w-0 pt-0.5">
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.status === "pending" ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-auto pt-6">
          <Button className="w-full rounded-xl" size="lg">
            بررسی و تأیید لیست حقوق
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

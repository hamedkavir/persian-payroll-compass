import { CalendarClock, Check, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { company, payrollCycle, type CycleStepStatus } from "@/lib/demo-data";
import { faNumber, faPercent, jalaliDayMonth } from "@/lib/format";
import { cn } from "@/lib/utils";

const datePrefix: Record<CycleStepStatus, string> = {
  done: "انجام شد",
  current: "مهلت",
  pending: "برنامه",
};

const segmentTone: Record<CycleStepStatus, string> = {
  done: "bg-teal",
  current: "bg-warning",
  pending: "bg-border",
};

/**
 * Payroll period workflow. Vertical steps in narrow layouts; switches to a
 * horizontal stepper when the card itself is wide (tablet / stacked layout).
 */
export function PayrollCycleCard() {
  const total = payrollCycle.length;
  const done = payrollCycle.filter((s) => s.status === "done").length;
  const current = payrollCycle.find((s) => s.status === "current");
  const percent = Math.round((done / total) * 100);

  return (
    <Card className="@container flex flex-col">
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle>چرخه حقوق {company.currentPeriod}</CardTitle>
            <CardDescription>
              مرحله {faNumber(done + 1)} از {faNumber(total)}
              {current && <> · {current.title}</>}
            </CardDescription>
          </div>
          <Badge variant="warning" className="mt-0.5 shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 font-medium">
            در جریان
          </Badge>
        </div>

        <div className="rounded-xl bg-muted/60 px-3.5 py-3">
          <div className="mb-2.5 flex items-center justify-between gap-3 text-xs">
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {faNumber(done)} از {faNumber(total)}
              </span>{" "}
              مرحله تکمیل شده
            </span>
            <span className="tabular font-semibold text-foreground">{faPercent(percent, 0)}</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="پیشرفت چرخه حقوق"
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
          >
            {payrollCycle.map((step) => (
              <span key={step.title} className={cn("h-1.5 rounded-full", segmentTone[step.status])} />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        <ol className="flex flex-col @2xl:flex-row">
          {payrollCycle.map((step, i) => {
            const isLast = i === total - 1;
            return (
              <li
                key={step.title}
                aria-current={step.status === "current" ? "step" : undefined}
                className="relative flex gap-3 pb-3 last:pb-0 @2xl:flex-1 @2xl:flex-col @2xl:items-center @2xl:gap-2.5 @2xl:px-1.5 @2xl:pb-0 @2xl:text-center"
              >
                {!isLast && (
                  <>
                    {/* vertical connector */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute right-[13.5px] top-8 bottom-1 w-0.5 rounded-full @2xl:hidden",
                        step.status === "done" ? "bg-teal" : "bg-border",
                      )}
                    />
                    {/* horizontal connector (next step sits to the left in RTL) */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-[13px] left-[calc(-50%+22px)] right-[calc(50%+22px)] hidden h-0.5 rounded-full @2xl:block",
                        step.status === "done" ? "bg-teal" : "bg-border",
                      )}
                    />
                  </>
                )}

                <span
                  className={cn(
                    "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold",
                    step.status === "done" && "border-teal bg-teal text-teal-foreground",
                    step.status === "current" &&
                      "border-warning bg-card text-warning ring-4 ring-warning-soft",
                    step.status === "pending" && "border-border bg-card text-muted-foreground",
                  )}
                >
                  {step.status === "done" ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : step.status === "current" ? (
                    <Clock className="size-3.5" strokeWidth={2.5} />
                  ) : (
                    faNumber(i + 1)
                  )}
                </span>

                <div
                  className={cn(
                    "min-w-0 flex-1 rounded-xl px-3 py-1.5 -mt-1.5 @2xl:mt-0 @2xl:w-full @2xl:px-2",
                    step.status === "current" && "bg-warning-soft/70",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 @2xl:justify-center">
                    <p
                      className={cn(
                        "text-sm",
                        step.status === "pending"
                          ? "font-medium text-muted-foreground"
                          : "font-semibold text-foreground",
                      )}
                    >
                      {step.title}
                    </p>
                    {step.status === "current" && (
                      <span className="rounded-full bg-warning px-2 text-xs font-medium leading-5 text-card">
                        در حال انجام
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{step.owner}</p>
                  <p
                    className={cn(
                      "tabular text-xs",
                      step.status === "done" && "text-success",
                      step.status === "current" && "font-medium text-warning",
                      step.status === "pending" && "text-muted-foreground",
                    )}
                  >
                    {datePrefix[step.status]}: {jalaliDayMonth(step.date)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-auto flex flex-col gap-3 pt-5 @2xl:flex-row @2xl:items-center @2xl:justify-between">
          {current && (
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClock className="size-4 shrink-0 text-warning" />
              مهلت تأیید لیست:{" "}
              <span className="font-semibold text-foreground">{jalaliDayMonth(current.date)}</span>
            </p>
          )}
          <Button className="w-full rounded-xl @2xl:w-auto @2xl:px-6" size="lg">
            بررسی و تأیید لیست حقوق
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { ClientOnly } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyPayroll } from "@/lib/demo-data";
import { faNumber } from "@/lib/format";

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-44 rounded-xl border border-border bg-popover px-3.5 py-3 text-sm shadow-raised">
      <p className="mb-2 font-semibold text-foreground">{label} ماه</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="size-2.5 rounded-sm" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="tabular font-semibold text-foreground">
            {faNumber(Number(p.value), 1)}
          </span>
        </div>
      ))}
      <p className="mt-2 border-t border-border pt-2 text-xs text-muted-foreground">
        ارقام به میلیارد ریال
      </p>
    </div>
  );
}

export function PayrollOverviewChart() {
  return (
    <Card className="@5xl:col-span-2">
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-x-6 gap-y-3 pb-2 md:pb-2">
        <div className="min-w-0">
          <CardTitle>روند ماهانه حقوق و دستمزد</CardTitle>
          <CardDescription>مقایسه ناخالص و خالص پرداختی · {faNumber(12)} ماه اخیر (میلیارد ریال)</CardDescription>
        </div>
        <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-chart-1" /> حقوق ناخالص
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-chart-2" /> خالص پرداختی
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-4 md:px-6 md:pb-5">
        <div className="h-64 w-full md:h-72">
          <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-xl bg-muted/60" />}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyPayroll} barGap={3} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
                <XAxis
                  dataKey="month"
                  reversed
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                  minTickGap={6}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12, fontFamily: "Vazirmatn" }}
                  tickMargin={10}
                />
                <YAxis
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  width={44}
                  tickFormatter={(v: number) => faNumber(v)}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12, fontFamily: "Vazirmatn" }}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)", radius: 8 }} />
                <Bar dataKey="gross" name="حقوق ناخالص" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={18} />
                <Bar dataKey="net" name="خالص پرداختی" fill="var(--chart-2)" radius={[6, 6, 0, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </ClientOnly>
        </div>
      </CardContent>
    </Card>
  );
}

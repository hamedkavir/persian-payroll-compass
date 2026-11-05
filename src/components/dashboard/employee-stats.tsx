import { ClientOnly } from "@tanstack/react-router";
import { AlarmClock } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contractTypes, deadlines, departments } from "@/lib/demo-data";
import { faNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export function DepartmentChart() {
  const total = departments.reduce((s, d) => s + d.count, 0);
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">ترکیب کارکنان بر اساس واحد</CardTitle>
        <CardDescription>مجموع {faNumber(total)} نفر نیروی فعال</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mx-auto h-44 w-44">
          <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-full bg-muted/60" />}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departments}
                  dataKey="count"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={84}
                  paddingAngle={2}
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                >
                  {departments.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number, n: string) => [`${faNumber(v)} نفر`, n]}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    fontFamily: "Vazirmatn",
                    fontSize: 12,
                    direction: "rtl",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ClientOnly>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="tabular text-2xl font-bold text-foreground">{faNumber(total)}</span>
            <span className="text-xs text-muted-foreground">نفر</span>
          </div>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
          {departments.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-2 text-xs">
              <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
                <span className="size-2.5 shrink-0 rounded-sm" style={{ background: d.color }} />
                <span className="truncate">{d.name}</span>
              </span>
              <span className="tabular font-semibold text-foreground">{faNumber(d.count)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function ContractTypesCard() {
  const total = contractTypes.reduce((s, c) => s + c.count, 0);
  const genders = { male: 268, female: 144 };
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">نوع قرارداد و ترکیب نیرو</CardTitle>
        <CardDescription>وضعیت استخدامی کارکنان فعال</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {contractTypes.map((c, i) => {
          const pct = (c.count / total) * 100;
          return (
            <div key={c.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-foreground">{c.label}</span>
                <span className="tabular text-muted-foreground">
                  <span className="font-semibold text-foreground">{faNumber(c.count)}</span> نفر ·
                  ٪{faNumber(pct, 0)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full", i === 0 ? "bg-chart-1" : i === 1 ? "bg-chart-2" : i === 2 ? "bg-chart-3" : "bg-chart-4")}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
        <div className="grid grid-cols-3 gap-3 border-t border-border/70 pt-5">
          {[
            { label: "آقایان", value: faNumber(genders.male) },
            { label: "بانوان", value: faNumber(genders.female) },
            { label: "میانگین سابقه", value: `${faNumber(6.4, 1)} سال` },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-muted/60 px-3 py-2.5 text-center">
              <p className="tabular text-sm font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const toneDot = {
  warning: "bg-warning-soft text-warning",
  teal: "bg-teal-soft text-teal",
  info: "bg-info-soft text-info",
};

export function DeadlinesCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">سررسیدهای پیش‌رو</CardTitle>
        <CardDescription>تکالیف قانونی و مالی این ماه</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border/70">
          {deadlines.map((d) => (
            <li key={d.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", toneDot[d.tone])}>
                <AlarmClock className="size-[18px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{d.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">مهلت: {d.date}</p>
              </div>
              <span className="tabular shrink-0 rounded-lg border border-border px-2 py-1 text-xs text-muted-foreground">
                {faNumber(d.daysLeft)} روز
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

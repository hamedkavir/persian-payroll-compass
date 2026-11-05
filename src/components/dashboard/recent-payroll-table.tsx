import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentPayroll, type PayrollStatus } from "@/lib/demo-data";
import { faNumber } from "@/lib/format";

const statusMap: Record<
  PayrollStatus,
  { label: string; variant: "success" | "warning" | "info" | "danger" }
> = {
  paid: { label: "پرداخت شده", variant: "success" },
  approval: { label: "در انتظار تأیید", variant: "warning" },
  processing: { label: "در حال پردازش", variant: "info" },
  rejected: { label: "برگشت از بانک", variant: "danger" },
};

export function RecentPayrollTable() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
        <div className="space-y-1.5">
          <CardTitle className="text-base">آخرین فعالیت‌های حقوق و دستمزد</CardTitle>
          <CardDescription>پرداخت‌ها و احکام حقوقی ثبت‌شده در دو دوره اخیر</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="rounded-lg">
          مشاهده همه
        </Button>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow className="border-y border-border/70 bg-muted/50 hover:bg-muted/50">
            <TableHead className="h-11 pr-6 text-right text-xs font-medium">کارمند</TableHead>
            <TableHead className="hidden text-right text-xs font-medium md:table-cell">کد پرسنلی</TableHead>
            <TableHead className="hidden text-right text-xs font-medium lg:table-cell">واحد سازمانی</TableHead>
            <TableHead className="hidden text-right text-xs font-medium sm:table-cell">دوره</TableHead>
            <TableHead className="text-right text-xs font-medium">خالص پرداختی (ریال)</TableHead>
            <TableHead className="hidden text-right text-xs font-medium xl:table-cell">تاریخ ثبت</TableHead>
            <TableHead className="text-right text-xs font-medium">وضعیت</TableHead>
            <TableHead className="w-12 pl-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentPayroll.map((row) => {
            const status = statusMap[row.status];
            return (
              <TableRow key={row.id} className="border-border/70">
                <TableCell className="py-3.5 pr-6">
                  <div className="flex items-center gap-3">
                    <div className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground sm:flex">
                      {row.name.split(" ").map((w) => w[0]).slice(0, 2).join("‌")}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{row.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{row.position}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="tabular hidden text-sm text-muted-foreground md:table-cell">{row.id}</TableCell>
                <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">{row.department}</TableCell>
                <TableCell className="hidden whitespace-nowrap text-sm text-muted-foreground sm:table-cell">{row.period}</TableCell>
                <TableCell className="tabular whitespace-nowrap text-sm font-semibold text-foreground">
                  {faNumber(row.net)}
                </TableCell>
                <TableCell className="tabular hidden text-sm text-muted-foreground xl:table-cell">{row.date}</TableCell>
                <TableCell>
                  <Badge variant={status.variant} className="whitespace-nowrap rounded-full px-2.5 py-1 font-medium">
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="pl-4">
                  <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground" aria-label="گزینه‌ها">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}

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
import { faNumber, jalaliShort, toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

const statusMap: Record<
  PayrollStatus,
  { label: string; variant: "success" | "warning" | "info" | "danger"; dot: string }
> = {
  paid: { label: "پرداخت شده", variant: "success", dot: "bg-success" },
  approval: { label: "در انتظار تأیید", variant: "warning", dot: "bg-warning" },
  processing: { label: "در حال پردازش", variant: "info", dot: "bg-info" },
  rejected: { label: "برگشت از بانک", variant: "danger", dot: "bg-destructive" },
};

const head = "h-11 whitespace-nowrap text-xs font-semibold text-muted-foreground";

export function RecentPayrollTable() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:items-center">
        <div className="min-w-0">
          <CardTitle>آخرین فعالیت‌های حقوق و دستمزد</CardTitle>
          <CardDescription>پرداخت‌ها و احکام حقوقی ثبت‌شده در دو دوره اخیر</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="rounded-lg">
          مشاهده همه
        </Button>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow className="border-y border-border/70 bg-muted/60 hover:bg-muted/60">
            <TableHead className={cn(head, "pr-5 md:pr-6")}>کارمند</TableHead>
            <TableHead className={cn(head, "hidden md:table-cell")}>کد پرسنلی</TableHead>
            <TableHead className={cn(head, "hidden lg:table-cell")}>واحد سازمانی</TableHead>
            <TableHead className={cn(head, "hidden sm:table-cell")}>دوره</TableHead>
            <TableHead className={cn(head, "hidden xl:table-cell")}>تاریخ ثبت</TableHead>
            <TableHead className={cn(head, "text-end")}>
              خالص پرداختی <span className="font-normal">(ریال)</span>
            </TableHead>
            <TableHead className={head}>وضعیت</TableHead>
            <TableHead className="w-12 pl-3 md:pl-4">
              <span className="sr-only">عملیات</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentPayroll.map((row) => {
            const status = statusMap[row.status];
            return (
              <TableRow key={row.id} className="border-border/60 hover:bg-muted/40">
                <TableCell className="py-3.5 pr-5 md:pr-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground sm:flex">
                      {row.name.split(" ").map((w) => w[0]).slice(0, 2).join("‌")}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium leading-6 text-foreground">{row.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{row.position}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="tabular hidden text-[13px] text-muted-foreground md:table-cell">
                  {toFaDigits(row.id)}
                </TableCell>
                <TableCell className="hidden whitespace-nowrap text-[13px] text-foreground/80 lg:table-cell">
                  {row.department}
                </TableCell>
                <TableCell className="hidden whitespace-nowrap text-[13px] text-foreground/80 sm:table-cell">
                  {row.period}
                </TableCell>
                <TableCell className="tabular hidden whitespace-nowrap text-[13px] text-muted-foreground xl:table-cell">
                  {jalaliShort(row.date)}
                </TableCell>
                <TableCell className="tabular whitespace-nowrap text-end text-sm font-semibold text-foreground">
                  {faNumber(row.net)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={status.variant}
                    className="gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 font-medium leading-5"
                  >
                    <span className={cn("size-1.5 rounded-full", status.dot)} />
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="pl-3 md:pl-4">
                  <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground" aria-label={`گزینه‌های ${row.name}`}>
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

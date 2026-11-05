import { createFileRoute } from "@tanstack/react-router";
import { Download, Landmark, Plus, Receipt, Users, Wallet } from "lucide-react";

import { ContractTypesCard, DeadlinesCard, DepartmentChart } from "@/components/dashboard/employee-stats";
import { PayrollCycleCard } from "@/components/dashboard/payroll-cycle-card";
import { PayrollOverviewChart } from "@/components/dashboard/payroll-overview-chart";
import { RecentPayrollTable } from "@/components/dashboard/recent-payroll-table";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { company, currentUser, payrollStats as s } from "@/lib/demo-data";
import { faNumber, faPercent, faRialCompact } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "داشبورد حقوق و دستمزد | حقوق‌یار" },
      {
        name: "description",
        content: "نمای کلی حقوق، دستمزد، کسورات و آمار کارکنان در سامانه حقوق‌یار",
      },
      { property: "og:title", content: "داشبورد حقوق و دستمزد | حقوق‌یار" },
      {
        property: "og:description",
        content: "نمای کلی حقوق، دستمزد، کسورات و آمار کارکنان در سامانه حقوق‌یار",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const gross = faRialCompact(s.totalGross);
  const deductions = faRialCompact(s.deductions);
  const avg = faRialCompact(s.averageNet);

  return (
    // @container: grids respond to the space left beside the sidebar, not the window width.
    <div className="@container flex flex-col gap-4 md:gap-5">
      <PageHeader
        title={`${currentUser.name.split(" ")[0]} عزیز، خوش آمدید`}
        description={`نمای کلی وضعیت حقوق و دستمزد ${company.currentPeriod} · ${company.name}`}
        actions={
          <>
            <Button variant="outline" className="h-10 rounded-xl bg-card">
              <Download className="size-4" />
              خروجی گزارش
            </Button>
            <Button className="h-10 rounded-xl">
              <Plus className="size-4" />
              محاسبه حقوق جدید
            </Button>
          </>
        }
      />

      <section className="mt-1 grid gap-4 md:gap-5 @lg:grid-cols-2 @4xl:grid-cols-4">
        <StatCard
          label="جمع حقوق ناخالص آبان"
          value={gross.amount}
          unit={gross.unit}
          icon={Wallet}
          tone="navy"
          change={{ text: faPercent(s.totalGrossChange), positive: true }}
          changeLabel="نسبت به مهر"
        />
        <StatCard
          label="کارکنان فعال"
          value={faNumber(s.activeEmployees)}
          unit="نفر"
          icon={Users}
          tone="teal"
          change={{ text: `${faNumber(s.newHires)}+`, positive: true }}
          changeLabel="استخدام جدید این ماه"
        />
        <StatCard
          label="کسورات بیمه و مالیات"
          value={deductions.amount}
          unit={deductions.unit}
          icon={Landmark}
          tone="info"
          change={{ text: faPercent(s.deductionsChange), positive: false }}
          changeLabel="افزایش نسبت به مهر"
        />
        <StatCard
          label="میانگین خالص پرداختی"
          value={avg.amount}
          unit={avg.unit}
          icon={Receipt}
          tone="warning"
          change={{ text: faPercent(s.averageNetChange), positive: false }}
          changeLabel="به ازای هر نفر"
        />
      </section>

      <section className="grid gap-4 md:gap-5 @5xl:grid-cols-3">
        <PayrollOverviewChart />
        <PayrollCycleCard />
      </section>

      <section className="grid gap-4 md:gap-5 @2xl:grid-cols-2 @5xl:grid-cols-3">
        <DepartmentChart />
        <ContractTypesCard />
        <div className="@2xl:col-span-2 @5xl:col-span-1">
          <DeadlinesCard />
        </div>
      </section>

      <RecentPayrollTable />
    </div>
  );
}

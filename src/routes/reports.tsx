import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "گزارش‌ها | حقوق‌یار" },
      { name: "description", content: "گزارش‌های مدیریتی، مالی و آماری منابع انسانی" },
      { property: "og:title", content: "گزارش‌ها | حقوق‌یار" },
      { property: "og:description", content: "گزارش‌های مدیریتی، مالی و آماری منابع انسانی" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <ModulePlaceholder
      title="گزارش‌ها"
      description="گزارش‌های مدیریتی، مالی و آماری منابع انسانی"
      icon={BarChart3}
      features={["گزارش هزینه پرسنلی", "گزارش بانکی", "خروجی اکسل", "داشبورد مدیریتی"]}
    />
  );
}

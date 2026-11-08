import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const Route = createFileRoute("/payslips")({
  head: () => ({
    meta: [
      { title: "فیش‌های حقوقی | حقوق‌یار" },
      { name: "description", content: "صدور، مشاهده و ارسال فیش حقوقی کارکنان" },
      { property: "og:title", content: "فیش‌های حقوقی | حقوق‌یار" },
      { property: "og:description", content: "صدور، مشاهده و ارسال فیش حقوقی کارکنان" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PayslipsPage,
});

function PayslipsPage() {
  return (
    <ModulePlaceholder
      title="فیش‌های حقوقی"
      description="صدور، مشاهده و ارسال فیش حقوقی کارکنان"
      icon={FileText}
      features={["صدور گروهی فیش", "ارسال پیامکی", "خروجی PDF", "آرشیو فیش‌ها"]}
    />
  );
}

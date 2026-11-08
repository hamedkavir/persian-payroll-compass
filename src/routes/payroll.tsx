import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const Route = createFileRoute("/payroll")({
  head: () => ({
    meta: [
      { title: "محاسبه حقوق | حقوق‌یار" },
      { name: "description", content: "محاسبه ماهانه حقوق، مزایا و کسورات بر اساس قانون کار" },
      { property: "og:title", content: "محاسبه حقوق | حقوق‌یار" },
      { property: "og:description", content: "محاسبه ماهانه حقوق، مزایا و کسورات بر اساس قانون کار" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PayrollPage,
});

function PayrollPage() {
  return (
    <ModulePlaceholder
      title="محاسبه حقوق"
      description="محاسبه ماهانه حقوق، مزایا و کسورات بر اساس قانون کار"
      icon={Calculator}
      features={["حقوق پایه و پایه سنوات", "حق مسکن و بن", "اضافه‌کار", "عیدی و سنوات"]}
    />
  );
}

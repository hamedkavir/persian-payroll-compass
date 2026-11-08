import { createFileRoute } from "@tanstack/react-router";
import { CalendarOff } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const Route = createFileRoute("/leave")({
  head: () => ({
    meta: [
      { title: "مرخصی‌ها | حقوق‌یار" },
      { name: "description", content: "درخواست‌ها و مانده مرخصی استحقاقی، استعلاجی و بدون حقوق" },
      { property: "og:title", content: "مرخصی‌ها | حقوق‌یار" },
      { property: "og:description", content: "درخواست‌ها و مانده مرخصی استحقاقی، استعلاجی و بدون حقوق" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LeavePage,
});

function LeavePage() {
  return (
    <ModulePlaceholder
      title="مرخصی‌ها"
      description="درخواست‌ها و مانده مرخصی استحقاقی، استعلاجی و بدون حقوق"
      icon={CalendarOff}
      features={["درخواست مرخصی", "گردش تأیید", "مانده مرخصی", "مرخصی استعلاجی"]}
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const Route = createFileRoute("/employees")({
  head: () => ({
    meta: [
      { title: "کارکنان | حقوق‌یار" },
      { name: "description", content: "مدیریت اطلاعات پرسنلی، قراردادها و سوابق شغلی کارکنان" },
      { property: "og:title", content: "کارکنان | حقوق‌یار" },
      { property: "og:description", content: "مدیریت اطلاعات پرسنلی، قراردادها و سوابق شغلی کارکنان" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EmployeesPage,
});

function EmployeesPage() {
  return (
    <ModulePlaceholder
      title="کارکنان"
      description="مدیریت اطلاعات پرسنلی، قراردادها و سوابق شغلی کارکنان"
      icon={Users}
      features={["پرونده پرسنلی", "قراردادها", "سوابق شغلی", "مدارک و مستندات"]}
    />
  );
}

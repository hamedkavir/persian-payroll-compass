import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "حضور و غیاب | حقوق‌یار" },
      { name: "description", content: "ثبت و بررسی کارکرد روزانه، اضافه‌کار و تأخیرها" },
      { property: "og:title", content: "حضور و غیاب | حقوق‌یار" },
      { property: "og:description", content: "ثبت و بررسی کارکرد روزانه، اضافه‌کار و تأخیرها" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AttendancePage,
});

function AttendancePage() {
  return (
    <ModulePlaceholder
      title="حضور و غیاب"
      description="ثبت و بررسی کارکرد روزانه، اضافه‌کار و تأخیرها"
      icon={CalendarCheck}
      features={["اتصال به دستگاه حضور و غیاب", "اضافه‌کار", "شب‌کاری", "تأخیر و تعجیل"]}
    />
  );
}

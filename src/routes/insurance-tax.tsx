import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const Route = createFileRoute("/insurance-tax")({
  head: () => ({
    meta: [
      { title: "بیمه و مالیات | حقوق‌یار" },
      { name: "description", content: "لیست بیمه تأمین اجتماعی و مالیات حقوق" },
      { property: "og:title", content: "بیمه و مالیات | حقوق‌یار" },
      { property: "og:description", content: "لیست بیمه تأمین اجتماعی و مالیات حقوق" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InsuranceTaxPage,
});

function InsuranceTaxPage() {
  return (
    <ModulePlaceholder
      title="بیمه و مالیات"
      description="لیست بیمه تأمین اجتماعی و مالیات حقوق"
      icon={ShieldCheck}
      features={["لیست بیمه ماهانه", "فایل DBF تأمین اجتماعی", "مالیات پلکانی", "سامانه مودیان"]}
    />
  );
}

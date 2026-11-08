import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "تنظیمات | حقوق‌یار" },
      { name: "description", content: "پیکربندی سامانه، پارامترهای حقوقی و دسترسی کاربران" },
      { property: "og:title", content: "تنظیمات | حقوق‌یار" },
      { property: "og:description", content: "پیکربندی سامانه، پارامترهای حقوقی و دسترسی کاربران" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <ModulePlaceholder
      title="تنظیمات"
      description="پیکربندی سامانه، پارامترهای حقوقی و دسترسی کاربران"
      icon={Settings}
      features={["احکام و ضرایب", "جدول مالیات", "کاربران و نقش‌ها", "اطلاعات شرکت"]}
    />
  );
}

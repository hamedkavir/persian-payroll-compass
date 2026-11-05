import { createFileRoute } from "@tanstack/react-router";
import { HandCoins } from "lucide-react";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const Route = createFileRoute("/loans")({
  head: () => ({
    meta: [
      { title: "وام و مساعده | حقوق‌یار" },
      { name: "description", content: "مدیریت وام‌های کارکنان، اقساط و مساعده" },
      { property: "og:title", content: "وام و مساعده | حقوق‌یار" },
      { property: "og:description", content: "مدیریت وام‌های کارکنان، اقساط و مساعده" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoansPage,
});

function LoansPage() {
  return (
    <ModulePlaceholder
      title="وام و مساعده"
      description="مدیریت وام‌های کارکنان، اقساط و مساعده"
      icon={HandCoins}
      features={["ثبت وام", "جدول اقساط", "کسر خودکار از حقوق", "مساعده"]}
    />
  );
}

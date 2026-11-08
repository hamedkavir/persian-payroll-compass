import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "./page-header";

export function ModulePlaceholder({
  title,
  description,
  icon: Icon,
  features,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} />
      <Card className="flex flex-col items-center px-6 py-14 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-teal-soft text-teal">
          <Icon className="size-7" />
        </div>
        <h2 className="mt-5 text-lg font-semibold">این بخش در حال طراحی است</h2>
        <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
          رابط کاربری جدید ماژول «{title}» به‌زودی در دسترس خواهد بود. امکانات برنامه‌ریزی‌شده:
        </p>
        <ul className="mt-5 flex max-w-lg flex-wrap justify-center gap-2">
          {features.map((f) => (
            <li
              key={f}
              className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground"
            >
              {f}
            </li>
          ))}
        </ul>
        <Button asChild variant="outline" className="mt-8 rounded-xl">
          <Link to="/">
            <ArrowRight className="size-4" />
            بازگشت به داشبورد
          </Link>
        </Button>
      </Card>
    </div>
  );
}

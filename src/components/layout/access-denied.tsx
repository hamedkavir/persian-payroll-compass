import { LockKeyhole } from "lucide-react";

import { Card } from "@/components/ui/card";

export function AccessDenied() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="flex w-full max-w-md flex-col items-center px-6 py-12 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <LockKeyhole className="size-8" />
        </div>

        <h1 className="mt-5 text-xl font-bold">دسترسی غیرمجاز</h1>

        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          شما مجوز دسترسی به این بخش را ندارید. برای دسترسی بیشتر با مدیر سیستم تماس بگیرید.
        </p>
      </Card>
    </div>
  );
}

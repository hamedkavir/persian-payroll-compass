import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-bold leading-9 text-foreground md:text-2xl md:leading-10">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && (
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:items-center [&>*]:min-w-0">
          {actions}
        </div>
      )}
    </div>
  );
}

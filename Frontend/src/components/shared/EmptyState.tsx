import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, icon, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/40 bg-card/40 px-6 py-16 text-center",
        className,
      )}
    >
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <h3 className="font-display text-2xl text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

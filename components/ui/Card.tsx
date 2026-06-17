import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-surface-muted bg-surface p-6 shadow-soft transition-shadow hover:shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IconBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-800",
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

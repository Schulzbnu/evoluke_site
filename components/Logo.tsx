import { cn } from "@/lib/cn";
import { site } from "@/content/pt";

/**
 * Logo textual da Evoluke (placeholder até existir identidade visual fechada).
 * Mantém marca consistente e acessível enquanto o logotipo real não chega.
 */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-lg font-bold tracking-tight",
        light ? "text-white" : "text-brand-800",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent-500 text-sm font-black text-white"
      >
        E
      </span>
      {site.name}
    </span>
  );
}

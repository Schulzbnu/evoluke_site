import { Container } from "./Container";
import { cn } from "@/lib/cn";

export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      // scroll-mt compensa o header fixo ao navegar por âncoras.
      className={cn("scroll-mt-20 py-16 sm:py-20 lg:py-24", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-fluid-h2 font-bold text-ink">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</p> : null}
    </div>
  );
}

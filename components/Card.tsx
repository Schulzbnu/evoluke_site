import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Aplica destaque sutil no hover (uso em grids interativos). */
  interactive?: boolean;
}

/** Cartão de superfície reutilizável (tema claro). */
export default function Card({
  children,
  className = "",
  interactive = false,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-ink-100 bg-white p-6 shadow-card ${
        interactive
          ? "transition-all duration-200 hover:-translate-y-1 hover:border-accent-200 hover:shadow-glow"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

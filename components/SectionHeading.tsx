import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  /**
   * Nível do título. Use "h1" quando o cabeçalho for o título principal
   * da página (hero); o padrão "h2" serve para títulos de seção.
   */
  as?: "h1" | "h2";
}

/** Cabeçalho de seção reutilizável (eyebrow + título + descrição). */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  as: TitleTag = "h2",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p
          className={`text-sm font-semibold uppercase tracking-wider ${
            light ? "text-accent-300" : "text-accent-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <TitleTag
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </TitleTag>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-white/70" : "text-ink-900/65"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

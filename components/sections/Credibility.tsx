import { Container } from "../ui/Container";
import { credibility } from "@/content/pt";

export function Credibility() {
  return (
    <section aria-label="Credibilidade" className="border-y border-surface-muted bg-surface-subtle py-10">
      <Container>
        <p className="text-center text-sm font-medium text-ink-muted">{credibility.title}</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {credibility.logos.map((logo, i) => (
            <li
              key={i}
              // Placeholder de logo: substituir por <Image> quando houver assets reais.
              className="flex h-10 min-w-[96px] items-center justify-center rounded-md bg-surface-muted px-4 text-xs font-semibold text-ink-subtle"
            >
              {logo}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

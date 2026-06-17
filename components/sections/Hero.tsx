import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { hero } from "@/content/pt";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-brand-900 pt-28 pb-16 text-white sm:pt-32 sm:pb-24"
    >
      {/* Visual abstrato de fundo (placeholder, decorativo) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-brand-100 sm:text-sm">
            {hero.eyebrow}
          </p>
          <h1 className="text-fluid-h1 font-bold text-balance">{hero.headline}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-100 sm:text-lg">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} size="lg" className="w-full sm:w-auto">
              {hero.primaryCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

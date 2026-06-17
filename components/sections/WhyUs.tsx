import { Section, SectionHeading } from "../ui/Section";
import { Card, IconBadge } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { whyUs } from "@/content/pt";

export function WhyUs() {
  return (
    <Section id={whyUs.id}>
      <SectionHeading eyebrow={whyUs.eyebrow} title={whyUs.title} />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Reveal as="li" key={pillar.title} delay={(i % 4) * 0.05}>
              <Card className="h-full">
                <IconBadge>
                  <Icon size={22} aria-hidden="true" />
                </IconBadge>
                <h3 className="mt-4 text-lg font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{pillar.description}</p>
              </Card>
            </Reveal>
          );
        })}
      </ul>

      {/* Faixa de métricas/resultados (placeholders) */}
      <div className="mt-12 rounded-2xl bg-brand-800 p-8 text-white sm:p-10">
        <dl className="grid gap-8 text-center sm:grid-cols-3">
          {whyUs.metrics.map((metric, i) => (
            <div key={i}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block text-fluid-h2 font-bold text-accent-300">{metric.value}</span>
                <span className="mt-1 block text-sm text-brand-100">{metric.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

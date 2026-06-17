import { Section, SectionHeading } from "../ui/Section";
import { Card, IconBadge } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { verticals } from "@/content/pt";

export function Verticals() {
  return (
    <Section id={verticals.id} className="bg-surface-subtle">
      <SectionHeading eyebrow={verticals.eyebrow} title={verticals.title} intro={verticals.intro} />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {verticals.items.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal as="li" key={item.name} delay={(i % 3) * 0.05}>
              <Card className="h-full">
                <IconBadge>
                  <Icon size={22} aria-hidden="true" />
                </IconBadge>
                <h3 className="mt-4 text-fluid-h3 font-semibold text-ink">{item.name}</h3>
                <p className="mt-2 text-ink-muted">{item.problem}</p>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

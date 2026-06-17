import { Section, SectionHeading } from "../ui/Section";
import { Card, IconBadge } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { capabilities } from "@/content/pt";

export function Capabilities() {
  return (
    <Section id={capabilities.id}>
      <SectionHeading
        eyebrow={capabilities.eyebrow}
        title={capabilities.title}
        intro={capabilities.intro}
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.items.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.05}>
              <Card className="h-full">
                <IconBadge className="bg-accent-50 text-accent-600">
                  <Icon size={22} aria-hidden="true" />
                </IconBadge>
                <h3 className="mt-4 text-fluid-h3 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-ink-muted">{item.description}</p>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

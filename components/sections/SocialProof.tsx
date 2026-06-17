import { Quote } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { socialProof } from "@/content/pt";

export function SocialProof() {
  return (
    <Section id={socialProof.id} className="bg-surface-subtle">
      <SectionHeading eyebrow={socialProof.eyebrow} title={socialProof.title} />
      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {socialProof.testimonials.map((t, i) => (
          <Reveal as="li" key={i} delay={(i % 3) * 0.05}>
            <Card className="flex h-full flex-col">
              <Quote size={28} className="text-accent-500" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-ink">
                <p>{t.quote}</p>
              </blockquote>
              <footer className="mt-6 border-t border-surface-muted pt-4">
                <p className="font-semibold text-ink">{t.author}</p>
                <p className="text-sm text-ink-muted">{t.role}</p>
              </footer>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

import { Section, SectionHeading } from "../ui/Section";
import { IconBadge } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { process } from "@/content/pt";

export function Process() {
  return (
    <Section id={process.id} className="bg-brand-900 text-white">
      <SectionHeading eyebrow={process.eyebrow} title={process.title} intro={process.intro} className="[&_h2]:text-white [&_p]:text-brand-100" />

      <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
        {process.steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal as="li" key={step.step} delay={i * 0.08} className="relative">
              {/* Conector da timeline — horizontal no desktop */}
              {i < process.steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-12 hidden h-px w-full bg-white/15 md:block"
                />
              ) : null}
              <div className="relative flex items-start gap-4 md:flex-col">
                <IconBadge className="bg-white/10 text-accent-300">
                  <Icon size={22} aria-hidden="true" />
                </IconBadge>
                <div>
                  <span className="text-sm font-bold text-accent-300">{step.step}</span>
                  <h3 className="mt-1 text-fluid-h3 font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-100">{step.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}

import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { Card } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { problemSolution } from "@/content/pt";

export function ProblemSolution() {
  return (
    <Section id={problemSolution.id}>
      <SectionHeading
        eyebrow={problemSolution.eyebrow}
        title={problemSolution.title}
        intro={problemSolution.intro}
      />
      <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
        {problemSolution.pairs.map((pair, i) => (
          <Reveal as="li" key={i} delay={i * 0.05}>
            <Card className="h-full">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 rounded-md bg-surface-muted px-2 py-1 text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Problema
                </span>
              </div>
              <p className="mt-3 font-semibold text-ink">{pair.problem}</p>
              <div className="my-4 flex items-center gap-2 text-accent-600">
                <ArrowRight size={18} aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wide">Solução Evoluke</span>
              </div>
              <p className="text-ink-muted">{pair.solution}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

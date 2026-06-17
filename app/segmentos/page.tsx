import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { segmentos } from "@/data/segmentos";

export const metadata: Metadata = {
  title: "Segmentos",
  description:
    "IA aplicada a Logística, Financeiro, Saúde, RH, Vendas e Serviços. Veja exemplos de soluções que a Evoluke pode construir para o seu setor.",
};

export default function SegmentosPage() {
  return (
    <>
      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <SectionHeading
            light
            align="left"
            eyebrow="Segmentos"
            title="IA com endereço certo para o seu setor"
            description="Atuamos em qualquer setor. Abaixo, seis verticais onde já mapeamos problemas recorrentes e as soluções de IA que entregam resultado."
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {segmentos.map((seg) => {
              const Icon = seg.icon;
              return (
                <Link
                  key={seg.slug}
                  href={`/segmentos/${seg.slug}`}
                  className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-accent-200 hover:shadow-glow"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold text-ink-900">
                    {seg.nome}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-900/65">
                    {seg.resumo}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
                    Ver soluções
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection
        title="Seu setor não está na lista?"
        description="Sem problema — o nosso método é agnóstico. Se existe um desafio de negócio, existe uma forma de a IA ajudar. Vamos conversar."
      />
    </>
  );
}

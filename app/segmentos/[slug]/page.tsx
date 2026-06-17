import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import SolutionCard from "@/components/SolutionCard";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import {
  getSegmento,
  getSegmentoSlugs,
  segmentos,
} from "@/data/segmentos";
import { serviceSchema, segmentoBreadcrumbSchema } from "@/data/structuredData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Gera as rotas estáticas das 6 verticais a partir do arquivo de dados. */
export function generateStaticParams() {
  return getSegmentoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seg = getSegmento(slug);
  if (!seg) return { title: "Segmento não encontrado" };

  return {
    title: `IA para ${seg.nome}`,
    description: seg.resumo,
    openGraph: {
      title: `IA para ${seg.nome} · Evoluke`,
      description: seg.resumo,
    },
  };
}

export default async function SegmentoPage({ params }: PageProps) {
  const { slug } = await params;
  const seg = getSegmento(slug);
  if (!seg) notFound();

  const Icon = seg.icon;
  const outros = segmentos.filter((s) => s.slug !== seg.slug);

  return (
    <>
      <JsonLd data={[serviceSchema(seg), segmentoBreadcrumbSchema(seg)]} />

      {/* Cabeçalho da vertical */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-[size:34px_34px] opacity-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
        />
        <Container className="relative py-16 sm:py-20">
          <Link
            href="/segmentos"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Todos os segmentos
          </Link>

          <div className="mt-6 flex items-start gap-4">
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent-300 ring-1 ring-white/15">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-300">
                Segmento
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                IA para {seg.nome}
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            {seg.intro}
          </p>
        </Container>
      </section>

      {/* Cards de soluções */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
              Exemplos de soluções que podemos implementar
            </h2>
            <p className="mt-3 text-ink-900/65">
              Pontos de partida, não um cardápio fechado. Desenhamos a solução a
              partir do seu problema específico.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {seg.solucoes.map((sol) => (
              <SolutionCard key={sol.titulo} solucao={sol} />
            ))}
          </div>
        </Container>
      </section>

      {/* Outros segmentos */}
      <section className="border-t border-ink-100 bg-ink-50 py-16">
        <Container>
          <h2 className="text-lg font-semibold text-ink-900">
            Explore outros segmentos
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {outros.map((s) => {
              const OutroIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/segmentos/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-2 text-sm font-medium text-ink-900/75 transition-colors hover:border-accent-200 hover:text-accent-700"
                >
                  <OutroIcon className="h-4 w-4 text-accent-600" aria-hidden="true" />
                  {s.nome}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection
        title={`Vamos resolver um desafio de ${seg.nome.toLowerCase()}?`}
        description="Conte o seu problema. A gente avalia a viabilidade, propõe o caminho e constrói a solução de IA — da estratégia à produção."
      />
    </>
  );
}

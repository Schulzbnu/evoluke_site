import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Container from "@/components/Container";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import {
  getProduto,
  getProdutoSlugs,
  getCategoriaProduto,
  produtos,
} from "@/data/produtos";
import { produtoSchema, produtoBreadcrumbSchema } from "@/data/structuredData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Gera as rotas estáticas de todos os produtos a partir do arquivo de dados. */
export function generateStaticParams() {
  return getProdutoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const produto = getProduto(slug);
  if (!produto) return { title: "Produto não encontrado" };

  return {
    title: produto.nome,
    description: produto.tagline,
    alternates: { canonical: `/produtos/${produto.slug}` },
    openGraph: {
      title: `${produto.nome} · Evoluke`,
      description: produto.tagline,
    },
  };
}

export default async function ProdutoPage({ params }: PageProps) {
  const { slug } = await params;
  const produto = getProduto(slug);
  if (!produto) notFound();

  const Icon = produto.icon;
  const categoria = getCategoriaProduto(produto.categoria);
  const disponivel = produto.status === "ativo";
  // Demais produtos do ecossistema (para o rail de navegação interna).
  const outros = produtos.filter((p) => p.slug !== produto.slug);

  return (
    <>
      <JsonLd data={[produtoSchema(produto), produtoBreadcrumbSchema(produto)]} />

      {/* Cabeçalho do produto */}
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
            href="/produtos"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Todos os produtos
          </Link>

          <div className="mt-6 flex items-start gap-4">
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent-300 ring-1 ring-white/15">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-300">
                {categoria.label}
                <span className="ml-2 font-medium normal-case tracking-normal text-white/45">
                  Um produto Evoluke
                </span>
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {produto.nome}
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            {produto.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {disponivel ? (
              // Link externo dofollow com âncora de MARCA (nome do produto).
              // Sem nofollow: queremos que a autoridade flua para o produto.
              <a
                href={produto.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-600"
              >
                Acessar o {produto.nome}
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-base font-semibold text-white/70 ring-1 ring-white/15">
                Em breve
              </span>
            )}
          </div>
        </Container>
      </section>

      {/* Conteúdo: o que é + destaques */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                O que é o {produto.nome}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-900/70">
                {produto.descricao}
              </p>
              <p className="mt-4 text-ink-900/65">
                <span className="font-semibold text-ink-900">Para quem é: </span>
                {produto.paraQuem}
              </p>
            </div>

            <div className="rounded-2xl border border-ink-100 bg-ink-50 p-7">
              <h3 className="text-lg font-semibold text-ink-900">Destaques</h3>
              <ul className="mt-4 space-y-3">
                {produto.destaques.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-900/75">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {disponivel && (
                <a
                  href={produto.url}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
                >
                  Visitar {produto.nome}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Outros produtos do ecossistema */}
      {outros.length > 0 && (
        <section className="border-t border-ink-100 bg-ink-50 py-16">
          <Container>
            <h2 className="text-lg font-semibold text-ink-900">
              Explore outros produtos do ecossistema
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {outros.map((p) => {
                const POutroIcon = p.icon;
                return (
                  <Link
                    key={p.slug}
                    href={`/produtos/${p.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-card"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent group-hover:text-white">
                      <POutroIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-ink-900">
                        {p.nome}
                      </span>
                      <span className="block truncate text-sm text-ink-900/55">
                        {getCategoriaProduto(p.categoria).label}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        title={`Quer algo como o ${produto.nome} para o seu negócio?`}
        description="Construímos produtos de IA do zero — da estratégia à produção. Conte o seu desafio e avaliamos o melhor caminho."
      />
    </>
  );
}

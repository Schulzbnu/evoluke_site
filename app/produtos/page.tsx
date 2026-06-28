import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import {
  getCategoriasComProdutos,
  getProdutosByCategoria,
  capacidades,
} from "@/data/produtos";
import { produtosItemListSchema } from "@/data/structuredData";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "O ecossistema de produtos próprios da Evoluke — SaaS, plataformas e ferramentas que construímos e operamos para resolver problemas reais com Inteligência Artificial.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosPage() {
  const categorias = getCategoriasComProdutos();

  return (
    <>
      <JsonLd data={produtosItemListSchema()} />

      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <SectionHeading
            as="h1"
            light
            align="left"
            eyebrow="Ecossistema Evoluke"
            title="Produtos que construímos e operamos"
            description="Além da consultoria, desenvolvemos nossos próprios produtos. Cada um nasceu de um problema concreto e hoje roda em produção. Conheça o ecossistema."
          />
        </Container>
      </section>

      {categorias.map((cat) => {
        const lista = getProdutosByCategoria(cat.id);
        return (
          <section
            key={cat.id}
            className="py-14 first-of-type:pt-16 sm:py-16 sm:first-of-type:pt-20"
          >
            <Container>
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                  {cat.label} da Evoluke
                </h2>
                <p className="mt-3 text-ink-900/65">{cat.descricao}</p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {lista.map((produto) => {
                  const Icon = produto.icon;
                  return (
                    <Link
                      key={produto.slug}
                      href={`/produtos/${produto.slug}`}
                      className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-accent-200 hover:shadow-glow"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent group-hover:text-white">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        {produto.status === "em-breve" && (
                          <span className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-900/60">
                            Em breve
                          </span>
                        )}
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-ink-900">
                        {produto.nome}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-900/65">
                        {produto.tagline}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
                        Conhecer
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
        );
      })}

      {/* Demais produtos e tecnologias — frentes que a Evoluke domina, exibidas
          como cards informativos (sem rota individual e sem link externo). */}
      <section className="border-t border-ink-100 bg-ink-50 py-16 sm:py-20">
        <Container>
          <div className="space-y-14">
            {capacidades.map((grupo) => (
              <div key={grupo.id}>
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                    {grupo.label}
                  </h2>
                  <p className="mt-3 text-ink-900/65">{grupo.descricao}</p>
                </div>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {grupo.itens.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={item.nome}
                        className="flex gap-3 rounded-xl border border-ink-100 bg-white p-5"
                      >
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-medium text-ink-900">{item.nome}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-900/60">
                            {item.descricao}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 border-t border-ink-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-ink-900/70">
              Desenvolvido pela mesma equipe por trás da consultoria de IA da
              Evoluke.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
            >
              Fale com a gente
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <CTASection
        title="Precisa de um produto sob medida?"
        description="Estes produtos nasceram resolvendo problemas reais. Se o seu desafio ainda não tem solução pronta, a gente constrói — da estratégia à produção."
      />
    </>
  );
}

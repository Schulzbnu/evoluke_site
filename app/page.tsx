import Link from "next/link";
import {
  ArrowRight,
  Search,
  Hammer,
  Rocket,
  Sparkles,
  Layers,
  Target,
  ShieldCheck,
} from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import SegmentTabs from "@/components/SegmentTabs";
import CTASection from "@/components/CTASection";
import { segmentos } from "@/data/segmentos";

const passos = [
  {
    icon: Search,
    nome: "Entender",
    titulo: "Começamos pelo problema, não pela tecnologia",
    descricao:
      "Mergulhamos no seu negócio para mapear onde a IA gera valor real. Diagnóstico, dados disponíveis e priorização por impacto.",
  },
  {
    icon: Hammer,
    nome: "Construir",
    titulo: "Entregamos produto, não só recomendação",
    descricao:
      "Desenvolvemos a solução sob medida — de modelos de ML a agentes de IA — com qualidade de produção e foco no resultado.",
  },
  {
    icon: Rocket,
    nome: "Escalar",
    titulo: "Colocamos em produção e fazemos crescer",
    descricao:
      "Integramos ao seu fluxo, medimos resultados e evoluímos a solução continuamente para escalar com segurança.",
  },
];

const provas = [
  {
    icon: Layers,
    titulo: "Consultoria + Desenvolvimento",
    descricao:
      "Não paramos no diagnóstico. Unimos estratégia e engenharia para construir o que recomendamos.",
  },
  {
    icon: Target,
    titulo: "Agnósticos por princípio",
    descricao:
      "Sem casar com uma única tecnologia. Escolhemos a abordagem certa para cada problema.",
  },
  {
    icon: ShieldCheck,
    titulo: "Pronto para produção",
    descricao:
      "Soluções confiáveis, integradas e mensuráveis — feitas para rodar no mundo real, não só em prova de conceito.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-[size:38px_38px] opacity-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-accent2/20 blur-3xl"
        />

        <Container className="relative py-24 sm:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
            {/* Coluna de texto */}
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur">
                <Sparkles className="h-4 w-4 text-accent-300" aria-hidden="true" />
                Consultoria e produtos de Inteligência Artificial
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Resolvemos problemas com IA —{" "}
                <span className="bg-gradient-to-r from-accent-300 to-accent2 bg-clip-text text-transparent">
                  em qualquer setor
                </span>
                .
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl lg:mx-0 mx-auto">
                A Evoluke não vende uma tecnologia específica. Entendemos o
                problema do seu negócio e entregamos a solução de IA certa — da
                consultoria estratégica ao produto em produção.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Button href="/contato" size="lg">
                  Resolver meu problema
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button href="/segmentos" size="lg" variant="ghost">
                  Explorar segmentos
                </Button>
              </div>

              <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8 lg:mx-0 mx-auto">
                <div>
                  <dt className="text-3xl font-bold text-white">6</dt>
                  <dd className="mt-1 text-sm text-white/60">
                    setores atendidos
                  </dd>
                </div>
                <div>
                  <dt className="text-3xl font-bold text-white">360°</dt>
                  <dd className="mt-1 text-sm text-white/60">
                    da estratégia ao produto
                  </dd>
                </div>
                <div>
                  <dt className="text-3xl font-bold text-white">∞</dt>
                  <dd className="mt-1 text-sm text-white/60">
                    problemas para resolver
                  </dd>
                </div>
              </dl>
            </div>

            {/* Coluna visual */}
            <div className="relative hidden lg:block">
              <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glow backdrop-blur">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <span className="h-3 w-3 rounded-full bg-accent/70" />
                  <span className="h-3 w-3 rounded-full bg-accent2/60" />
                  <span className="h-3 w-3 rounded-full bg-white/20" />
                  <span className="ml-auto text-xs font-medium text-white/50">
                    fluxo Evoluke
                  </span>
                </div>

                <ul className="mt-5 space-y-3">
                  {passos.map((passo, i) => {
                    const Icon = passo.icon;
                    return (
                      <li
                        key={passo.nome}
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent-300">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-accent-300">
                            {String(i + 1).padStart(2, "0")} · {passo.nome}
                          </p>
                          <p className="mt-0.5 text-sm font-medium text-white/80">
                            {passo.nome === "Entender"
                              ? "Diagnóstico orientado ao problema"
                              : passo.nome === "Construir"
                                ? "Solução de IA sob medida"
                                : "Em produção, gerando valor"}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ABORDAGEM EM 3 PASSOS */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Como atuamos"
            title="Entender → Construir → Escalar"
            description="Um modelo de ponta a ponta que vai do diagnóstico do problema à solução rodando em produção."
          />

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {passos.map((passo, i) => {
              const Icon = passo.icon;
              return (
                <li
                  key={passo.nome}
                  className="relative rounded-2xl border border-ink-100 bg-white p-7 shadow-card"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wider text-accent-600">
                      {String(i + 1).padStart(2, "0")} · {passo.nome}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink-900">
                    {passo.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/65">
                    {passo.descricao}
                  </p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* PROVA DE VALOR */}
      <section className="bg-ink-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Por que a Evoluke"
            title="Resolvedores de problemas, de ponta a ponta"
            description="Somos uma consultoria que também constrói. Você sai com uma solução funcionando, não com um relatório na gaveta."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {provas.map((prova) => {
              const Icon = prova.icon;
              return (
                <div
                  key={prova.titulo}
                  className="rounded-2xl border border-ink-100 bg-white p-7 shadow-card"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white shadow-glow">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink-900">
                    {prova.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/65">
                    {prova.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SEGMENTOS — ABAS INTERATIVAS */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Segmentos"
            title="Um problema do seu setor. Uma solução de IA sob medida."
            description="Explore exemplos do que podemos construir em cada vertical. E se o seu setor não estiver aqui, o método é o mesmo: entender, construir e escalar."
          />

          <div className="mt-12">
            <SegmentTabs />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/segmentos"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-600"
            >
              Ver todos os {segmentos.length} segmentos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <CTASection />
    </>
  );
}

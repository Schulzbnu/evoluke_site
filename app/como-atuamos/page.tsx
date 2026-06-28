import type { Metadata } from "next";
import {
  Search,
  Hammer,
  Rocket,
  ClipboardList,
  Wrench,
  LineChart,
  RefreshCw,
} from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Como atuamos",
  description:
    "O modelo da Evoluke vai da consultoria estratégica ao produto em produção: entender o problema, construir a solução de IA e escalar com segurança.",
  alternates: { canonical: "/como-atuamos" },
};

const fases = [
  {
    icon: Search,
    nome: "Entender",
    resumo: "Consultoria que começa pelo problema de negócio.",
    itens: [
      {
        icon: ClipboardList,
        titulo: "Diagnóstico e descoberta",
        texto:
          "Mapeamos processos, dores e objetivos. Entendemos onde está o gargalo e quanto ele custa.",
      },
      {
        icon: LineChart,
        titulo: "Viabilidade e priorização",
        texto:
          "Avaliamos dados disponíveis, viabilidade técnica e impacto para priorizar as iniciativas certas.",
      },
    ],
  },
  {
    icon: Hammer,
    nome: "Construir",
    resumo: "Desenvolvimento de produto de IA sob medida.",
    itens: [
      {
        icon: Wrench,
        titulo: "Prototipação e validação",
        texto:
          "Construímos uma prova de valor rápida para validar a hipótese antes de investir em escala.",
      },
      {
        icon: Hammer,
        titulo: "Engenharia de produção",
        texto:
          "Transformamos o protótipo em produto confiável: modelos, agentes de IA, integrações e interface.",
      },
    ],
  },
  {
    icon: Rocket,
    nome: "Escalar",
    resumo: "Operação, medição e evolução contínua.",
    itens: [
      {
        icon: Rocket,
        titulo: "Implantação e integração",
        texto:
          "Colocamos a solução no fluxo de trabalho real, com governança, segurança e monitoramento.",
      },
      {
        icon: RefreshCw,
        titulo: "Melhoria contínua",
        texto:
          "Medimos resultados, ajustamos os modelos e expandimos o escopo conforme o valor se comprova.",
      },
    ],
  },
];

export default function ComoAtuamosPage() {
  return (
    <>
      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <SectionHeading
            as="h1"
            light
            align="left"
            eyebrow="Como atuamos"
            title="Da estratégia ao produto em produção"
            description="A maioria das consultorias entrega um diagnóstico e vai embora. A Evoluke fica e constrói. Unimos consultoria e desenvolvimento num só fluxo — porque resolver o problema é o que importa."
          />
        </Container>
      </section>

      {/* Modelo consultoria -> produto */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
              Consultoria <span className="text-accent">+</span> Desenvolvimento,
              não um ou outro
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-900/65">
              Pensar e fazer caminham juntos. A estratégia informa o produto e o
              produto valida a estratégia — num ciclo curto que reduz risco e
              acelera o resultado.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {fases.map((fase, i) => {
              const FaseIcon = fase.icon;
              return (
                <div
                  key={fase.nome}
                  className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-glow">
                      <FaseIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="text-sm font-bold uppercase tracking-wider text-accent-600">
                        Fase {i + 1}
                      </span>
                      <h3 className="mt-1 text-2xl font-bold text-ink-900">
                        {fase.nome}
                      </h3>
                      <p className="mt-1 text-ink-900/65">{fase.resumo}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {fase.itens.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={item.titulo}
                          className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
                        >
                          <ItemIcon
                            className="h-6 w-6 text-accent-600"
                            aria-hidden="true"
                          />
                          <h4 className="mt-4 font-semibold text-ink-900">
                            {item.titulo}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-ink-900/65">
                            {item.texto}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

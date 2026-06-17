import type { Metadata } from "next";
import { Compass, Puzzle, Boxes, HeartHandshake } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A Evoluke é uma consultoria e desenvolvedora de produtos de IA. Nossa missão é resolver problemas de negócio com a solução de IA certa — em qualquer setor.",
};

const diferenciais = [
  {
    icon: Puzzle,
    titulo: "Foco no problema, não na ferramenta",
    texto:
      "Não chegamos com uma resposta pronta. Partimos do seu desafio e escolhemos a abordagem que melhor o resolve.",
  },
  {
    icon: Boxes,
    titulo: "Consultoria que constrói",
    texto:
      "Estratégia e engenharia no mesmo time. Saímos do diagnóstico e entregamos produto rodando.",
  },
  {
    icon: Compass,
    titulo: "Agnósticos de setor e tecnologia",
    texto:
      "De logística a saúde, de ML clássico a agentes de IA: usamos o que faz sentido para cada caso.",
  },
  {
    icon: HeartHandshake,
    titulo: "Parceria de longo prazo",
    texto:
      "Acompanhamos o resultado depois do go-live e evoluímos a solução junto com o seu negócio.",
  },
];

export default function SobrePage() {
  return (
    <>
      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <SectionHeading
            light
            align="left"
            eyebrow="Sobre a Evoluke"
            title="Existimos para resolver problemas com IA"
            description="Somos uma consultoria e desenvolvedora de produtos de Inteligência Artificial. Acreditamos que IA só vale quando resolve um problema real — e que resolver de verdade exige unir estratégia e construção."
          />
        </Container>
      </section>

      {/* Missão */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-600">
                Nossa missão
              </h2>
              <p className="mt-4 text-2xl font-bold leading-snug tracking-tight text-ink-900 sm:text-3xl">
                Entregar a solução de IA certa para cada problema de negócio —
                independentemente da necessidade do cliente.
              </p>
              <p className="mt-5 leading-relaxed text-ink-900/65">
                A Evoluke nasceu da convicção de que a maior parte do valor da
                Inteligência Artificial é perdida entre a recomendação e a
                execução. Por isso operamos as duas pontas: pensamos a
                estratégia e construímos o produto. O cliente não precisa
                traduzir um relatório em software — nós entregamos a solução
                pronta para gerar resultado.
              </p>
            </div>

            <div className="rounded-3xl border border-ink-100 bg-ink-50 p-8 sm:p-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-600">
                Por que IA com a Evoluke
              </h2>
              <ul className="mt-6 space-y-5">
                <li>
                  <p className="font-semibold text-ink-900">
                    Resolvedores de ponta a ponta
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-900/65">
                    Do diagnóstico ao produto em produção, sem repassar a
                    responsabilidade para outro fornecedor no meio do caminho.
                  </p>
                </li>
                <li>
                  <p className="font-semibold text-ink-900">
                    Atuação em qualquer setor
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-900/65">
                    O método é o mesmo onde quer que exista um problema de
                    negócio: entender, construir e escalar.
                  </p>
                </li>
                <li>
                  <p className="font-semibold text-ink-900">
                    Tecnologia a serviço do resultado
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-900/65">
                    Escolhemos a abordagem pelo impacto que gera, não pela moda
                    do momento.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Diferenciais */}
      <section className="bg-ink-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Nosso diferencial"
            title="O que nos torna diferentes"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {diferenciais.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.titulo}
                  className="flex gap-5 rounded-2xl border border-ink-100 bg-white p-7 shadow-card"
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900">
                      {d.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-900/65">
                      {d.texto}
                    </p>
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

import Container from "./Container";
import Button from "./Button";

interface CTASectionProps {
  title?: string;
  description?: string;
}

/** Bloco de chamada para ação (CTA) reutilizado ao fim das páginas. */
export default function CTASection({
  title = "Tem um problema? Nós temos a solução de IA.",
  description = "Não importa o setor nem o ponto de partida. Vamos entender seu desafio e desenhar o caminho certo.",
}: CTASectionProps) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-16 text-center sm:px-12">
          {/* Detalhe de fundo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid-dark bg-[size:32px_32px] opacity-40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contato" size="lg">
                Falar com a Evoluke
              </Button>
              <Button href="/como-atuamos" size="lg" variant="ghost">
                Como atuamos
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

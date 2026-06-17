import Container from "@/components/Container";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="py-28 sm:py-36">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
          Erro 404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-900/65">
          A página que você procura não existe ou foi movida. Mas o problema, a
          gente resolve.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Voltar ao início
          </Button>
          <Button href="/contato" size="lg" variant="secondary">
            Falar com a Evoluke
          </Button>
        </div>
      </Container>
    </section>
  );
}

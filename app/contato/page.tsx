import type { Metadata } from "next";
import { Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Evoluke. Conte o seu desafio de negócio e descubra como a IA pode resolvê-lo — da estratégia ao produto em produção.",
};

const infos = [
  {
    icon: Mail,
    titulo: "E-mail",
    valor: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MessageCircle,
    titulo: "WhatsApp",
    valor: site.telefone,
    href: `https://wa.me/${site.telefone.replace(/\D/g, "")}`,
  },
  {
    icon: Clock,
    titulo: "Horário",
    valor: "Seg a Sex, 9h às 18h",
  },
  {
    icon: MapPin,
    titulo: "Atuação",
    valor: "Brasil — atendimento remoto",
  },
];

export default function ContatoPage() {
  return (
    <>
      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-300">
              Contato
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Vamos resolver o seu problema?
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Conte o desafio do seu negócio. Avaliamos a viabilidade, propomos
              o caminho e construímos a solução de IA — em qualquer setor.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* Formulário */}
            <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card sm:p-9">
              <h2 className="text-xl font-bold text-ink-900">
                Envie uma mensagem
              </h2>
              <p className="mt-1.5 text-sm text-ink-900/60">
                Campos marcados com <span className="text-accent-600">*</span>{" "}
                são obrigatórios.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>

            {/* Informações de contato */}
            <div>
              <h2 className="text-xl font-bold text-ink-900">
                Outras formas de falar
              </h2>
              <p className="mt-1.5 text-sm text-ink-900/60">
                Prefere o contato direto? Use um dos canais abaixo.
              </p>

              <ul className="mt-7 space-y-4">
                {infos.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-colors hover:border-accent-200">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">
                          {info.titulo}
                        </p>
                        <p className="mt-0.5 text-sm text-ink-900/65">
                          {info.valor}
                        </p>
                      </div>
                    </div>
                  );
                  return (
                    <li key={info.titulo}>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="block"
                          {...(info.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

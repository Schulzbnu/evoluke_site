import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Política de privacidade",
  robots: { index: false, follow: true },
};

// Placeholder de página de privacidade — substituir pelo texto jurídico real.
export default function PrivacidadePage() {
  return (
    <main className="py-16">
      <Container className="max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-800">
          <ArrowLeft size={16} aria-hidden="true" />
          Voltar ao início
        </Link>
        <div className="mt-6">
          <Logo />
        </div>
        <h1 className="mt-8 text-fluid-h2 font-bold text-ink">Política de privacidade</h1>
        <p className="mt-4 text-ink-muted">
          {"{{TEXTO_POLITICA_DE_PRIVACIDADE}}"} — conteúdo jurídico a ser preenchido,
          incluindo tratamento de dados conforme a LGPD, finalidade de coleta do
          formulário de contato e canal do encarregado (DPO).
        </p>
      </Container>
    </main>
  );
}

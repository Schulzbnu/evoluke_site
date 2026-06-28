import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import { navItems, site } from "@/data/site";
import { segmentos } from "@/data/segmentos";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-950 text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {site.descricao}
            </p>
          </div>

          <nav aria-label="Navegação" className="text-sm">
            <h2 className="font-semibold text-white">Navegação</h2>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contato"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Segmentos" className="text-sm">
            <h2 className="font-semibold text-white">Segmentos</h2>
            <ul className="mt-4 space-y-2.5">
              {segmentos.map((seg) => (
                <li key={seg.slug}>
                  <Link
                    href={`/segmentos/${seg.slug}`}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {seg.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <h2 className="font-semibold text-white">Contato</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.telefone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {site.telefone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>
            © {year} {site.nome}. Todos os direitos reservados.
          </p>
          <p>Consultoria e produtos de Inteligência Artificial.</p>
        </div>
      </Container>
    </footer>
  );
}

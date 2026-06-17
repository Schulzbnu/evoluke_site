import { Linkedin, Instagram, Github } from "lucide-react";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";
import { footer, site } from "@/content/pt";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-muted bg-surface-subtle py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{footer.description}</p>
            <div className="mt-5 flex gap-3">
              <SocialLink href={site.social.linkedin} label="LinkedIn">
                <Linkedin size={18} aria-hidden="true" />
              </SocialLink>
              <SocialLink href={site.social.instagram} label="Instagram">
                <Instagram size={18} aria-hidden="true" />
              </SocialLink>
              <SocialLink href={site.social.github} label="GitHub">
                <Github size={18} aria-hidden="true" />
              </SocialLink>
            </div>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">{col.title}</h2>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-ink-muted hover:text-brand-800">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Empresa</h2>
            <address className="mt-4 space-y-2 text-sm not-italic text-ink-muted">
              <p>CNPJ: {site.cnpj}</p>
              <p>{site.address}</p>
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-surface-muted pt-6 text-sm text-ink-muted sm:flex-row">
          <p>
            © {year} {site.name}. {footer.rights}
          </p>
          <a href={footer.privacyHref} className="hover:text-brand-800">
            {footer.privacyLabel}
          </a>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-surface-muted bg-surface text-ink-muted transition-colors hover:text-brand-800"
    >
      {children}
    </a>
  );
}

import Link from "next/link";
import Image from "next/image";
import { branding, site } from "@/data/site";

/**
 * Logo da Evoluke.
 *
 * - Se `branding.logo` estiver preenchido em `data/site.ts`, exibe a imagem
 *   (via next/image). Em fundos escuros (`light`), usa `branding.logoLight`
 *   quando disponível.
 * - Caso contrário, mantém o wordmark em texto como placeholder.
 */
export default function Logo({ light = false }: { light?: boolean }) {
  const src = light && branding.logoLight ? branding.logoLight : branding.logo;

  return (
    <Link
      href="/"
      aria-label={`${site.nome} — página inicial`}
      className="group inline-flex items-center gap-2"
    >
      {src ? (
        <Image
          src={src}
          alt={branding.logoAlt}
          width={branding.logoWidth}
          height={branding.logoHeight}
          priority
          className="h-9 w-auto"
        />
      ) : (
        <>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-base font-black text-white shadow-glow"
            aria-hidden="true"
          >
            E
          </span>
          <span
            className={`text-xl font-bold tracking-tight ${
              light ? "text-white" : "text-ink-900"
            }`}
          >
            Evolu<span className="text-accent">ke</span>
          </span>
        </>
      )}
    </Link>
  );
}

/**
 * Builders de dados estruturados (schema.org) reutilizados nas páginas.
 * Centraliza a geração de JSON-LD a partir da fonte de verdade do site
 * (`site`) e das verticais (`segmentos`), evitando duplicação e mantendo
 * URLs absolutas consistentes com `site.url`.
 */

import { site } from "./site";
import type { Segmento } from "./segmentos";

/** Gera uma URL absoluta a partir de um caminho relativo. */
function absoluteUrl(path: string): string {
  return `${site.url}${path}`;
}

/** Telefone em formato E.164 (apenas + e dígitos), exigido pelo schema. */
const telefoneE164 = site.telefone.replace(/[^+\d]/g, "");

/**
 * T2 — Schema da organização, usado uma vez no layout raiz.
 * Descreve a empresa como entidade para o Google (Knowledge Graph).
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.nome,
    url: site.url,
    description: site.descricao,
    slogan: site.tagline,
    email: site.email,
    telephone: telefoneE164,
    areaServed: "BR",
    knowsLanguage: "pt-BR",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: telefoneE164,
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
  };
}

/**
 * T2b — Schema de serviço para uma vertical (`/segmentos/[slug]`).
 * Lista as soluções oferecidas como um catálogo de ofertas.
 */
export function serviceSchema(seg: Segmento) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `IA para ${seg.nome}`,
    serviceType: `Inteligência Artificial para ${seg.nome}`,
    description: seg.resumo,
    url: absoluteUrl(`/segmentos/${seg.slug}`),
    areaServed: "BR",
    provider: {
      "@type": "Organization",
      name: site.nome,
      url: site.url,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Soluções de IA para ${seg.nome}`,
      itemListElement: seg.solucoes.map((solucao) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: solucao.titulo,
          description: solucao.resultado,
        },
      })),
    },
  };
}

/**
 * T2b — Trilha de navegação (breadcrumb) de uma página de vertical:
 * Início › Segmentos › [Vertical].
 */
export function segmentoBreadcrumbSchema(seg: Segmento) {
  const itens = [
    { name: "Início", path: "/" },
    { name: "Segmentos", path: "/segmentos" },
    { name: seg.nome, path: `/segmentos/${seg.slug}` },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

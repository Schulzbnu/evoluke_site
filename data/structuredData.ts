/**
 * Builders de dados estruturados (schema.org) reutilizados nas páginas.
 * Centraliza a geração de JSON-LD a partir da fonte de verdade do site
 * (`site`) e das verticais (`segmentos`), evitando duplicação e mantendo
 * URLs absolutas consistentes com `site.url`.
 */

import { site } from "./site";
import { segmentos, type Segmento } from "./segmentos";
import { produtos, type Produto } from "./produtos";
import type { BlogPost } from "@/lib/blog";

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
    // Conecta os produtos próprios à entidade Evoluke (Knowledge Graph).
    // Cada produto referencia a Organization de volta via `publisher`,
    // formando uma associação de entidade bidirecional e legítima.
    owns: produtos.map((p) => ({
      "@type": "SoftwareApplication",
      name: p.nome,
      url: p.url,
    })),
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
 * T2b — Lista de itens da página `/segmentos` (CollectionPage).
 * Ajuda o Google a entender a coleção de verticais e a exibir links
 * de sitelinks/itemlist nos resultados de busca.
 */
export function segmentosItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Segmentos de atuação da Evoluke",
    description:
      "Setores de mercado e áreas da empresa onde a Evoluke aplica Inteligência Artificial.",
    numberOfItems: segmentos.length,
    itemListElement: segmentos.map((seg, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `IA para ${seg.nome}`,
      url: absoluteUrl(`/segmentos/${seg.slug}`),
    })),
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

/** Trilha de navegação genérica a partir de pares (nome, caminho). */
export function breadcrumbSchema(itens: { name: string; path: string }[]) {
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

/**
 * Produtos — lista de itens da página `/produtos` (ItemList).
 * Ajuda o Google a entender o ecossistema de produtos próprios e a exibir
 * a coleção como itemlist nos resultados.
 */
export function produtosItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Produtos da ${site.nome}`,
    description:
      "Ecossistema de produtos próprios da Evoluke — SaaS, plataformas e ferramentas.",
    numberOfItems: produtos.length,
    itemListElement: produtos.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.nome,
      // URL interna da página do produto (mantém o usuário no domínio para
      // ranqueamento próprio; o link externo fica no conteúdo da página).
      url: absoluteUrl(`/produtos/${p.slug}`),
    })),
  };
}

/**
 * Produtos — schema de um produto individual (`/produtos/[slug]`).
 * Usa SoftwareApplication: `url` aponta para o site externo do produto e
 * `publisher` declara a Evoluke como dona (associação de entidade).
 */
export function produtoSchema(produto: Produto) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: produto.nome,
    description: produto.descricao,
    // Site público do produto — sinaliza ao Google a relação entre domínios.
    url: produto.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: site.nome,
      url: site.url,
    },
  };
}

/**
 * Produtos — trilha de navegação (breadcrumb) de uma página de produto:
 * Início › Produtos › [Produto].
 */
export function produtoBreadcrumbSchema(produto: Produto) {
  return breadcrumbSchema([
    { name: "Início", path: "/" },
    { name: "Produtos", path: "/produtos" },
    { name: produto.nome, path: `/produtos/${produto.slug}` },
  ]);
}

/**
 * Blog — schema da página de listagem (`/blog`).
 * Descreve a coleção de posts para o Google.
 */
export function blogSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog da ${site.nome}`,
    description:
      "Artigos sobre Inteligência Artificial aplicada a negócios: estratégia, casos de uso e boas práticas.",
    url: absoluteUrl("/blog"),
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: site.nome,
      url: site.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: { "@type": "Organization", name: post.author },
    })),
  };
}

/**
 * Blog — schema de um post individual (`/blog/[slug]`).
 * Usa BlogPosting com autor, datas, imagem e publisher.
 */
export function blogPostingSchema(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "pt-BR",
    keywords: post.tags.join(", "),
    image: [absoluteUrl(`/blog/${post.slug}/opengraph-image`)],
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.nome,
      url: site.url,
    },
  };
}

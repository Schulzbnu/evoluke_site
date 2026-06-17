import { site } from "@/content/pt";

/**
 * Dados estruturados (JSON-LD) de Organization para SEO.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    sameAs: [site.social.linkedin, site.social.instagram, site.social.github],
  };

  return (
    <script
      type="application/ld+json"
      // JSON serializado é seguro aqui (conteúdo estático, sem input do usuário).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

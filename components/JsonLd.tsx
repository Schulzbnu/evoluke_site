/**
 * Injeta dados estruturados (schema.org) como JSON-LD no HTML.
 * Renderizado no servidor — o conteúdo fica no HTML inicial, visível
 * para crawlers e ferramentas de Rich Results.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo é gerado a partir de dados internos confiáveis.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

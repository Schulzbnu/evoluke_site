/**
 * Renderização segura de Markdown -> HTML para os posts do blog.
 *
 * O conteúdo chega via API autenticada (autor confiável), mas ainda assim
 * aplicamos defesa em profundidade:
 *   1. HTML cru embutido no markdown é ESCAPADO (não interpretado) — bloqueia
 *      injeção de <script>, <iframe>, handlers on*, etc.
 *   2. URLs de links e imagens passam por uma allowlist de protocolos —
 *      bloqueia `javascript:`, `data:` e afins.
 *   3. Links externos recebem rel="noopener noreferrer" + target="_blank".
 *
 * Mantemos a dependência enxuta (apenas `marked`), sem DOM/JSDOM no servidor.
 */
import { Marked, type Tokens } from "marked";

/** Escapa os caracteres especiais de HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Allowlist de URLs: aceita caminhos relativos, âncoras e os protocolos
 * http(s), mailto e tel. Qualquer outro esquema vira "#" (neutralizado).
 */
function sanitizeUrl(href: string | null | undefined): string {
  if (!href) return "#";
  const value = href.trim();
  // Tem um esquema explícito (algo antes de ":")?
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    if (!/^(https?:|mailto:|tel:)/i.test(value)) return "#";
  }
  return value;
}

/** É um link que aponta para fora do site (recebe target/rel de segurança)? */
function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

const marked = new Marked({
  gfm: true,
  breaks: false,
});

marked.use({
  renderer: {
    // Neutraliza HTML cru (bloco e inline) escapando-o como texto.
    html(token: Tokens.HTML | Tokens.Tag) {
      return escapeHtml(token.text);
    },
    link(token: Tokens.Link) {
      const href = sanitizeUrl(token.href);
      const text = this.parser.parseInline(token.tokens);
      const title = token.title ? ` title="${escapeHtml(token.title)}"` : "";
      const external = isExternal(href)
        ? ' target="_blank" rel="noopener noreferrer nofollow"'
        : "";
      return `<a href="${escapeHtml(href)}"${title}${external}>${text}</a>`;
    },
    image(token: Tokens.Image) {
      const src = sanitizeUrl(token.href);
      const title = token.title ? ` title="${escapeHtml(token.title)}"` : "";
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(
        token.text,
      )}"${title} loading="lazy" decoding="async" />`;
    },
  },
});

/** Converte o markdown do post em HTML seguro para exibição. */
export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

/**
 * Estima o tempo de leitura (em minutos) a partir do markdown.
 * Usa 200 palavras/min e garante o mínimo de 1.
 */
export function readingTimeMinutes(markdown: string): number {
  const words = markdown
    .replace(/[#>*_`~\-[\]()!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Extrai um resumo em texto puro do markdown, para usar como meta description
 * quando o post não traz um `excerpt` explícito.
 */
export function excerptFromMarkdown(markdown: string, maxLength = 160): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ") // blocos de código
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // imagens
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links -> texto
    .replace(/[#>*_`~]/g, "") // marcações
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trimEnd() + "…";
}

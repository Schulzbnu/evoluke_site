/**
 * Configuração geral do site e textos de marca reutilizados.
 * Centraliza navegação, dados de contato e a promessa de valor
 * para manter consistência entre páginas.
 */

export const site = {
  nome: "Evoluke",
  // Usado em metadados de SEO / Open Graph. Ajuste para o domínio real em produção.
  url: "https://www.evoluke.com.br",
  tagline:
    "Resolvemos problemas com Inteligência Artificial — em qualquer setor.",
  descricao:
    "A Evoluke é consultoria e desenvolvedora de produtos de IA. Entendemos o problema do seu negócio e entregamos a solução certa, da estratégia ao produto em produção.",
  email: "contato@evoluke.com.br",
  telefone: "+55 (11) 4000-0000",
};

/**
 * Configuração de identidade visual (logo e imagem de compartilhamento).
 *
 * Como ativar a logo em imagem:
 *  1. Coloque o arquivo em `public/brand/` (ex.: `public/brand/logo.svg`).
 *  2. Preencha `logo` com o caminho público (ex.: "/brand/logo.svg").
 *  3. (Opcional) Preencha `logoLight` com a versão para fundos escuros
 *     (usada no rodapé). Se ficar vazio, reutiliza `logo`.
 *  4. Ajuste `logoWidth` / `logoHeight` para a proporção real do arquivo.
 *
 * Enquanto `logo` estiver vazio, o site continua exibindo o wordmark em texto.
 *
 * Favicon: NÃO é configurado aqui. O Next.js detecta automaticamente os
 * arquivos `app/icon.*` e `app/apple-icon.*` (veja `public/brand/README.md`).
 */
export const branding = {
  /** Caminho público da logo principal (fundos claros). Vazio = usa o wordmark em texto. */
  logo: "/brand/logo.svg",
  /** Logo para fundos escuros (rodapé). Vazio = usa `logo`. */
  logoLight: "/brand/logo-light.svg",
  /** Texto alternativo da logo (acessibilidade). */
  logoAlt: `${site.nome} — logotipo`,
  /** Dimensões intrínsecas da logo, em pixels (necessárias para o next/image). */
  logoWidth: 229,
  logoHeight: 76,
  /**
   * Imagem de compartilhamento social (Open Graph / Twitter), ~1200x630.
   * Coloque em `public/brand/` e informe o caminho aqui (ex.: "/brand/og.png").
   * Vazio = nenhuma imagem é declarada nos metadados.
   */
  ogImage: "",
};

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Como atuamos", href: "/como-atuamos" },
  { label: "Segmentos", href: "/segmentos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

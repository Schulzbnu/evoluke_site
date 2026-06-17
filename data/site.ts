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

import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  LayoutGrid,
  Sigma,
  Scale,
  UserCheck,
  BarChart3,
  ListChecks,
  Megaphone,
  Code2,
  Database,
  Wand2,
  PieChart,
} from "lucide-react";

/**
 * Ecossistema de produtos da Evoluke.
 * --------------------------------------------------------------------------
 * Esta é a ÚNICA fonte de verdade dos produtos/sites próprios da empresa.
 * A página de listagem (`/produtos`), as páginas individuais
 * (`/produtos/[slug]`), o menu, o rodapé, o sitemap e o JSON-LD são todos
 * gerados a partir deste arquivo. Para adicionar/editar um produto, basta
 * alterar o array `produtos` abaixo.
 *
 * ── Estratégia de SEO / backlink (LEIA antes de preencher) ────────────────
 * Estes são sites do MESMO grupo. Para que os links entre eles sejam vistos
 * pelo Google como uma rede legítima (e não um esquema de links):
 *
 *   1. A âncora do link externo é o NOME DA MARCA do produto (ex.: "Acessar
 *      o Fulano"), nunca uma frase recheada de palavra-chave. Isso é feito
 *      automaticamente pela página — basta preencher `nome` corretamente.
 *   2. A página declara explicitamente a propriedade comum ("Um produto
 *      Evoluke"). Transparência é o que diferencia rede legítima de PBN.
 *   3. O link externo é `dofollow` (deixamos a autoridade fluir) e abre em
 *      nova aba. Não use nofollow aqui.
 *   4. RECÍPROCO: para fechar o ciclo de backlink, cada site de produto deve
 *      apontar de volta para https://www.evoluke.com.br (ex.: "Um produto
 *      Evoluke" no rodapé do produto, linkando para cá). Faça isso no outro
 *      repositório — este arquivo cuida apenas do lado evoluke.com.br.
 *   5. ENTIDADE: o JSON-LD de cada produto declara a Evoluke como publisher
 *      e a Organization declara `owns` apontando para cada produto. Isso
 *      conecta as marcas como a mesma entidade para o Knowledge Graph.
 *
 * ── Campos de cada produto ────────────────────────────────────────────────
 *   slug       -> usado na URL interna (/produtos/<slug>). kebab-case.
 *   nome       -> nome da marca do produto (também vira a âncora do link).
 *   categoria  -> tipo de produto (ver `categoriasProduto`).
 *   url        -> URL pública ABSOLUTA do site do produto (https://...).
 *   tagline    -> 1 frase curta (card e subtítulo).
 *   descricao  -> 1 parágrafo: o que é o produto. Conteúdo único (evita
 *                 página "magra"); escreva 2–4 frases reais, sem clichê.
 *   paraQuem   -> 1 frase: para quem é / qual público resolve.
 *   destaques  -> 3 a 5 diferenciais/recursos (bullets da página).
 *   icon       -> ícone lucide-react que representa o produto.
 *   status     -> "ativo" (no ar) ou "em-breve" (lançamento futuro).
 *
 * Os dois itens abaixo são EXEMPLOS — substitua pelos produtos reais.
 */

export type CategoriaProduto = "saas" | "plataforma" | "ferramenta";

export interface CategoriaProdutoInfo {
  id: CategoriaProduto;
  /** Rótulo curto (chips, cabeçalho de grupo). */
  label: string;
  /** Frase de apoio exibida abaixo do rótulo. */
  descricao: string;
}

/** Metadados das categorias usadas para agrupar os produtos na listagem. */
export const categoriasProduto: CategoriaProdutoInfo[] = [
  {
    id: "saas",
    label: "SaaS",
    descricao: "Produtos em nuvem, por assinatura, prontos para usar.",
  },
  {
    id: "plataforma",
    label: "Plataformas",
    descricao: "Soluções mais amplas que conectam vários fluxos de trabalho.",
  },
  {
    id: "ferramenta",
    label: "Ferramentas",
    descricao: "Utilitários focados em resolver uma dor específica.",
  },
];

export type StatusProduto = "ativo" | "em-breve";

export interface Produto {
  slug: string;
  nome: string;
  categoria: CategoriaProduto;
  /** URL pública absoluta do site do produto (https://...). */
  url: string;
  /** Frase-resumo usada em cards e como subtítulo da página. */
  tagline: string;
  /** Parágrafo único descrevendo o produto (o que é). */
  descricao: string;
  /** Para quem é / qual público o produto atende. */
  paraQuem: string;
  /** 3 a 5 diferenciais/recursos exibidos como bullets. */
  destaques: string[];
  /** Ícone (lucide-react) que representa o produto. */
  icon: LucideIcon;
  /** Estado do produto. "em-breve" exibe selo e desativa o link externo. */
  status: StatusProduto;
}

export const produtos: Produto[] = [
  {
    slug: "calculas",
    nome: "Calculas",
    categoria: "ferramenta",
    url: "https://calculas.com.br",
    tagline:
      "Calculadoras para a vida toda — cálculos financeiros, trabalhistas e do dia a dia, sem cadastro.",
    descricao:
      "O Calculas reúne mais de 130 calculadoras de finanças, direito trabalhista, impostos, imóveis, veículos e saúde, sempre com a memória de cálculo à vista — você vê como cada resultado foi obtido. Tudo gratuito e sem login. Para quem desenvolve, oferece ainda uma API REST com as tabelas atualizadas automaticamente.",
    paraQuem:
      "Para qualquer pessoa que precisa de uma conta confiável — de rescisão a financiamento — e para desenvolvedores que querem cálculos prontos via API.",
    destaques: [
      "Mais de 130 calculadoras em 10 categorias: finanças, trabalhista, impostos, imóveis, veículos, saúde e mais",
      "Memória de cálculo transparente — cada resultado mostra como foi obtido",
      "Sem cadastro: acesso gratuito e sem pedir dados pessoais",
      "API REST para desenvolvedores, com 10.000 chamadas gratuitas por mês",
      "Tabelas e regras atualizadas para 2026",
    ],
    icon: Calculator,
    status: "ativo",
  },
];

// ── Helpers de acesso (espelham o padrão de data/segmentos.ts) ─────────────

/** Retorna todos os slugs (usado em generateStaticParams e no sitemap). */
export function getProdutoSlugs(): string[] {
  return produtos.map((p) => p.slug);
}

/** Busca um produto pelo slug. */
export function getProduto(slug: string): Produto | undefined {
  return produtos.find((p) => p.slug === slug);
}

/** Busca os metadados de uma categoria. */
export function getCategoriaProduto(id: CategoriaProduto): CategoriaProdutoInfo {
  return categoriasProduto.find((c) => c.id === id) ?? categoriasProduto[0];
}

/** Produtos de uma categoria específica (mantém a ordem do array). */
export function getProdutosByCategoria(id: CategoriaProduto): Produto[] {
  return produtos.filter((p) => p.categoria === id);
}

/** Categorias que têm ao menos um produto (evita seções vazias). */
export function getCategoriasComProdutos(): CategoriaProdutoInfo[] {
  return categoriasProduto.filter((c) =>
    produtos.some((p) => p.categoria === c.id),
  );
}

/** Ícone padrão para representar o ecossistema (usado no menu). */
export const produtosIcon: LucideIcon = LayoutGrid;

// ── Capacidades sob demanda ────────────────────────────────────────────────
/**
 * Frentes que a Evoluke domina e entrega SOB MEDIDA, mas que ainda NÃO viraram
 * um produto fechado com site próprio. São exibidas como cards leves na página
 * `/produtos` — SEM rota individual e SEM link externo (não há produto/URL
 * concreto). Servem para mostrar amplitude e cobrir termos de busca, sem criar
 * páginas "magras" nem backlinks falsos. Quando uma frente virar um produto
 * real, mova-a para o array `produtos` acima (ganha página + link).
 */
export interface Capacidade {
  nome: string;
  /** 1 frase honesta sobre o que entregamos nessa frente. */
  descricao: string;
  icon: LucideIcon;
}

export interface GrupoCapacidade {
  id: string;
  label: string;
  descricao: string;
  itens: Capacidade[];
}

export const capacidades: GrupoCapacidade[] = [
  {
    id: "solucoes",
    label: "Demais produtos",
    descricao:
      "Soluções de IA que desenvolvemos para diferentes áreas e setores.",
    itens: [
      {
        nome: "API de cálculos com IA",
        descricao:
          "Endpoints de cálculo financeiro, trabalhista e fiscal somados a IA que interpreta e explica os resultados.",
        icon: Sigma,
      },
      {
        nome: "IA para Jurídico",
        descricao:
          "Análise e geração de documentos, triagem de processos e respostas a partir da sua base jurídica.",
        icon: Scale,
      },
      {
        nome: "IA para entrevista de emprego",
        descricao:
          "Triagem de candidatos, roteiros de entrevista e avaliação assistida por IA.",
        icon: UserCheck,
      },
      {
        nome: "IA para análise de dados",
        descricao:
          "Modelos e agentes que transformam dados brutos em respostas e decisões.",
        icon: BarChart3,
      },
      {
        nome: "IA para gestão de times e tarefas",
        descricao:
          "Priorização, acompanhamento e resumo automático de tarefas e equipes.",
        icon: ListChecks,
      },
      {
        nome: "Automação de marketing",
        descricao:
          "Fluxos, conteúdo e segmentação automatizados para gerar e nutrir leads.",
        icon: Megaphone,
      },
      {
        nome: "Desenvolvimento de aplicações e sites",
        descricao:
          "Construção de produtos web sob medida — do MVP à produção.",
        icon: Code2,
      },
    ],
  },
  {
    id: "tecnologias",
    label: "Demais tecnologias",
    descricao:
      "Plataformas de dados e BI que dominamos e colocamos em produção.",
    itens: [
      {
        nome: "Databricks",
        descricao:
          "Engenharia de dados e machine learning em escala na Lakehouse Platform.",
        icon: Database,
      },
      {
        nome: "Sala Genie",
        descricao:
          "Perguntas em linguagem natural sobre os seus dados com a sala Genie da Databricks.",
        icon: Wand2,
      },
      {
        nome: "Power BI",
        descricao:
          "Dashboards e relatórios interativos conectados às suas fontes de dados.",
        icon: PieChart,
      },
    ],
  },
];

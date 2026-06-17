/**
 * Conteúdo / copy centralizado (PT-BR).
 *
 * Toda a copy da landing page vive aqui para facilitar revisão e uma futura
 * tradução (EN) sem refatorar componentes. Placeholders a preencher seguem o
 * padrão {{NOME_DO_PLACEHOLDER}} para não se confundirem com copy definitiva.
 */

import type { LucideIcon } from "lucide-react";
import {
  Truck,
  Landmark,
  HeartPulse,
  ShoppingCart,
  Factory,
  Sparkles,
  Compass,
  Boxes,
  Workflow,
  Database,
  LifeBuoy,
  Search,
  Hammer,
  Rocket,
  TrendingUp,
  Target,
  ShieldCheck,
  Users,
} from "lucide-react";

export const site = {
  name: "Evoluke",
  // TODO: substituir pelo domínio definitivo de produção.
  url: "https://www.evoluke.com.br",
  tagline: "Seu problema de negócio, resolvido com Inteligência Artificial.",
  description:
    "A Evoluke é uma resolvedora de problemas de negócio com IA. Traga o desafio — custo, gargalo, risco ou oportunidade — e entregamos a solução, do diagnóstico à produção, em qualquer setor.",
  email: "contato@evoluke.com.br", // {{EMAIL_DE_CONTATO}}
  whatsapp: "+55 00 00000-0000", // {{TELEFONE_WHATSAPP}}
  cnpj: "00.000.000/0001-00", // {{CNPJ}}
  address: "{{ENDERECO}} — {{CIDADE}}/{{UF}}",
  social: {
    linkedin: "https://www.linkedin.com/company/{{LINKEDIN}}",
    instagram: "https://www.instagram.com/{{INSTAGRAM}}",
    github: "https://github.com/{{GITHUB}}",
  },
} as const;

export const nav = {
  links: [
    { label: "Soluções", href: "#solucoes" },
    { label: "Verticais", href: "#verticais" },
    { label: "Como trabalhamos", href: "#como-trabalhamos" },
    { label: "Contato", href: "#contato" },
  ],
  cta: { label: "Falar com especialista", href: "#contato" },
} as const;

export const hero = {
  eyebrow: "Consultoria e produtos de Inteligência Artificial",
  headline: "Seu problema de negócio, resolvido com Inteligência Artificial.",
  subheadline:
    "Você não precisa saber qual tecnologia usar. Traga o desafio — custo, gargalo, risco ou oportunidade — e a Evoluke desenha e entrega a solução de IA, do diagnóstico à produção. Em qualquer setor.",
  primaryCta: { label: "Falar com especialista", href: "#contato" },
  secondaryCta: { label: "Ver como trabalhamos", href: "#como-trabalhamos" },
} as const;

export const credibility = {
  title: "Atravessamos setores — da logística ao mercado financeiro",
  // Placeholders de logos de clientes/parceiros. Substituir por imagens reais.
  logos: [
    "{{LOGO_CLIENTE_1}}",
    "{{LOGO_CLIENTE_2}}",
    "{{LOGO_CLIENTE_3}}",
    "{{LOGO_CLIENTE_4}}",
    "{{LOGO_CLIENTE_5}}",
  ],
} as const;

export const problemSolution = {
  id: "solucoes",
  eyebrow: "Do problema à solução",
  title: "Você descreve a dor. Nós entregamos a solução de IA.",
  intro:
    "A maioria das empresas não precisa de “mais um modelo”. Precisa resolver um problema concreto de negócio. A Evoluke começa pela dor — não pela tecnologia — e traduz isso em uma solução que entra em produção e gera resultado.",
  pairs: [
    {
      problem: "Custos operacionais que não param de crescer.",
      solution:
        "Automação inteligente de tarefas repetitivas e previsão de demanda para alocar recursos onde importa.",
    },
    {
      problem: "Gargalos que travam a operação em horários de pico.",
      solution:
        "Orquestração de processos com IA que prioriza, distribui e acelera o fluxo sem aumentar o time.",
    },
    {
      problem: "Decisões lentas, baseadas em planilhas desatualizadas.",
      solution:
        "Modelos preditivos e painéis em tempo real que transformam dados dispersos em decisão imediata.",
    },
    {
      problem: "Risco de fraude, erro ou não conformidade.",
      solution:
        "Detecção de anomalias e classificação automática que sinalizam o que exige atenção humana — antes do prejuízo.",
    },
  ],
} as const;

type Vertical = {
  icon: LucideIcon;
  name: string;
  problem: string;
};

export const verticals = {
  id: "verticais",
  eyebrow: "Verticais atendidas",
  title: "Não importa o seu setor. Importa o seu problema.",
  intro:
    "Trabalhamos com médias e grandes empresas em múltiplas verticais. Abaixo, exemplos concretos de problemas que a IA resolve em cada uma.",
  items: [
    {
      icon: Truck,
      name: "Logística",
      problem:
        "Roteirização e previsão de demanda que reduzem quilometragem ociosa e atrasos de entrega.",
    },
    {
      icon: Landmark,
      name: "Financeiro & Bancário",
      problem:
        "Detecção de fraude em tempo real e análise de crédito mais rápida e justa.",
    },
    {
      icon: HeartPulse,
      name: "Saúde",
      problem:
        "Triagem assistida e otimização de agendas que reduzem filas e no-shows.",
    },
    {
      icon: ShoppingCart,
      name: "Varejo",
      problem:
        "Recomendação personalizada e previsão de estoque que aumentam venda e reduzem ruptura.",
    },
    {
      icon: Factory,
      name: "Indústria",
      problem:
        "Manutenção preditiva e controle de qualidade por visão computacional na linha.",
    },
    {
      icon: Sparkles,
      name: "Seu setor",
      problem:
        "Não viu o seu mercado? O método é o mesmo: começamos pela dor e desenhamos a solução. {{VERTICAL_PERSONALIZADA}}",
    },
  ] satisfies Vertical[],
} as const;

type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const capabilities = {
  id: "o-que-fazemos",
  eyebrow: "O que fazemos",
  title: "Resolvemos o problema inteiro — não só a parte de modelo.",
  intro:
    "Cada capacidade existe para tirar uma dor do seu caminho. Você não contrata tecnologia solta; contrata um problema resolvido.",
  items: [
    {
      icon: Compass,
      title: "Consultoria e diagnóstico de IA",
      description:
        "Mapeamos onde a IA gera retorno real e onde não vale a pena — para você investir no que move o ponteiro.",
    },
    {
      icon: Boxes,
      title: "Produtos de IA sob medida",
      description:
        "Desenvolvemos a solução específica do seu problema, do protótipo ao produto que entra em produção.",
    },
    {
      icon: Workflow,
      title: "Integração e automação",
      description:
        "Conectamos a IA aos seus sistemas e processos atuais, automatizando o que hoje consome tempo do time.",
    },
    {
      icon: Database,
      title: "Dados & MLOps",
      description:
        "Estruturamos dados, deploy e monitoramento para que a solução siga confiável e escalável ao longo do tempo.",
    },
    {
      icon: LifeBuoy,
      title: "Suporte e evolução contínua",
      description:
        "Acompanhamos resultado, ajustamos modelos e evoluímos a solução conforme o negócio muda.",
    },
  ] satisfies Capability[],
} as const;

type Step = {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
};

export const process = {
  id: "como-trabalhamos",
  eyebrow: "Como trabalhamos",
  title: "Do diagnóstico à escala, com você no controle.",
  intro:
    "Um caminho claro e previsível. Cada etapa tem entrega tangível e ponto de decisão — sem caixa-preta.",
  steps: [
    {
      icon: Search,
      step: "01",
      title: "Diagnóstico",
      description:
        "Entendemos o problema de negócio, os dados disponíveis e o retorno esperado.",
    },
    {
      icon: Hammer,
      step: "02",
      title: "Prototipação",
      description:
        "Construímos uma prova de conceito rápida para validar viabilidade e impacto antes de escalar.",
    },
    {
      icon: Rocket,
      step: "03",
      title: "Produção",
      description:
        "Levamos a solução ao ambiente real, integrada aos seus sistemas e processos.",
    },
    {
      icon: TrendingUp,
      step: "04",
      title: "Escala",
      description:
        "Monitoramos, otimizamos e expandimos a solução para novos casos e times.",
    },
  ] satisfies Step[],
} as const;

type Differentiator = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const whyUs = {
  id: "por-que-evoluke",
  eyebrow: "Por que Evoluke",
  title: "Parceira de resultado, não fornecedora de tecnologia.",
  pillars: [
    {
      icon: Target,
      title: "Agnóstica de setor",
      description:
        "O método funciona em qualquer vertical porque começa pelo problema, não por uma tecnologia favorita.",
    },
    {
      icon: TrendingUp,
      title: "Foco em ROI",
      description:
        "Priorizamos o que gera retorno mensurável. Se não move o negócio, não construímos.",
    },
    {
      icon: ShieldCheck,
      title: "Do diagnóstico à produção",
      description:
        "Não paramos no slide. Entregamos solução rodando, integrada e monitorada.",
    },
    {
      icon: Users,
      title: "Time sênior",
      description:
        "Profissionais experientes em dados, engenharia e produto conduzindo cada projeto.",
    },
  ] satisfies Differentiator[],
  metrics: [
    { value: "{{METRICA_1}}", label: "redução média de custo operacional" },
    { value: "{{METRICA_2}}", label: "projetos entregues em produção" },
    { value: "{{METRICA_3}}", label: "semanas até o primeiro protótipo" },
  ],
} as const;

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const socialProof = {
  id: "prova-social",
  eyebrow: "Prova social",
  title: "O que dizem sobre trabalhar com a Evoluke.",
  testimonials: [
    {
      quote: "{{DEPOIMENTO_CLIENTE_1}}",
      author: "{{NOME_CLIENTE_1}}",
      role: "{{CARGO_E_EMPRESA_CLIENTE_1}}",
    },
    {
      quote: "{{DEPOIMENTO_CLIENTE_2}}",
      author: "{{NOME_CLIENTE_2}}",
      role: "{{CARGO_E_EMPRESA_CLIENTE_2}}",
    },
    {
      quote: "{{DEPOIMENTO_CLIENTE_3}}",
      author: "{{NOME_CLIENTE_3}}",
      role: "{{CARGO_E_EMPRESA_CLIENTE_3}}",
    },
  ] satisfies Testimonial[],
} as const;

export const contact = {
  id: "contato",
  eyebrow: "Vamos conversar",
  title: "Conte seu problema. Mostramos o caminho com IA.",
  intro:
    "Preencha o formulário e um especialista entra em contato para entender seu desafio e propor o próximo passo — sem compromisso.",
  form: {
    fields: {
      name: { label: "Nome", placeholder: "Seu nome completo" },
      company: { label: "Empresa", placeholder: "Nome da sua empresa" },
      email: {
        label: "E-mail corporativo",
        placeholder: "voce@suaempresa.com.br",
      },
      vertical: { label: "Vertical", placeholder: "Selecione seu setor" },
      message: {
        label: "Qual problema você quer resolver?",
        placeholder: "Descreva brevemente o desafio de negócio…",
      },
    },
    verticalOptions: [
      "Logística",
      "Financeiro & Bancário",
      "Saúde",
      "Varejo",
      "Indústria",
      "Outro",
    ],
    submit: "Enviar mensagem",
    submitting: "Enviando…",
    success:
      "Mensagem recebida! Um especialista da Evoluke entrará em contato em breve.",
    error: "Não foi possível enviar. Tente novamente em instantes.",
  },
} as const;

export const footer = {
  description:
    "Consultoria e desenvolvedora de produtos de Inteligência Artificial. Resolvemos problemas de negócio, em qualquer setor.",
  columns: [
    {
      title: "Navegação",
      links: [
        { label: "Soluções", href: "#solucoes" },
        { label: "Verticais", href: "#verticais" },
        { label: "Como trabalhamos", href: "#como-trabalhamos" },
        { label: "Contato", href: "#contato" },
      ],
    },
  ],
  privacyLabel: "Política de privacidade",
  privacyHref: "/privacidade", // {{LINK_POLITICA_PRIVACIDADE}}
  rights: "Todos os direitos reservados.",
} as const;

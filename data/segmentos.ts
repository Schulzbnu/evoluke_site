import type { LucideIcon } from "lucide-react";
import {
  Truck,
  Landmark,
  HeartPulse,
  Users,
  TrendingUp,
  Headset,
} from "lucide-react";

/**
 * Dados das verticais (segmentos) da Evoluke.
 * -------------------------------------------
 * Esta é a ÚNICA fonte de verdade do conteúdo dos segmentos.
 * Tanto as abas interativas da Home quanto as páginas de rota
 * (`/segmentos/[slug]`) e o menu dropdown do Header são gerados
 * a partir deste arquivo. Para adicionar/editar uma vertical,
 * basta alterar o array `segmentos` abaixo.
 *
 * Padrão de cada solução (card):
 *   titulo    -> nome curto da solução
 *   problema  -> 1 frase do problema que resolve
 *   resultado -> 1 frase do resultado esperado
 */

export interface SolucaoSegmento {
  titulo: string;
  problema: string;
  resultado: string;
}

export interface Segmento {
  slug: string;
  nome: string;
  /** Frase-resumo usada em cards e na aba. */
  resumo: string;
  /** Introdução curta exibida na página da vertical: "que problemas resolvemos aqui". */
  intro: string;
  /** Ícone (lucide-react) que representa a vertical. */
  icon: LucideIcon;
  solucoes: SolucaoSegmento[];
}

export const segmentos: Segmento[] = [
  {
    slug: "logistica",
    nome: "Logística",
    resumo:
      "Operações mais rápidas e previsíveis, da roteirização ao atendimento de transportadoras.",
    intro:
      "Na logística, cada hora e cada quilômetro contam. Atacamos os gargalos que corroem margem e prazo — rotas ineficientes, estoque desalinhado com a demanda, falhas que só aparecem tarde demais e atendimento manual a transportadoras. Conectamos seus dados operacionais a modelos de IA que decidem em tempo real.",
    icon: Truck,
    solucoes: [
      {
        titulo: "Roteirização inteligente de entregas",
        problema:
          "Rotas definidas manualmente desperdiçam combustível, tempo e capacidade de frota.",
        resultado:
          "Rotas otimizadas em tempo real que reduzem custo por entrega e ampliam o número de paradas por veículo.",
      },
      {
        titulo: "Previsão de demanda e gestão de estoque",
        problema:
          "Excesso ou falta de produto gera capital parado, rupturas e vendas perdidas.",
        resultado:
          "Previsões precisas que equilibram o estoque, reduzem rupturas e liberam capital de giro.",
      },
      {
        titulo: "Detecção de anomalias e rastreamento em tempo real",
        problema:
          "Desvios, atrasos e ocorrências só são percebidos quando o prejuízo já aconteceu.",
        resultado:
          "Alertas automáticos que antecipam problemas e dão visibilidade ponta a ponta da operação.",
      },
      {
        titulo: "Agente de IA para cotação e atendimento",
        problema:
          "Cotações e respostas a transportadoras consomem horas da equipe e atrasam fechamentos.",
        resultado:
          "Agente que cota, responde e qualifica 24/7, encurtando o ciclo de negociação.",
      },
      {
        titulo: "Otimização de carga e ocupação de veículos",
        problema:
          "Veículos saem com espaço ocioso porque o plano de carregamento é feito no improviso.",
        resultado:
          "Planos de carga que maximizam a ocupação e diminuem o número de viagens necessárias.",
      },
    ],
  },
  {
    slug: "financeiro",
    nome: "Financeiro",
    resumo:
      "Mais segurança, menos trabalho manual e decisões de crédito apoiadas por dados.",
    intro:
      "No setor financeiro, erro custa caro e fraude custa mais ainda. Aplicamos IA onde ela protege receita e tempo: identificando fraudes antes que se concretizem, eliminando conciliações manuais, dando rigor a decisões de crédito e transformando relatórios densos em respostas claras.",
    icon: Landmark,
    solucoes: [
      {
        titulo: "Detecção de fraude em transações",
        problema:
          "Padrões fraudulentos evoluem mais rápido do que regras fixas conseguem acompanhar.",
        resultado:
          "Modelos que aprendem continuamente e bloqueiam fraudes com menos falsos positivos.",
      },
      {
        titulo: "Automação de conciliação",
        problema:
          "Conciliar lançamentos manualmente é lento, repetitivo e sujeito a erros.",
        resultado:
          "Conciliação automatizada que fecha mais rápido e libera o time para análise.",
      },
      {
        titulo: "Análise de crédito e scoring com ML",
        problema:
          "Decisões de crédito baseadas em poucos critérios deixam risco e oportunidade na mesa.",
        resultado:
          "Scoring orientado a dados que aprova bons clientes e reduz a inadimplência.",
      },
      {
        titulo: "Assistente de IA para relatórios e demonstrativos",
        problema:
          "Extrair conclusões de relatórios financeiros extensos toma horas de especialistas.",
        resultado:
          "Assistente que resume, compara e responde perguntas sobre demonstrativos em segundos.",
      },
      {
        titulo: "Previsão de fluxo de caixa",
        problema:
          "A falta de visibilidade do caixa futuro dificulta o planejamento e a captação.",
        resultado:
          "Projeções de fluxo de caixa que antecipam apertos e apoiam decisões de investimento.",
      },
    ],
  },
  {
    slug: "saude",
    nome: "Saúde",
    resumo:
      "Cuidado mais ágil e preciso, com menos sobrecarga administrativa para as equipes.",
    intro:
      "Na saúde, tempo e atenção são recursos clínicos. Direcionamos a IA para liberar as equipes do trabalho administrativo e apoiar decisões: priorizando quem precisa de atendimento, dando suporte ao diagnóstico, organizando agendas e estruturando a documentação clínica automaticamente.",
    icon: HeartPulse,
    solucoes: [
      {
        titulo: "Triagem inteligente de pacientes",
        problema:
          "Filas indistintas atrasam o atendimento de casos que exigem prioridade.",
        resultado:
          "Triagem que classifica a urgência e direciona o paciente ao fluxo certo mais rápido.",
      },
      {
        titulo: "Apoio diagnóstico por análise de imagens e exames",
        problema:
          "O volume de exames pressiona especialistas e aumenta o risco de achados despercebidos.",
        resultado:
          "Modelos que destacam regiões de interesse e apoiam um diagnóstico mais rápido e consistente.",
      },
      {
        titulo: "Otimização de agenda e redução de no-show",
        problema:
          "Faltas e agendas mal distribuídas desperdiçam capacidade e receita.",
        resultado:
          "Previsão de no-show e agendamento inteligente que elevam a ocupação das agendas.",
      },
      {
        titulo: "Transcrição e estruturação de documentação clínica",
        problema:
          "Registrar prontuários manualmente rouba tempo de cuidado direto ao paciente.",
        resultado:
          "Documentação clínica transcrita e estruturada automaticamente a partir da consulta.",
      },
      {
        titulo: "Monitoramento remoto e alertas de risco",
        problema:
          "Sinais de agravamento de pacientes crônicos passam despercebidos entre consultas.",
        resultado:
          "Acompanhamento contínuo que dispara alertas precoces e reduz reinternações.",
      },
    ],
  },
  {
    slug: "rh",
    nome: "RH",
    resumo:
      "Recrutamento mais justo e ágil, com menos trabalho repetitivo e mais retenção.",
    intro:
      "Em Recursos Humanos, a IA acelera o operacional e qualifica decisões sobre pessoas. Reduzimos o tempo gasto triando currículos e respondendo dúvidas, antecipamos riscos de turnover e apoiamos a escrita de vagas e avaliações — sempre com critérios transparentes.",
    icon: Users,
    solucoes: [
      {
        titulo: "Triagem e ranqueamento de currículos",
        problema:
          "Analisar centenas de currículos manualmente é lento e abre espaço para vieses.",
        resultado:
          "Triagem que ranqueia candidatos por aderência à vaga com critérios claros e auditáveis.",
      },
      {
        titulo: "Chatbot de onboarding e dúvidas de colaboradores",
        problema:
          "O RH é sobrecarregado com perguntas repetitivas sobre benefícios e processos.",
        resultado:
          "Assistente que responde na hora e dá autonomia ao colaborador, liberando o time.",
      },
      {
        titulo: "Análise preditiva de turnover",
        problema:
          "Saídas inesperadas geram custo de reposição e perda de conhecimento.",
        resultado:
          "Sinais antecipados de risco de saída que permitem agir antes da perda do talento.",
      },
      {
        titulo: "Geração de descrições de vagas e apoio a avaliações",
        problema:
          "Escrever vagas e consolidar avaliações consome tempo e gera inconsistências.",
        resultado:
          "Textos de vaga e snapshots de avaliação padronizados, gerados em minutos.",
      },
      {
        titulo: "Recomendação de trilhas de desenvolvimento",
        problema:
          "Planos de capacitação genéricos não acompanham as lacunas reais de cada pessoa.",
        resultado:
          "Trilhas personalizadas que conectam competências atuais às metas de carreira.",
      },
    ],
  },
  {
    slug: "vendas",
    nome: "Vendas",
    resumo:
      "Pipeline mais previsível e times comerciais focados nas oportunidades certas.",
    intro:
      "Em vendas, foco é tudo. Usamos IA para apontar onde está a próxima venda e dar superpoderes ao time comercial: priorizando os leads com maior chance de fechar, automatizando o trabalho braçal de prospecção, extraindo aprendizado das chamadas e tornando o forecast confiável.",
    icon: TrendingUp,
    solucoes: [
      {
        titulo: "Lead scoring e priorização",
        problema:
          "Tempo comercial é gasto com leads frios enquanto os quentes esfriam na fila.",
        resultado:
          "Priorização automática que direciona o esforço para quem tem maior chance de comprar.",
      },
      {
        titulo: "Copiloto de IA para SDRs",
        problema:
          "Escrever e-mails e fazer follow-ups manualmente limita o alcance da prospecção.",
        resultado:
          "Copiloto que redige e sugere follow-ups personalizados, multiplicando a cadência.",
      },
      {
        titulo: "Análise de chamadas e coaching",
        problema:
          "Aprendizados das melhores conversas se perdem e o coaching vira achismo.",
        resultado:
          "Análise automática das chamadas que revela padrões de sucesso e orienta o time.",
      },
      {
        titulo: "Previsão de pipeline (forecast)",
        problema:
          "Forecasts baseados em intuição geram surpresas no fechamento do trimestre.",
        resultado:
          "Previsões de receita confiáveis que apoiam metas e decisões de capacidade.",
      },
      {
        titulo: "Recomendação de próxima melhor ação",
        problema:
          "Vendedores hesitam sobre o passo seguinte em negociações complexas.",
        resultado:
          "Sugestões de próxima ação que aceleram o avanço de cada oportunidade no funil.",
      },
    ],
  },
  {
    slug: "servicos",
    nome: "Serviços",
    resumo:
      "Atendimento contínuo e inteligente, com mais resolução e menos fila.",
    intro:
      "Em operações de serviço e atendimento, escala e qualidade costumam brigar entre si. A IA resolve essa tensão: agentes resolvem demandas a qualquer hora, tickets chegam ao lugar certo automaticamente, o conhecimento da empresa fica acessível por busca semântica e a satisfação vira um sinal mensurável e acionável.",
    icon: Headset,
    solucoes: [
      {
        titulo: "Atendimento com agentes de IA 24/7",
        problema:
          "Demanda fora do horário comercial fica sem resposta e gera insatisfação.",
        resultado:
          "Agentes que resolvem solicitações a qualquer hora e escalam só o que precisa de humano.",
      },
      {
        titulo: "Automação e roteamento inteligente de tickets",
        problema:
          "Tickets mal classificados saltam entre filas e estouram o prazo de resposta.",
        resultado:
          "Classificação e roteamento automáticos que levam cada caso ao time certo de primeira.",
      },
      {
        titulo: "Base de conhecimento com busca semântica (RAG)",
        problema:
          "Respostas existem, mas ficam enterradas em documentos que ninguém encontra a tempo.",
        resultado:
          "Busca semântica que entrega a resposta certa, com fonte, em segundos.",
      },
      {
        titulo: "Análise de sentimento e satisfação",
        problema:
          "Insatisfação se acumula silenciosamente até virar cancelamento.",
        resultado:
          "Leitura contínua do sentimento que sinaliza riscos de churn e oportunidades de encantamento.",
      },
      {
        titulo: "Resumo e registro automático de atendimentos",
        problema:
          "Documentar cada interação manualmente consome tempo e gera registros incompletos.",
        resultado:
          "Resumos automáticos que padronizam o histórico e aceleram o próximo atendimento.",
      },
    ],
  },
];

/** Busca uma vertical pelo slug (usado nas rotas dinâmicas). */
export function getSegmento(slug: string): Segmento | undefined {
  return segmentos.find((s) => s.slug === slug);
}

/** Lista de slugs para `generateStaticParams`. */
export function getSegmentoSlugs(): string[] {
  return segmentos.map((s) => s.slug);
}

import type { LucideIcon } from "lucide-react";
import {
  Truck,
  Landmark,
  HeartPulse,
  Users,
  TrendingUp,
  Headset,
  Megaphone,
  ShoppingCart,
  Factory,
  Scale,
  Sprout,
  GraduationCap,
  Building2,
  Umbrella,
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
 * Cada segmento pertence a UMA categoria:
 *   "setor" -> verticais de mercado (Logística, Saúde, Varejo, ...)
 *   "area"  -> áreas/funções da empresa (RH, Vendas, Marketing, ...)
 *
 * Padrão de cada solução (card):
 *   titulo    -> nome curto da solução
 *   problema  -> 1 frase do problema que resolve
 *   resultado -> 1 frase do resultado esperado
 */

export type CategoriaSegmento = "setor" | "area";

export interface CategoriaInfo {
  id: CategoriaSegmento;
  /** Rótulo curto (chips, abas, cabeçalho de coluna). */
  label: string;
  /** Frase de apoio exibida abaixo do rótulo. */
  descricao: string;
}

/** Metadados das duas categorias usadas para agrupar os segmentos. */
export const categorias: CategoriaInfo[] = [
  {
    id: "setor",
    label: "Por setor",
    descricao:
      "Verticais de mercado onde a IA resolve dores específicas do seu ramo.",
  },
  {
    id: "area",
    label: "Por área da empresa",
    descricao:
      "Funções e departamentos que a IA potencializa em qualquer empresa.",
  },
];

export interface SolucaoSegmento {
  titulo: string;
  problema: string;
  resultado: string;
}

export interface Segmento {
  slug: string;
  nome: string;
  /** Categoria à qual o segmento pertence (setor de mercado ou área da empresa). */
  categoria: CategoriaSegmento;
  /** Frase-resumo usada em cards e na aba. */
  resumo: string;
  /** Introdução curta exibida na página da vertical: "que problemas resolvemos aqui". */
  intro: string;
  /** Ícone (lucide-react) que representa a vertical. */
  icon: LucideIcon;
  solucoes: SolucaoSegmento[];
}

export const segmentos: Segmento[] = [
  // ----------------------------------------------------------------------
  // SETORES (verticais de mercado)
  // ----------------------------------------------------------------------
  {
    slug: "logistica",
    nome: "Logística",
    categoria: "setor",
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
    categoria: "setor",
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
    categoria: "setor",
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
    slug: "varejo",
    nome: "Varejo / E-commerce",
    categoria: "setor",
    resumo:
      "Mais conversão, recomendação certeira e estoque alinhado à demanda real.",
    intro:
      "No varejo e no e-commerce, cada visita é uma chance de venda — e cada ruptura, uma venda perdida. Aplicamos IA para personalizar a vitrine, prever a demanda, precificar com inteligência e recuperar carrinhos antes que o cliente desista.",
    icon: ShoppingCart,
    solucoes: [
      {
        titulo: "Recomendação de produtos personalizada",
        problema:
          "Vitrines iguais para todos deixam vendas adicionais na mesa.",
        resultado:
          "Recomendações personalizadas que elevam o ticket médio e a taxa de conversão.",
      },
      {
        titulo: "Previsão de demanda e reposição de estoque",
        problema:
          "Rupturas e excesso de estoque corroem margem e frustram o cliente.",
        resultado:
          "Previsões por SKU que mantêm o estoque alinhado à demanda real de cada loja.",
      },
      {
        titulo: "Precificação dinâmica",
        problema:
          "Preços fixos ignoram concorrência, demanda e elasticidade em tempo real.",
        resultado:
          "Precificação orientada a dados que protege margem e ganha competitividade.",
      },
      {
        titulo: "Recuperação de carrinho e remarketing inteligente",
        problema:
          "Carrinhos abandonados representam receita que evapora sem o follow-up certo.",
        resultado:
          "Abordagens automáticas no momento ideal que recuperam vendas quase perdidas.",
      },
      {
        titulo: "Agente de IA para atendimento e pós-venda",
        problema:
          "Dúvidas de produto, trocas e rastreio sobrecarregam o time e atrasam a compra.",
        resultado:
          "Agente que tira dúvidas, recomenda e resolve pós-venda 24/7, em qualquer canal.",
      },
    ],
  },
  {
    slug: "industria",
    nome: "Indústria",
    categoria: "setor",
    resumo:
      "Produção mais estável, manutenção preditiva e qualidade monitorada em tempo real.",
    intro:
      "Na indústria, parada não planejada e refugo custam caro. Levamos a IA para o chão de fábrica: antecipando falhas de equipamento, detectando defeitos antes que avancem na linha e otimizando a produção com dados de sensores e do processo.",
    icon: Factory,
    solucoes: [
      {
        titulo: "Manutenção preditiva de equipamentos",
        problema:
          "Quebras inesperadas param a linha e disparam custos de manutenção emergencial.",
        resultado:
          "Alertas que antecipam falhas e permitem manutenção antes da parada não planejada.",
      },
      {
        titulo: "Inspeção de qualidade por visão computacional",
        problema:
          "A inspeção manual deixa passar defeitos e não acompanha o ritmo da linha.",
        resultado:
          "Visão computacional que detecta defeitos em tempo real e reduz o índice de refugo.",
      },
      {
        titulo: "Otimização de processos produtivos",
        problema:
          "Ajustes de processo no improviso desperdiçam energia, insumo e capacidade.",
        resultado:
          "Parâmetros otimizados por IA que aumentam o rendimento e reduzem o custo por unidade.",
      },
      {
        titulo: "Previsão de demanda e planejamento de produção",
        problema:
          "Planos de produção desalinhados geram ociosidade ou atraso na entrega.",
        resultado:
          "Previsões que ajustam a produção à demanda e estabilizam o planejamento (S&OP).",
      },
      {
        titulo: "Monitoramento e segurança do chão de fábrica",
        problema:
          "Riscos operacionais e desvios de segurança só aparecem depois do incidente.",
        resultado:
          "Monitoramento que identifica situações de risco e dispara alertas preventivos.",
      },
    ],
  },
  {
    slug: "juridico",
    nome: "Jurídico",
    categoria: "setor",
    resumo:
      "Análise de contratos em minutos, pesquisa ágil e prazos sob controle.",
    intro:
      "No jurídico, o volume de documentos e prazos consome o tempo que deveria ir para a estratégia. Aplicamos IA para revisar contratos, encontrar precedentes, extrair cláusulas de risco e organizar o conhecimento jurídico — com rastreabilidade e segurança.",
    icon: Scale,
    solucoes: [
      {
        titulo: "Análise e revisão de contratos",
        problema:
          "Revisar contratos cláusula a cláusula é lento e abre brecha para riscos despercebidos.",
        resultado:
          "Revisão assistida que destaca riscos e desvios de padrão em minutos, não em horas.",
      },
      {
        titulo: "Pesquisa de jurisprudência e precedentes",
        problema:
          "Localizar precedentes relevantes exige horas de garimpo em bases extensas.",
        resultado:
          "Busca semântica que entrega jurisprudência pertinente com a fonte sempre citada.",
      },
      {
        titulo: "Extração de cláusulas e dados de documentos",
        problema:
          "Extrair informações de petições e contratos manualmente é repetitivo e falho.",
        resultado:
          "Extração automática de cláusulas e dados-chave estruturados para análise imediata.",
      },
      {
        titulo: "Gestão de prazos e fluxo processual",
        problema:
          "Controlar prazos em planilhas dispersas arrisca perdas processuais caras.",
        resultado:
          "Acompanhamento que organiza prazos e alerta o time antes de cada vencimento.",
      },
      {
        titulo: "Assistente de IA para minutas e consultas",
        problema:
          "Redigir minutas e responder dúvidas recorrentes ocupa tempo de advogados.",
        resultado:
          "Assistente que gera minutas-base e responde consultas apoiado nos documentos internos.",
      },
    ],
  },
  {
    slug: "agronegocio",
    nome: "Agronegócio",
    categoria: "setor",
    resumo:
      "Mais produtividade no campo, com previsão de safra e decisões guiadas por dados.",
    intro:
      "No agronegócio, clima, solo e mercado mudam o jogo a cada ciclo. Usamos IA para transformar dados de campo e satélite em decisão: prevendo produtividade, antecipando pragas, otimizando insumos e dando previsibilidade à comercialização.",
    icon: Sprout,
    solucoes: [
      {
        titulo: "Previsão de safra e produtividade",
        problema:
          "Estimativas imprecisas de safra dificultam o planejamento e a negociação.",
        resultado:
          "Previsões de produtividade que apoiam decisões de plantio, logística e venda.",
      },
      {
        titulo: "Detecção de pragas e doenças por imagem",
        problema:
          "Pragas identificadas tarde se espalham e comprometem a lavoura inteira.",
        resultado:
          "Análise de imagens que detecta focos cedo e direciona a ação no ponto certo.",
      },
      {
        titulo: "Otimização de insumos e irrigação",
        problema:
          "Aplicar insumo e água de forma uniforme desperdiça recurso e pressiona o custo.",
        resultado:
          "Recomendações por talhão que reduzem desperdício e elevam a eficiência por hectare.",
      },
      {
        titulo: "Monitoramento por satélite e sensores",
        problema:
          "Acompanhar grandes áreas em campo é caro e deixa pontos cegos na lavoura.",
        resultado:
          "Monitoramento remoto que revela variações da lavoura e prioriza onde agir.",
      },
      {
        titulo: "Previsão de preços e apoio à comercialização",
        problema:
          "Decidir quando vender sem visibilidade de mercado expõe a margem a oscilações.",
        resultado:
          "Projeções de preço que apoiam o melhor momento de comercializar a produção.",
      },
    ],
  },
  {
    slug: "educacao",
    nome: "Educação",
    categoria: "setor",
    resumo:
      "Aprendizagem personalizada, menos evasão e equipes livres do trabalho repetitivo.",
    intro:
      "Na educação, atenção individual não escala — mas a IA ajuda. Personalizamos trilhas de aprendizagem, antecipamos risco de evasão, automatizamos correção e tarefas administrativas e damos suporte a alunos e equipes a qualquer hora.",
    icon: GraduationCap,
    solucoes: [
      {
        titulo: "Personalização de trilhas de aprendizagem",
        problema:
          "Conteúdo igual para todos ignora o ritmo e as lacunas de cada aluno.",
        resultado:
          "Trilhas adaptativas que ajustam o conteúdo ao desempenho de cada estudante.",
      },
      {
        titulo: "Previsão e prevenção de evasão",
        problema:
          "Sinais de desengajamento aparecem tarde, quando o aluno já está de saída.",
        resultado:
          "Alertas precoces de risco de evasão que permitem intervir a tempo de reter.",
      },
      {
        titulo: "Correção automática e feedback",
        problema:
          "Corrigir atividades em volume rouba tempo de ensino e atrasa o retorno ao aluno.",
        resultado:
          "Correção assistida com feedback imediato que libera o educador para ensinar.",
      },
      {
        titulo: "Tutor de IA para alunos 24/7",
        problema:
          "Dúvidas fora de aula ficam sem resposta e travam o aprendizado.",
        resultado:
          "Tutor que explica, exemplifica e acompanha o aluno a qualquer hora.",
      },
      {
        titulo: "Automação administrativa e de matrículas",
        problema:
          "Matrículas, dúvidas e processos administrativos sobrecarregam a secretaria.",
        resultado:
          "Automação que resolve solicitações de rotina e libera a equipe para o que importa.",
      },
    ],
  },
  {
    slug: "setor-publico",
    nome: "Setor Público",
    categoria: "setor",
    resumo:
      "Serviços ao cidadão mais ágeis, processos eficientes e dados a favor da gestão.",
    intro:
      "No setor público, a demanda é alta e o recurso é limitado. Aplicamos IA com responsabilidade para acelerar o atendimento ao cidadão, desburocratizar processos, apoiar a fiscalização e transformar dados públicos em decisão — sempre com transparência e rastreabilidade.",
    icon: Building2,
    solucoes: [
      {
        titulo: "Atendimento ao cidadão com agentes de IA",
        problema:
          "Canais públicos sobrecarregados deixam o cidadão em filas e sem resposta.",
        resultado:
          "Agentes que respondem dúvidas e encaminham serviços 24/7, aliviando o atendimento.",
      },
      {
        titulo: "Automação de processos e protocolos",
        problema:
          "Trâmites manuais tornam os serviços lentos e pouco transparentes.",
        resultado:
          "Automação que acelera protocolos e dá visibilidade ao andamento das demandas.",
      },
      {
        titulo: "Análise de dados para políticas públicas",
        problema:
          "Dados públicos abundantes raramente viram decisão por falta de análise.",
        resultado:
          "Análises que revelam padrões e apoiam políticas baseadas em evidência.",
      },
      {
        titulo: "Detecção de fraudes e irregularidades",
        problema:
          "Irregularidades em larga escala passam despercebidas em auditorias manuais.",
        resultado:
          "Modelos que sinalizam desvios e priorizam a fiscalização onde há mais risco.",
      },
      {
        titulo: "Organização e busca de documentos públicos",
        problema:
          "Informações ficam presas em documentos dispersos e de difícil acesso.",
        resultado:
          "Busca semântica que torna o acervo público acessível em segundos, com a fonte.",
      },
    ],
  },
  {
    slug: "seguros",
    nome: "Seguros",
    categoria: "setor",
    resumo:
      "Subscrição mais precisa, sinistros ágeis e fraude contida por dados.",
    intro:
      "No setor de seguros, precificar risco e pagar o sinistro justo no tempo certo é o negócio. Usamos IA para refinar a subscrição, acelerar a regulação de sinistros, detectar fraudes e atender o segurado com agilidade — equilibrando risco, custo e experiência.",
    icon: Umbrella,
    solucoes: [
      {
        titulo: "Precificação e subscrição de risco",
        problema:
          "Modelos de risco genéricos precificam mal e expõem a carteira a perdas.",
        resultado:
          "Subscrição orientada a dados que precifica o risco de cada apólice com mais precisão.",
      },
      {
        titulo: "Automação da regulação de sinistros",
        problema:
          "A análise manual de sinistros alonga prazos e frustra o segurado.",
        resultado:
          "Triagem e análise automatizadas que aceleram o pagamento dos casos mais simples.",
      },
      {
        titulo: "Detecção de fraude em sinistros",
        problema:
          "Fraudes sofisticadas escapam de regras fixas e elevam a sinistralidade.",
        resultado:
          "Modelos que identificam padrões suspeitos e priorizam a investigação certa.",
      },
      {
        titulo: "Previsão de sinistralidade e churn",
        problema:
          "Sem antecipar perdas e cancelamentos, o planejamento fica sempre reativo.",
        resultado:
          "Previsões que antecipam sinistralidade e risco de churn para agir antes da perda.",
      },
      {
        titulo: "Assistente de IA para corretores e segurados",
        problema:
          "Dúvidas sobre apólices e coberturas sobrecarregam corretores e SAC.",
        resultado:
          "Assistente que esclarece coberturas e orienta contratações com base na apólice.",
      },
    ],
  },

  // ----------------------------------------------------------------------
  // ÁREAS DA EMPRESA (funções/departamentos)
  // ----------------------------------------------------------------------
  {
    slug: "rh",
    nome: "RH",
    categoria: "area",
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
    categoria: "area",
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
    categoria: "area",
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
  {
    slug: "marketing",
    nome: "Marketing",
    categoria: "area",
    resumo:
      "Campanhas mais inteligentes, conteúdo em escala e verba aplicada onde converte.",
    intro:
      "Em marketing, atenção é cara e verba não sobra. Direcionamos a IA para o que move o ponteiro: gerar conteúdo e variações em escala, prever quais campanhas vão converter, segmentar audiências com precisão e transformar dados dispersos em decisão de mídia.",
    icon: Megaphone,
    solucoes: [
      {
        titulo: "Geração de conteúdo e variações de criativos",
        problema:
          "Produzir peças, textos e variações para cada canal não acompanha o ritmo das campanhas.",
        resultado:
          "Conteúdo e variações de criativos gerados em escala, prontos para testar e publicar.",
      },
      {
        titulo: "Segmentação e personalização de audiência",
        problema:
          "Mensagens genéricas desperdiçam verba ao falar com quem não vai comprar.",
        resultado:
          "Audiências segmentadas por comportamento que elevam a relevância e o retorno de mídia.",
      },
      {
        titulo: "Previsão de desempenho e alocação de verba",
        problema:
          "Decidir onde investir no escuro queima orçamento em canais que não convertem.",
        resultado:
          "Previsões de desempenho que direcionam a verba para os canais de maior retorno.",
      },
      {
        titulo: "Escuta de marca e análise de sentimento",
        problema:
          "Crises e oportunidades nas redes aparecem tarde, quando já viraram volume.",
        resultado:
          "Monitoramento que capta o sentimento sobre a marca em tempo real e antecipa reações.",
      },
      {
        titulo: "Otimização de SEO e conteúdo orgânico",
        problema:
          "Produzir conteúdo que ranqueia exige pesquisa e revisão que não escalam.",
        resultado:
          "Pautas e textos otimizados para busca que ampliam o tráfego orgânico de forma consistente.",
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

/** Segmentos de uma categoria, na ordem em que aparecem no array. */
export function getSegmentosByCategoria(cat: CategoriaSegmento): Segmento[] {
  return segmentos.filter((s) => s.categoria === cat);
}

/** Metadados de uma categoria pelo id. */
export function getCategoria(id: CategoriaSegmento): CategoriaInfo {
  return categorias.find((c) => c.id === id) ?? categorias[0];
}

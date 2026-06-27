-- ===========================================================================
-- Seed opcional — posts iniciais do blog (migrados do antigo data/posts.json).
-- ---------------------------------------------------------------------------
-- Rode UMA vez após a migração, se quiser preservar os dois artigos iniciais.
--   • Supabase CLI:        supabase db reset   (roda migrations + seed)
--   • Painel do Supabase:  SQL Editor → cole → Run
-- Idempotente: usa o slug como chave (on conflict do nothing).
-- ===========================================================================

insert into public.posts
  (id, slug, title, excerpt, content, cover_image, cover_alt, author, tags, status, published_at, updated_at)
values
  (
    '5b1f0d4e-6a2c-4d3b-9f1a-2c7e8a0b1d23',
    'como-comecar-com-ia-na-sua-empresa',
    'Como começar com IA na sua empresa sem desperdiçar dinheiro',
    'Um caminho prático para sair da empolgação para o resultado: como escolher o primeiro caso de uso de Inteligência Artificial e provar valor em semanas, não em anos.',
    E'A maioria dos projetos de Inteligência Artificial não falha por falta de tecnologia — falha por começar pelo lugar errado. Antes de pensar em modelos, dados ou infraestrutura, é preciso responder a uma pergunta simples: **qual problema de negócio você quer resolver?**\n\n## Comece pelo problema, não pela tecnologia\n\nIA não é um objetivo; é um meio. O primeiro passo é mapear dores reais da operação e perguntar, para cada uma:\n\n- Esse problema se repete com frequência?\n- Existe dado disponível sobre ele?\n- O resultado é mensurável em dinheiro ou tempo?\n\nQuando as três respostas são "sim", você provavelmente encontrou um bom candidato.\n\n## Prove valor com um piloto enxuto\n\nEm vez de um projeto de 12 meses, desenhe um **piloto de 4 a 6 semanas** com escopo fechado. O objetivo do piloto não é perfeição — é responder se a solução gera valor suficiente para escalar.\n\n> Um piloto bem definido transforma uma aposta em uma decisão baseada em evidência.\n\n## Meça o que importa\n\nDefina a métrica de sucesso **antes** de começar. Alguns exemplos:\n\n1. Redução do tempo de atendimento\n2. Aumento da taxa de conversão\n3. Queda no custo por processo\n\nSe a métrica melhora, escale. Se não, você aprendeu rápido e barato.\n\n## O papel da Evoluke\n\nNós entendemos o problema do seu negócio e entregamos a solução certa — da estratégia ao produto em produção. Se você quer dar o primeiro passo com segurança, [vamos conversar](/contato).',
    null,
    null,
    'Equipe Evoluke',
    array['Estratégia', 'Primeiros passos', 'ROI'],
    'published',
    '2026-05-12T12:00:00.000Z',
    '2026-05-12T12:00:00.000Z'
  ),
  (
    'a3c9f7b2-1e4d-4c8a-8b6f-9d0e2f3a4b5c',
    'ia-generativa-vs-automacao-tradicional',
    'IA generativa ou automação tradicional: qual usar em cada caso',
    'Nem todo problema precisa de um modelo de linguagem. Entenda quando a IA generativa entrega mais valor e quando a automação clássica resolve melhor — com menos custo e risco.',
    E'Com a popularização dos modelos de linguagem, virou comum tentar resolver tudo com IA generativa. Mas a ferramenta certa depende do problema. Vamos separar os cenários.\n\n## Quando a automação tradicional já resolve\n\nSe o processo é **determinístico** — regras claras, entradas previsíveis e uma resposta correta única — a automação clássica costuma ser mais barata, rápida e auditável.\n\nExemplos típicos:\n\n- Cálculo de impostos a partir de regras fixas\n- Validação de formulários e documentos estruturados\n- Roteamento de tickets por palavras-chave\n\n## Quando a IA generativa brilha\n\nA IA generativa se destaca em tarefas com **linguagem natural, ambiguidade ou variação alta**:\n\n1. Resumir e classificar textos longos\n2. Responder perguntas sobre uma base de conhecimento\n3. Gerar rascunhos de e-mails, propostas e relatórios\n\n> A pergunta-chave: o problema envolve interpretar linguagem ou criatividade? Se sim, a IA generativa tende a vencer.\n\n## O melhor dos dois mundos\n\nNa prática, as melhores soluções combinam os dois: regras determinísticas para o que é previsível e modelos para o que é ambíguo. Essa arquitetura híbrida reduz custo e mantém o controle.\n\n## Como decidir na sua empresa\n\nNão existe resposta única — existe o **seu** contexto. A Evoluke avalia a viabilidade técnica e de negócio e propõe o caminho certo para cada caso. [Conte o seu desafio](/contato) e desenhamos a solução com você.',
    null,
    null,
    'Equipe Evoluke',
    array['IA generativa', 'Automação', 'Arquitetura'],
    'published',
    '2026-06-02T12:00:00.000Z',
    '2026-06-02T12:00:00.000Z'
  )
on conflict (slug) do nothing;

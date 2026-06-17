# Evoluke — Site institucional

Site institucional da **Evoluke**, consultoria e desenvolvedora de produtos de
Inteligência Artificial. Posicionamento central: _a Evoluke resolve problemas —
independentemente da necessidade do cliente_, unindo **consultoria estratégica**
e **desenvolvimento de produto** de IA, em **qualquer setor**.

Construído com **Next.js (App Router) + TypeScript + Tailwind CSS**, com
renderização estática (SSG) para performance e SEO.

## Como rodar

Requisitos: **Node 20+**.

```bash
npm install      # instala as dependências
npm run dev      # ambiente de desenvolvimento em http://localhost:3000
npm run build    # build de produção
npm run start    # sobe o build de produção
npm run lint     # ESLint
```

## Estrutura de pastas

```
app/                      # Rotas (App Router) — cada pasta é uma página
├── layout.tsx            # Layout raiz: fontes, Header, Footer, metadados/SEO globais
├── page.tsx              # Início (Home): hero, 3 passos, prova de valor, abas de segmentos, CTA
├── globals.css           # Estilos globais e utilitárias (Tailwind)
├── como-atuamos/         # Página "Como atuamos" (modelo consultoria → produto)
├── sobre/                # Página "Sobre" (missão, diferenciais, por que IA)
├── contato/              # Página "Contato" (formulário com validação)
├── segmentos/
│   ├── page.tsx          # Índice das verticais
│   └── [slug]/page.tsx   # Página dinâmica de cada vertical (gerada do arquivo de dados)
├── not-found.tsx         # Página 404
├── sitemap.ts            # sitemap.xml automático
└── robots.ts             # robots.txt automático

components/               # Componentes reutilizáveis
├── Header.tsx            # Cabeçalho fixo + dropdown "Segmentos" + menu mobile
├── Footer.tsx            # Rodapé com navegação e contato
├── Button.tsx            # Botão polimórfico (link/button) com variantes
├── Card.tsx              # Cartão de superfície
├── Container.tsx         # Wrapper de largura máxima
├── SectionHeading.tsx    # Cabeçalho de seção (eyebrow + título + descrição)
├── SegmentTabs.tsx       # Abas interativas de segmentos (Home)
├── SolutionCard.tsx      # Card padrão de solução (título → problema → resultado)
├── CTASection.tsx        # Bloco de chamada para ação reutilizado
└── Logo.tsx              # Wordmark "Evoluke"

data/
├── segmentos.ts          # ⭐ Conteúdo de TODAS as verticais (fonte única de verdade)
└── site.ts               # Navegação, dados de contato e textos de marca
```

## Onde editar o conteúdo das verticais

Todo o conteúdo dos segmentos vive em **`data/segmentos.ts`** — é a única fonte
de verdade. A partir desse arquivo são gerados automaticamente:

- o **dropdown "Segmentos"** no Header;
- as **abas interativas** na Home;
- o **índice** em `/segmentos`;
- as **páginas de rota** de cada vertical (`/segmentos/[slug]`);
- os links no rodapé e o `sitemap.xml`.

Para **adicionar ou editar** uma vertical, altere o array `segmentos`. Cada
item segue a interface `Segmento`:

```ts
{
  slug: "logistica",          // vira a rota /segmentos/logistica
  nome: "Logística",
  resumo: "...",              // frase curta (cards, abas, menu)
  intro: "...",               // "que problemas resolvemos aqui" (topo da página)
  icon: Truck,                // ícone lucide-react
  solucoes: [
    {
      titulo: "...",          // nome curto da solução
      problema: "...",        // 1 frase do problema que resolve
      resultado: "...",       // 1 frase do resultado esperado
    },
    // ...
  ],
}
```

Adicionar um novo item ao array cria automaticamente a rota, a aba e as
entradas de navegação — não é preciso mexer em mais nada.

Textos institucionais, navegação e dados de contato ficam em **`data/site.ts`**.

## Formulário de contato

O formulário (`components/ContactForm.tsx`) valida os campos no cliente (nome,
e-mail, empresa, mensagem) e exibe estado de sucesso. O envio é **simulado**
(`console.log`). Para integrar um serviço de e-mail real (Resend, SendGrid, AWS
SES) ou uma API route, substitua o bloco marcado com `--- Handler mock ---` por
uma chamada `fetch("/api/contato", ...)`.

## Paleta de cores

Definida em `tailwind.config.ts` e documentada lá.

| Token     | Uso                                   | Cor base   |
| --------- | ------------------------------------- | ---------- |
| `ink`     | Fundos escuros (hero, footer, CTA)    | `#0A0E1A`  |
| `accent`  | Cor de marca / CTAs (violeta)         | `#7C5CFC`  |
| `accent2` | Detalhes e gradientes (azul-elétrico) | `#22D3EE`  |

Tema **claro** nas seções de conteúdo e **escuro** (tinta) no hero e nos blocos
de destaque, com violeta-elétrico como accent. Tipografia: **Plus Jakarta Sans**
(via `next/font`). Ícones: **lucide-react**.

## SEO e acessibilidade

- Metadados (title, description, Open Graph, Twitter) globais em
  `app/layout.tsx` e por página via `export const metadata` / `generateMetadata`.
- `sitemap.xml` e `robots.txt` gerados automaticamente.
- `lang="pt-BR"`, link "pular para o conteúdo", navegação por teclado, foco
  visível, `aria-*` em menus/abas/formulário e `alt`/`aria-hidden` em ícones.
- Layout 100% responsivo (mobile-first) com contraste adequado.

# Evoluke — Site institucional + Landing Page

Landing page de conversão da **Evoluke**, consultoria e desenvolvedora de
produtos de Inteligência Artificial. Posicionamento central: **resolvedora de
problemas de negócio**, agnóstica de setor.

Construído com **Next.js (App Router) + TypeScript + Tailwind CSS**.

---

## Pré-requisitos

- Node.js 18.18+ (recomendado 20 LTS)
- npm 10+

## Como rodar

```bash
npm install        # instala dependências
npm run dev        # ambiente de desenvolvimento → http://localhost:3000
npm run build      # build de produção
npm run start      # sobe o build de produção
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # checagem de tipos (tsc --noEmit)
```

---

## Estrutura de pastas

```
app/
  layout.tsx          # metadata global, fontes (next/font), skip-link
  page.tsx            # composição das seções da landing
  globals.css         # base Tailwind + reset de acessibilidade/motion
  api/contato/route.ts# API Route do formulário (valida + TODO integração)
  opengraph-image.tsx # imagem OG gerada dinamicamente (next/og)
  icon.tsx            # favicon gerado dinamicamente
  sitemap.ts          # /sitemap.xml
  robots.ts           # /robots.txt
  privacidade/        # página placeholder de política de privacidade
components/
  Header.tsx          # nav + menu hambúrguer (client)
  Footer.tsx
  Logo.tsx
  JsonLd.tsx          # dados estruturados Organization
  ui/                 # primitivos reutilizáveis (Button, Card, Section, ...)
  sections/           # uma seção da landing por arquivo
content/
  pt.ts               # TODA a copy (PT-BR) centralizada — pronta p/ i18n
lib/
  validation.ts       # schema zod do formulário (client + server)
  motion.ts           # variants framer-motion
  cn.ts               # util de classes
public/               # assets estáticos
```

---

## Design system

Tokens centralizados em `tailwind.config.ts`:

- **Primária (azul corporativo):** `brand.800 = #1E3A8A`
- **Acento / CTA (verde):** `accent.500 = #10B981`
- **Neutros frios:** `ink`, `surface`
- Tipografia: **Inter** via `next/font` (variável `--font-inter`)
- Escala fluida (`text-fluid-h1/h2/h3`), raios, sombras e espaçamento padronizados

Para trocar a identidade visual, ajuste os tokens em `tailwind.config.ts` — os
componentes herdam automaticamente.

---

## Formulário de contato

- Validação **client-side** com `react-hook-form` + `zod` (`lib/validation.ts`).
- Mesmo schema revalida no servidor em `app/api/contato/route.ts` (defesa em
  profundidade).
- Exige **e-mail corporativo** (bloqueia Gmail/Hotmail/etc.).
- Hoje o endpoint apenas valida e loga o lead. **TODO** no arquivo da rota para
  plugar e-mail (Resend/SendGrid/SES) ou CRM (HubSpot/RD Station/Pipedrive).
- ⚠️ Credenciais devem vir **somente** de variáveis de ambiente
  (`process.env`) — nunca commitar segredos.

---

## SEO & Acessibilidade

- Metadata + Open Graph + Twitter Card (`app/layout.tsx`).
- Imagem OG e favicon gerados em build (`next/og`).
- `sitemap.xml`, `robots.txt` e JSON-LD `Organization`.
- HTML semântico, headings hierárquicos, foco visível, navegação por teclado,
  `prefers-reduced-motion` respeitado, labels associados nos campos.

> Antes de produção, ajuste `site.url` e os campos placeholder em
> `content/pt.ts` (e-mail, CNPJ, redes, métricas, depoimentos).

---

## Deploy (Vercel)

1. Importe o repositório na [Vercel](https://vercel.com/new).
2. Framework detectado automaticamente: **Next.js**. Sem config extra.
3. Configure variáveis de ambiente quando integrar e-mail/CRM (ex.:
   `RESEND_API_KEY`) — em *Project → Settings → Environment Variables*.
4. Deploy. SSG/SSR e a API Route `/api/contato` funcionam nativamente.

Qualquer host com Node.js também serve: rode `npm run build && npm run start`.

---

## Placeholders a preencher

Copy provisória usa o padrão `{{NOME}}` em `content/pt.ts` — busque por `{{`
para encontrar tudo: logos de clientes, depoimentos, métricas, CNPJ, endereço,
redes sociais e link da política de privacidade.

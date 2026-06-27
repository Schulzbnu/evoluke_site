# Supabase — armazenamento do blog

Os posts do blog ficam na tabela `public.posts` do Supabase. Escrita só via
API autenticada (`POST /api/blog`, com `Authorization: Bearer <BLOG_API_TOKEN>`),
que usa a **service role** (ignora RLS). Leitura pública só de posts publicados.

## 1. Crie o projeto

No painel https://supabase.com, crie um projeto (ex.: `evoluke`, região
`sa-east-1` São Paulo).

## 2. Rode a migração

**Opção A — Painel (mais simples):** SQL Editor → cole o conteúdo de
`migrations/20260627120000_create_blog_posts.sql` → Run. Para preservar os
dois artigos iniciais, rode também `seed.sql`.

**Opção B — Supabase CLI:**

```bash
supabase link --project-ref <ref-do-projeto>
supabase db push          # aplica migrations/
# (opcional) supabase db reset roda migrations + seed.sql
```

## 3. Configure as variáveis de ambiente

Em `.env.local` (e nas variáveis do host de produção, ex.: Vercel):

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role key — Project Settings → API>
```

> A `service_role` é **secreta**: só no servidor, nunca no cliente nem no git.
> Sem essas variáveis, o site funciona mas o blog aparece vazio (degradação
> graciosa); a criação via API retorna erro de configuração.

## 4. Crie um post (exemplo)

```bash
curl -X POST https://www.evoluke.com.br/api/blog \
  -H "Authorization: Bearer $BLOG_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu primeiro post",
    "content": "# Olá\n\nConteúdo em **Markdown**.",
    "tags": ["IA"],
    "status": "published"
  }'
```

Campos aceitos: `title` (obrigatório), `content` (obrigatório, Markdown),
`excerpt`, `slug`, `coverImage`, `coverAlt`, `author`, `tags[]`, `status`
(`published`|`draft`), `publishedAt` (ISO). O `slug` e o `excerpt` são gerados
automaticamente quando omitidos.

-- ===========================================================================
-- Blog da Evoluke — tabela de posts
-- ---------------------------------------------------------------------------
-- Fonte de verdade dos posts do blog. Os posts são criados via API autenticada
-- (POST /api/blog, protegida por BLOG_API_TOKEN) usando a SERVICE ROLE key, que
-- ignora RLS. As páginas do site leem apenas posts publicados.
--
-- Como aplicar:
--   • Supabase CLI:        supabase db push   (com este arquivo em supabase/migrations)
--   • Painel do Supabase:  SQL Editor → cole este conteúdo → Run
-- ===========================================================================

create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  excerpt      text not null default '',
  content      text not null,
  cover_image  text,
  cover_alt    text,
  author       text not null default 'Equipe Evoluke',
  tags         text[] not null default '{}',
  status       text not null default 'published'
                 check (status in ('published', 'draft')),
  published_at timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

comment on table public.posts is 'Posts do blog da Evoluke. Escrita só via service role (API com BLOG_API_TOKEN).';

-- Listagem pública: posts publicados, mais recentes primeiro.
create index if not exists posts_published_idx
  on public.posts (published_at desc)
  where status = 'published';

-- Filtro por tag (lista/related), usando GIN no array.
create index if not exists posts_tags_idx
  on public.posts using gin (tags);

-- ---------------------------------------------------------------------------
-- updated_at automático em qualquer UPDATE
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security (defesa em profundidade)
-- ---------------------------------------------------------------------------
-- A app escreve com a service role (que ignora RLS). Mesmo assim habilitamos
-- RLS e liberamos APENAS leitura de posts publicados para anon/authenticated —
-- assim, se a chave pública (anon) for usada por engano no cliente, ninguém
-- consegue ler rascunhos nem escrever.
alter table public.posts enable row level security;

drop policy if exists "Posts publicados são públicos" on public.posts;
create policy "Posts publicados são públicos"
  on public.posts
  for select
  to anon, authenticated
  using (status = 'published');

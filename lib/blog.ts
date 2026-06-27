/**
 * Camada de dados do blog — armazenamento no Supabase (Postgres).
 * ---------------------------------------------------------------------------
 * Tabela `public.posts` (ver supabase/migrations). Esta é a única fonte de
 * verdade dos posts: criados via API autenticada (`app/api/blog/route.ts`,
 * protegida por BLOG_API_TOKEN) e lidos pelas páginas do blog.
 *
 * Diferente do antigo armazenamento em arquivo JSON, o Supabase persiste em
 * qualquer host (inclusive serverless como a Vercel).
 *
 * Este módulo só deve ser importado em código de servidor (route handlers e
 * Server Components) — nunca em componentes de cliente. Usa a service role.
 */
import "server-only";
import crypto from "node:crypto";
import { getSupabaseAdmin, tryGetSupabaseAdmin } from "@/lib/supabase";
import { excerptFromMarkdown } from "@/lib/markdown";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  /** Resumo curto (cards e meta description). */
  excerpt: string;
  /** Corpo do post em Markdown. */
  content: string;
  /** URL da imagem de capa (opcional). */
  coverImage?: string;
  /** Texto alternativo da capa (acessibilidade). */
  coverAlt?: string;
  author: string;
  tags: string[];
  /** "published" aparece no site; "draft" fica oculto. */
  status: "published" | "draft";
  /** ISO 8601. */
  publishedAt: string;
  /** ISO 8601. */
  updatedAt: string;
}

/** Campos aceitos na criação via API. */
export interface CreatePostInput {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  coverImage?: string;
  coverAlt?: string;
  author?: string;
  tags?: string[];
  status?: "published" | "draft";
  /** Permite agendar/registrar data de publicação específica (ISO). */
  publishedAt?: string;
}

const TABLE = "posts";
const DEFAULT_AUTHOR = "Equipe Evoluke";

/** Colunas do post sem o corpo — para listagens com payload enxuto. */
const META_COLUMNS =
  "id, slug, title, excerpt, cover_image, cover_alt, author, tags, status, published_at, updated_at";
const ALL_COLUMNS = `${META_COLUMNS}, content`;

/* -------------------------------------------------------------------------- */
/* Mapeamento linha (snake_case) <-> BlogPost (camelCase)                      */
/* -------------------------------------------------------------------------- */

interface PostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content?: string | null;
  cover_image: string | null;
  cover_alt: string | null;
  author: string | null;
  tags: string[] | null;
  status: "published" | "draft";
  published_at: string;
  updated_at: string;
}

function rowToPost(row: PostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    coverImage: row.cover_image ?? undefined,
    coverAlt: row.cover_alt ?? undefined,
    author: row.author ?? DEFAULT_AUTHOR,
    tags: row.tags ?? [],
    status: row.status,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

/* -------------------------------------------------------------------------- */
/* Helpers de slug                                                            */
/* -------------------------------------------------------------------------- */

/** Converte um texto em slug seguro para URL (sem acentos, kebab-case). */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Gera um slug único consultando os slugs já existentes que começam por `base`.
 * Há uma pequena janela de corrida entre a consulta e o INSERT; ela é coberta
 * pela constraint UNIQUE de `slug` (createPost trata o erro 23505).
 */
async function uniqueSlug(base: string): Promise<string> {
  const root = base || "post";
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .select("slug")
    .like("slug", `${root}%`);

  if (error) throw error;

  const taken = new Set((data ?? []).map((r) => r.slug as string));
  if (!taken.has(root)) return root;
  let i = 2;
  while (taken.has(`${root}-${i}`)) i += 1;
  return `${root}-${i}`;
}

/* -------------------------------------------------------------------------- */
/* API pública do módulo                                                      */
/* -------------------------------------------------------------------------- */

/** Retorna os posts publicados, mais recentes primeiro. */
export async function getAllPosts(options?: {
  includeDrafts?: boolean;
}): Promise<BlogPost[]> {
  const supabase = tryGetSupabaseAdmin();
  if (!supabase) return [];
  let query = supabase
    .from(TABLE)
    .select(ALL_COLUMNS)
    .order("published_at", { ascending: false });

  if (!options?.includeDrafts) query = query.eq("status", "published");

  const { data, error } = await query;
  if (error) throw error;
  return (data as PostRow[]).map(rowToPost);
}

/** Busca um post pelo slug (ou `null`). */
export async function getPostBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
): Promise<BlogPost | null> {
  const supabase = tryGetSupabaseAdmin();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select(ALL_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const post = rowToPost(data as PostRow);
  if (post.status !== "published" && !options?.includeDrafts) return null;
  return post;
}

/** Lista de slugs publicados (para generateStaticParams / sitemap). */
export async function getAllSlugs(): Promise<string[]> {
  const supabase = tryGetSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select("slug")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((r) => r.slug as string);
}

/** Conjunto de tags usadas em posts publicados, ordenadas. */
export async function getAllTags(): Promise<string[]> {
  const supabase = tryGetSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select("tags")
    .eq("status", "published");

  if (error) throw error;
  const set = new Set<string>();
  (data ?? []).forEach((r) => (r.tags as string[] | null)?.forEach((t) => set.add(t)));
  return [...set].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export class BlogValidationError extends Error {}

/** Cria um post novo a partir do input da API. Retorna o post salvo. */
export async function createPost(input: CreatePostInput): Promise<BlogPost> {
  const title = (input.title ?? "").trim();
  const content = (input.content ?? "").trim();

  if (title.length < 3) {
    throw new BlogValidationError("O título deve ter pelo menos 3 caracteres.");
  }
  if (content.length < 10) {
    throw new BlogValidationError(
      "O conteúdo deve ter pelo menos 10 caracteres.",
    );
  }

  // SEO: toda página precisa de meta description. Se o autor não enviar um
  // excerpt, derivamos um resumo do corpo (até 160 caracteres).
  const excerpt =
    (input.excerpt ?? "").trim() || excerptFromMarkdown(content, 160);

  const status = input.status === "draft" ? "draft" : "published";
  const tags = Array.isArray(input.tags)
    ? input.tags
        .map((t) => String(t).trim())
        .filter(Boolean)
        .slice(0, 12)
    : [];

  // Validação leve de data; cai para "agora" se inválida.
  const publishedAt =
    input.publishedAt && !Number.isNaN(Date.parse(input.publishedAt))
      ? new Date(input.publishedAt).toISOString()
      : new Date().toISOString();

  const supabase = getSupabaseAdmin();
  const base = slugify(input.slug?.trim() || title);

  // Tenta até 3 vezes: cobre a corrida na geração do slug (erro 23505 = unique).
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const slug =
      attempt === 0
        ? await uniqueSlug(base)
        : `${base || "post"}-${crypto.randomBytes(3).toString("hex")}`;

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        slug,
        title,
        excerpt,
        content,
        cover_image: input.coverImage?.trim() || null,
        cover_alt: input.coverAlt?.trim() || null,
        author: (input.author ?? "").trim() || DEFAULT_AUTHOR,
        tags,
        status,
        published_at: publishedAt,
      })
      .select(ALL_COLUMNS)
      .single();

    if (!error) return rowToPost(data as PostRow);
    // 23505 = unique_violation no slug → tenta de novo com sufixo aleatório.
    if (error.code !== "23505" || attempt === 2) throw error;
  }

  // Inalcançável (o loop retorna ou lança), mas satisfaz o type checker.
  throw new Error("Não foi possível gerar um slug único para o post.");
}

/** Remove um post pelo slug. Retorna `true` se removeu algo. */
export async function deletePostBySlug(slug: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .delete()
    .eq("slug", slug)
    .select("id");

  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

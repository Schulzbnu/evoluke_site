/**
 * Camada de dados do blog — armazenamento em arquivo JSON (`data/posts.json`).
 * ---------------------------------------------------------------------------
 * Esta é a única fonte de verdade dos posts. Os posts são criados via API
 * autenticada (ver `app/api/blog/route.ts`) e lidos pelas páginas do blog.
 *
 * AVISO DE INFRAESTRUTURA: em hosts serverless com filesystem somente-leitura
 * (ex.: Vercel), as ESCRITAS feitas por este módulo NÃO persistem entre
 * requisições/deploys. Funciona de verdade em hosts com disco gravável
 * (VPS, container, `next start` próprio). A leitura funciona em qualquer host.
 *
 * Este módulo só deve ser importado em código de servidor (route handlers e
 * Server Components) — nunca em componentes de cliente.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

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

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");
const DEFAULT_AUTHOR = "Equipe Evoluke";

/* -------------------------------------------------------------------------- */
/* Leitura / escrita                                                          */
/* -------------------------------------------------------------------------- */

async function readStore(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch (err: unknown) {
    // Arquivo ausente => coleção vazia. Outros erros são relançados.
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return [];
    throw err;
  }
}

// Serializa as escritas dentro do processo para evitar corrupção por
// requisições concorrentes (mutex simples baseado em fila de promessas).
let writeQueue: Promise<unknown> = Promise.resolve();

function enqueueWrite<T>(task: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(task, task);
  // Mantém a fila viva mesmo que uma tarefa rejeite.
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function writeStoreAtomic(posts: BlogPost[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  const tmp = `${DATA_FILE}.${crypto.randomUUID()}.tmp`;
  const payload = `${JSON.stringify(posts, null, 2)}\n`;
  await fs.writeFile(tmp, payload, "utf8");
  // rename é atômico no mesmo filesystem: nunca deixa o arquivo pela metade.
  await fs.rename(tmp, DATA_FILE);
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

function uniqueSlug(base: string, taken: Set<string>): string {
  const root = base || "post";
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
  const posts = await readStore();
  const visible = options?.includeDrafts
    ? posts
    : posts.filter((p) => p.status === "published");
  return visible.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** Busca um post publicado pelo slug (ou `null`). */
export async function getPostBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
): Promise<BlogPost | null> {
  const posts = await readStore();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  if (post.status !== "published" && !options?.includeDrafts) return null;
  return post;
}

/** Lista de slugs publicados (para generateStaticParams / sitemap). */
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}

/** Conjunto de tags usadas em posts publicados, ordenadas. */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
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

  return enqueueWrite(async () => {
    const posts = await readStore();
    const taken = new Set(posts.map((p) => p.slug));
    const base = slugify(input.slug?.trim() || title);
    const slug = uniqueSlug(base, taken);

    const now = new Date().toISOString();
    const post: BlogPost = {
      id: crypto.randomUUID(),
      slug,
      title,
      excerpt: (input.excerpt ?? "").trim(),
      content,
      coverImage: input.coverImage?.trim() || undefined,
      coverAlt: input.coverAlt?.trim() || undefined,
      author: (input.author ?? "").trim() || DEFAULT_AUTHOR,
      tags,
      status,
      publishedAt,
      updatedAt: now,
    };

    await writeStoreAtomic([post, ...posts]);
    return post;
  });
}

/** Remove um post pelo slug. Retorna `true` se removeu algo. */
export async function deletePostBySlug(slug: string): Promise<boolean> {
  return enqueueWrite(async () => {
    const posts = await readStore();
    const next = posts.filter((p) => p.slug !== slug);
    if (next.length === posts.length) return false;
    await writeStoreAtomic(next);
    return true;
  });
}

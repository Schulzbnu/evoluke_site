import { NextResponse } from "next/server";
import { authorizeRequest } from "@/lib/apiAuth";
import {
  createPost,
  getAllPosts,
  BlogValidationError,
  type CreatePostInput,
} from "@/lib/blog";
import { site } from "@/data/site";

// Usa node:crypto e o cliente Supabase server-side => runtime Node.js (não edge).
export const runtime = "nodejs";
// Nunca cacheia: a lista reflete o estado atual do store.
export const dynamic = "force-dynamic";

/**
 * GET /api/blog
 * Lista pública dos posts publicados (sem o corpo, para payload enxuto).
 */
export async function GET() {
  const posts = await getAllPosts();
  const items = posts.map(({ content, ...meta }) => ({
    ...meta,
    url: `${site.url}/blog/${meta.slug}`,
  }));
  return NextResponse.json({ count: items.length, items });
}

/**
 * POST /api/blog
 * Cria um post. Requer `Authorization: Bearer <BLOG_API_TOKEN>`.
 */
export async function POST(request: Request) {
  const auth = authorizeRequest(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: CreatePostInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo inválido: envie JSON." },
      { status: 400 },
    );
  }

  try {
    const post = await createPost(body);
    return NextResponse.json(
      { ok: true, post: { ...post, url: `${site.url}/blog/${post.slug}` } },
      { status: 201, headers: { Location: `/blog/${post.slug}` } },
    );
  } catch (err) {
    if (err instanceof BlogValidationError) {
      return NextResponse.json({ error: err.message }, { status: 422 });
    }
    console.error("[blog] Falha ao criar post:", err);
    return NextResponse.json(
      { error: "Não foi possível salvar o post." },
      { status: 500 },
    );
  }
}

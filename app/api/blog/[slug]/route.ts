import { NextResponse } from "next/server";
import { authorizeRequest } from "@/lib/apiAuth";
import { getPostBySlug, deletePostBySlug } from "@/lib/blog";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Ctx {
  params: Promise<{ slug: string }>;
}

/** GET /api/blog/:slug — retorna um post publicado (com corpo). */
export async function GET(_request: Request, { params }: Ctx) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return NextResponse.json(
      { error: "Post não encontrado." },
      { status: 404 },
    );
  }
  return NextResponse.json({ post: { ...post, url: `${site.url}/blog/${slug}` } });
}

/** DELETE /api/blog/:slug — remove um post. Requer token. */
export async function DELETE(request: Request, { params }: Ctx) {
  const auth = authorizeRequest(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { slug } = await params;
  const removed = await deletePostBySlug(slug);
  if (!removed) {
    return NextResponse.json(
      { error: "Post não encontrado." },
      { status: 404 },
    );
  }
  return NextResponse.json({ ok: true });
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Container from "@/components/Container";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import BlogCard from "@/components/BlogCard";
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { renderMarkdown, readingTimeMinutes } from "@/lib/markdown";
import { formatDate } from "@/lib/format";
import { blogPostingSchema, breadcrumbSchema } from "@/data/structuredData";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pré-gera as rotas dos posts já existentes; novos posts renderizam sob demanda. */
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);
  const minutos = readingTimeMinutes(post.content);

  // Até 3 posts relacionados (mais recentes, exceto o atual).
  const relacionados = (await getAllPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* Cabeçalho do artigo */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div
          aria-hidden="true"
          className="bg-grid-dark pointer-events-none absolute inset-0 bg-[size:34px_34px] opacity-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
        />
        <Container className="relative py-16 sm:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Todos os artigos
          </Link>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-300 ring-1 ring-white/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {post.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span className="font-medium text-white/80">{post.author}</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {minutos} min de leitura
            </span>
          </div>
        </Container>
      </section>

      {/* Capa (quando houver) */}
      {post.coverImage && (
        <Container className="-mt-8 sm:-mt-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            className="aspect-[2/1] w-full rounded-2xl border border-ink-100 object-cover shadow-card"
            // Capa no topo do artigo = provável elemento LCP: carrega com
            // prioridade (não lazy) para melhorar o Largest Contentful Paint.
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </Container>
      )}

      {/* Corpo do artigo */}
      <article className="py-14 sm:py-16">
        <Container>
          <div
            className="prose prose-lg prose-ink mx-auto max-w-3xl prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent-700 prose-a:font-medium hover:prose-a:text-accent-600 prose-blockquote:border-l-accent prose-blockquote:text-ink-900/70 prose-code:rounded prose-code:bg-ink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-img:rounded-xl"
            // Conteúdo gerado por renderMarkdown(): HTML cru é escapado e
            // URLs passam por allowlist (ver lib/markdown.ts).
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </article>

      {/* Posts relacionados */}
      {relacionados.length > 0 && (
        <section className="border-t border-ink-100 bg-ink-50 py-16">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight text-ink-900">
              Continue lendo
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}

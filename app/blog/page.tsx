import type { Metadata } from "next";
import { Rss } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { blogSchema, breadcrumbSchema } from "@/data/structuredData";

// Revalida periodicamente para refletir posts criados via API.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideias práticas sobre Inteligência Artificial aplicada a negócios: estratégia, casos de uso, automação e boas práticas — direto da Evoluke.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  openGraph: {
    type: "website",
    title: "Blog · Evoluke",
    description:
      "Ideias práticas sobre Inteligência Artificial aplicada a negócios.",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={[
          blogSchema(posts),
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <section className="bg-ink-900 py-20 text-white sm:py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              as="h1"
              light
              align="left"
              eyebrow="Blog"
              title="Inteligência Artificial que vira resultado"
              description="Artigos diretos ao ponto sobre como aplicar IA no seu negócio — da estratégia ao produto em produção, em qualquer setor."
            />
            <a
              href="/blog/feed.xml"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Rss className="h-4 w-4" aria-hidden="true" />
              Feed RSS
            </a>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-ink-100 bg-ink-50 p-10 text-center">
              <h2 className="text-lg font-semibold text-ink-900">
                Em breve, novos artigos
              </h2>
              <p className="mt-2 text-sm text-ink-900/60">
                Estamos preparando os primeiros conteúdos. Volte logo — ou fale
                com a gente enquanto isso.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured && <BlogCard post={featured} featured />}
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTASection />
    </>
  );
}

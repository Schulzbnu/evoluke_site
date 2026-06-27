import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { readingTimeMinutes } from "@/lib/markdown";
import { formatDate } from "@/lib/format";

interface BlogCardProps {
  post: BlogPost;
  /** Destaca o primeiro post (layout maior). */
  featured?: boolean;
}

/** Card de um post na listagem do blog. */
export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const minutos = readingTimeMinutes(post.content);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-accent-200 hover:shadow-glow ${
        featured ? "sm:col-span-2 lg:col-span-3 sm:flex-row" : ""
      }`}
    >
      {/* Capa: imagem real ou placeholder com gradiente da marca. */}
      <div
        className={`relative overflow-hidden bg-ink-900 ${
          featured ? "sm:w-1/2" : "aspect-[16/9]"
        }`}
      >
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.coverAlt || ""}
            className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              featured ? "sm:absolute sm:inset-0" : ""
            }`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`flex items-center justify-center bg-gradient-to-br from-accent-700 via-accent-600 to-accent2-500 ${
              featured ? "h-56 sm:h-full sm:min-h-[16rem]" : "h-full"
            }`}
          >
            <span className="bg-grid-dark absolute inset-0 bg-[size:28px_28px] opacity-30" />
            <span className="relative text-2xl font-bold tracking-tight text-white/90">
              evoluke
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {post.tags.length > 0 && (
          <span className="mb-3 inline-flex w-fit items-center rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
            {post.tags[0]}
          </span>
        )}

        <h2
          className={`font-bold tracking-tight text-ink-900 ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-900/65">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between text-xs text-ink-900/50">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {minutos} min de leitura
          </span>
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
          Ler artigo
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}

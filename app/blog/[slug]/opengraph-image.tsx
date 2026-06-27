import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const revalidate = 60;

export const alt = "Artigo do blog da Evoluke";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Gera a imagem de compartilhamento social (1200×630) de cada post. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title ?? "Blog da Evoluke";
  const tag = post?.tags?.[0] ?? "Inteligência Artificial";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0E1A",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(124,92,252,0.45), transparent 55%)",
          padding: "72px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "white",
            }}
          >
            evoluke
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#AB99FB",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 999,
              padding: "6px 18px",
            }}
          >
            {tag}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 56 : 68,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: "960px",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
          {site.url.replace(/^https?:\/\//, "")}/blog
        </div>
      </div>
    ),
    { ...size },
  );
}

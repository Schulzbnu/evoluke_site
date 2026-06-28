import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "nodejs";

export const alt = `${site.nome} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem de compartilhamento social padrão (1200×630) do site.
 * O Next.js aplica esta imagem (convenção de arquivo) a todas as rotas que não
 * definem a sua própria — cobrindo home, /produtos, /segmentos, /sobre etc.
 * Gerada em código (sem asset estático nem dependência de design manual).
 */
export default function Image() {
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
            Inteligência Artificial
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: "960px",
          }}
        >
          {site.tagline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}

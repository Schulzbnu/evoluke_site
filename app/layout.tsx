import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { branding, site } from "@/data/site";
import { organizationSchema } from "@/data/structuredData";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — ${site.tagline}`,
    template: `%s · ${site.nome}`,
  },
  description: site.descricao,
  keywords: [
    "Inteligência Artificial",
    "consultoria de IA",
    "desenvolvimento de produtos de IA",
    "machine learning",
    "automação",
    "Evoluke",
  ],
  authors: [{ name: site.nome }],
  // O Next.js também detecta automaticamente os arquivos de ícone em
  // `app/icon.*` e `app/apple-icon.*`. Mantemos `icon.svg` como ícone padrão.
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: `${site.nome} — ${site.tagline}`,
    description: site.descricao,
    // Imagem de compartilhamento adicionada apenas quando configurada.
    ...(branding.ogImage ? { images: [{ url: branding.ogImage }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nome} — ${site.tagline}`,
    description: site.descricao,
    ...(branding.ogImage ? { images: [branding.ogImage] } : {}),
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={sans.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={organizationSchema()} />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

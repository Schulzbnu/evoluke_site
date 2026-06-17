import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getSegmentoSlugs } from "@/data/segmentos";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/como-atuamos", "/segmentos", "/sobre", "/contato"];
  const segmentos = getSegmentoSlugs().map((slug) => `/segmentos/${slug}`);

  return [...rotas, ...segmentos].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}

import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getSegmentoSlugs } from "@/data/segmentos";
import { getProdutoSlugs } from "@/data/produtos";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rotas = [
    "",
    "/como-atuamos",
    "/segmentos",
    "/produtos",
    "/sobre",
    "/blog",
    "/contato",
  ];
  const segmentos = getSegmentoSlugs().map((slug) => `/segmentos/${slug}`);
  const produtos = getProdutoSlugs().map((slug) => `/produtos/${slug}`);

  const estaticas: MetadataRoute.Sitemap = [
    ...rotas,
    ...segmentos,
    ...produtos,
  ].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.7,
    }),
  );

  // Posts do blog: usam a data de atualização real e prioridade dedicada.
  const posts = await getAllPosts();
  const blog: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...estaticas, ...blog];
}

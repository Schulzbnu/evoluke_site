"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  categorias,
  getSegmentosByCategoria,
  type CategoriaSegmento,
} from "@/data/segmentos";

/**
 * Seção de abas interativas dos segmentos (Home).
 * As mesmas verticais do arquivo `data/segmentos.ts` alimentam tanto
 * estas abas quanto as páginas de rota dedicadas.
 *
 * Para evitar poluição visual com muitos segmentos, eles são divididos
 * por categoria ("Por setor" / "Por área da empresa") e exibidos num
 * trilho horizontal único: swipe no mobile, setas/scroll no desktop.
 * Fades nas bordas sinalizam que há mais conteúdo fora da tela.
 */
export default function SegmentTabs() {
  const [catId, setCatId] = useState<CategoriaSegmento>("setor");
  const [slug, setSlug] = useState(getSegmentosByCategoria("setor")[0].slug);

  const trilhoRef = useRef<HTMLDivElement>(null);
  const [podeEsquerda, setPodeEsquerda] = useState(false);
  const [podeDireita, setPodeDireita] = useState(false);

  const lista = getSegmentosByCategoria(catId);
  const seg = lista.find((s) => s.slug === slug) ?? lista[0];
  const Icon = seg.icon;

  // Atualiza os indicadores de scroll (fades + setas) conforme a posição.
  function atualizarScroll() {
    const el = trilhoRef.current;
    if (!el) return;
    setPodeEsquerda(el.scrollLeft > 4);
    setPodeDireita(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    atualizarScroll();
    const el = trilhoRef.current;
    if (!el) return;
    window.addEventListener("resize", atualizarScroll);
    return () => window.removeEventListener("resize", atualizarScroll);
  }, [catId]);

  function rolar(direcao: 1 | -1) {
    const el = trilhoRef.current;
    if (!el) return;
    el.scrollBy({ left: direcao * el.clientWidth * 0.8, behavior: "smooth" });
  }

  function trocarCategoria(id: CategoriaSegmento) {
    if (id === catId) return;
    setCatId(id);
    setSlug(getSegmentosByCategoria(id)[0].slug);
    trilhoRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }

  function selecionar(novoSlug: string, alvo: HTMLElement) {
    setSlug(novoSlug);
    alvo.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  return (
    <div>
      {/* Seletor de categoria */}
      <div
        role="tablist"
        aria-label="Categoria de segmentos"
        className="mx-auto flex max-w-md gap-1 rounded-full bg-ink-100/70 p-1"
      >
        {categorias.map((cat) => {
          const selected = cat.id === catId;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={selected}
              onClick={() => trocarCategoria(cat.id)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "bg-white text-ink-900 shadow-card"
                  : "text-ink-900/60 hover:text-ink-900"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Trilho de chips (uma linha, com scroll horizontal) */}
      <div className="relative mt-6">
        {/* Fade + seta à esquerda */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent transition-opacity ${
            podeEsquerda ? "opacity-100" : "opacity-0"
          }`}
        />
        <button
          type="button"
          aria-label="Ver segmentos anteriores"
          onClick={() => rolar(-1)}
          className={`absolute -left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-ink-100 bg-white p-1.5 text-ink-900/70 shadow-card transition-opacity hover:text-ink-900 sm:block ${
            podeEsquerda ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div
          ref={trilhoRef}
          role="tablist"
          aria-label="Segmentos de atuação"
          onScroll={atualizarScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-4 px-0.5 py-1"
        >
          {lista.map((s) => {
            const TabIcon = s.icon;
            const selected = s.slug === seg.slug;
            return (
              <button
                key={s.slug}
                role="tab"
                id={`tab-${s.slug}`}
                aria-selected={selected}
                aria-controls={`painel-${s.slug}`}
                tabIndex={selected ? 0 : -1}
                onClick={(e) => selecionar(s.slug, e.currentTarget)}
                className={`inline-flex flex-shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  selected
                    ? "bg-accent text-white shadow-glow"
                    : "bg-white text-ink-900/70 ring-1 ring-ink-100 hover:text-ink-900 hover:ring-accent-200"
                }`}
              >
                <TabIcon className="h-4 w-4" aria-hidden="true" />
                {s.nome}
              </button>
            );
          })}
        </div>

        {/* Fade + seta à direita */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent transition-opacity ${
            podeDireita ? "opacity-100" : "opacity-0"
          }`}
        />
        <button
          type="button"
          aria-label="Ver mais segmentos"
          onClick={() => rolar(1)}
          className={`absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-ink-100 bg-white p-1.5 text-ink-900/70 shadow-card transition-opacity hover:text-ink-900 sm:block ${
            podeDireita ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Painel */}
      <div
        role="tabpanel"
        id={`painel-${seg.slug}`}
        aria-labelledby={`tab-${seg.slug}`}
        className="mt-6 animate-fade-up rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-10"
        key={seg.slug}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-ink-900">{seg.nome}</h3>
              <p className="mt-1 max-w-xl text-ink-900/65">{seg.resumo}</p>
            </div>
          </div>
          <Link
            href={`/segmentos/${seg.slug}`}
            className="inline-flex flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-600"
          >
            Ver o segmento
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {seg.solucoes.slice(0, 4).map((sol) => (
            <li
              key={sol.titulo}
              className="rounded-xl border border-ink-100 bg-ink-50/40 p-4 transition-colors hover:border-accent-200"
            >
              <p className="font-semibold text-ink-900">{sol.titulo}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-900/60">
                {sol.resultado}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getSegmentosByCategoria,
  type CategoriaSegmento,
} from "@/data/segmentos";

/**
 * Trilho horizontal de links para os demais segmentos de uma categoria.
 * Usado no rodapé das páginas `/segmentos/[slug]` ("Explore outros
 * segmentos"). Mesma lógica de affordance do `SegmentTabs`: swipe no
 * mobile, scroll/snap e setas no desktop, com fades nas bordas.
 *
 * Recebe apenas valores serializáveis (`categoria` e `currentSlug`) e
 * deriva a lista — e os ícones — direto da fonte de verdade, evitando
 * passar componentes de Server para Client Component.
 *
 * O fundo da seção é `bg-ink-50`, então os fades partem dessa cor.
 */
export default function SegmentRail({
  categoria,
  currentSlug,
}: {
  categoria: CategoriaSegmento;
  currentSlug: string;
}) {
  const lista = getSegmentosByCategoria(categoria).filter(
    (s) => s.slug !== currentSlug,
  );

  const trilhoRef = useRef<HTMLDivElement>(null);
  const [podeEsquerda, setPodeEsquerda] = useState(false);
  const [podeDireita, setPodeDireita] = useState(false);

  function atualizarScroll() {
    const el = trilhoRef.current;
    if (!el) return;
    setPodeEsquerda(el.scrollLeft > 4);
    setPodeDireita(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    atualizarScroll();
    window.addEventListener("resize", atualizarScroll);
    return () => window.removeEventListener("resize", atualizarScroll);
  }, []);

  function rolar(direcao: 1 | -1) {
    const el = trilhoRef.current;
    if (!el) return;
    el.scrollBy({ left: direcao * el.clientWidth * 0.8, behavior: "smooth" });
  }

  if (lista.length === 0) return null;

  return (
    <div className="relative mt-6">
      {/* Fade + seta à esquerda */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-ink-50 to-transparent transition-opacity ${
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
        onScroll={atualizarScroll}
        className="no-scrollbar flex snap-x gap-3 overflow-x-auto scroll-px-4 px-0.5 py-1"
      >
        {lista.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.slug}
              href={`/segmentos/${s.slug}`}
              className="inline-flex flex-shrink-0 snap-start items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-2 text-sm font-medium text-ink-900/75 transition-colors hover:border-accent-200 hover:text-accent-700"
            >
              <Icon className="h-4 w-4 text-accent-600" aria-hidden="true" />
              {s.nome}
            </Link>
          );
        })}
      </div>

      {/* Fade + seta à direita */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-ink-50 to-transparent transition-opacity ${
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
  );
}

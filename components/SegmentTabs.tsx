"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { segmentos } from "@/data/segmentos";

/**
 * Seção de abas interativas dos segmentos (Home).
 * As mesmas verticais do arquivo `data/segmentos.ts` alimentam
 * tanto estas abas quanto as páginas de rota dedicadas.
 */
export default function SegmentTabs() {
  const [ativo, setAtivo] = useState(0);
  const seg = segmentos[ativo];
  const Icon = seg.icon;

  return (
    <div>
      {/* Abas */}
      <div
        role="tablist"
        aria-label="Segmentos de atuação"
        className="flex flex-wrap justify-center gap-2"
      >
        {segmentos.map((s, i) => {
          const TabIcon = s.icon;
          const selected = i === ativo;
          return (
            <button
              key={s.slug}
              role="tab"
              id={`tab-${s.slug}`}
              aria-selected={selected}
              aria-controls={`painel-${s.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setAtivo(i)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
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

      {/* Painel */}
      <div
        role="tabpanel"
        id={`painel-${seg.slug}`}
        aria-labelledby={`tab-${seg.slug}`}
        className="mt-10 animate-fade-up rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-10"
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

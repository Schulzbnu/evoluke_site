import { ArrowRight } from "lucide-react";
import Card from "./Card";
import type { SolucaoSegmento } from "@/data/segmentos";

/**
 * Card padrão de solução de uma vertical.
 * Estrutura: título curto -> problema que resolve -> resultado esperado.
 */
export default function SolutionCard({ solucao }: { solucao: SolucaoSegmento }) {
  return (
    <Card interactive className="flex h-full flex-col">
      <h3 className="text-lg font-semibold text-ink-900">{solucao.titulo}</h3>

      <div className="mt-4 space-y-3 text-sm leading-relaxed">
        <p className="text-ink-900/70">
          <span className="font-semibold text-ink-900/90">Problema: </span>
          {solucao.problema}
        </p>
        <p className="flex gap-2 text-ink-900/80">
          <ArrowRight
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
            aria-hidden="true"
          />
          <span>
            <span className="font-semibold text-accent-700">Resultado: </span>
            {solucao.resultado}
          </span>
        </p>
      </div>
    </Card>
  );
}

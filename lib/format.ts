/**
 * Utilitários de formatação seguros para cliente e servidor
 * (sem dependências de Node).
 */

/** Formata uma data ISO em pt-BR: "12 de maio de 2026". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Pequeno utilitário para concatenar classes condicionalmente,
 * sem dependências externas.
 */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Autenticação por token para a API de criação de posts.
 *
 * A chamada externa deve enviar o cabeçalho:
 *   Authorization: Bearer <BLOG_API_TOKEN>
 *
 * O token fica na variável de ambiente `BLOG_API_TOKEN` (NUNCA no código).
 * A comparação é feita em tempo constante (timing-safe) para não vazar
 * informação pelo tempo de resposta.
 */
import crypto from "node:crypto";

export type AuthResult =
  | { ok: true }
  | { ok: false; status: 401 | 500; error: string };

/** Compara dois segredos em tempo constante (resistente a timing attacks). */
function safeEqual(a: string, b: string): boolean {
  // sha256 normaliza o comprimento — timingSafeEqual exige buffers iguais.
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

/** Extrai o token do cabeçalho Authorization (Bearer). */
function extractBearer(header: string | null): string | null {
  if (!header) return null;
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  return match ? match[1].trim() : null;
}

/** Valida o token da requisição contra `BLOG_API_TOKEN`. */
export function authorizeRequest(request: Request): AuthResult {
  const expected = process.env.BLOG_API_TOKEN;

  if (!expected || expected.length < 16) {
    // Falha fechada: sem token forte configurado, ninguém entra.
    console.error(
      "[blog] BLOG_API_TOKEN ausente ou fraco. Defina um token de 32+ caracteres.",
    );
    return {
      ok: false,
      status: 500,
      error: "A API não está configurada. Defina BLOG_API_TOKEN.",
    };
  }

  const provided = extractBearer(request.headers.get("authorization"));
  if (!provided || !safeEqual(provided, expected)) {
    return { ok: false, status: 401, error: "Não autorizado." };
  }

  return { ok: true };
}

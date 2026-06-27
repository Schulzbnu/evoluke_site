/**
 * Cliente Supabase para uso EXCLUSIVO no servidor (route handlers e Server
 * Components). Usa a SERVICE ROLE key — que ignora RLS — então NUNCA pode ser
 * importado em código de cliente nem exposto ao navegador.
 *
 * Variáveis de ambiente necessárias (ver `.env.example`):
 *   NEXT_PUBLIC_SUPABASE_URL    — URL do projeto (https://<ref>.supabase.co)
 *   SUPABASE_SERVICE_ROLE_KEY   — chave service_role (Settings → API)
 *
 * O cliente é criado sob demanda (lazy) e memoizado, para que o build não
 * quebre quando as variáveis ainda não estão definidas — só falha no momento
 * em que o blog realmente precisa do banco.
 */
import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/** `true` quando as variáveis de ambiente do Supabase estão definidas. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

/**
 * Cliente admin (service role). Lança se o Supabase não estiver configurado —
 * use no caminho de ESCRITA, onde a ausência de banco deve falhar explícito.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e " +
        "SUPABASE_SERVICE_ROLE_KEY no ambiente (.env.local).",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/**
 * Igual ao `getSupabaseAdmin`, mas retorna `null` em vez de lançar quando não
 * configurado. Use no caminho de LEITURA, para o build e o site degradarem
 * com elegância (blog vazio) sem o banco — útil em CI e previews.
 */
export function tryGetSupabaseAdmin(): SupabaseClient | null {
  return isSupabaseConfigured() ? getSupabaseAdmin() : null;
}

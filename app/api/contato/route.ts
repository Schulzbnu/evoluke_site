import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Endpoint do formulário de contato.
 *
 * Por enquanto: valida o payload no servidor (defesa em profundidade, já que o
 * cliente também valida) e registra o lead no log. Retorna sucesso.
 *
 * TODO: plugar a integração real de lead — escolher um dos caminhos:
 *   - Enviar e-mail (ex.: Resend, SendGrid, AWS SES).
 *   - Criar lead em CRM (ex.: HubSpot, Pipedrive, RD Station).
 *   - Persistir em banco/planilha.
 * IMPORTANTE: ler credenciais SOMENTE de variáveis de ambiente (process.env),
 * nunca commitar segredos no código.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // TODO: substituir o log por envio de e-mail / criação de lead no CRM.
  console.info("[contato] novo lead recebido:", {
    name: parsed.data.name,
    company: parsed.data.company,
    email: parsed.data.email,
    vertical: parsed.data.vertical,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

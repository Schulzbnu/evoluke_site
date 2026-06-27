import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Roda em Node.js (nodemailer não funciona no edge runtime).
export const runtime = "nodejs";

interface Payload {
  nome?: string;
  email?: string;
  empresa?: string;
  mensagem?: string;
  // Honeypot anti-spam: deve chegar sempre vazio.
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const nome = (body.nome ?? "").trim();
  const email = (body.email ?? "").trim();
  const empresa = (body.empresa ?? "").trim();
  const mensagem = (body.mensagem ?? "").trim();

  // Honeypot: se preenchido, é bot. Respondemos OK sem enviar nada.
  if ((body.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  // Validação (espelha a validação do cliente).
  if (!nome) {
    return NextResponse.json({ error: "Informe seu nome." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Digite um e-mail válido." }, { status: 400 });
  }
  if (mensagem.length < 10) {
    return NextResponse.json(
      { error: "Descreva o desafio com pelo menos 10 caracteres." },
      { status: 400 },
    );
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO,
    CONTACT_FROM,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contato] Variáveis SMTP ausentes. Configure SMTP_HOST, SMTP_USER e SMTP_PASS.");
    return NextResponse.json(
      { error: "O envio de e-mail não está configurado. Tente novamente mais tarde." },
      { status: 500 },
    );
  }

  const port = Number(SMTP_PORT ?? 465);
  // porta 465 => SSL direto; demais (587) => STARTTLS.
  const secure = port === 465;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  // O "from" precisa ser uma caixa autenticada na Hostinger (use SMTP_USER).
  const from = CONTACT_FROM || SMTP_USER;
  const to = CONTACT_TO || SMTP_USER;

  const linhas = [
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    empresa ? `Empresa: ${empresa}` : null,
    "",
    "Mensagem:",
    mensagem,
  ].filter((l) => l !== null);

  const html = `
    <h2>Novo contato pelo site</h2>
    <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    ${empresa ? `<p><strong>Empresa:</strong> ${escapeHtml(empresa)}</p>` : ""}
    <p><strong>Mensagem:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(mensagem)}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Evoluke — Site" <${from}>`,
      to,
      replyTo: `"${nome}" <${email}>`,
      subject: `Novo contato pelo site — ${nome}`,
      text: linhas.join("\n"),
      html,
    });
  } catch (err) {
    console.error("[contato] Falha ao enviar e-mail:", err);
    return NextResponse.json(
      { error: "Não foi possível enviar agora. Tente novamente em instantes." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

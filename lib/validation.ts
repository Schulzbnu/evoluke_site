import { z } from "zod";

// Domínios de e-mail pessoais/gratuitos — bloqueados para garantir e-mail corporativo.
const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "yahoo.com",
  "yahoo.com.br",
  "icloud.com",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br",
  "proton.me",
  "protonmail.com",
];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(120, "Nome muito longo."),
  company: z
    .string()
    .trim()
    .min(2, "Informe o nome da empresa.")
    .max(120, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("E-mail inválido.")
    .refine(
      (value) => {
        const domain = value.split("@")[1]?.toLowerCase();
        return !!domain && !FREE_EMAIL_DOMAINS.includes(domain);
      },
      { message: "Use um e-mail corporativo (evite Gmail, Hotmail etc.)." },
    ),
  vertical: z
    .string()
    .trim()
    .min(1, "Selecione uma vertical."),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre o desafio (mín. 10 caracteres).")
    .max(2000, "Mensagem muito longa."),
});

export type ContactInput = z.infer<typeof contactSchema>;

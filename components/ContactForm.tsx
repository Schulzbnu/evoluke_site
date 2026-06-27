"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Button from "./Button";

interface FormState {
  nome: string;
  email: string;
  empresa: string;
  mensagem: string;
  // Honeypot anti-spam (não exibido a humanos).
  website: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  nome: "",
  email: "",
  empresa: "",
  mensagem: "",
  website: "",
};

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.nome.trim()) errors.nome = "Informe seu nome.";
  if (!values.email.trim()) {
    errors.email = "Informe seu e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Digite um e-mail válido.";
  }
  if (!values.mensagem.trim()) {
    errors.mensagem = "Conte um pouco sobre o desafio.";
  } else if (values.mensagem.trim().length < 10) {
    errors.mensagem = "Descreva com pelo menos 10 caracteres.";
  }
  return errors;
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-ink-900 placeholder:text-ink-900/35 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400";

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: keyof FormState, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error ?? "Não foi possível enviar. Tente novamente.",
        );
      }

      setStatus("success");
      setValues(emptyForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Não foi possível enviar. Tente novamente.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-accent-200 bg-accent-50 p-8 text-center"
      >
        <CheckCircle2
          className="mx-auto h-12 w-12 text-accent-600"
          aria-hidden="true"
        />
        <h3 className="mt-4 text-xl font-bold text-ink-900">
          Mensagem enviada!
        </h3>
        <p className="mt-2 text-ink-900/65">
          Obrigado pelo contato. Nossa equipe responde em até 1 dia útil.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-accent-700 hover:text-accent-600"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot anti-spam: escondido de humanos, ignorado por leitores de tela. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="nome"
          label="Nome"
          required
          value={values.nome}
          error={errors.nome}
          onChange={(v) => update("nome", v)}
          autoComplete="name"
          placeholder="Seu nome"
        />
        <Field
          id="email"
          label="E-mail"
          type="email"
          required
          value={values.email}
          error={errors.email}
          onChange={(v) => update("email", v)}
          autoComplete="email"
          placeholder="voce@empresa.com"
        />
      </div>

      <Field
        id="empresa"
        label="Empresa"
        value={values.empresa}
        error={errors.empresa}
        onChange={(v) => update("empresa", v)}
        autoComplete="organization"
        placeholder="Nome da sua empresa (opcional)"
      />

      <div>
        <label
          htmlFor="mensagem"
          className="mb-1.5 block text-sm font-semibold text-ink-900"
        >
          Mensagem <span className="text-accent-600">*</span>
        </label>
        <textarea
          id="mensagem"
          rows={5}
          value={values.mensagem}
          onChange={(e) => update("mensagem", e.target.value)}
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? "mensagem-erro" : undefined}
          placeholder="Qual problema você quer resolver? Conte o contexto e o objetivo."
          className={`${inputBase} resize-y ${
            errors.mensagem ? "border-red-400" : "border-ink-100"
          }`}
        />
        {errors.mensagem && (
          <p id="mensagem-erro" className="mt-1.5 text-sm text-red-600">
            {errors.mensagem}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Enviando…
          </>
        ) : (
          "Enviar mensagem"
        )}
      </Button>
    </form>
  );
}

interface FieldProps {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-ink-900"
      >
        {label}{" "}
        {required && <span className="text-accent-600">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-erro` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} ${error ? "border-red-400" : "border-ink-100"}`}
      />
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

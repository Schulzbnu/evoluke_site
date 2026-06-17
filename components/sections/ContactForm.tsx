"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "../ui/Button";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { contact } from "@/content/pt";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const f = contact.form.fields;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  async function onSubmit(data: ContactInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-xl border border-accent-200 bg-accent-50 p-8 text-center"
      >
        <CheckCircle2 size={40} className="text-accent-600" aria-hidden="true" />
        <p className="text-lg font-semibold text-ink">{contact.form.success}</p>
        <Button variant="ghost" onClick={() => setStatus("idle")}>
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={f.name.label} error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={f.name.placeholder}
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
            {...register("name")}
          />
        </Field>

        <Field id="company" label={f.company.label} error={errors.company?.message}>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder={f.company.placeholder}
            aria-invalid={!!errors.company}
            className={inputClass(!!errors.company)}
            {...register("company")}
          />
        </Field>

        <Field id="email" label={f.email.label} error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={f.email.placeholder}
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
            {...register("email")}
          />
        </Field>

        <Field id="vertical" label={f.vertical.label} error={errors.vertical?.message}>
          <select
            id="vertical"
            defaultValue=""
            aria-invalid={!!errors.vertical}
            className={inputClass(!!errors.vertical)}
            {...register("vertical")}
          >
            <option value="" disabled>
              {f.vertical.placeholder}
            </option>
            {contact.form.verticalOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label={f.message.label} error={errors.message?.message}>
        <textarea
          id="message"
          rows={4}
          placeholder={f.message.placeholder}
          aria-invalid={!!errors.message}
          className={cn(inputClass(!!errors.message), "resize-y")}
          {...register("message")}
        />
      </Field>

      {status === "error" ? (
        <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-600">
          <AlertCircle size={18} aria-hidden="true" />
          {contact.form.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          contact.form.submitting
        ) : (
          <>
            {contact.form.submit}
            <Send size={18} aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "block w-full rounded-lg border bg-surface px-4 py-3 text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-accent-500",
    "min-h-[44px]",
    hasError ? "border-red-400" : "border-surface-muted",
  );
}

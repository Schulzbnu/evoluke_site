import Link from "next/link";

/** Logo da Evoluke — placeholder de texto estilizado (marca em wordmark). */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Evoluke — página inicial"
      className="group inline-flex items-center gap-2"
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-base font-black text-white shadow-glow"
        aria-hidden="true"
      >
        E
      </span>
      <span
        className={`text-xl font-bold tracking-tight ${
          light ? "text-white" : "text-ink-900"
        }`}
      >
        Evolu<span className="text-accent">ke</span>
      </span>
    </Link>
  );
}

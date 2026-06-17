"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Logo } from "./Logo";
import { nav } from "@/content/pt";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueia o scroll do body quando o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled || open
          ? "border-b border-surface-muted bg-surface/95 backdrop-blur"
          : "bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="#top" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500" aria-label="Evoluke — início">
            <Logo />
          </Link>

          {/* Navegação desktop */}
          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-muted transition-colors hover:text-brand-800"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href={nav.cta.href}>{nav.cta.label}</Button>
          </div>

          {/* Botão hambúrguer mobile (área de toque 44px) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* Menu mobile */}
      {open ? (
        <div id="mobile-menu" className="border-t border-surface-muted bg-surface lg:hidden">
          <Container>
            <nav aria-label="Mobile" className="flex flex-col gap-1 py-4">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-ink hover:bg-surface-muted"
                >
                  {link.label}
                </a>
              ))}
              <Button href={nav.cta.href} className="mt-3 w-full" size="lg" onClick={() => setOpen(false)}>
                {nav.cta.label}
              </Button>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

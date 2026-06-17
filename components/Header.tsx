"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import { navItems } from "@/data/site";
import { segmentos } from "@/data/segmentos";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [segOpen, setSegOpen] = useState(false);
  const segRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fecha o menu mobile ao navegar.
  useEffect(() => {
    setMobileOpen(false);
    setSegOpen(false);
  }, [pathname]);

  // Fecha o dropdown ao clicar fora ou pressionar Escape.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (segRef.current && !segRef.current.contains(e.target as Node)) {
        setSegOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSegOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSegOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setSegOpen(false), 120);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        {/* Navegação desktop */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              if (item.label === "Segmentos") {
                return (
                  <li
                    key={item.href}
                    ref={segRef}
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={segOpen}
                      onClick={() => setSegOpen((v) => !v)}
                      className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive("/segmentos")
                          ? "text-accent-700"
                          : "text-ink-900/70 hover:text-ink-900"
                      }`}
                    >
                      Segmentos
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          segOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {segOpen && (
                      <div className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-3">
                        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-ink-100 bg-white p-3 shadow-card">
                          {segmentos.map((seg) => {
                            const Icon = seg.icon;
                            return (
                              <Link
                                key={seg.slug}
                                href={`/segmentos/${seg.slug}`}
                                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-ink-50"
                              >
                                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent group-hover:text-white">
                                  <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <span>
                                  <span className="block text-sm font-semibold text-ink-900">
                                    {seg.nome}
                                  </span>
                                  <span className="mt-0.5 block text-xs leading-snug text-ink-900/55">
                                    {seg.resumo}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-accent-700"
                        : "text-ink-900/70 hover:text-ink-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/contato" size="md">
            Fale com a gente
          </Button>
        </div>

        {/* Botão mobile */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink-900 lg:hidden"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </Container>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <Container className="space-y-1 py-4">
            {navItems
              .filter((i) => i.label !== "Segmentos")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                    isActive(item.href)
                      ? "bg-accent-50 text-accent-700"
                      : "text-ink-900/80 hover:bg-ink-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

            <div className="pt-2">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-ink-900/45">
                Segmentos
              </p>
              {segmentos.map((seg) => {
                const Icon = seg.icon;
                return (
                  <Link
                    key={seg.slug}
                    href={`/segmentos/${seg.slug}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base text-ink-900/80 hover:bg-ink-50"
                  >
                    <Icon className="h-5 w-5 text-accent-600" aria-hidden="true" />
                    {seg.nome}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3">
              <Button href="/contato" className="w-full" size="lg">
                Fale com a gente
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

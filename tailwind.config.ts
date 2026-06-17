import type { Config } from "tailwindcss";

/**
 * Design system tokens — Evoluke.
 * Paleta "Azul corporativo & Verde": primária azul (#1E3A8A),
 * acento/CTA verde (#10B981), neutros frios.
 * Centralizado aqui para manter o CSS consistente e tematizável.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primária — azul corporativo
        brand: {
          50: "#eff4ff",
          100: "#dbe6fe",
          200: "#bfd3fe",
          300: "#93b4fd",
          400: "#608cfa",
          500: "#3b66f5",
          600: "#2447ea",
          700: "#1c34d7",
          800: "#1e3a8a", // base
          900: "#1e336e",
          950: "#172145",
        },
        // Acento / CTA — verde
        accent: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981", // base
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        // Neutros frios
        ink: {
          DEFAULT: "#0f172a",
          muted: "#64748b",
          subtle: "#94a3b8",
        },
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f8fafc",
          muted: "#f1f5f9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Escala fluida para títulos de impacto
        "fluid-h1": ["clamp(2rem, 6vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "fluid-h2": ["clamp(1.5rem, 4vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "fluid-h3": ["clamp(1.125rem, 2.5vw, 1.5rem)", { lineHeight: "1.25" }],
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)",
        card: "0 4px 16px rgba(15, 23, 42, 0.08)",
        lift: "0 12px 32px rgba(15, 23, 42, 0.12)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

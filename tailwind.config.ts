import type { Config } from "tailwindcss";

/**
 * Paleta da Evoluke
 * -----------------
 * ink      -> fundos escuros (hero, footer). Base "tinta" azul-marinho profundo.
 * accent   -> violeta-elétrico, cor de marca / CTAs.
 * accent2  -> azul-elétrico, usado em gradientes e detalhes secundários.
 * surface  -> tons claros de superfície para seções em tema claro.
 *
 * A paleta está documentada no README.md.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0E1A",
          50: "#F4F5F8",
          100: "#E5E7EF",
          800: "#10162A",
          900: "#0A0E1A",
          950: "#05070F",
        },
        accent: {
          DEFAULT: "#7C5CFC",
          50: "#F1EEFE",
          100: "#E3DDFE",
          200: "#C7BBFC",
          300: "#AB99FB",
          400: "#8F77F9",
          500: "#7C5CFC",
          600: "#5E3BE6",
          700: "#4A2BC4",
          800: "#3A2299",
          900: "#2C1A73",
        },
        accent2: {
          DEFAULT: "#22D3EE",
          400: "#38BDF8",
          500: "#22D3EE",
          600: "#0EA5E9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,92,252,0.25), 0 18px 60px -20px rgba(124,92,252,0.45)",
        card: "0 1px 2px rgba(10,14,26,0.04), 0 12px 32px -16px rgba(10,14,26,0.12)",
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
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

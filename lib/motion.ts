import type { Variants } from "framer-motion";

/**
 * Variants reutilizáveis para microanimações de entrada.
 * O respeito a `prefers-reduced-motion` é tratado no componente cliente
 * (ver components/Reveal.tsx), que desativa o deslocamento quando o usuário
 * prefere menos movimento.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

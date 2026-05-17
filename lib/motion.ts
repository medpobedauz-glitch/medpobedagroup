export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.72, ease: easeOutExpo },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easeOutExpo },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.62, ease: easeOutExpo },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: easeOutExpo,
    },
  },
};

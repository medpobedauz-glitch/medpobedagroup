import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          50: "hsl(var(--brand-50))",
          100: "hsl(var(--brand-100))",
          200: "hsl(var(--brand-200))",
          300: "hsl(var(--brand-300))",
          400: "hsl(var(--brand-400))",
          500: "hsl(var(--brand-500))",
          600: "hsl(var(--brand-600))",
          700: "hsl(var(--brand-700))",
          800: "hsl(var(--brand-800))",
          900: "hsl(var(--brand-900))",
        },
        ink: {
          100: "hsl(var(--ink-100))",
          200: "hsl(var(--ink-200))",
          300: "hsl(var(--ink-300))",
          400: "hsl(var(--ink-400))",
          500: "hsl(var(--ink-500))",
          600: "hsl(var(--ink-600))",
          700: "hsl(var(--ink-700))",
          800: "hsl(var(--ink-800))",
        },
      },
      borderRadius: {
        xl: "var(--radius)",
        lg: "calc(var(--radius) - 2px)",
        md: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(56, 189, 248, 0.14)",
        soft: "0 12px 40px rgba(15, 23, 42, 0.1)",
        premium: "0 25px 80px rgba(15, 23, 42, 0.14)",
        panel: "0 24px 72px rgba(15, 23, 42, 0.12)",
        halo: "0 30px 100px rgba(56, 189, 248, 0.16)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at top left, rgba(56, 189, 248, 0.24), transparent 28%), radial-gradient(circle at top right, rgba(29, 78, 216, 0.18), transparent 24%), linear-gradient(160deg, rgba(255,255,255,0.98), rgba(248,251,255,0.96) 52%, rgba(231,244,255,0.94))",
        "grid-fade":
          "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
        "brand-gradient":
          "linear-gradient(135deg, rgba(7,27,58,1) 0%, rgba(29,78,216,0.97) 52%, rgba(56,189,248,0.92) 100%)",
        "surface-gradient":
          "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(241,247,255,0.94))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.48", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.04)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
        shine: {
          "0%": { transform: "translateX(-130%)" },
          "100%": { transform: "translateX(130%)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "gradient-shift": "gradient-shift 12s ease infinite",
        "pulse-soft": "pulse-soft 3.8s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        shine: "shine 1.3s ease",
      },
    },
  },
  plugins: [animate],
};

export default config;

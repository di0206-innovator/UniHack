import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        sidebar: {
          DEFAULT: "var(--sidebar-bg)",
          border: "var(--sidebar-border)",
          active: "var(--sidebar-active)",
        },
        forge: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0284c7",
          600: "#0369a1",
          700: "#075985",
          800: "#0c4a6e",
          900: "#0a3754",
          950: "#031c2e",
        },
      },
      boxShadow: {
        'neu-flat': '6px 6px 14px #05070d, -5px -5px 12px #151e33, inset 1px 1px 0px rgba(255, 255, 255, 0.05)',
        'neu-sunken': 'inset 4px 4px 8px #04060a, inset -4px -4px 8px #101726',
        'neu-btn': '4px 4px 10px #04060c, -4px -4px 10px #162138, inset 1px 1px 0px rgba(255, 255, 255, 0.08)',
        'neu-btn-hover': '6px 6px 14px #04060c, -6px -6px 14px #1a2742, inset 1px 1px 0px rgba(255, 255, 255, 0.12)',
        'neu-pressed': 'inset 3px 3px 6px #04060b, inset -3px -3px 6px #121b2d',
      }
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clinical Trust Palette
        background: "#F5F5F7", // Off-white paper
        foreground: "#1A1A1A", // Near black
        primary: {
          DEFAULT: "#0A192F", // Deep Navy (Authority)
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#009688", // Surgical Teal (Safety)
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#D32F2F", // Signal Red (Danger/Violation)
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#E0E0E0",
          foreground: "#757575",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
      },
      fontFamily: {
        // We will configure these in layout.tsx via next/font
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

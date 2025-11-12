import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/ui/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6D00",
        background: "#0D0D0D",
        surface: "#111111",
        muted: "#1a1a1a",
        border: "#1f1f1f",
        foreground: "#FFFFFF",
      },
      fontFamily: {
        heading: ["Sora", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        soft: "0 12px 50px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [typography],
};

export default config;

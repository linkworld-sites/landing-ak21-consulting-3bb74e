import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ground: "#0A0F2C",
          surface: "#1C2E6B",
          amber: "#F5A623",
          white: "#E8EDF7",
          cyan: "#2AFFC8",
          text: "#8A8D99",
          "surface-dark": "#0D1635",
          "surface-card": "#111828",
          light: "#E8EDF7",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(60px,8vw,120px)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(48px,6vw,96px)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(36px,4.5vw,72px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(28px,3.5vw,48px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

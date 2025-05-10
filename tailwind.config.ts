import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#9333ea",
        soft: "#1f1f1f",
        light: "#ffffff",
      },
      boxShadow: {
        glow: "0 0 12px rgba(147, 51, 234, 0.6)",
        soft: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
};

export default config;
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202a",
        muted: "#667085",
        line: "#e4e7ec",
        surface: "#f7f8fa",
        brand: "#2563eb"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(15, 23, 42, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;

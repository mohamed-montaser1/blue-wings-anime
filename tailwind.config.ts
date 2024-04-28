import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px",
      },
      colors: {
        page: "#272A38",
        card: "#303343",
        "sub-card": "#393C4C",
        primary: "#18B2FF",
        secondary: "#9128FF",
      },
    },
  },
};

export default config;

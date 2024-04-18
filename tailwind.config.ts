import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
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
        "main-color": "#9128FF",
        "secondary-color": "#4264FF",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "flower-appear": {
          "0%": { opacity: "0", transform: "translateY(0) scale(0.5)" },
          "50%": { opacity: "1", transform: "translateY(-20px) scale(1.2)" },
          "100%": { opacity: "0", transform: "translateY(-40px) scale(0.5)" },
        },
      },
      animation: {
        flower: "flower-appear 5s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;

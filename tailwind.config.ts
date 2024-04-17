import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#05AAFE",
          sub: "#F4FBFF",
          secondary: "#FBFEFF",
          border: "#9ADDFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;

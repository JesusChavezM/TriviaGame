import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      'mulberry': {
        '50': '#fdf6fd',
        '100': '#faedf9',
        '200': '#f4daf0',
        '300': '#eabde2',
        '400': '#dd95cf',
        '500': '#ca6bb7',
        '600': '#b2509c',
        '700': '#8f3c7b',
        '800': '#753364',
        '900': '#612e53',
        '950': '#3e1433',
      },
    },
  },
  plugins: [],
};
export default config;

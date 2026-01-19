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
          50: '#fef5e7',
          100: '#fde8c3',
          200: '#fbd89b',
          300: '#f9c773',
          400: '#f7ba55',
          500: '#f5ad37',  // Main orange from logo
          600: '#f39c31',
          700: '#f18829',
          800: '#ef7521',
          900: '#ec5a13',
        },
        secondary: {
          50: '#e3f5ff',
          100: '#b8e6ff',
          200: '#89d6ff',
          300: '#5ac5ff',
          400: '#36b8ff',
          500: '#12abff',  // Blue from logo
          600: '#109eff',
          700: '#0d8aff',
          800: '#0a77ff',
          900: '#0556ff',
        },
      },
    },
  },
  plugins: [],
};
export default config;
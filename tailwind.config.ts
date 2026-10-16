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
        cream: {
          50: '#FAF6F0',   // Warm Vanilla Cream background
          100: '#F5EFE6',
        },
        espresso: {
          900: '#2C1A1D',  // Primary Text & Dark Headers
          800: '#422A2E',
        },
        rose: {
          100: '#F4E3D7',  // Card background
          200: '#E8C5C8',  // Soft Accent Pink
          300: '#E6D0CC',  // Soft Borders
        },
        terracotta: {
          500: '#D97757',  // Buttons & Highlights
          600: '#B85B35',  // Hover state
        }
      },
    },
  },
  plugins: [],
};

export default config;
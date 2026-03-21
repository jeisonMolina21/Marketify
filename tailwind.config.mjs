/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#008a3e', // Logo Green
          dark: '#006d31',
        },
        secondary: '#ff9800', // Logo Orange
        danger: '#dc3545',
      },
    },
  },
  plugins: [],
};

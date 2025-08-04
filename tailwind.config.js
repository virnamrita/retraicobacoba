/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#19b9ab',
        accent: '#9eff6e',
        background: '#ffffff',
        foreground: '#000000',
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        base: {
          light: '#f9fafb',
          dark: '#121212',
        },
        text: {
          light: '#1f2937',
          dark: '#e5e7eb',
        }
      }
    }
  },
  plugins: []
}



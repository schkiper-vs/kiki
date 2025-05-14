/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Обрабатываем все JS/TS/JSX/TSX-файлы в src/
  ],
  theme: {
    extend: {}, // Можно добавить кастомные цвета, шрифты и т.д.
  },
  plugins: [], // Плагины (позже)
}
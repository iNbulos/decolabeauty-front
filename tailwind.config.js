/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}", // Incluir arquivos na raiz como App.jsx, Sidebar.jsx, etc.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

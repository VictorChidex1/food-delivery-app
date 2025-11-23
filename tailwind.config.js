/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5200', // Uber Eats orange
        secondary: '#f3f4f6',
      }
    },
  },
  plugins: [],
}
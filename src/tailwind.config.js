/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
        'freight': ['Freight Big Pro', 'serif'],
        'script': ['Dancing Script', 'cursive']
      },
      colors: {
        // Italian flag colors will be handled by CSS variables
        // This extends the default Tailwind palette
        italian: {
          green: 'var(--italian-green)',
          red: 'var(--italian-red)',
          white: 'var(--italian-white)'
        }
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite'
      }
    },
  },
  plugins: [],
}
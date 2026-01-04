/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4D4D",
        secondary: "#c813ec",
        "background-dark": "#0B0F1E",
        "surface-dark": "#141A3A",
        "text-muted": "#A1A1AA",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-short': 'bounce-short 1s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        'bounce-short': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
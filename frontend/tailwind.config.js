/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        "matte-black": "#09090B",
        "matte-card": "#121215",
        "matte-border": "#27272A",
        "warm-white": "#FAFAFA",
        "warm-gray": "#A1A1AA",
        "brand-blue": "#2563EB",
        "brand-blue-dark": "#1E3A8A",
        "brand-red": "#E11D48",
        "brand-red-dark": "#9F1239",
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
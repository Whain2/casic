/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shake': 'shake 0.5s ease-in-out',
        'pulse-glow': 'pulse-glow 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

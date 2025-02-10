/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        toast: 'toast 5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'rotate-pulse': 'rotatePulse 10s ease-in-out infinite',
        'rotate-reverse-pulse': 'rotateReversePulse 10s ease-in-out infinite',
      },
      keyframes: {
        rotatePulse: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(1)' },
          '75%': { transform: 'rotate(270deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        rotateReversePulse: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(-90deg) scale(1.1)' },
          '50%': { transform: 'rotate(-180deg) scale(1)' },
          '75%': { transform: 'rotate(-270deg) scale(1.1)' },
          '100%': { transform: 'rotate(-360deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

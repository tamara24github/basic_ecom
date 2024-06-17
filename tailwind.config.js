/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        toast: 'toast 5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        toast: {
          '0%, 100%': {
            transform: 'translateY(calc(-100% - 24px))',
            opacity: 0,
          },
          '10%, 90%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

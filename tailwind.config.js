/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out',
        'fadeInUp': 'fadeInUp 1s ease-out',
        'bounce': 'bounce 2s infinite',
        'vehicle-move': 'vehicle-move 3s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'vehicle-move': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(8rem)' }
        }
      }
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: '#253b74',
        secondary: '#91be3f',
        tertiary: '#1b75bc',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'gradient-x': 'gradient-x 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '200% 50%' },
          '50%': { 'background-position': '0% 50%' },
        },
      },
    },
  },
  plugins: [
    lineClamp, // Use the imported plugin here
  ],
};
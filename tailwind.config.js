/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px', // Custom breakpoint for 375px and above
      },
      colors: {
        // Primary Brand Colors
        'navy': {
          DEFAULT: '#003566',
          light: '#001d3d',
          dark: '#000814',
        },
        // Accent Colors (Golden Yellow)
        'accent': {
          DEFAULT: '#ffc300',
          light: '#ffd60a',
          dark: '#e6af00',
        },
        // Legacy support for existing components
        'green': {
          DEFAULT: '#ffc300', // Maps to accent
          light: '#ffd60a',   // Maps to accent-light
          dark: '#e6af00',    // Maps to accent-dark
        },
        // Background and neutral colors
        background: '#ffffff',
        foreground: '#000814',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'modal-in': 'modal-in 0.3s ease-out',
        'backdrop-in': 'modal-backdrop-in 0.3s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'modal-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        'modal-backdrop-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        'fallback': 'blur(8px)',
      }
    },
  },
  plugins: [],
}

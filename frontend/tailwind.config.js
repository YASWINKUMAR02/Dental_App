/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    borderRadius: {
      'none': '0',
      'xs': '4px',
      'sm': '6px',
      DEFAULT: '8px',
      'md': '10px', // Input fields (10px)
      'lg': '12px', // Buttons (12px)
      'xl': '14px', // Floating badges (14px)
      '2xl': '20px', // Cards (20px)
      '3xl': '24px',
      'full': '9999px', // For logos/circles
    },
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc4fa',
          400: '#38a3f6',
          500: '#0e86e1',
          600: '#0269bc',
          700: '#035398',
          800: '#07477b',
          900: '#0a3c66',
        },
        sky: {
          50: '#f8fafc',
          100: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 24px rgba(14, 134, 225, 0.08), 0 0 1px rgba(0, 0, 0, 0.15)',
        'hero': '0 20px 40px rgba(14, 134, 225, 0.06)',
      },
    },
  },
  plugins: [],
};

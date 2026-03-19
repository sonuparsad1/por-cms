/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coffee: {
          900: '#0A0908',
          800: '#1A1614',
          700: '#3A2E26',
          600: '#5C4B3F',
          500: '#8B5E34',
          400: '#D4A373',
          300: '#E9EDC9',
          200: '#F5F2EB',
          100: '#FAFAFA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

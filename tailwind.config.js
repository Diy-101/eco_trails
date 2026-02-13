/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#ff8c42',
          'orange-light': '#ffb84d',
          'orange-dark': '#ff7040',
        },
        green: {
          dark: '#4D5C47',
          medium: '#596652',
          light: '#6C7965',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

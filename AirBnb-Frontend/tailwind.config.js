/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D'
      }
    },
    screens: {
      'xs': '480px',
      'md': '640px',
      'lg': '900px',
      'xl': '1200px'
    }
  },
  plugins: [],
}


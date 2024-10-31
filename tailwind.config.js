/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#2b9962',
      'primary-hover': '#00FF7F',
      secondary: '#ecc94b',
      white: '#161616',
      black: '#fff',
      grey: '#374151',
      red: '#b91c1c'
    },
    screens: {
      'phone': '320px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {},
  },
  plugins: [],
}


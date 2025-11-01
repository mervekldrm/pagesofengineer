/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './pages-of-engineer/**/*.{js,jsx,ts,tsx,html,astro}'
  ],
  theme: {
    extend: {
      colors: {
        cinnamon: '#D97706',
        skyblue: '#0EA5E9',
        peachAccent: '#FFB6A1',
        navyDark: '#0f172a',
        lilacSoft: '#F3E8FF',
        background: '#F8FAFC'
      }
    },
  },
  plugins: [],
};

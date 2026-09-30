/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./*.html', './main.js'],
  theme: {
    extend: {
      colors: {
        darkBg: '#050811',
        cardBg: 'rgba(255, 255, 255, 0.03)',
        cardBorder: 'rgba(255, 255, 255, 0.08)',
        accentBlue: '#0066ff',
        accentCyan: '#00d2ff',
      },
    },
  },
};

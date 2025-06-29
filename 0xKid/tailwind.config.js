// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'gf-title': ['"Creepster"', 'cursive'],
        'gf-heading': ['"Special Elite"', 'cursive'],
        'gf-body': ['"VT323"', 'monospace'],
        'gf-cipher': ['"CryptOfTomorrow"', 'monospace'],
      },
      colors: {
        'gf-dark-blue': '#0b1a2f',
        'gf-deep-blue': '#142a4e',
        'gf-mystery-blue': '#1d3a6b',
        'gf-amber': '#ff9e00',
        'gf-gold': '#ffc600',
        'gf-red': '#ff3d3d',
        'gf-purple': '#8a2be2',
        'gf-green': '#00a86b',
        'gf-pine': '#01796f',
        'gf-pink': '#ff69b4',
        'gf-brown': '#8b4513',
      },
      backgroundImage: {
        'gf-radial': 'radial-gradient(circle at 20% 30%, #1d3a6b 0%, transparent 25%), radial-gradient(circle at 80% 70%, #8a2be2 0%, transparent 25%)',
        'journal-page': 'linear-gradient(to bottom, rgba(139, 69, 19, 0.8), rgba(210, 180, 140, 0.5))',
      },
      textShadow: {
        'gf-title': '0 0 5px #ffc600, 0 0 10px #ff3d3d, 0 0 20px #8a2be2',
        'gf-sign': '3px 3px 0 #8b4513, 6px 6px 0 #ffc600',
      },
      animation: {
        'flicker': 'flicker 3s infinite',
        'pulse-slow': 'pulse 2s infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 22%, 24%, 55%': { opacity: '0.5' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.7' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    function({ addUtilities }) {
      const newUtilities = {
        '.journal-border': {
          border: '8px double #ffc600',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10px',
            left: '10px',
            right: '10px',
            bottom: '10px',
            border: '1px solid rgba(255, 198, 0, 0.3)',
            'pointer-events': 'none',
          },
        },
        '.cipher-text': {
          'font-family': '"CryptOfTomorrow", monospace',
          color: '#8a2be2',
          'background-color': 'rgba(0, 0, 0, 0.3)',
          padding: '0.5rem',
          'border-radius': '4px',
          'border-left': '3px solid #ff9e00',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        system: ['Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', 'Geneva', 'Verdana', 'sans-serif'],
      },
      colors: {
        aqua: {
          blue: '#0A7AFF',
          'blue-light': '#5A9EFF',
          graphite: '#8E8E93',
          silver: '#E3E3E8',
          'window-bg': '#ECECEC',
        },
      },
      backgroundImage: {
        'aqua-titlebar': 'linear-gradient(180deg, #D4D4D4 0%, #BEBEBE 100%)',
        'aqua-menubar': 'linear-gradient(180deg, #D0D0D0 0%, #A0A0A0 100%)',
        'aqua-button': 'linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 100%)',
        'aqua-button-active': 'linear-gradient(180deg, #5A9EFF 0%, #0A7AFF 100%)',
      },
      boxShadow: {
        'aqua-window': '0 10px 40px rgba(0, 0, 0, 0.3)',
        'aqua-dock': '0 5px 20px rgba(0, 0, 0, 0.2)',
        'aqua-inset': 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'aqua': '20px',
      },
    },
  },
  plugins: [],
} satisfies Config

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    screens: {
      mobile: '501px',
      desktop: '801px'
    },

    fontFamily: {
      sans: ['GmarketSans']
    },
    letterSpacing: {
      maxtight: '-0.1rem',
      maxtighter: '-0.15rem'
    },

    extend: {
      animation: {
        typing: 'typing 2s  forwards',
        fadeIn: 'fadeIn 0.5s  forwards'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        typing: {
          from: { width: 0 },
          to: { width: '100%' }
        }
      },
      rotate: {
        135: '135deg',
        225: '225deg'
      },
      borderWidth: {
        DEFAULT: '1px'
      },
      zIndex: {
        15: '15',
        20: '20',
        25: '25',
        35: '35',
        45: '45',
        55: '55',
        100: '100'
      },
      gridTemplateColumns: {
        4: 'repeat(4, auto)',
        footer: '200px minmax(900px, 1fr) 100px'
      }
    }
  },
  plugins: []
}

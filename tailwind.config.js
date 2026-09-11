/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        njal: {
          bg: '#060608',
          dark: '#0C0C10',
          card: '#121217',
          cardHover: '#181820',
          border: '#23232C',
          borderLight: '#32323E',
          red: '#FF0B3A',
          redDeep: '#C90025',
          redBright: '#FF2A54',
          redGlow: 'rgba(255, 11, 58, 0.4)',
          redSubtle: 'rgba(255, 11, 58, 0.12)',
          silver: '#E5E7EB',
          gray: '#9CA3AF',
          muted: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Chakra Petch"', '"Rajdhani"', 'sans-serif'],
        heading: ['"Teko"', '"Chakra Petch"', 'sans-serif']
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'marquee-fast': 'marquee 12s linear infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out infinite 2s',
        'scanline': 'scanline 8s linear infinite'
      }
    },
  },
  plugins: [],
}

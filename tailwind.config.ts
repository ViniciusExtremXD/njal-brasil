import type { Config } from 'tailwindcss';

/**
 * Sistema de design NJAL — extraído das peças reais da marca:
 * preto absoluto de estúdio, vermelho de sangue arterial e osso quente.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#050506',
        carbon: '#0A0A0C',
        graphite: '#101014',
        steel: '#17171D',
        iron: '#22222A',
        ash: '#7B7B86',
        smoke: '#B4B4BE',
        bone: '#F2F0EC',
        blood: '#E8123F',
        ember: '#FF2D55',
        rust: '#9B0025',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        brutal: '-0.05em',
        tactical: '0.32em',
      },
      transitionTimingFunction: {
        brutal: 'cubic-bezier(0.16, 1, 0.3, 1)',
        snap: 'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41%': { opacity: '1' },
          '42%': { opacity: '0.35' },
          '43%': { opacity: '1' },
          '77%': { opacity: '1' },
          '78%': { opacity: '0.6' },
          '79%': { opacity: '1' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        drift: 'drift 40s linear infinite',
        'drift-fast': 'drift 22s linear infinite',
        flicker: 'flicker 6s linear infinite',
        breathe: 'breathe 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

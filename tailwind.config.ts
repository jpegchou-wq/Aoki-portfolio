import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'AlibabaPuHuiTi', 'Noto Sans SC', 'sans-serif'],
        display: ['var(--font-syne)', 'var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        neon: '#0030e0',
        brand: {
          light: '#ffffff',
          dark: '#171717',
          grey: '#f5f5f7',
        },
      },
      backgroundImage: {
        'noise': "url('/images/noise.png')",
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

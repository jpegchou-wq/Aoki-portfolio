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
        sans: ['Poppins', 'AlibabaPuHuiTi', 'Noto Sans SC', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#f8f9fa',
          dark: '#1a1a1a',
          purple: '#d8b4fe',
          "purple-dark": '#a855f7',
        },
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'vision-gradient': 'linear-gradient(to bottom, #f3f4f6, #ffffff, #f3e8ff)',
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

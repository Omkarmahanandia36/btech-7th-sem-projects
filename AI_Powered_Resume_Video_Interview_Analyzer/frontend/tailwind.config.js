/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F3FF',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#7C5CFC',
          hover: '#6845f5',
          light: '#ECE6FF',
          dark: '#5836d9'
        },
        secondary: {
          DEFAULT: '#9EE6CF',
          light: '#E2F9F2',
          dark: '#55B88A'
        },
        accent: {
          DEFAULT: '#FFB86B',
          light: '#FFF0DE',
          dark: '#E0923E'
        },
        clayText: '#252238',
        muted: '#77728B',
        success: '#55B88A',
        warning: '#F2A65A',
        danger: '#E86A92'
      },
      borderRadius: {
        'clay-card': '28px',
        'clay-btn': '18px',
        'clay-input': '16px',
        'clay-badge': '999px',
      },
      boxShadow: {
        'clay-card': '0 16px 36px -8px rgba(124, 92, 252, 0.10), 0 4px 12px rgba(0, 0, 0, 0.03), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -3px 6px rgba(124, 92, 252, 0.05)',
        'clay-card-hover': '0 22px 44px -8px rgba(124, 92, 252, 0.16), 0 6px 16px rgba(0, 0, 0, 0.04), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -3px 6px rgba(124, 92, 252, 0.08)',
        'clay-btn': '0 10px 24px -4px rgba(124, 92, 252, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -3px 4px rgba(0, 0, 0, 0.15)',
        'clay-btn-secondary': '0 10px 24px -4px rgba(158, 230, 207, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.6), inset 0 -3px 4px rgba(85, 184, 138, 0.2)',
        'clay-btn-accent': '0 10px 24px -4px rgba(255, 184, 107, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.6), inset 0 -3px 4px rgba(224, 146, 62, 0.25)',
        'clay-btn-white': '0 8px 20px -4px rgba(124, 92, 252, 0.08), 0 2px 6px rgba(0,0,0,0.03), inset 0 2px 3px rgba(255, 255, 255, 1), inset 0 -2px 4px rgba(124, 92, 252, 0.05)',
        'clay-inset': 'inset 0 3px 8px rgba(124, 92, 252, 0.08), inset 0 1px 3px rgba(0, 0, 0, 0.05)',
        'clay-score': '0 20px 40px -10px rgba(124, 92, 252, 0.25), inset 0 4px 8px rgba(255, 255, 255, 0.8), inset 0 -4px 8px rgba(88, 54, 217, 0.1)'
      }
    },
  },
  plugins: [],
}

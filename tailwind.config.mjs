/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F5FA',
          100: '#E1EBF5',
          200: '#B8CEE5',
          300: '#8FB1D5',
          400: '#5287BF',
          500: '#1A5BA2',
          600: '#134780',
          700: '#133C55', // Slate Secondary
          800: '#0E2E4B',
          900: '#0B2545', // Heritage Navy Primary
          950: '#061528',
        },
        gold: {
          50: '#FAF7EE',
          100: '#F5EED5',
          200: '#EBDDA8',
          300: '#E0CB7A',
          400: '#D5B749',
          500: '#C59B27', // Accent Warm Gold / Bronze
          600: '#B0881F',
          700: '#8F6E17',
          800: '#6E5410',
          900: '#4D3A0A',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#E2E8F0',
          400: '#CBD5E1',
          500: '#94A3B8',
          600: '#64748B',
          700: '#475569',
          800: '#334155',
          900: '#1E293B',
          950: '#0F172A',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(11, 37, 69, 0.08), 0 2px 6px -1px rgba(11, 37, 69, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(11, 37, 69, 0.15), 0 4px 10px -2px rgba(11, 37, 69, 0.06)',
        'gold-glow': '0 0 25px -3px rgba(197, 155, 39, 0.35)',
      },
    },
  },
  plugins: [],
};

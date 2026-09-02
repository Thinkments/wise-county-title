/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Wise County Title Authentic Brand Palette (Burgundy / Wine / Maroon)
        burgundy: {
          50: '#FDF8F8',
          100: '#F8EEEE',
          200: '#ECCDD0',
          300: '#DDA4AA',
          400: '#BA6571',
          500: '#963847',
          600: '#842F38', // Wise County Accent
          700: '#6E222E',
          800: '#602430', // Official Wise County Title Primary Burgundy (#602430 / #612430)
          900: '#481620',
          950: '#2A0B12',
        },
        // Legacy navy alias mapped to deep burgundy / midnight tones
        navy: {
          50: '#FDF8F8',
          100: '#F8EEEE',
          200: '#ECCDD0',
          300: '#DDA4AA',
          400: '#BA6571',
          500: '#842F38',
          600: '#732530',
          700: '#6E222E',
          800: '#602430',
          900: '#481620', // Primary Dark Heritage
          950: '#2A0B12', // Deep Hero Dark
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
          DEFAULT: '#FAF8F8',
          50: '#FFFFFF',
          100: '#FAF8F8',
          200: '#F3EEEE',
          300: '#E6DCDC',
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
        serif: ['"Playfair Display"', 'Georgia', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(96, 36, 48, 0.08), 0 2px 6px -1px rgba(96, 36, 48, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(96, 36, 48, 0.15), 0 4px 10px -2px rgba(96, 36, 48, 0.06)',
        'gold-glow': '0 0 25px -3px rgba(197, 155, 39, 0.35)',
        'burgundy-glow': '0 0 25px -3px rgba(96, 36, 48, 0.35)',
      },
    },
  },
  plugins: [],
};

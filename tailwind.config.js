/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './constants/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    // Replaces Tailwind's default palette entirely. This is deliberate:
    // `bg-white` / `text-black` stop resolving, so pure black and pure
    // white are impossible to reach by accident.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',

      void: '#06080F',
      surface: '#0A0F1E',
      elevated: '#111827',
      hover: '#1A2332',
      border: '#1E293B',

      'text-primary': '#F1F5F9',
      'text-secondary': '#94A3B8',
      'text-tertiary': '#64748B',
      'text-muted': '#475569',

      accent: '#3B82F6',
      'accent-glow': '#60A5FA',
      'accent-dim': '#1E3A5F',

      'cat-food': '#F59E0B',
      'cat-bills': '#3B82F6',
      'cat-transport': '#06B6D4',
      'cat-shopping': '#EC4899',
      'cat-entertainment': '#A855F7',
      'cat-health': '#14B8A6',
      'cat-education': '#8B5CF6',
      'cat-savings': '#22C55E',
      'cat-subscriptions': '#F97316',
      'cat-gifts': '#6366F1',
      'cat-coffee': '#D97706',

      success: '#22C55E',
      warning: '#F59E0B',
      danger: '#EF4444',
      streak: '#F97316',
    },
    extend: {
      fontFamily: {
        mono: ['SpaceMono'],
      },
    },
  },
  plugins: [],
};
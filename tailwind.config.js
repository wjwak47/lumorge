/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        darkBg: 'var(--color-dark-bg)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      container: {
        center: true,
        padding: 'var(--gutter-width)',
        screens: {
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': 'var(--container-max-width)',
        },
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    // This enables the use of `focus-visible` utilities
    // See: https://tailwindcss.com/docs/upcoming-changes#remove-deprecated-gap-utilities
    // This is a placeholder, the actual flag might differ. The goal is to enable focus-visible.
    hoverOnlyWhenSupported: true,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      ringColor: {
        DEFAULT: '#5AF4FF', // cyan-300
      },
      ringOffsetColor: {
        DEFAULT: '#03050d', // slate-950
      },
    },
  },
  plugins: [],
};

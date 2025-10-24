/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./design/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        holoCyan: "#5AF4FF",
        deepMagenta: "#FF57F6",
        signalAmber: "#F7C274",
        abyss: "#03050D",
        midnight: "#0B1026"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(90, 244, 255, 0.45)"
      }
    }
  },
  plugins: []
};

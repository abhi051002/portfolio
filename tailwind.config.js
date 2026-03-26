/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#7c3aed",
        secondary: "#a855f7",
        accent: "#06b6d4",
        dark: {
          950: "#030712",
          900: "#0a0a1a",
          800: "#0f0f23",
          700: "#1a1a35",
        },
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
        "fade-in-up": "fade-in-up 0.6s ease forwards",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", "box-shadow": "0 0 0 0 rgba(124, 58, 237, 0.7)" },
          "70%": { transform: "scale(1)", "box-shadow": "0 0 0 20px rgba(124, 58, 237, 0)" },
          "100%": { transform: "scale(0.95)", "box-shadow": "0 0 0 0 rgba(124, 58, 237, 0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

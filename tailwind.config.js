/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", "Inter", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#7c3aed",
          50: "#f5f3ff",
          100: "#ede9fe",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          900: "#4c1d95",
        },
        accent: {
          DEFAULT: "#06b6d4",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        neon: {
          purple: "#a855f7",
          cyan: "#22d3ee",
          pink: "#ec4899",
          green: "#4ade80",
        },
        dark: {
          950: "#03020f",
          900: "#080818",
          800: "#0d0d20",
          700: "#131328",
          600: "#1a1a35",
          500: "#222244",
        },
        glass: {
          DEFAULT: "rgba(255,255,255,0.04)",
          border: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.07)",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-mesh': `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(124,58,237,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 70%, rgba(6,182,212,0.12) 0%, transparent 60%)
        `,
        'card-gradient': 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.05))',
        'neon-gradient': 'linear-gradient(135deg, #7c3aed, #a855f7, #06b6d4)',
        'shimmer-gradient': 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "pulse-ring": "pulse-ring 2.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "spin-reverse": "spin-reverse 12s linear infinite",
        "border-beam": "border-beam 4s linear infinite",
        marquee: "marquee 25s linear infinite",
        "fade-in": "fade-in 0.5s ease forwards",
        "fade-in-up": "fade-in-up 0.6s ease forwards",
        "draw-line": "draw-line 1.5s ease forwards",
        "text-reveal": "text-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        typewriter: "typewriter 3s steps(30) forwards",
        blink: "blink 1s step-end infinite",
        morph: "morph 8s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "gradient-shift": {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          "100%": { "background-position": "0% 0%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(2deg)" },
          "66%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", "box-shadow": "0 0 0 0 rgba(124, 58, 237, 0.5)" },
          "70%": { transform: "scale(1)", "box-shadow": "0 0 0 20px rgba(124, 58, 237, 0)" },
          "100%": { transform: "scale(0.95)", "box-shadow": "0 0 0 0 rgba(124, 58, 237, 0)" },
        },
        "pulse-glow": {
          "0%, 100%": { "box-shadow": "0 0 20px rgba(124,58,237,0.3), 0 0 40px rgba(124,58,237,0.1)" },
          "50%": { "box-shadow": "0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(124,58,237,0.25)" },
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "border-beam": {
          "0%": { "offset-distance": "0%" },
          "100%": { "offset-distance": "100%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { height: "0%", opacity: "0" },
          "100%": { height: "100%", opacity: "1" },
        },
        "text-reveal": {
          "0%": { opacity: "0", transform: "translateY(100%)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        morph: {
          "0%, 100%": { "border-radius": "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%": { "border-radius": "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%": { "border-radius": "50% 50% 30% 70% / 30% 70% 60% 40%" },
          "75%": { "border-radius": "70% 30% 60% 40% / 40% 50% 70% 30%" },
        },
        glow: {
          "0%": { "text-shadow": "0 0 10px rgba(124,58,237,0.5), 0 0 20px rgba(124,58,237,0.25)" },
          "100%": { "text-shadow": "0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.2)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.15)",
        "neon-cyan": "0 0 20px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.15)",
        "neon-sm": "0 0 10px rgba(124,58,237,0.3)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-lg": "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        "card-hover": "0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.15)",
      },
    },
  },
  plugins: [],
};

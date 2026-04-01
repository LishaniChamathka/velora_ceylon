/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        background: "var(--background)",
        "primary-foreground": "var(--primary-foreground)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-up-delay": "fadeUp 0.6s ease-out 0.2s forwards",
        "fade-in-text": "fadeInText 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInText: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        display: ["var(--font-display, system-ui)"],
      },
    },
  },
  plugins: [],
}

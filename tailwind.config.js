/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Brand palette
        navy: {
          DEFAULT: "#0B1F2A",
          50: "#E8EEF2",
          100: "#C5D4DE",
          200: "#9DB7C8",
          300: "#6F96AC",
          400: "#4D7A95",
          500: "#2C5F7E",
          600: "#1A4460",
          700: "#112F47",
          800: "#0B1F2A",
          900: "#060F14",
        },
        accent: {
          DEFAULT: "#E1261C",
          50: "#FDEDED",
          100: "#FAC8C6",
          200: "#F5908C",
          300: "#EF5A54",
          400: "#E8372D",
          500: "#E1261C",
          600: "#B81E15",
          700: "#8E170F",
          800: "#64100A",
          900: "#3A0905",
        },
        brand: {
          white: "#FFFFFF",
          "light-gray": "#F5F5F5",
          "mid-gray": "#E0E0E0",
          "dark-gray": "#6B7280",
        },
        // shadcn/ui token aliases
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-md": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.3" }],
        "display-xs": ["1.5rem", { lineHeight: "1.35" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "soft-sm": "0 1px 3px 0 rgba(11, 31, 42, 0.08), 0 1px 2px 0 rgba(11, 31, 42, 0.04)",
        soft: "0 4px 6px -1px rgba(11, 31, 42, 0.08), 0 2px 4px -1px rgba(11, 31, 42, 0.04)",
        "soft-md": "0 8px 15px -3px rgba(11, 31, 42, 0.10), 0 4px 6px -2px rgba(11, 31, 42, 0.05)",
        "soft-lg": "0 20px 40px -5px rgba(11, 31, 42, 0.12), 0 10px 20px -5px rgba(11, 31, 42, 0.08)",
        "soft-xl": "0 30px 60px -10px rgba(11, 31, 42, 0.16)",
        "accent-glow": "0 0 20px rgba(225, 38, 28, 0.25)",
      },
      transitionTimingFunction: {
        "ease-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        250: "250ms",
        350: "350ms",
        400: "400ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-smooth both",
        "fade-in-left": "fade-in-left 0.4s ease-smooth both",
        "slide-down": "slide-down 0.25s ease-smooth both",
        "scale-in": "scale-in 0.2s ease-smooth both",
        "accordion-down": "accordion-down 0.2s ease-smooth",
        "accordion-up": "accordion-up 0.2s ease-smooth",
      },
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Dark Blue (Brand Color, CTA)
        secondary: "#F59E0B", // Warm Amber (Accents, Highlights)
        background: "#F9FAFB", // Light Gray (Page Background)
        textPrimary: "#111827", // Almost Black (Main Text)
        textSecondary: "#6B7280", // Gray (Subtext, Muted Text)
        success: "#10B981", // Green (Success Messages, Confirmation)
        danger: "#EF4444", // Red (Errors, Warnings)
        warning: "#FBBF24", // Yellow (Alerts, Notifications)
        info: "#3B82F6", // Blue (Information Messages)
      },
    },
  },
  plugins: [],
} satisfies Config;

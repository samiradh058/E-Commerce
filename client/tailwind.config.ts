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
        primary: "#1E40AF", // Dark Blue (Brand Color, CTA Buttons, Links)
        secondary: "#F59E0B", // Warm Amber (Accents, Discounts, Highlights)
        background: "#F9FAFB", // Light Gray (Main Background, Sections)
        textPrimary: "#111827", // Almost Black (Main Text, Headings)
        textSecondary: "#6B7280", // Gray (Subtext, Muted Info, Descriptions)
        success: "#10B981", // Green (Success Messages, Order Confirmations)
        danger: "#EF4444", // Red (Errors, Warnings, Remove Buttons)
        warning: "#FBBF24", // Yellow (Alerts, Low Stock Notifications)
        info: "#3B82F6", // Blue (Information Messages, Help Sections)
        border: "#D1D5DB", // Light Gray (Borders, Dividers)
        cardBg: "#FFFFFF", // White (Card Backgrounds, Modals, Inputs)
        disabled: "#9CA3AF", // Gray (Disabled Buttons, Inputs)
        hoverPrimary: "#1E3A8A", // Darker Blue (Primary Hover)
        hoverSecondary: "#D97706", // Darker Amber (Secondary Hover)
      },
    },
  },
  plugins: [],
} satisfies Config;

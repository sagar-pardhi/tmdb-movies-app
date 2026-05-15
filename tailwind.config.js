/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0B0F1A",
        "bg-secondary": "#141A2A",
        "bg-bottom-navbar": "#0E1322",
        "primary-accent": "#6C5CE7",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0A6B8",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0B0F1A",
        secondary: "#141A2A",
        "bottom-navbar": "#0E1322",
        "primary-accent": "#6C5CE7",
        "primary-text": "#FFFFFF",
        "secondary-text": "#A0A6B8",
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
        medium: ["Inter_500Medium"],
        bold: ["Inter_700Bold"],
      },
    },
  },
  plugins: [],
};

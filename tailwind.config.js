const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("dark", "&:where(.dark, .dark *)"); // ← вот тут
    }),
  ],
};

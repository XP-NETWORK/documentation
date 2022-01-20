module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
        body: ['"Inter"'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

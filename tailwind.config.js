/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./client/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "rpg-blue": "#5B48EE",
      },
    },
  },
  plugins: [],
};

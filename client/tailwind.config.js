/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#16a34a",
          secondary: "#ec4899",
          accent: "#22d3ee",
          neutral: "#20134E",
          "base-100": "#2D1B69",
          info: "#53C0F3",
          success: "#71EAD2",
          warning: "#F3CC30",
          error: "#E24056",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3182CE",
        secondary: "#E3E8EF",
        primarybg: "#FFFFFF",
        "primary-text": "#171923",
        "secondary-text": "#4A5568",
        "tertiary-text": "#565656",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Inter: ["Inter"],
      },
      screens: {
        sm: "500px",
        md: "835px",
        ed: "750px",
      },
    },
  },
  plugins: [],
};

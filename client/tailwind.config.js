/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "475px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    extend: {
      colors: {
        white: 'rgb(255,255,255)',
        lightBlue: '#836868',
        deepBlue: '#1A512E',
        lightGray: 'rgb(52,58,95)',
        veryLightGray: 'rgb(237,237,241)',
        deepGray: 'rgb(237,240,235)',
      }
    },
  },
  plugins: [],
};

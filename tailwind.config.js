/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",

  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    fontFamily: {
      Helvetica: ['"Helvetica Neue"', "serif"],
    },
    extend: {
      colors: {
        basecolor: "#FBAF40",
        primary: "#FFA62F",
        secondary: "#0E181E",
        tertiary: "#353C40",
        quaternary: "#697B86",
        success: "#52C41A",

        info: "#1890FF",
      },
      boxShadow: {
        "inset-custom": "inset 0px -1px 0px 0px rgba(255, 255, 255, 0.16)",
        base: "0px -1px 0px 0px #E4E7E9 inset",
        "text-shadow": "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "shadow-bottom": "rgba(17, 17, 26, 0.1) 0px 1px 0px",
      },
      fontSize: {
        base: "1rem",
        sm: "0.8rem",
        xsm: "0.7rem",
        lg: "1.7rem",
        xlg: "2.1rem",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px",
        md: "820px",
        lg: "1000px",
        xl: "1240px",
        "2xl": "1500px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
    theme: {
      base: false,
    },
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./Screen/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors: {
        background: "#F1E3E3",
        rose: "#DAAEAE",
        red: "#840000",
        red2: "#B60D22",
        lightrose: "#FFBFBF80",
        lightgray: "#868484",
        "bright-red": "#9E0000",
        'gradient-start': '#840000',
        'gradient-end': '#8B2252',
        'yellowlight': '#F4E4CB',
      },
    },
  },
  plugins: [],
};

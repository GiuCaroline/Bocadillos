module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F5E6CA",
        marron: "#4E342E",
        laranja: "#F57C00",
        branco: "#FAFAFA"
      },
      fontFamily: {
        montserrat: ['Montserrat_400Regular'],
        'montserrat-thin': ['Montserrat_100Thin'],
        'montserrat-extralight': ['Montserrat_200ExtraLight'],
        'montserrat-light': ['Montserrat_300Light'],
        'montserrat-medium': ['Montserrat_500Medium'],
        'montserrat-semibold': ['Montserrat_600SemiBold'],
        'montserrat-bold': ['Montserrat_700Bold'],
        'montserrat-extrabold': ['Montserrat_800ExtraBold'],
        'montserrat-black': ['Montserrat_900Black'],
      }
    },
  },
  plugins: [],
}
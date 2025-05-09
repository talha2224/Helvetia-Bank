/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins:"Poppins, sans-serif"
      },
      boxShadow:{
        navShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      },
      colors:{
        blue:"#3D44E3",
        gray:"#898989"
      }
    },
  },
  plugins: [],
}
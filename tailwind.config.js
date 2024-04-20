/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blackColor1":"var(--black)",
        "blackColor2":"var(--black2)",
        "blackColor3":"var(--black3)",
        "blackLighter":"var(--black-lighter)",
        "blackLight":"var(--black-light)",
        "pinkColor":"var(--pink)",
        "orangeColor":"var(--orange)",
      },
      animation: {
        "videoAnimation": "trailorPlay 0.7s ease-in-out",
        "rotation-animation": "rotate 2s linear infinite",
        "dash-animation": "dash 1.5s ease-in-out infinite"
      },
      objectPosition: {
        'center-top': 'center top',
      }
    },
  },
  plugins: [],
}


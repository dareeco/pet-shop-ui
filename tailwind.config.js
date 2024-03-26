/** @type {import('tailwindcss').Config} */
module.exports = {
  //In order to use tailwind you must specify all the paths and suffixes of the files where you will be using
  //Tailwind in the content here
  content: [
    "./src/**/*.{js, jsx, tsx}",
    "public/index.html",
    "./src/*.{js,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

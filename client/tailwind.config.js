import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        gray: "#6c6d70",
        lightGray: "#aaaaaa",
        blue: "#0e73bb",
        cyan: "#2BBEF9",
      },
    },
  },
  plugins: [
    tailwindScrollbar({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
};

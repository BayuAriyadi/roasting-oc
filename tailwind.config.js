// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        pink: "#FBA1B7",
        pinkMuda: "#FFD1DA",
        customForm: "#FFF0F5",
        customButton: "#FFDBAA",
        customButtonHover: "#E6C393",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui")],
}

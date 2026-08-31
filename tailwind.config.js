/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        panel: "#0d1728",
        line: "#1d2b40",
        cyan: "#5ee7ff",
        violet: "#9a7cff",
        green: "#5ee39a"
      },
      boxShadow: {
        glow: "0 0 32px rgba(94,231,255,.08)"
      }
    }
  },
  plugins: []
};
/** @type {import('tailwindcss').Config} */
export default {
  // Configure files where Tailwind CSS should look for classes.
  // This ensures that only used CSS is generated, keeping the bundle size small.
  content: [
    "./index.html", // Your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All JavaScript/TypeScript/JSX/TSX files in src and its subdirectories
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here (e.g., add custom colors, fonts)
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define 'Inter' font family
      },
    },
  },
  plugins: [], // Add any Tailwind plugins here
}

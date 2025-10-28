/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Defining these custom colors within 'extend' allows you to use them like text-purple-500 if you were using Tailwind's default palette, 
        // but since you are defining fixed hex codes, you can use them directly (e.g., bg-purple).
        purple: `#BF5AF2`, 
        yellow: `#FFD60A`,
        blue: `#0A84FF`,
        cyan: `#64D2FF`,
        // Note: 'black' and 'white' are already defined by Tailwind, but redefining them here doesn't hurt.
        black: '#000',
        white: '#fff',
      },
    },
  },
  // Ensure the plugin is installed before restarting your server!
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#FBF7EE',
          200: '#F5ECD3',
          300: '#EEDFB6',
          400: '#DFC27D',
          500: '#C5A059',
          600: '#A8803D',
          700: '#876228',
          800: '#64471B',
          900: '#422D10',
        },
        navy: {
          850: '#0c1626',
          900: '#080E1A',
          950: '#04070D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
};

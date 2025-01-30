/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    typography: {
      DEFAULT: { // this is for prose class
        css: {
          p: {
            fontSize: '1.125em', // key can be in camelCase...
          },
        }
      }
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-archivo)'],
        body: ['var(--font-schibsted-grotesk)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}


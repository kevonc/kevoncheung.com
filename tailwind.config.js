/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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


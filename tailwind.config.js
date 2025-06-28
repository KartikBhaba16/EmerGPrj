/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
  colors: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    border: 'hsl(var(--border))',
    'emerG-primary': 'hsl(var(--primary))',
    'emerG-secondary': 'hsl(var(--secondary))',
        // add other colors as needed...
      },
    },
  },
  plugins: [],
}

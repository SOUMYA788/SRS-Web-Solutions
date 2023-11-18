/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        animation: {
          slideup: 'slideup 1s 1',
        },
        keyframes:{
          slideup: {
            '0%': {
              transform: 'translateY(10%)',
              animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
            },
            '100%': {
              transform: 'translateY(0%)',
              animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
            },
          },
        },
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

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
        keyframes: {
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
    minHeight: {
      0: '0px',
      '48': '12rem',
      full: '100%',
      screen: '100vh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    },
  },
  plugins: [],
}

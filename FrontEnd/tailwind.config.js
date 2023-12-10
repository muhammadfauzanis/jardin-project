/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3EB489',
        secondary: '#D0E7D2',
        bgColorPrimary: '#F6F4EB',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        sm: '390px',
        md: '500px',
        lg: '750px',
        xl: '1900px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

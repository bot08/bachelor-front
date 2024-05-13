const defaultTheme = require('tailwindcss/defaultTheme')

/*
 * @type { import('tailwindcss').Config } 
*/

module.exports = {
  content: ['./index.html', './src/**/*.{vue,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        '18': '4.6rem'
      },
      transitionDuration: { 
        DEFAULT: '175ms',
        '125': '125ms'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

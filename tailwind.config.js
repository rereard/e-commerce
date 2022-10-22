/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        primary: '#222831',
        secondary: '#393E46',
        tertiary: '#00ADB5',
        quaternary: '#EEEEEE'
      },
      scale: {
        '200': '2.00'
      },
      keyframes: {
        fade: {
          '0%': { opacity:0, transform: 'translateY(-40px)' },
          '100%': { opacity:1, transform: 'translateY(0px)' }
        },
        fadeUp: {
          '0%': { opacity:0, transform: 'translateY(40px)' },
          '100%': { opacity:1, transform: 'translateY(0px)' }
        },
        fadeRight: {
          '0%': { opacity:0, transform: 'translatex(-30px)' },
          '100%': { opacity:1, transform: 'translatex(0px)' }
        }
      },
      animation: {
        fade: 'fade 200ms ease-out',
        fadeRight: 'fadeRight 200ms ease-out',
        fadeUp: 'fadeUp 200ms ease-out'
      }
    },
  },
  plugins: [],
}

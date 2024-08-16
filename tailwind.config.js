/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./view/**/*.{html,js}"],

  theme: {
    clipPath: {
      triangular: "polygon(0 0, 0 100%, 60% 51%)",
    },


    extend: {
      keyframes: {
        slideTop: {
          '0%': { transform: 'translateY(25%)' },

        },
        slideDown: {
          '0%': { transform: 'translateY(-25%)' },

        },

        GoUp: {
          '0%,100%': { transform: 'scaleY(3)' },
          '50%': { transform: 'scaleY(0.5)' },

        },
        slideBottom: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100px)' }
        }
      },


    },

    animation: {
      slideTop: 'slideTop 0.5s ',
      slideDown: 'slideDown 0.5s ',
      GoUp1: 'GoUp 0.4s ease-out infinite',
      GoUp2: 'GoUp 0.5s ease-out infinite',
      GoUp3: 'GoUp 0.4s ease-out infinite',
      slideBottom1: 'slideBottom 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      slideBottom2: 'slideBottom 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.1s both',
      slideBottom3: 'slideBottom 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.2s both',
      slideBottom4: 'slideBottom 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.3s both',
      slideBottom5: 'slideBottom 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.4s both',
      slideBottom6: 'slideBottom 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s both',
    },
  },



  plugins: [
    require('tailwind-clip-path'),
  ],
}


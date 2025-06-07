// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  safelist: [
    'h-1',
    'w-1',
    'h-2',
    'w-2',
    'h-3',
    'w-3',
    'h-4',
    'w-4',
    'h-5',
    'w-5',
    'h-6',
    'w-6',
    'h-7',
    'w-7',
    'h-8',
    'w-8',
    'h-9',
    'w-9',
    'h-10',
    'w-10',
    'h-11',
    'w-11',
    'h-12',
    'w-12',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.teal,
        gray: colors.gray,
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      width: {
        100: '28rem', // w-100
        104: '32rem', // w-104
        112: '36rem', // w-112
        120: '40rem', // w-120
        128: '48rem', // w-128
        144: '56rem', // w-144
        160: '64rem', // w-160
        192: '80rem', // w-192
      },
      maxWidth: {
        100: '28rem', // max-w-100
        104: '32rem', // max-w-104
        112: '36rem', // max-w-112
        120: '40rem', // max-w-120
        128: '48rem', // max-w-128
        144: '56rem', // max-w-144
        160: '64rem', // max-w-160
        192: '80rem', // max-w-192
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
      keyframes: {
        'flutter-left': {
          '10%': {
            transform: 'scale(1, 0.9)',
          },
          '20%': {
            transform: 'scale(0.5, 1)',
          },
          '40%': {
            transform: 'scale(0.9, 0.95)',
          },
          '60%': {
            transform: 'scale(0.3, 1)',
          },
          '80%': {
            transform: 'scale(0.9, 0.95)',
          },
          '100%': {
            transform: 'scale(1, 1)',
          },
        },
        'flutter-right': {
          '10%': {
            transform: 'scale(-1, 0.9)',
          },
          '20%': {
            transform: 'scale(-0.5, 1)',
          },
          '40%': {
            transform: 'scale(-0.9, 0.95)',
          },
          '60%': {
            transform: 'scale(-0.3, 1)',
          },
          '80%': {
            transform: 'scale(-0.9, 0.95)',
          },
          '100%': {
            transform: 'scale(-1, 1)',
          },
        },
      },
      animation: {
        'flutter-left': 'flutter-left 430ms ease-in-out',
        'flutter-right': 'flutter-right 500ms ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    ({ addBase, theme }) => {
      addBase({
        'a, button': {
          outlineColor: theme('colors.primary.500'),
          '&:focus-visible': {
            outline: '2px solid',
            borderRadius: theme('borderRadius.DEFAULT'),
            outlineColor: theme('colors.primary.500'),
          },
        },
      })
    },
  ],
}

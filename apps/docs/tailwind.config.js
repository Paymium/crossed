// const path = require('path');
// const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './node_modules/@crossed/demo/src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './node_modules/@crossed/ui/src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './node_modules/@crossed/primitive/src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './theme.config.tsx',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#6FCBFF',
          200: '#0F9FFF',
          300: '#0F79D7',
          400: '#0056B7',
          500: '#003C89',
          600: '#00295E',
          700: '#001C41',
          800: '#00142D',
          900: '#000E1F',
        },
      },
    },
  },
};

const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './node_modules/@crossed/demo/lib/**/*.{js,jsx,ts,tsx,md,mdx}',
    './node_modules/@crossed/ui/lib/**/*.{js,jsx,ts,tsx,md,mdx}',
    './theme.config.tsx',
    // path.join(
    //   path.dirname(require.resolve('@crossed/demo')),
    //   '**/*.{js,jsx,ts,tsx,md,mdx}'
    // ),
    // path.join(path.dirname(require.resolve('@crossed/ui')), '**/*.{js,jsx,ts,tsx,md,mdx}')
  ],
  // safelist: [
  //   {
  //     pattern: /./,
  //   },
  // ],
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
  plugins: [],
};

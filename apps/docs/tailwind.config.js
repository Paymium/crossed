const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './node_modules/@crossed/demo/lib/**/*.{js,jsx,ts,tsx,md,mdx}',
    './node_modules/@crossed/ui/lib/**/*.{js,jsx,ts,tsx,md,mdx}',
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
    extend: {},
  },
  plugins: [],
};

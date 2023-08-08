const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './node_modules/@mergeui/demo/lib/**/*.{js,jsx,ts,tsx,md,mdx}',
    './node_modules/@mergeui/ui/lib/**/*.{js,jsx,ts,tsx,md,mdx}'
    // path.join(
    //   path.dirname(require.resolve('@mergeui/demo')),
    //   '**/*.{js,jsx,ts,tsx,md,mdx}'
    // ),
    // path.join(path.dirname(require.resolve('@mergeui/ui')), '**/*.{js,jsx,ts,tsx,md,mdx}')
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

const {
  default: crossedPlugin,
} = require('@crossed/styled/lib/commonjs/postcss');

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    ...crossedPlugin(),
  },
};

module.exports = config;

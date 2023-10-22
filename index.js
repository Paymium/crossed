const resolveConfig = require('./apps/docs/node_modules/tailwindcss/resolveConfig');
const loadConfig = require('./apps/docs/node_modules/tailwindcss/loadConfig');
const tailwindConfig = require('./apps/docs/tailwind.config.js');

const fullConfig = resolveConfig(tailwindConfig);

console.log(Object.keys(fullConfig.theme))
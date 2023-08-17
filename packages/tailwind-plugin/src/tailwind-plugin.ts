import plugin from 'tailwindcss/plugin';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

export default plugin(function ({ config }) {
  const dir = './.crossed';
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  const { theme } = config();

  const colorsPasrsed = Object.entries(theme.colors).reduce(
    (acc, [color, tColor]) => {
      if (typeof tColor === 'object') {
        acc[color] = {
          'className': [
            `text-${color}-800 border-${color}-800 bg-${color}-700`,
            `dark:text-${color}-500 dark:border-${color}-800 dark:bg-${color}-800`,
          ],
          ':active': {
            className: [`bg-${color}-600`, `dark:bg-${color}-700`],
          },
          ':hover': {
            className: [`bg-${color}-500`, `dark:bg-${color}-600`],
          },
        };
      }
      return acc;
    },
    {}
  );
  writeFileSync(`${dir}/tailwind.theme.json`, JSON.stringify(config()), 'utf8');
  writeFileSync(
    `${dir}/colors.js`,
    `
  module.exports = ${JSON.stringify(colorsPasrsed)}
  `,
    'utf8'
  );
});

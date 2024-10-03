/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import darkTheme from './dark/theme';
import lightTheme from './light/theme';

let themes = {
  dark: darkTheme,
  light: lightTheme,
} as const;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// if (process.env.NEXT_PUBLIC_CUSTOM) {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   themes = require('./custom').themes as typeof themes;
// }
export { themes };

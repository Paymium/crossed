/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

// import { Registry } from '../Registry';
import { Registry } from '../../Registry';
import type { Plugin, StyleSheet } from '../../types';
import { convertKeyToCss, normalizeUnitPixel } from '../utils';
import { ThemeRegistry } from './Registry';
import type { Themes } from './types';

type Theme = <T extends Themes[keyof Themes]>(
  _t: T
) => Omit<StyleSheet, 'theme'>;

export interface CrossedThemePlugin {
  theme?: Theme;
}

const parse = (
  t: Record<string, any>,
  parentName?: string,
  isWeb?: boolean
): {
  theme: Record<string, any>;
  values: Record<string, any>;
} => {
  return !isWeb
    ? { theme: t, values: t }
    : Object.entries(t).reduce<{
        theme: Record<string, any>;
        values: Record<string, any>;
      }>(
        (acc, [key, value]) => {
          if (Array.isArray(value)) {
          } else if (['number', 'string'].includes(typeof value)) {
            const name = convertKeyToCss(
              `--${parentName ? `${parentName}-` : ''}${key}`
            );
            acc.theme[key] = `var(${name})`;
            acc.values[name] = normalizeUnitPixel('marginTop', value, isWeb);
          } else if (typeof value === 'object') {
            const toto = parse(value, key, isWeb);
            acc.theme = {
              ...acc.theme,
              ...Object.entries(toto.theme).reduce<Record<string, any>>(
                (acc2, [key2, value2]) => {
                  acc2[key] = { ...acc2[key], [key2]: value2 };
                  return acc2;
                },
                {}
              ),
            };
            acc.values = {
              ...acc.values,
              ...toto.values,
            };
          }
          return acc;
        },
        { theme: {}, values: {} }
      );
};

export const ThemePlugin = (
  themes: Themes,
  initialTheme: keyof Themes
): Plugin<CrossedThemePlugin> => {
  ThemeRegistry.setThemes(themes).setThemeName(initialTheme);
  return {
    name: 'ThemePlugin',
    test: '^theme$',
    apply({ styles: getStyles, isWeb, props, addClassname }) {
      if (!props) {
        Object.entries(themes).forEach(([themeName, theme]) => {
          addClassname({
            prefix: themeName === initialTheme ? '' : '.',
            body: {
              [`${themeName === initialTheme ? '' : `${themeName} `}body`]:
                parse(theme, undefined, isWeb).values,
            },
          });
        });
      }

      const theme = ThemeRegistry.getTheme();
      const { theme: themeParsed } = parse(theme as any, undefined, isWeb);

      const styles = getStyles(themeParsed as Themes[keyof Themes]);
      Registry.apply(() => styles, {
        isWeb,
        props,
        addClassname,
      });
    },
  };
};

// class Value extends String {
//   private _val: any;
//   constructor(original: any, modify: any) {
//     super(modify);
//     this._val = original;
//   }
//   get val() {
//     return this._val;
//   }
// }

// const changeToCssVar = <B extends Record<string, any>>(
//   t: B,
//   isWeb?: boolean,
//   keyParent?: string
// ) => {
//   return Object.entries(t).reduce((acc, [key, value]) => {
//     if (['number', 'string'].includes(typeof value)) {
//       acc[key] = new Value(
//         value,
//         `var(--${convertKeyToCss(`${keyParent ? `${keyParent}-` : ''}${key}`)})`
//       );
//       // acc[key].original = value;
//     } else if (typeof value === 'object') {
//       acc[key] = changeToCssVar(
//         value,
//         isWeb,
//         `${keyParent ? `${keyParent}-` : ''}${key}`
//       );
//     } else {
//       acc[key] = value;
//     }
//     return acc;
//   }, {});
// };

// // { '--background-color': '#000' }
// const createCssVar = <B extends Record<string, any>>(
//   t: B,
//   isWeb?: boolean,
//   keyParent?: string
// ) => {
//   return Object.entries(t).reduce((acc, [key, value]) => {
//     if (['number', 'string'].includes(typeof value)) {
//       acc[convertKeyToCss(`--${keyParent ? `${keyParent}-` : ''}${key}`)] =
//         normalizeUnitPixel('marginTop', value, isWeb);
//     } else if (typeof value === 'object') {
//       acc = {
//         ...acc,
//         ...createCssVar(
//           value,
//           isWeb,
//           `${keyParent ? `${keyParent}-` : ''}${key}`
//         ),
//       };
//     }
//     return acc;
//   }, {});
// };

// init: ({ addClassname, isWeb }) => {
//   addClassname({
//     body: Object.entries(theme).reduce((acc, [key, styleTheme]) => {
//       acc[`${key} body`] = createCssVar(styleTheme, isWeb);
//       return acc;
//     }, {}),
//   });
// },
// utils: () => ({
//   theme: changeToCssVar(theme[Registry.themeName], true),
// }),

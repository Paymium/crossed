/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Plugin, PluginContext, Themes } from '../types';
import { setTheme } from '../setTheme';
import { convertKeyToCss, normalizeUnitPixel } from '../plugins/utils';
import { isWeb as isWebFile } from '../isWeb';

export const parse = <T extends Record<string, any>>(
  t: T,
  parentName?: string,
  isWeb?: boolean
): {
  theme: T;
  values: Record<string, any>;
} => {
  return !isWeb
    ? { theme: t, values: t }
    : Object.entries(t).reduce<{
        theme: T;
        values: Record<string, any>;
      }>(
        (acc, [key, value]) => {
          if (Array.isArray(value)) {
          } else if (['number', 'string'].includes(typeof value)) {
            const name = convertKeyToCss(
              `${parentName ? `${parentName}-` : ''}${key}`
            );
            (acc.theme as any)[key] = `var(--${name})`;
            acc.values[`--${name}`] = normalizeUnitPixel(
              'marginTop',
              value,
              isWeb
            );
          } else if (typeof value === 'object') {
            const toto = parse(
              value,
              convertKeyToCss(`${parentName ? `${parentName}-` : ''}${key}`),
              isWeb
            );
            acc.theme = {
              ...acc.theme,
              ...Object.entries(toto.theme).reduce<T>(
                (acc2, [key2, value2]) => {
                  (acc2 as any)[key] = { ...acc2[key], [key2]: value2 };
                  return acc2;
                },
                {} as T
              ),
            };
            acc.values = {
              ...acc.values,
              ...toto.values,
            };
          }
          return acc;
        },
        { theme: {} as T, values: {} }
      );
};

export class RegistryBridge {
  private plugins: Plugin<any>[] = [];

  private _debug = false;

  private _listen = new Set<
    (_themeName: keyof Themes) => Promise<void> | void
  >();
  private themes?: Themes;
  private _themeName?: keyof Themes;

  setThemes(themes: Partial<Themes>) {
    this.themes = themes;
    return this;
  }

  get themeName() {
    return this._themeName;
  }

  setInitialThemeName(themeName: keyof Themes) {
    if (!this._themeName) {
      setTheme(this._themeName, themeName);
      this._themeName = themeName;
    }
    return this;
  }

  setThemeName(themeName: keyof Themes) {
    setTheme(this._themeName, themeName);
    this._themeName = themeName;
    this._listen.forEach((cb) => cb(themeName));
    return this;
  }

  getTheme(web?: boolean) {
    if (!this.themes) {
      // throw new Error('Themes are not set');
      console.warn('Themes are not set');
      return {} as Themes[keyof Themes];
    }
    return parse(this.themes[this.themeName] || {}, undefined, web ?? isWebFile)
      .theme as Themes[keyof Themes];
  }
  getThemes() {
    return this.themes;
  }

  subscribe(cb: (_themeName: keyof Themes) => Promise<void> | void) {
    this._listen.add(cb);
    return () => {
      this._listen.delete(cb);
    };
  }

  setDebug(d: boolean) {
    this._debug = d;
    return this;
  }

  addPlugin<S = any>(plugin: Plugin<S>) {
    this.plugins.push(plugin as any);
    return this;
  }

  getPlugins() {
    return this.plugins as typeof this.plugins;
  }

  log(e: string) {
    if (this._debug) {
      // eslint-disable-next-line no-console
      console.log(`[@crossed/styled] ${e}`);
    }
  }

  apply<T extends Record<string, any>>(
    params: () => T,
    options: Omit<PluginContext<Required<any>>, 'styles' | 'key'>
  ) {
    this.log(`Registry apply`);

    const par = params();

    Object.keys(par).forEach((key: keyof T) => {
      const styles = Object.entries(par[key]).reduce<T[keyof T]>(
        (acc, [key, value]) => {
          if (key === 'paddingHorizontal') {
            acc.paddingLeft = value;
            acc.paddingRight = value;
          } else if (key === 'paddingVertical') {
            acc.paddingTop = value;
            acc.paddingBottom = value;
          } else if (key === 'padding') {
            acc.paddingTop = value;
            acc.paddingBottom = value;
            acc.paddingLeft = value;
            acc.paddingRight = value;
          } else if (key === 'marginHorizontal') {
            acc.marginLeft = value;
            acc.marginRight = value;
          } else if (key === 'marginVertical') {
            acc.marginTop = value;
            acc.marginBottom = value;
          } else if (key === 'margin') {
            acc.marginTop = value;
            acc.marginBottom = value;
            acc.marginLeft = value;
            acc.marginRight = value;
          }
          return acc;
        },
        {} as any
      );

      this.plugins.forEach(({ test, apply, name }) => {
        if (typeof key === 'string') {
          const keyFind = test.includes(key);
          if (keyFind) {
            this.log(`[${name}] Find "${key}" for "${name}" plugin`);
            apply?.({ ...options, key, styles });
          }
        }
      });
    });
  }
}

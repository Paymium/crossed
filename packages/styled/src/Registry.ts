/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type {
  CrossedstyleValues,
  Plugin,
  PluginContext,
  Themes,
} from './types';
import { setTheme } from './setTheme';

export class RegistryBridge {
  private plugins: Plugin<any>[] = [];

  private _debug = false;

  private _listen = new Set<
    (_themeName: keyof Themes) => Promise<void> | void
  >();
  private themes?: Themes;
  private _themeName?: keyof Themes;

  setThemes(themes: Partial<Themes>) {
    this.themes = { ...this.themes, ...themes };
    return this;
  }

  get themeName() {
    return this._themeName;
  }

  setThemeName(themeName: keyof Themes) {
    setTheme(this._themeName, themeName);
    this._themeName = themeName;
    this._listen.forEach((cb) => cb(themeName));
    return this;
  }

  getTheme() {
    if (!this.themes) {
      // throw new Error('themes are not set');
      console.warn('Themes are not set');
      return {} as Themes[keyof Themes];
    }
    return this.themes[this._themeName];
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

  apply(
    params: () => Record<string, any>,
    options: Omit<PluginContext<Required<any>>, 'styles' | 'key'>
  ) {
    this.log(`Registry apply`);
    Object.entries(params()).forEach(
      ([key, styles]: [string, CrossedstyleValues]) => {
        this.plugins.forEach(({ test, apply, name }) => {
          const keyFind = key.match(new RegExp(test, 'g'));
          if (test && keyFind && keyFind.length > 0) {
            this.log(`[${name}] Find "${key}" for "${name}" plugin`);
            apply?.({ ...options, key, styles });
          }
        });
      }
    );
  }
}

export const Registry = new RegistryBridge();

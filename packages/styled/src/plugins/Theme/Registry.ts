/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { setTheme } from './setTheme';
import { Themes } from './types';

export class ThemeBridge {
  private _listen = new Set<
    (_themeName: keyof Themes) => Promise<void> | void
  >();
  private themes: Themes;
  private _themeName: keyof Themes;

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
    return this.themes[this._themeName];
  }

  subscribe(cb: (_themeName: keyof Themes) => Promise<void> | void) {
    this._listen.add(cb);
    return () => {
      this._listen.delete(cb);
    };
  }
}

export const ThemeRegistry = new ThemeBridge();

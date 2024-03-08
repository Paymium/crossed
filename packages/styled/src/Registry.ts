/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleTheme, Plugin } from './types';

class RegistryBridge {
  private theme?: CrossedstyleTheme;
  private plugins: Plugin[] = [];

  setTheme(t: CrossedstyleTheme) {
    this.theme = t;
    return this;
  }
  getTheme() {
    return this.theme as CrossedstyleTheme;
  }

  addPlugin<S = any>(plugin: Plugin<S>) {
    this.plugins.push(plugin as any);
    return this;
  }

  getPlugins() {
    return this.plugins;
  }
}

export const Registry = new RegistryBridge();

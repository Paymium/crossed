/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues, Plugin, PluginContext } from './types';

export class RegistryBridge {
  private plugins: Plugin[] = [];

  addPlugin<S = any>(plugin: Plugin<S>) {
    this.plugins.push(plugin as any);
    return this;
  }

  getPlugins() {
    return this.plugins;
  }

  apply(
    params: () => Record<string, any>,
    options: Omit<PluginContext<Required<any>>, 'styles' | 'key'>
  ) {
    Object.entries(params()).forEach(
      ([key, styles]: [string, CrossedstyleValues]) => {
        this.plugins.forEach(({ test, apply }) => {
          const keyFind = key.match(new RegExp(test, 'g'));
          if (test && keyFind && keyFind.length > 0) {
            apply?.({ ...options, key, styles });
          }
        });
      }
    );
  }
}

export const Registry = new RegistryBridge();

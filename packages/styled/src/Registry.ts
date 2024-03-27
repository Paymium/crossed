/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues, Plugin, PluginContext } from './types';

const cache = new Map();
export class RegistryBridge {
  private plugins: Plugin[] = [];

  private _debug = false;

  setDebug(d: boolean) {
    this._debug = d;
    return this;
  }

  addPlugin<S = any>(plugin: Plugin<S>) {
    this.plugins.push(plugin as any);
    return this;
  }

  getPlugins() {
    return this.plugins;
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

    // //method 2
    // const toto = params();
    // // {base: {color: ""}}
    // this.plugins.forEach(({ test, apply, name }) => {
    //   // test === "base"
    //   const styles = toto[test];
    //   if (!styles) return;
    // if (cache.has(styles)) {
    //   options.addClassname(cache.get(styles));
    // } else {
    //     apply?.({
    //       ...options,
    //       addClassname: (e) => {
    //         options.addClassname(e);
    //         cache.set(styles, e)
    //       },
    //       key: test,
    //       styles,
    //     });
    //   }
    // });

    Object.entries(params()).forEach(
      ([key, styles]: [string, CrossedstyleValues]) => {
        this.plugins.forEach(({ test, apply, name }) => {
          const keyFind = key.match(new RegExp(test, 'g'));
          if (test && keyFind && keyFind.length > 0) {
            this.log(`[${name}] Find "${key}" for "${name}" plugin`);
            if (cache.has(styles)) {
              options.addClassname(cache.get(styles));
            } else {
              apply?.({
                ...options,
                addClassname: (e) => {
                  options.addClassname(e);
                  cache.set(styles, e)
                },
                key,
                styles,
              });
            }
          }
        });
      }
    );

    // // method1
    // Object.entries(params()).forEach(
    //   ([key, styles]: [string, CrossedstyleValues]) => {
    //     this.plugins.forEach(({ test, apply, name }) => {
    //       const keyFind = key.match(new RegExp(test, 'g'));
    //       if (test && keyFind && keyFind.length > 0) {
    //         this.log(`[${name}] Find "${key}" for "${name}" plugin`);
    //         apply?.({
    //           ...options,
    //           addClassname: (e) => {
    //             options.addClassname(e);
    //           },
    //           key,
    //           styles,
    //         });
    //       }
    //     });
    //   }
    // );
  }
}

export const Registry = new RegistryBridge();

/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { RegistryBridge, Registry } from '../src/Registry';

describe('Registry', () => {
  test('be instance of RegitryBridge', () => {
    expect(Registry).toBeInstanceOf(RegistryBridge);
  });

  // test('can set/get theme', () => {
  //   const theme = {};
  //   expect(Registry.getTheme()).toBe(undefined);
  //   expect(Registry.setTheme(theme)).toBe(Registry);
  //   expect(Registry.getTheme()).toBe(theme);
  // });

  test('can add/get plugins', () => {
    const plugins = {} as any;
    expect(Registry.getPlugins()).toEqual([]);
    expect(Registry.addPlugin(plugins)).toBe(Registry);
    expect(Registry.addPlugin(plugins)).toBe(Registry);
    expect(Registry.getPlugins()).toEqual([plugins, plugins]);
  });
});

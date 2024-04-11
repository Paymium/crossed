/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/// <reference types="jest" />

import { RegistryBridge, Registry } from '../src/Registry';

jest.mock('../src/isWeb/isWeb', () => {
  return { isWeb: true };
});

describe('Registry', () => {
  test('be instance of RegitryBridge', () => {
    expect(Registry).toBeInstanceOf(RegistryBridge);
  });

  test('can add/get plugins', () => {
    const plugins = {} as any;
    expect(Registry.getPlugins().length).toEqual(5);
    expect(Registry.addPlugin(plugins)).toBe(Registry);
    expect(Registry.addPlugin(plugins)).toBe(Registry);
    expect(Registry.getPlugins().length).toEqual(7);
  });
});

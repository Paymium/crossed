/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { Registry } from '../src/Registry';

jest.mock('next/navigation', () => ({
  useServerInsertedHTML: jest.fn((e) => e()),
}));
jest.mock('next/document', () => ({
  Main: jest.fn(),
}));
jest.mock('react-native', () => ({
  AppRegistry: {
    registerComponent: jest.fn(),
    getApplication: jest.fn(() => ({ getStyleElement: jest.fn() })),
  },
}));

describe('Registry', () => {
  test('render', () => {
    const { useServerInsertedHTML } = jest.requireMock('next/navigation');
    const { AppRegistry } = jest.requireMock('react-native');
    const getStyleElement = jest.fn();
    AppRegistry.getApplication.mockImplementation(() => ({ getStyleElement }));
    render(<Registry />);
    expect(useServerInsertedHTML).toBeCalled();
    expect(AppRegistry.registerComponent).toBeCalled();
    expect(AppRegistry.getApplication).toBeCalledWith('Main');
    expect(getStyleElement).toBeCalled();
  });
});

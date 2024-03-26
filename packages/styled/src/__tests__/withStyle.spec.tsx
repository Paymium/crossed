/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { render } from '@crossed/test';
import { withStyle } from '../withStyle';
import { Registry } from '../Registry';
import { BasePlugin } from '../plugins';

describe('withStyle', () => {
  test('no theme or plugin', () => {
    const style = { color: 'white' };
    const Comp = jest.fn().mockReturnValue(null);
    const NewComp = withStyle(Comp, style);

    render(<NewComp />);

    expect(Comp).toBeCalled();
    const arg = Comp.mock.calls[0][0];
    expect(arg).toHaveProperty('className', '');
    expect(arg).toHaveProperty('style', [undefined]);
  });

  test('no theme and with plugin', () => {
    Registry.addPlugin(BasePlugin);

    const style = { base: { color: 'white' } };
    const Comp = jest.fn().mockReturnValue(null);
    const styleFunction = jest.fn().mockReturnValue(style);
    const NewComp = withStyle(Comp, styleFunction);

    render(<NewComp />);

    expect(Comp).toBeCalled();
    const arg = Comp.mock.calls[0][0];
    expect(arg).toHaveProperty('className', '');
    expect(arg).toHaveProperty('style', [{ color: 'white' }]);
  });
});

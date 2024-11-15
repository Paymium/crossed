/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, screen } from '@crossed/test';
import { FloatingContent } from '../Content';
import { inlineStyle } from '@crossed/styled';

describe('Floating.Content', () => {
  const mount = async (style?: any) => {
    expect(FloatingContent.displayName).toEqual('Floating.Content');

    render(<FloatingContent testID="Animated" style={style} />);
    expect(screen.getByTestId('Animated')).toBeTruthy();
  };

  test('no style', async () => {
    mount();
  });

  test('array style', async () => {
    mount([]);
  });

  test('object style', async () => {
    mount({});
  });

  test('crossed style', async () => {
    mount(inlineStyle(() => ({})));
  });
});

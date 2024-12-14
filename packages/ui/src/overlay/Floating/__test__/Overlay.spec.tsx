/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, screen } from '@crossed/test';
import { FloatingOverlay } from '../Overlay';
import { FloatingProvider } from '../context';

describe('Floating.Overlay', () => {
  const mount = async (open?: boolean) => {
    expect(FloatingOverlay.displayName).toEqual('Floating.Overlay');

    render(
      <FloatingProvider
        onClose={() => {}}
        onOpen={() => {}}
        open={open ?? false}
        removeScroll={false}
      >
        <FloatingOverlay animatedProps={{ testID: 'trigger' }} />
      </FloatingProvider>
    );
  };

  test('hide', async () => {
    mount();
    expect(() => screen.getByTestId('trigger')).toThrow();
  });

  test('open', async () => {
    mount(true);
    expect(screen.getByTestId('trigger')).toBeTruthy();
  });
});

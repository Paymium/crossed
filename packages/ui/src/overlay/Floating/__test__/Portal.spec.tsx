/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, screen } from '@crossed/test';
import { FloatingPortal } from '../Portal';
import { FloatingProvider } from '../context';
import { PortalProvider } from '@gorhom/portal';

describe('Floating.Portal', () => {
  const mount = ({
    open,
    removeScroll,
    visibilityHidden,
  }: {
    open?: boolean;
    removeScroll?: boolean;
    visibilityHidden?: boolean;
  }) => {
    expect(FloatingPortal.displayName).toEqual('Floating.Portal');
    const onClose = jest.fn();
    const onOpen = jest.fn();

    render(
      <PortalProvider>
        <FloatingProvider
          onClose={onClose}
          onOpen={onOpen}
          open={open ?? false}
          removeScroll={removeScroll}
          visibilityHidden={visibilityHidden}
        >
          <FloatingPortal>
            <div data-testid="children" />
          </FloatingPortal>
        </FloatingProvider>
      </PortalProvider>
    );
    return { onClose, onOpen };
  };

  test('open with removescroll', async () => {
    mount({ open: true, removeScroll: true });
    expect(screen.getByTestId('children')).toBeTruthy();
  });
  test('open without removescroll', async () => {
    mount({ open: true, removeScroll: false });
    expect(() => screen.getByTestId('children')).toBeTruthy();
  });
  test('visibilityHidden true', async () => {
    mount({ visibilityHidden: true });
    expect(screen.getByTestId('children')).toBeTruthy();
  });

  test('visibilityHidden false', async () => {
    mount({ visibilityHidden: false });
    expect(() => screen.getByTestId('children')).toThrow();
  });
});

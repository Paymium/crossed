/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, screen } from '@crossed/test';
import { VisibilityHidden } from '../VisibilityHidden';

describe('VisibilityHidden', () => {
  const oldError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = oldError;
  });

  test('children is string', () => {
    try {
      render(<VisibilityHidden>hello</VisibilityHidden>);
    } catch (e: any) {
      expect(e.message).toBe(`"VisibilityHidden" not accept string children`);
    }
  });

  test('show', async () => {
    render(
      <VisibilityHidden>
        <div role="main" />
      </VisibilityHidden>
    );
    const child = await screen.getByRole('main');

    expect(child).toHaveAttribute('aria-hidden', 'false');
  });

  test('hidden', async () => {
    render(
      <VisibilityHidden hidden>
        <div role="main" />
      </VisibilityHidden>
    );

    const child = await screen.getByRole('main', { hidden: true });

    expect(child).toHaveAttribute('aria-hidden', 'true');
    expect(child).toHaveAttribute(
      'style',
      'position: absolute; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; word-wrap: normal;'
    );
  });
});

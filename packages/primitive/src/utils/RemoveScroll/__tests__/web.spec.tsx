/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { RemoveScroll } from '../index';

describe('RemoveScroll web', () => {
  test('whithout children', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { container } = render(<RemoveScroll />);
    expect(container.innerHTML).toBe('');
  });

  test('with children', () => {
    const { container } = render(
      <RemoveScroll>
        <div />
      </RemoveScroll>
    );
    expect(container.innerHTML).toBe('<div><div></div></div>');
  });
});

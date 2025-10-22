/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, screen } from '@crossed/test';
import '@testing-library/jest-dom';
import { Divider } from '../../../layout';
import { Card, CardTitle, CardDescription } from '../index';

expect(Card).toBeDefined();
expect(CardTitle).toBeDefined();
expect(CardDescription).toBeDefined();

describe('Card Group', () => {
  test('Divider is rendered ', () => {
    render(
      <Card.Group>
        <Divider testID="divider" />
      </Card.Group>
    );
    expect(screen.getByTestId('divider')).toBeTruthy();
  });

  test("With only one Child CardGroup doesn't change style of child", () => {
    render(
      <Card.Group>
        <Card testID="firstCardChild">
          <Card.Title>Toto</Card.Title>
        </Card>
      </Card.Group>
    );

    const element = screen.getByTestId('firstCardChild');
    expect(element).not.toHaveClass(
      'border-top-left-radius-[0px] border-bottom-left-radius-[0px] border-top-right-radius-[0px] border-bottom-right-radius-[0px]'
    );
  });
});

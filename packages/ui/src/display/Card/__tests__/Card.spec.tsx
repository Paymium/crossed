/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, screen } from '@crossed/test';
import '@testing-library/jest-dom';
import { Text } from '../../../typography';
import { Divider } from '../../../layout';
import {
  Card,
  CardTitle,
  CardDescription,
  CardGroup,
  CardExtra,
} from '../index';

expect(Card).toBeDefined();
expect(CardTitle).toBeDefined();
expect(CardDescription).toBeDefined();
expect(CardGroup).toBeDefined();
expect(CardExtra).toBeDefined();

describe('Card Group', () => {
  test('if child not valid it is not rendered', () => {
    render(
      <Card.Group>
        <Card>
          <Card.Title>Toto</Card.Title>
        </Card>
        {42}
      </Card.Group>
    );
    expect(screen.getByText('Toto')).toBeInTheDocument();
    expect(screen.queryByText('42')).not.toBeInTheDocument();
  });

  test('Throw error with direct child different from Card or Divider', () => {
    const renderWithInvalidChild = () =>
      render(
        <Card.Group>
          <Text>Toto</Text>
        </Card.Group>
      );
    expect(renderWithInvalidChild).toThrow(
      'Direct children of CardGroup should be Divider or Card'
    );
  });

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

  describe('With 2 Card Children', () => {
    const customRender = () => {
      render(
        <Card.Group>
          <Card testID="firstCardChild">
            <Card.Title>Toto</Card.Title>
          </Card>
          <Card testID="lastCardChild">
            <Card.Title>Toti</Card.Title>
          </Card>
        </Card.Group>
      );
    };
    test('border bottom and border radius bottom of first child are modified', () => {
      customRender();
      const firstCardChild = screen.getByTestId('firstCardChild');
      expect(firstCardChild).not.toHaveClass(
        'border-top-left-radius-[0px] border-top-right-radius-[0px]'
      );
      expect(firstCardChild).toHaveClass(
        'border-bottom-left-radius-[0px] border-bottom-right-radius-[0px] border-bottom-width-[0px]'
      );
    });

    test('border top and border radius top of last child are modified', () => {
      customRender();
      const lastCardChild = screen.getByTestId('lastCardChild');
      expect(lastCardChild).toHaveClass(
        'border-top-left-radius-[0px] border-top-right-radius-[0px] border-top-width-[0px]'
      );
      expect(lastCardChild).not.toHaveClass(
        'border-bottom-left-radius-[0px] border-bottom-right-radius-[0px]'
      );
    });
  });

  describe('With 3 Card Children', () => {
    const customRender = () => {
      render(
        <Card.Group>
          <Card testID="firstCardChild">
            <Card.Title>Toto</Card.Title>
          </Card>
          <Card testID="middleCardChild">
            <Card.Title>Titi</Card.Title>
          </Card>
          <Card testID="lastCardChild">
            <Card.Title>Toti</Card.Title>
          </Card>
        </Card.Group>
      );
    };
    test('border bottom and border radius bottom of first child are modified', () => {
      customRender();
      const firstCardChild = screen.getByTestId('firstCardChild');
      expect(firstCardChild).not.toHaveClass(
        'border-top-left-radius-[0px] border-top-right-radius-[0px]'
      );
      expect(firstCardChild).toHaveClass(
        'border-bottom-left-radius-[0px] border-bottom-right-radius-[0px] border-bottom-width-[0px]'
      );
    });

    test('border top and bottom and border radius top and bottom of middle child are modified', () => {
      customRender();
      const middleCardChild = screen.getByTestId('middleCardChild');
      expect(middleCardChild).toHaveClass(
        'border-radius-[0px] border-bottom-width-[0px] border-top-width-[0px]'
      );
    });

    test('border top and border radius top of last child are modified', () => {
      customRender();
      const lastCardChild = screen.getByTestId('lastCardChild');
      expect(lastCardChild).toHaveClass(
        'border-top-left-radius-[0px] border-top-right-radius-[0px] border-top-width-[0px]'
      );
      expect(lastCardChild).not.toHaveClass(
        'border-bottom-left-radius-[0px] border-bottom-right-radius-[0px]'
      );
    });
  });
});

describe('Card', () => {
  test('if role link, link style is applied', () => {
    render(
      <Card role="link" testID="card">
        <Card.Title>Toto</Card.Title>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass(
      'active:background-color-[var(--components--card-active-background)]'
    );
    expect(screen.getByTestId('card')).toHaveAttribute('role', 'link');
  });
});

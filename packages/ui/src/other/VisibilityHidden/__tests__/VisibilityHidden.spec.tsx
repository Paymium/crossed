/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { VisibilityHidden } from '../VisibilityHidden';
import { createRef } from 'react';
import { createStyles } from '@crossed/styled';
import { View } from 'react-native';

const hiddenClass =
  'position-[absolute] text-decoration-[none] z-index-[0] overflow-[hidden] clip-[rect(0,-0,-0,-0)] white-space-[nowrap] word-wrap-[normal]';
describe('VisibilityHidden', () => {
  test('rend le composant avec les styles par défaut', () => {
    const { getByTestId } = render(
      <VisibilityHidden testID="hidden-component" />
    );

    const element = getByTestId('hidden-component');

    expect(element).not.toHaveClass(...hiddenClass.split(' '));
  });

  test('ajoute la prop aria-hidden correctement', () => {
    const { getByTestId } = render(
      <VisibilityHidden testID="hidden-component" hide />
    );

    const element = getByTestId('hidden-component');
    expect(element).toHaveAttribute('aria-hidden', 'true');
    expect(element).toHaveClass(...hiddenClass.split(' '));
  });

  test('merge les styles passés via props', () => {
    const { customStyle } = createStyles(() => ({
      customStyle: {
        base: {
          backgroundColor: 'red',
        },
      },
    }));

    const { getByTestId } = render(
      <VisibilityHidden testID="hidden-component" style={customStyle} />
    );

    const element = getByTestId('hidden-component');
    expect(element).toHaveClass('background-color-[red]');
  });

  test('transmet correctement la référence', () => {
    const ref = createRef<View>();
    render(<VisibilityHidden ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  test('rend le composant avec des props additionnelles', () => {
    const { getByTestId } = render(
      <VisibilityHidden testID="hidden-component" id="test-id" />
    );

    const element = getByTestId('hidden-component');
    expect(element).toHaveAttribute('id', 'test-id');
  });
});

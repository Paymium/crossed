/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { Body } from '../Body';

describe('Body', () => {
  test('rend les enfants passés en prop', () => {
    const { getByText } = render(
      <Body>
        <div>Contenu du Body</div>
      </Body>
    );

    expect(getByText('Contenu du Body')).toBeInTheDocument();
  });

  test("a le displayName 'ScrollView.Body'", () => {
    expect(Body.displayName).toBe('ScrollView.Body');
  });

  test('rend sans erreur lorsque aucun enfant n’est fourni', () => {
    const { container } = render(<Body />);
    expect(container).toBeEmptyDOMElement();
  });
});

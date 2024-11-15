/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { Footer } from '../Footer';

describe('Footer', () => {
  test('rend les enfants passés en prop', () => {
    const { getByText } = render(
      <Footer>
        <div>Contenu du Footer</div>
      </Footer>
    );

    expect(getByText('Contenu du Footer')).toBeInTheDocument();
  });

  test("a le displayName 'ScrollView.Footer'", () => {
    expect(Footer.displayName).toBe('ScrollView.Footer');
  });

  test('rend sans erreur lorsque aucun enfant n’est fourni', () => {
    const { container } = render(<Footer />);
    expect(container).toBeEmptyDOMElement();
  });
});

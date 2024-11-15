/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { Title } from '../Title';

describe('Title', () => {
  test('rend les enfants passés en prop', () => {
    const { getByText } = render(
      <Title>
        <div>Contenu du Title</div>
      </Title>
    );

    expect(getByText('Contenu du Title')).toBeInTheDocument();
  });

  test("a le displayName 'ScrollView.Title'", () => {
    expect(Title.displayName).toBe('ScrollView.Title');
  });

  test('rend sans erreur lorsque aucun enfant n’est fourni', () => {
    const { container } = render(<Title />);
    expect(container).toBeEmptyDOMElement();
  });
});

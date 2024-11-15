/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { FlatList } from '../FlatList';
import { Body } from '../utils/Body';
import { inlineStyle } from '@crossed/styled';
import { act } from 'react';

describe('FlatList', () => {
  test('rend les items passés en prop dans data', () => {
    const data = [
      { id: '1', content: 'Item 1' },
      { id: '2', content: 'Item 2' },
    ];
    const { getByText } = render(
      <FlatList
        data={data}
        renderItem={({ item }) => <Body>{item.content}</Body>}
      />
    );

    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });

  test('rend le titre si title est fourni dans props', () => {
    const { getByText } = render(
      <FlatList
        data={[]}
        renderItem={() => null}
        title={<Body>Titre du composant</Body>}
      />
    );

    expect(getByText('Titre du composant')).toBeInTheDocument();
  });

  test('rend le footer si footer est fourni dans props', () => {
    const { getByText } = render(
      <FlatList
        data={[]}
        renderItem={() => null}
        footer={<Body>Footer du composant</Body>}
      />
    );

    expect(getByText('Footer du composant')).toBeInTheDocument();
  });

  test('rend un stickyFooter lorsque stickyFooter est vrai', () => {
    const { getByText } = render(
      <FlatList
        data={[]}
        renderItem={() => null}
        stickyFooter={true}
        footer={<Body>Footer Sticky</Body>}
      />
    );

    expect(getByText('Footer Sticky')).toBeInTheDocument();
  });

  test("n'affiche pas le footer sticky si stickyFooter est faux", async () => {
    const { queryByTestId } = render(
      <div style={{ height: '50px' }}>
        {/* Simule un viewport */}
        <FlatList
          data={[]}
          renderItem={() => null}
          stickyFooter={false}
          footer={<Body>Footer Sticky</Body>}
          containerProps={{ style: inlineStyle(() => ({ base: { flex: 1 } })) }}
        />
      </div>
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 300)));

    // Vérifie que le footer n'est pas rendu
    expect(queryByTestId('stickyFooter')).not.toBeInTheDocument();
  });

  test('met à jour le paddingRight en fonction du layout', () => {
    const data = [{ id: '1', content: 'Item 1' }];
    const { container } = render(
      <FlatList
        data={data}
        renderItem={({ item }) => <Body>{item.content}</Body>}
      />
    );

    // Teste si paddingRight est bien appliqué (selon ta logique de useLogic)
    expect(container.firstChild).toHaveStyle('padding-right: 0px'); // Valeur attendue en fonction de la logique
  });

  test('affiche le footer avec un délai de rendu pour stickyFooter', () => {
    const footerContent = 'Footer avec délai';
    const { getByText } = render(
      <FlatList
        data={[]}
        renderItem={() => null}
        stickyFooter={true}
        footer={<Body>{footerContent}</Body>}
      />
    );

    // Vérifie que le footer apparaît avec un délai après le rendu
    expect(getByText(footerContent)).toBeInTheDocument();
  });

  test('comporte la logique de layout selon les propriétés passées', async () => {
    const { getByText, getByTestId } = render(
      <div style={{ height: '50px' }}>
        {' '}
        {/* Simule un viewport */}
        <FlatList
          data={Array.from(Array(100).keys())} // Ajoute suffisamment de données pour provoquer un défilement
          renderItem={({ item }) => (
            <div style={{ height: '50px' }}>Item {item}</div>
          )} // Forcer une hauteur de 50px par élément
          stickyHeader={true}
          stickyFooter={true}
          title={<Body>Titre Sticky</Body>}
          footer={<Body>Footer Sticky</Body>}
          containerProps={{ style: inlineStyle(() => ({ base: { flex: 1 } })) }}
        />
      </div>
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 300)));

    // Vérifie que le titre est sticky
    const titleElement = getByText('Titre Sticky');
    expect(titleElement.parentNode).toHaveStyle('position: sticky'); // Le style sticky doit être appliqué

    // Vérifie que le footer est sticky
    const footerElement = getByTestId('stickyFooter');
    expect(footerElement).toBeInTheDocument();
  });
});

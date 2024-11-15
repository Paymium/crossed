/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render, act, fireEvent } from '@crossed/test';
import { ScrollView } from '../ScrollView'; // Ajustez le chemin si nécessaire
import { Text } from 'react-native';
import { inlineStyle } from '@crossed/styled'; // Ajustez si nécessaire

test('comporte la logique de layout selon les propriétés passées', async () => {
  const { getByText, getByTestId, container } = render(
    <div style={{ height: '50px' }}>
      {/* Simule un viewport */}
      <ScrollView
        stickyHeader={true}
        stickyFooter={true}
        containerProps={{ style: inlineStyle(() => ({ base: { flex: 1 } })) }}
      >
        <ScrollView.Title>
          <Text>Titre Sticky</Text>
        </ScrollView.Title>
        <ScrollView.Body>
          <Text>Contenu du body</Text>
        </ScrollView.Body>
        <ScrollView.Footer>
          <Text>Footer Sticky</Text>
        </ScrollView.Footer>
      </ScrollView>
    </div>
  );

  const scrollableContainer =
    container.querySelector('div').childNodes[0].childNodes[0]; // Conteneur du scroll
  act(() => {
    (scrollableContainer as any).scrollTop = 100; // Fait défiler de 100px
    fireEvent.scroll(scrollableContainer); // Déclenche l'événement de scroll
  });

  await act(() => new Promise((resolve) => setTimeout(resolve, 300)));

  // Vérifie que le titre est sticky
  const titleElement = getByText('Titre Sticky');
  expect(titleElement.parentNode).toHaveStyle('position: sticky');

  // Vérifie que le footer est sticky
  const footerElement = getByTestId('stickyFooter');
  expect(footerElement).toBeInTheDocument();

  // Vérifie que le body est bien rendu
  expect(getByText('Contenu du body')).toBeInTheDocument();
});

test("n'affiche pas le footer sticky si stickyFooter est faux", async () => {
  const { queryByTestId, container } = render(
    <div style={{ height: '50px' }}>
      {/* Simule un viewport */}
      <ScrollView
        stickyHeader={true}
        stickyFooter={false}
        containerProps={{ style: inlineStyle(() => ({ base: { flex: 1 } })) }}
      >
        <ScrollView.Title>
          <Text>Titre Sticky</Text>
        </ScrollView.Title>
        <ScrollView.Body>
          <Text>Contenu du body</Text>
        </ScrollView.Body>
        <ScrollView.Footer>
          <Text>Footer Sticky</Text>
        </ScrollView.Footer>
      </ScrollView>
    </div>
  );

  const scrollableContainer =
    container.querySelector('div').childNodes[0].childNodes[0]; // Conteneur du scroll
  act(() => {
    (scrollableContainer as any).scrollTop = 100; // Fait défiler de 100px
    fireEvent.scroll(scrollableContainer); // Déclenche l'événement de scroll
  });

  await act(() => new Promise((resolve) => setTimeout(resolve, 300)));

  // Vérifie que le footer n'est pas sticky
  const footerElement = queryByTestId('stickyFooter');
  expect(footerElement).toBeNull(); // Footer ne doit pas être présent
});

test("n'affiche pas le titre sticky si stickyHeader est faux", async () => {
  const { getByText, container } = render(
    <div style={{ height: '50px' }}>
      {/* Simule un viewport */}
      <ScrollView
        stickyHeader={false}
        stickyFooter={true}
        containerProps={{ style: inlineStyle(() => ({ base: { flex: 1 } })) }}
      >
        <ScrollView.Title>
          <Text>Titre Sticky</Text>
        </ScrollView.Title>
        <ScrollView.Body>
          <Text>Contenu du body</Text>
        </ScrollView.Body>
        <ScrollView.Footer>
          <Text>Footer Sticky</Text>
        </ScrollView.Footer>
      </ScrollView>
    </div>
  );

  const scrollableContainer =
    container.querySelector('div').childNodes[0].childNodes[0]; // Conteneur du scroll
  act(() => {
    (scrollableContainer as any).scrollTop = 200; // Fait défiler de 200px
    fireEvent.scroll(scrollableContainer); // Déclenche l'événement de scroll
  });

  await act(() => new Promise((resolve) => setTimeout(resolve, 300)));

  // Vérifie que le titre n'a pas de style sticky
  const titleElement = getByText('Titre Sticky');
  expect(titleElement.parentNode).not.toHaveStyle('position: sticky');

  // Vérifie que le footer est bien sticky
  const footerElement = container.querySelector('[data-testid="stickyFooter"]');
  expect(footerElement).toBeInTheDocument();
});

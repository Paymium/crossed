/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { renderHook } from '@crossed/test';
import { useLogic } from '../useLogic';
import { Title } from '../Title';
import { Footer } from '../Footer';
import { Body } from '../Body';
import { act } from 'react';

describe('useLogic', () => {
  test('extrait le titre des enfants', () => {
    const { result } = renderHook(() =>
      useLogic({
        children: [
          <Title key="title">Titre du composant</Title>,
          <Body key="body">Contenu du composant</Body>,
        ],
      })
    );
    expect(result.current.title).not.toBeNull();
    expect((result.current.title as any).props.children).toBe(
      'Titre du composant'
    );
  });

  test('extrait le footer des enfants', () => {
    const { result } = renderHook(() =>
      useLogic({
        children: [
          <Title key="title">Titre du composant</Title>,
          <Body key="body">Contenu du composant</Body>,
          <Footer key="footer">Footer du composant</Footer>,
        ],
      })
    );
    expect(result.current.footer).not.toBeNull();
    expect((result.current.footer as any).props.children).toBe(
      'Footer du composant'
    );
  });

  test('extrait le body des enfants', () => {
    const { result } = renderHook(() =>
      useLogic({
        children: [
          <Title key="title">Titre du composant</Title>,
          <Body key="body">Contenu du composant</Body>,
        ],
      })
    );
    expect(result.current.body).not.toBeNull();
    expect((result.current.body as any).props.children).toBe(
      'Contenu du composant'
    );
  });

  test('met à jour le paddingRight en fonction de la différence entre layoutShared et contentLayoutShared', async () => {
    const { result } = renderHook(() =>
      useLogic({
        children: [
          <Title key="title">Titre du composant</Title>,
          <Body key="body">Contenu du composant</Body>,
          <Footer key="footer">Footer du composant</Footer>,
        ],
      })
    );
    // Simuler un changement dans la largeur du layout
    result.current.onLayout({
      nativeEvent: { layout: { width: 300 } },
    });
    await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
    expect(result.current.paddingRight).toBe(0);
  });

  test("gère l'affichage du footer lorsque stickyFooter est true", async () => {
    const { result } = renderHook(() =>
      useLogic({
        children: [
          <Title key="title">Titre du composant</Title>,
          <Body key="body">Contenu du composant</Body>,
          <Footer key="footer">Footer du composant</Footer>,
        ],
        stickyFooter: true,
      })
    );
    await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
    // Vérifier que le footer est bien visible après l'effet de timeout
    expect(result.current.showFooter).toBe(true);
  });

  test("n'affiche pas le footer lorsque stickyFooter est false", () => {
    const { result } = renderHook(() =>
      useLogic({
        children: [
          <Title key="title">Titre du composant</Title>,
          <Body key="body">Contenu du composant</Body>,
          <Footer key="footer">Footer du composant</Footer>,
        ],
        stickyFooter: false,
      })
    );
    expect(result.current.showFooter).toBe(false);
  });
});

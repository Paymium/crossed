/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { render, screen } from '@crossed/test';
import { ButtonText } from '../Text';
import { buttonContext } from '../context';

describe('ButtonText', () => {
  const setTextIdMock = jest.fn();

  const renderWithContext = (props: any, contextValue: any) => {
    return render(
      <buttonContext.Provider value={contextValue}>
        <ButtonText {...props} />
      </buttonContext.Provider>
    );
  };

  it('renders correctly with default props', () => {
    renderWithContext(
      { children: 'Hello, World!' },
      {
        variant: 'primary',
        state: {},
        disabled: false,
        setTextId: setTextIdMock,
        textId: 'text-id',
      }
    );

    const text = screen.getByText('Hello, World!');
    expect(text).toBeTruthy();
  });

  it('applies styles based on the variant', () => {
    renderWithContext(
      { children: 'Primary Text' },
      {
        variant: 'primary',
        state: {},
        disabled: false,
        setTextId: setTextIdMock,
        textId: 'text-id',
      }
    );

    const text = screen.getByText('Primary Text');
    expect(text).toHaveClass(
      `color-[var(--components--action-primary-default-text)]`
    ); // Exemple de vérification
  });

  it('updates the textId when id changes', () => {
    const { rerender } = renderWithContext(
      { id: 'new-id' },
      {
        variant: 'secondary',
        state: {},
        disabled: false,
        setTextId: setTextIdMock,
        textId: 'text-id',
      }
    );

    expect(setTextIdMock).toHaveBeenCalledWith('new-id');

    rerender(
      <buttonContext.Provider
        value={{
          variant: 'secondary',
          state: {},
          disabled: false,
          setTextId: setTextIdMock,
          textId: 'new-id',
        }}
      >
        <ButtonText id="another-id" />
      </buttonContext.Provider>
    );

    expect(setTextIdMock).toHaveBeenCalledWith('another-id');
  });

  it('applies hover styles when state.hover is true', () => {
    renderWithContext(
      { children: 'Hover Text' },
      {
        variant: 'primary',
        state: { hover: true },
        disabled: false,
        setTextId: setTextIdMock,
        textId: 'text-id',
      }
    );

    const text = screen.getByText('Hover Text');
    expect(text).toHaveClass(
      `color-[var(--components--action-primary-hover-text)]`
    ); // Exemple de vérification
  });

  it('applies disabled styles when disabled is true', () => {
    renderWithContext(
      { children: 'Disabled Text' },
      {
        variant: 'primary',
        state: {},
        disabled: true,
        setTextId: setTextIdMock,
        textId: 'text-id',
      }
    );

    const text = screen.getByText('Disabled Text');
    expect(text).toHaveClass(
      `color-[var(--components--action-primary-default-text)]`
    );
  });

  it('passes additional props to the underlying Text component', () => {
    renderWithContext(
      { children: 'Custom Props', style: { color: 'red' } },
      {
        variant: 'primary',
        state: {},
        disabled: false,
        setTextId: setTextIdMock,
        textId: 'text-id',
      }
    );

    const text = screen.getByText('Custom Props');
    expect(text).toHaveStyle('color: rgb(255, 0, 0)');
    expect(text).toHaveClass(
      `color-[var(--components--action-primary-default-text)]`
    );
  });
});

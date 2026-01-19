/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { render, screen } from '@crossed/test';
import { ButtonIcon } from '../Icon';
import { buttonContext } from '../context';
import { afterEach } from '@jest/globals';

const X = jest.fn(() => <div data-testid="x" />);
describe('ButtonIcon', () => {
  const renderWithContext = (children: React.ReactNode, contextValue: any) => {
    return render(
      <buttonContext.Provider value={contextValue}>
        <ButtonIcon>{children}</ButtonIcon>
      </buttonContext.Provider>
    );
  };

  afterEach(() => {
    X.mockReset();
  });

  it('renders correctly with default props', () => {
    renderWithContext(null, { variant: 'primary', state: {}, disabled: false });

    // Vérifie que rien n'est rendu (pas de children)
    expect(() => screen.getByTestId('x')).toThrow();
  });

  it('renders the child element and applies color styles', () => {
    renderWithContext(<X />, {
      variant: 'primary',
      state: { hover: false, active: false },
      disabled: false,
    });

    expect(X).toBeCalledWith(
      { color: 'var(--components--action-primary-default-text)' },
      {}
    );
  });

  it('applies hover styles when state.hover is true', () => {
    renderWithContext(<X />, {
      variant: 'primary',
      state: { hover: true, active: false },
      disabled: false,
    });

    expect(X).toBeCalledWith(
      { color: 'var(--components--action-primary-hover-text)' },
      {}
    );
  });

  it('applies active styles when state.active is true', () => {
    renderWithContext(<X />, {
      variant: 'primary',
      state: { hover: false, active: true },
      disabled: false,
    });

    expect(X).toBeCalledWith(
      { color: 'var(--components--action-primary-active-text)' },
      {}
    );
  });

  it('applies disabled styles when disabled is true', () => {
    renderWithContext(<X />, {
      variant: 'primary',
      state: {},
      disabled: true,
    });

    expect(X).toBeCalledWith(
      { color: 'var(--components--action-primary-default-text)' },
      {}
    );
  });

  it('renders secondary variant styles correctly', () => {
    renderWithContext(<X />, {
      variant: 'secondary',
      state: { hover: false, active: false },
      disabled: false,
    });

    expect(X).toBeCalledWith(
      { color: 'var(--components--action-secondary-default-text)' },
      {}
    );
  });

  it('returns raw children if not a valid React element', () => {
    const { container } = renderWithContext('Raw Text', {
      variant: 'primary',
      state: {},
      disabled: false,
    });

    expect(container.textContent).toBe('Raw Text');
  });
});

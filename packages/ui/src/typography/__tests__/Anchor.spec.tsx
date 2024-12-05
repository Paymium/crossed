/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { render, screen } from '@crossed/test';
import '@testing-library/jest-dom';
import { Anchor } from '../Anchor';
import { inlineStyle } from '@crossed/styled';

describe('Anchor component', () => {
  it('renders correctly with default props', () => {
    render(<Anchor href="https://example.com">Click me</Anchor>);
    const anchorElement = screen.getByRole('link', { name: /click me/i });
    expect(anchorElement).toBeInTheDocument();
    expect(anchorElement).toHaveAttribute('href', 'https://example.com');
  });

  it('applies primary styles by default', () => {
    render(<Anchor>Primary Link</Anchor>);
    const anchorElement = screen.getByRole('link', { name: /primary link/i });
    expect(anchorElement).toHaveClass('color-[var(--colors-text-brand)]');
  });

  it('applies default styles when primary is false', () => {
    render(<Anchor primary={false}>Default Link</Anchor>);
    const anchorElement = screen.getByRole('link', { name: /default link/i });
    expect(anchorElement).toHaveClass('color-[var(--colors-text-primary)]');
  });

  it('applies custom styles', () => {
    const customStyle = inlineStyle(() => ({
      base: { textDecorationColor: 'red' },
    }));
    render(<Anchor style={customStyle}>Custom Styled Link</Anchor>);
    const anchorElement = screen.getByRole('link', {
      name: /custom styled link/i,
    });
    // Note: Actual style assertion may vary based on implementation of composeStyles.
    expect(anchorElement).toHaveClass('text-decoration-color-[red]');
  });

  it('sets role="link" for accessibility', () => {
    render(<Anchor>Accessible Link</Anchor>);
    const anchorElement = screen.getByRole('link', {
      name: /accessible link/i,
    });
    expect(anchorElement).toHaveAttribute('role', 'link');
  });
});

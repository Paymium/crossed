/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { render, screen, fireEvent } from '@crossed/test';
import '@testing-library/jest-dom';
import { Box } from '../Box';
import { inlineStyle } from '@crossed/styled';

describe('Box component', () => {
  it('renders correctly with default props', () => {
    render(<Box testID="box" />);
    const boxElement = screen.getByTestId('box');
    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveClass('display-[flex]');
  });

  it('applies center styles when "center" is true', () => {
    render(<Box center testID="box" />);
    const boxElement = screen.getByTestId('box');
    expect(boxElement).toHaveClass('align-items-[center]');
    expect(boxElement).toHaveClass('justify-content-[center]');
  });

  it('applies custom gap styles', () => {
    render(<Box space="3xl" testID="box" />);
    const boxElement = screen.getByTestId('box');
    expect(boxElement).toHaveClass('gap-[var(--space-lg)]');
  });

  it('applies justify-content and align-items styles', () => {
    render(<Box justifyContent="between" alignItems="flex-end" testID="box" />);
    const boxElement = screen.getByTestId('box');
    expect(boxElement).toHaveClass('justify-content-[space-between]');
    expect(boxElement).toHaveClass('align-items-[flex-end]');
  });

  it('applies custom styles via "style" prop', () => {
    const customStyle = inlineStyle(() => ({
      base: { backgroundColor: 'blue' },
    }));
    render(<Box style={customStyle} testID="box" />);
    const boxElement = screen.getByTestId('box');
    expect(boxElement).toHaveClass('background-color-[blue]');
  });

  it('applies align-self styles', () => {
    render(<Box alignSelf="center" testID="box" />);
    const boxElement = screen.getByTestId('box');
    expect(boxElement).toHaveClass('align-self-[center]');
  });

  it('Pressable box event hover', () => {
    const onPress = jest.fn();
    render(<Box pressable testID="box" onPointerEnter={onPress} />);
    const boxElement = screen.getByTestId('box');
    fireEvent.pointerEnter(boxElement);
    expect(onPress).toBeCalledTimes(1);
  });

  it('Pressable box event onPress', () => {
    const onPress = jest.fn();
    render(<Box pressable testID="box" onPress={onPress} />);
    const boxElement = screen.getByTestId('box');
    fireEvent.click(boxElement);
    expect(onPress).toBeCalledTimes(1);
  });

  it('view box not event onPress', () => {
    const onPress = jest.fn();
    render(<Box testID="box" onPress={onPress} />);
    const boxElement = screen.getByTestId('box');
    fireEvent.click(boxElement);
    expect(onPress).toBeCalledTimes(0);
  });
});

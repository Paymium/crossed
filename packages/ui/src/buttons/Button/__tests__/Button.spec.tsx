/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { render, screen, fireEvent } from '@crossed/test';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeTruthy();
    expect(button).not.toHaveAttribute('aria-disabled');
  });

  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click Me');
  });

  it('disables the button when `disabled` is true', () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toBeDisabled();
  });

  it('renders the loading indicator when `loading` is true', () => {
    render(<Button loading>Click Me</Button>);
    const loadingIndicator = screen.getByRole('progressbar'); // ActivityIndicator has `progressbar` role
    expect(loadingIndicator).toBeTruthy();

    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  // it('renders children as a function and provides event state', () => {
  //   const mockChild = jest.fn(({ hovered, pressed }: any) => (
  //     <span>{hovered ? 'Hovered' : pressed ? 'Pressed' : 'Idle'}</span>
  //   ));
  //
  //   render(<Button>{mockChild}</Button>);
  //   const button = screen.getByRole('button');
  //
  //   fireEvent.mouseOver(button);
  //   expect(mockChild).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       'focused': false,
  //       hovered: true,
  //       pressed: false,
  //     })
  //   );
  //
  //   fireEvent.mouseDown(button);
  //   expect(mockChild).toHaveBeenCalledWith(
  //     expect.objectContaining({ hovered: true, pressed: true })
  //   );
  //
  //   fireEvent.mouseLeave(button);
  //   expect(mockChild).toHaveBeenCalledWith(
  //     expect.objectContaining({ hovered: false, pressed: false })
  //   );
  // });

  it('applies the correct styles for primary variant', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it('applies the correct styles for secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it('applies the correct styles for lg size', () => {
    render(<Button size="lg">Large Button</Button>);
    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it('applies the correct styles for sm size', () => {
    render(<Button size="lg">Small Button</Button>);
    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it('supports forwarding refs', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref as any}>Click Me</Button>);
    expect(ref.current).toBeTruthy();
  });

  it('handles dynamic states (hover and active)', () => {
    render(<Button>Dynamic Button</Button>);
    const button = screen.getByRole('button');

    fireEvent.mouseOver(button);
    expect(button).not.toHaveAttribute('aria-disabled');

    fireEvent.mouseDown(button);
    expect(button).not.toHaveAttribute('aria-disabled');
  });
});

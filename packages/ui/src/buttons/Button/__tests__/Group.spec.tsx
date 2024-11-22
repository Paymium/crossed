/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { render, screen, fireEvent } from '@crossed/test';
import { ButtonGroup } from '../Group';
import { Button } from '../index';

describe('ButtonGroup', () => {
  it('renders correctly with default props', () => {
    render(
      <ButtonGroup>
        <Button>
          <Button.Text>Button 1</Button.Text>
        </Button>
        <Button>
          <Button.Text>Button 2</Button.Text>
        </Button>
      </ButtonGroup>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Button 1');
    expect(buttons[1]).toHaveTextContent('Button 2');
  });

  it('applies the correct orientation', () => {
    const { rerender } = render(
      <ButtonGroup orientation="horizontal">
        <Button>
          <Button.Text>Button 1</Button.Text>
        </Button>
      </ButtonGroup>
    );
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('data-orientation', 'horizontal');

    rerender(
      <ButtonGroup orientation="vertical">
        <Button>
          <Button.Text>Button 1</Button.Text>
        </Button>
      </ButtonGroup>
    );
    expect(group).toHaveAttribute('data-orientation', 'vertical');
  });

  it('renders children correctly', () => {
    render(
      <ButtonGroup>
        <Button>
          <Button.Text>Button 1</Button.Text>
        </Button>
        <Button>
          <Button.Text>Button 2</Button.Text>
        </Button>
        <Button>
          <Button.Text>Button 3</Button.Text>
        </Button>
      </ButtonGroup>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons.map((button) => button.textContent)).toEqual([
      'Button 1',
      'Button 2',
      'Button 3',
    ]);
  });

  // keep code comment
  // it('supports roving focus between buttons', () => {
  //   render(
  //     <ButtonGroup>
  //       <Button>
  //         <Button.Text>Button 1</Button.Text>
  //       </Button>
  //       <Button>
  //         <Button.Text>Button 2</Button.Text>
  //       </Button>
  //       <Button>
  //         <Button.Text>Button 3</Button.Text>
  //       </Button>
  //     </ButtonGroup>
  //   );
  //
  //   const buttons = screen.getAllByRole('button');
  //   fireEvent.keyDown(buttons[0], { key: 'ArrowRight' });
  //   expect(buttons[1]).toHaveFocus();
  //
  //   fireEvent.keyDown(buttons[1], { key: 'ArrowRight' });
  //   expect(buttons[2]).toHaveFocus();
  //
  //   fireEvent.keyDown(buttons[2], { key: 'ArrowLeft' });
  //   expect(buttons[1]).toHaveFocus();
  // });

  // it('supports forwarding refs', () => {
  //   const ref = React.createRef<HTMLDivElement>();
  //   render(
  //     <ButtonGroup ref={ref}>
  //       <Button>
  //         <Button.Text>Button 1</Button.Text>
  //       </Button>
  //     </ButtonGroup>
  //   );
  //
  //   expect(ref.current).toBeTruthy();
  // });

  it('renders nested components correctly', () => {
    render(
      <ButtonGroup>
        <div>
          <Button>
            <Button.Text>Nested Button</Button.Text>
          </Button>
        </div>
      </ButtonGroup>
    );

    const button = screen.getByRole('button', { name: 'Nested Button' });
    expect(button).toBeTruthy();
  });
});

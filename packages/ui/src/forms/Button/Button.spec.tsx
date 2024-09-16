import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { composeStories, setProjectAnnotations } from '@storybook/react';
import { test, expect } from '@jest/globals';
import { axe, toHaveNoViolations } from 'jest-axe';

import * as stories from './Button.stories'; // 👈 Our stories imported here.

expect.extend(toHaveNoViolations);

const { Click } = composeStories(stories);

test('Checks if the form is valid', async () => {
  // Renders the composed story

  render(<Click />)

  const buttonElement = screen.getByRole('button', {
    name: 'Button',
  });

  expect(buttonElement).toMatchSnapshot("simple")

  fireEvent.pointerEnter(buttonElement);

  expect(buttonElement).toMatchSnapshot("hover")

  fireEvent.pointerDown(buttonElement);
  expect(buttonElement).toMatchSnapshot("active")


  fireEvent.pointerUp(buttonElement);
  expect(buttonElement).toMatchSnapshot("focus")

  fireEvent.pointerLeave(buttonElement);
  expect(buttonElement).toMatchSnapshot("focus")
});

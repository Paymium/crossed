import { fireEvent, render, screen } from '@testing-library/react';
import { styled } from '../styled';
import { Text } from 'react-native';
import userEvent from '@testing-library/user-event';

const Body = styled(Text, {
  'className': ['bg-red-200'],
  ':hover': {
    className: ['bg-red-100'],
  },
  ':active': {
    className: ['bg-red-100'],
  },
});

describe('styled', () => {
  test('hover', async () => {
    render(<Body dataSet={{ testid: 'toto' }} />);
    await screen.findAllByTestId('toto');

    expect(screen.getByTestId('toto')).toHaveAttribute(
      'data-class-name',
      'bg-red-200'
    );
    await userEvent.hover(screen.getByTestId('toto'));
    expect(screen.getByTestId('toto')).toHaveAttribute(
      'data-class-name',
      'bg-red-100'
    );

    await userEvent.unhover(screen.getByTestId('toto'));
    expect(screen.getByTestId('toto')).toHaveAttribute(
      'data-class-name',
      'bg-red-200'
    );
  });
  test('click', async () => {
    render(<Body dataSet={{ testid: 'toto' }} />);
    await screen.findAllByTestId('toto');

    expect(screen.getByTestId('toto')).toHaveAttribute(
      'data-class-name',
      'bg-red-200'
    );
    await fireEvent.mouseDown(screen.getByTestId('toto'));
    expect(screen.getByTestId('toto')).toHaveAttribute(
      'data-class-name',
      'bg-red-100'
    );

    await fireEvent.mouseUp(screen.getByTestId('toto'));
    expect(screen.getByTestId('toto')).toHaveAttribute(
      'data-class-name',
      'bg-red-200'
    );
  });
});

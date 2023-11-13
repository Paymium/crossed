import { fireEvent, render, screen } from '@testing-library/react';
import { styled } from '../src/styled';
import { Text } from 'react-native';
import userEvent from '@testing-library/user-event';
import { CrossedTheme } from '../src';

describe('styled', () => {
  const Body = styled(Text, {
    'className': ['bg-red-200'],
    ':hover': {
      className: ['bg-red-100'],
    },
    ':active': {
      className: ['bg-red-100'],
    },
  });
  test('hover', async () => {
    render(<Body testID="toto" />);
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
    render(<Body testID="toto" />);
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

describe('color theme', () => {
  describe('render dark className', () => {
    const Test = styled(Text, {
      'className': ['bg-red-200'],
      ':dark': {
        className: ['bg-blue-500'],
      },
      'variants': {
        variant: {
          error: {
            'className': ['text-red-500'],
            ':dark': {
              className: ['text-red-600'],
            },
          },
        },
      },
    });
    test('without theme provider', async () => {
      render(<Test testID="toto" />);
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveAttribute(
        'data-class-name',
        'bg-red-200'
      );
    });
    test('with theme provider in dark', async () => {
      render(
        <CrossedTheme defaultTheme={'dark'}>
          <Test testID="toto" />
        </CrossedTheme>
      );
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveAttribute(
        'data-class-name',
        'bg-blue-500'
      );
    });
    test('With theme provider in light', async () => {
      render(
        <CrossedTheme defaultTheme={'light'}>
          <Test testID="toto" />
        </CrossedTheme>
      );
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveAttribute(
        'data-class-name',
        'bg-red-200'
      );
    });
    test('With theme provider in light with variant', async () => {
      render(
        <CrossedTheme defaultTheme={'light'}>
          <Test testID="toto" variant="error" />
        </CrossedTheme>
      );
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveAttribute(
        'data-class-name',
        'bg-red-200 text-red-500'
      );
    });
    test('With theme provider in dark with variant', async () => {
      render(
        <CrossedTheme defaultTheme={'dark'}>
          <Test testID="toto" variant="error" />
        </CrossedTheme>
      );
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveAttribute(
        'data-class-name',
        'bg-blue-500 text-red-600'
      );
    });
    test('With theme provider in dark with variant whithout dark for variant', async () => {
      const TextTheme = styled(Text, {
        'className': ['text-red-500'],
        ':dark': {
          className: ['text-white'],
        },
        'variants': {
          color: {
            green: {
              className: ['text-green-500'],
            },
          },
        },
      });
      render(
        <CrossedTheme defaultTheme={'dark'}>
          <TextTheme testID="toto" color="green" />
        </CrossedTheme>
      );
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveAttribute(
        'data-class-name',
        'text-green-500'
      );
    });
  });
});

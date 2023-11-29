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

    expect(screen.getByTestId('toto')).toHaveClass('bg-red-200');
    await userEvent.hover(screen.getByTestId('toto'));
    expect(screen.getByTestId('toto')).toHaveClass('bg-red-100');

    await userEvent.unhover(screen.getByTestId('toto'));
    expect(screen.getByTestId('toto')).toHaveClass('bg-red-200');
  });
  test('click', async () => {
    render(<Body testID="toto" />);
    await screen.findAllByTestId('toto');

    expect(screen.getByTestId('toto')).toHaveClass('bg-red-200');
    await fireEvent.mouseDown(screen.getByTestId('toto'));
    expect(screen.getByTestId('toto')).toHaveClass('bg-red-100');

    await fireEvent.mouseUp(screen.getByTestId('toto'));
    expect(screen.getByTestId('toto')).toHaveClass('bg-red-200');
  });
});

describe('color theme', () => {
  describe('render dark className', () => {
    const Test = styled(Text, {
      className: ['bg-red-200', 'dark:bg-blue-500'],
      variants: {
        variant: {
          error: {
            className: ['text-red-500', 'dark:text-red-600'],
          },
        },
      },
    });
    test('without theme provider', async () => {
      render(<Test testID="toto" />);
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveClass(
        'bg-red-200 dark:bg-blue-500'
      );
    });
    test('with theme provider in dark', async () => {
      render(
        <CrossedTheme defaultTheme={'dark'}>
          <Test testID="toto" />
        </CrossedTheme>
      );
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveClass(
        'bg-red-200 dark:bg-blue-500'
      );
    });
    test('With theme provider in light', async () => {
      render(
        <CrossedTheme defaultTheme={'light'}>
          <Test testID="toto" />
        </CrossedTheme>
      );
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveClass(
        'bg-red-200 dark:bg-blue-500'
      );
    });
    test('With theme provider in light with variant', async () => {
      render(
        <CrossedTheme defaultTheme={'light'}>
          <Test testID="toto" variant="error" />
        </CrossedTheme>
      );
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveClass(
        'bg-red-200 dark:bg-blue-500 text-red-500 dark:text-red-600'
      );
    });
    test('With theme provider in dark with variant', async () => {
      render(
        <CrossedTheme defaultTheme={'dark'}>
          <Test testID="toto" variant="error" />
        </CrossedTheme>
      );
      await screen.findAllByTestId('toto');

      expect(screen.getByTestId('toto')).toHaveClass(
        'bg-red-200 dark:bg-blue-500 text-red-500 dark:text-red-600'
      );
    });
    test('With theme provider in dark with variant whithout dark for variant', async () => {
      const TextTheme = styled(Text, {
        className: ['text-red-500', 'dark:text-white'],
        variants: {
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

      expect(screen.getByTestId('toto')).toHaveClass(
        'dark:text-white text-green-500'
      );
    });
  });
});

describe('check props', () => {
  const Test = styled(Text, {
    'props': { role: 'button' },
    ':active': { props: { role: 'link' } },
    ':focus': { props: { role: 'alert' } },
    ':hover': { props: { role: 'form' } },
    ':disabled': { props: { role: 'navigation' } },
    'variants': {
      v: {
        true: {
          'props': { role: 'menu' },
          ':active': { props: { role: 'alert' } },
        },
      },
      y: { true: { props: { role: 'list' } }, toto: {} },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'compoundVariants': [{ v: true, y: true, props: { role: 'listitem' } }],
  });
  describe('without variant', () => {
    test('basic', async () => {
      render(<Test />);
      await screen.getByRole('button');
    });
    test('active', async () => {
      render(<Test states={{ isActive: true }} />);
      await screen.getByRole('link');
    });
    test('focus', async () => {
      render(<Test states={{ isFocus: true }} />);
      await screen.getByRole('alert');
    });
    test('hover', async () => {
      render(<Test states={{ isHover: true }} />);
      await screen.getByRole('form');
    });
    test('disabled', async () => {
      render(<Test disabled />);
      await screen.getByRole('navigation');
    });
  });

  describe('with variant', () => {
    test('simple', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render(<Test v />);
      await screen.getByRole('menu');
    });
    test('compoundVariants', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render(<Test v y />);
      await screen.getByRole('listitem');
    });

    test('variant active', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render(<Test v y states={{ isActive: true }} />);
      await screen.getByRole('alert');
    });
  });
});

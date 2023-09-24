import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  CrossedTheme,
  CrossedThemeProps,
  useCrossedTheme,
} from '../src/CrossedTheme';
import { Text } from 'react-native';
import { styled } from '../src/styled';

const Body = styled(Text, {
  className: ['text-white'],
});

const BodyThemed = styled(Text, {
  ':dark': {
    className: ['text-white'],
  },
  ':light': {
    className: ['text-black'],
  },
});

const customRender = (
  ui: React.ReactNode,
  providerProps: Omit<CrossedThemeProps, 'children'>
) => {
  return render(<CrossedTheme {...providerProps}>{ui}</CrossedTheme>);
};

describe('CrossedTheme', () => {
  test('dark', async () => {
    customRender(
      <>
        <Body>Crossed 1</Body>
        <BodyThemed>Crossed 2</BodyThemed>
      </>,
      { defaultTheme: 'dark' }
    );
    await screen.findAllByText('Crossed 1');
    await screen.findAllByText('Crossed 2');
    expect(screen.getByText('Crossed 1')).toHaveAttribute(
      'data-class-name',
      'text-white'
    );
    expect(screen.getByText('Crossed 2')).toHaveAttribute(
      'data-class-name',
      'text-white'
    );
  });
  test('light', async () => {
    customRender(
      <>
        <Body>Crossed 1</Body>
        <BodyThemed>Crossed 2</BodyThemed>
      </>,
      { defaultTheme: 'light' }
    );
    await screen.findAllByText('Crossed 1');
    await screen.findAllByText('Crossed 2');
    expect(screen.getByText('Crossed 1')).toHaveAttribute(
      'data-class-name',
      'text-white'
    );
    expect(screen.getByText('Crossed 2')).toHaveAttribute(
      'data-class-name',
      'text-black'
    );
  });
  test('setTheme', async () => {
    const RenderChildren = () => {
      const { setTheme } = useCrossedTheme();
      return <BodyThemed onPress={() => setTheme('light')}>Crossed</BodyThemed>;
    };
    customRender(<RenderChildren />, { defaultTheme: 'dark' });

    expect(screen.getByText('Crossed')).toHaveAttribute(
      'data-class-name',
      'text-white'
    );
    await userEvent.click(screen.getByText('Crossed'));

    expect(screen.getByText('Crossed')).toHaveAttribute(
      'data-class-name',
      'text-black'
    );
  });
});

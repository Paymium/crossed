/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { UnistylesRuntime, useStyles } from '@crossed/styled';
import { Button } from '@crossed/ui';
import { VisibilityHidden } from '@crossed/primitive';
import { useCallback } from 'react';

// const Button = styled(Pressable, (theme) => ({
//   'borderRadius': theme.space.lg,
//   'padding': theme.space.sm,
//   'hover:': {
//     backgroundColor: theme.colors.backgroundHover,
//   },
//   'active:': {
//     backgroundColor: theme.colors.backgroundPress,
//   }
// }));

// const Text = styled(TextNative, {
//   color: 'black',
// });

export const ChangeTheme = () => {
  useStyles();
  const onPress = useCallback(() => {
    UnistylesRuntime.setTheme(
      UnistylesRuntime.themeName === 'dark' ? 'light' : 'dark'
    );
  }, []);
  return (
    <Button onPress={onPress} variant="ghost">
      <VisibilityHidden hidden>
        <Button.Text>
          Change to {UnistylesRuntime.themeName === 'light' ? 'dark' : 'light'}{' '}
          mode
        </Button.Text>
      </VisibilityHidden>
      {UnistylesRuntime.themeName === 'light' ? (
        <svg
          fill="none"
          viewBox="3 3 18 18"
          width="12"
          height="12"
          stroke="currentColor"
          color="#262626"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            fill="currentColor"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          fill="none"
          viewBox="2 2 20 20"
          width="12"
          height="12"
          stroke="currentColor"
          color="#737373"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            fill="currentColor"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </Button>
  );
};

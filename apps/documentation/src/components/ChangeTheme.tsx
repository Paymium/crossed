/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { UnistylesRuntime, useStyles } from '@crossed/styled';
import { Sun } from '@crossed/unicons/Sun';
import { Moon } from '@crossed/unicons/Moon';
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
      {UnistylesRuntime.themeName === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

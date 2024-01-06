'use client';
import { styled, UnistylesRuntime } from '@crossed/styled';
import { useCallback } from 'react';
import { Pressable, Text as TextNative } from 'react-native';

const Button = styled(Pressable, {
  backgroundColor: 'gray',
});

const Text = styled(TextNative, {
  color: 'black',
});

export const ChangeTheme = () => {
  const onPress = useCallback(
    () =>
      UnistylesRuntime.setTheme(
        UnistylesRuntime.themeName === 'dark' ? 'light' : 'dark'
      ),
    []
  );
  return (
    <Button onPress={onPress}>
      <Text>{UnistylesRuntime.themeName === 'dark' ? 'light' : 'dark'}</Text>
    </Button>
  );
};

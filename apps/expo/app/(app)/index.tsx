/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, H1, Button, Box, Text } from '@crossed/ui';
import { createStyles, useStyles, withStyle } from '@crossed/styled';
import { ThemeRegistry, useInteraction } from '@crossed/styled/plugins';
import { Appearance, Text as NText, Pressable } from 'react-native';
import { useTransition } from 'react';

const TextTheme = withStyle(NText, {
  media: {
    xs: { color: 'red' },
    sm: { color: 'green' },
    md: { color: 'violet' },
    lg: { color: 'blue' },
  },
});

const globalStyles = createStyles({
  container: { base: { paddingHorizontal: 15 } },
  text: {
    theme: (t) => ({
      base: { color: t.colors.default },
    }),
  },
});

const ButtonC = withStyle(Pressable, {
  theme: (t) => ({
    'base': {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: t.colors.neutral,
    },
    ':active': {
      backgroundColor: t.colors.backgroundStrong,
    },
  }),
});

const ChangeTheme = () => {
  const [, setTransition] = useTransition();
  const { props, state } = useInteraction();
  const { text } = useStyles(globalStyles);
  return (
    <ButtonC
      {...props}
      {...state}
      onPress={() => {
        setTransition(() => {
          const theme = ThemeRegistry.themeName === 'dark' ? 'light' : 'dark';
          Appearance.setColorScheme(theme);
          ThemeRegistry.setThemeName(theme);
        });
      }}
    >
      <NText style={text.style}>toto</NText>
    </ButtonC>
  );
};

export default function TabOneScreen() {
  const styles = useStyles(globalStyles);
  return (
    <YBox space="lg" style={styles.container.style}>
      <ChangeTheme />
      <H1 style={styles.text.style}>Heading</H1>
      <TextTheme>Text</TextTheme>
      <Button>
        <TextTheme>Hello</TextTheme>
      </Button>
      <Button variant="outlined" aria-label="Press">
        <Button.Text style={styles.text.style}>Press</Button.Text>
      </Button>
      <YBox>
        <Box>
          <Text style={styles.text.style}>Hello</Text>
        </Box>
        <Box>
          <Text style={styles.text.style}>Hello</Text>
        </Box>
      </YBox>
    </YBox>
  );
}

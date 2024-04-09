/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, H1, Button, Box, Text } from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { Registry } from '@crossed/styled';
import { Appearance, Text as NText, Pressable } from 'react-native';
import { useTransition } from 'react';

const styles = createStyles((t) => ({
  container: { base: { paddingHorizontal: 15 } },
  text: {
    base: { color: t.colors.default },
  },
  button: {
    'base': {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: t.colors.neutral,
    },
    ':active': {
      backgroundColor: t.colors.backgroundStrong,
    },
  },
}));

const ChangeTheme = () => {
  const [, setTransition] = useTransition();
  return (
    <Pressable
      style={({ pressed }) => styles.button.rnw({ active: pressed }).style}
      onPress={() => {
        setTransition(() => {
          const theme = Registry.themeName === 'dark' ? 'light' : 'dark';
          Registry.setThemeName(theme);
          Appearance.setColorScheme(theme);
        });
      }}
    >
      <NText {...styles.text.rnw()}>toto</NText>
    </Pressable>
  );
};

export default function TabOneScreen() {
  return (
    <YBox space="lg" {...styles.container.rnw()}>
      <ChangeTheme />
      <H1 {...styles.text.rnw()}>Heading</H1>
      <NText {...styles.text.rnw()}>Text</NText>
      <Button>
        <NText {...styles.text.rnw()}>Hello</NText>
      </Button>
      <Button variant="outlined" aria-label="Press">
        <Button.Text {...styles.text.rnw()}>Press</Button.Text>
      </Button>
      <YBox>
        <Box>
          <Text {...styles.text.rnw()}>Hello</Text>
        </Box>
        <Box>
          <Text {...styles.text.rnw()}>Hello</Text>
        </Box>
      </YBox>
    </YBox>
  );
}
